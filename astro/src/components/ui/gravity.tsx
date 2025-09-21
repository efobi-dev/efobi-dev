"use client";

import { debounce } from "lodash-es";
import type Matter from "matter-js";
import {
	createContext,
	forwardRef,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { useMounted } from "@/hooks/use-mounted";
import { calculatePosition, parsePathToVertices } from "@/lib/matter";
import { cn } from "@/lib/utils";

// Dynamic import to avoid SSR issues
let matter: typeof Matter | null = null;

const loadMatter = async () => {
	if (typeof window !== "undefined" && !matter) {
		matter = await import("matter-js");
		// Load poly-decomp if needed for complex shapes
		try {
			const polyDecomp = await import("poly-decomp");
			matter.Common.setDecomp(polyDecomp);
		} catch (e) {
			console.warn("poly-decomp not available, complex shapes may not work");
		}
	}
	return matter;
};

type GravityProps = {
	children: ReactNode;
	debug?: boolean;
	gravity?: { x: number; y: number };
	resetOnResize?: boolean;
	grabCursor?: boolean;
	addTopWall?: boolean;
	autoStart?: boolean;
	className?: string;
};

type PhysicsBody = {
	element: HTMLElement;
	body: Matter.Body;
	props: MatterBodyProps;
};

type MatterBodyProps = {
	children: ReactNode;
	matterBodyOptions?: Matter.IBodyDefinition;
	isDraggable?: boolean;
	bodyType?: "rectangle" | "circle" | "svg";
	sampleLength?: number;
	x?: number | string;
	y?: number | string;
	angle?: number;
	className?: string;
};

export type GravityRef = {
	start: () => void;
	stop: () => void;
	reset: () => void;
};

const GravityContext = createContext<{
	registerElement: (
		id: string,
		element: HTMLElement,
		props: MatterBodyProps,
	) => void;
	unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({
	children,
	className,
	matterBodyOptions = {
		friction: 0.1,
		restitution: 0.1,
		density: 0.001,
		isStatic: false,
	},
	bodyType = "rectangle",
	isDraggable = true,
	sampleLength = 15,
	x = 0,
	y = 0,
	angle = 0,
	...props
}: MatterBodyProps) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const idRef = useRef(Math.random().toString(36).substring(7));
	const context = useContext(GravityContext);

	useEffect(() => {
		if (!elementRef.current || !context) return;

		// Add a small delay to ensure the element is properly rendered
		const timer = setTimeout(() => {
			if (elementRef.current && context) {
				context.registerElement(idRef.current, elementRef.current, {
					children,
					matterBodyOptions,
					bodyType,
					sampleLength,
					isDraggable,
					x,
					y,
					angle,
					...props,
				});
			}
		}, 0);

		return () => {
			clearTimeout(timer);
			context.unregisterElement(idRef.current);
		};
	}, [
		props,
		children,
		matterBodyOptions,
		isDraggable,
		angle,
		bodyType,
		context,
		sampleLength,
		x,
		y,
	]);

	return (
		<div
			ref={elementRef}
			className={cn(
				"absolute",
				className,
				isDraggable && "pointer-events-none",
			)}
		>
			{children}
		</div>
	);
};

const Gravity = forwardRef<GravityRef, GravityProps>(
	(
		{
			children,
			debug = false,
			gravity = { x: 0, y: 1 },
			grabCursor = true,
			resetOnResize = true,
			addTopWall = true,
			autoStart = true,
			className,
			...props
		},
		ref,
	) => {
		const canvas = useRef<HTMLDivElement>(null);
		const engine = useRef<Matter.Engine | null>(null);
		const render = useRef<Matter.Render | null>(null);
		const runner = useRef<Matter.Runner | null>(null);
		const bodiesMap = useRef(new Map<string, PhysicsBody>());
		const frameId = useRef<number>(0);
		const mouseConstraint = useRef<Matter.MouseConstraint | null>(null);
		const mouseDown = useRef(false);
		const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
		const [matterLoaded, setMatterLoaded] = useState(false);

		const isRunning = useRef(false);
		const mounted = useMounted();

		// Load Matter.js after component mounts
		useEffect(() => {
			if (mounted) {
				loadMatter().then((matterInstance) => {
					if (matterInstance) {
						setMatterLoaded(true);
					}
				});
			}
		}, [mounted]);

		// Register Matter.js body in the physics world
		const registerElement = useCallback(
			(id: string, element: HTMLElement, props: MatterBodyProps) => {
				if (!canvas.current || !matter || !engine.current) return;

				const width = element.offsetWidth;
				const height = element.offsetHeight;

				// Ensure element has dimensions
				if (width === 0 || height === 0) {
					console.warn("MatterBody element has zero dimensions:", element);
					return;
				}

				const canvasRect = canvas.current.getBoundingClientRect();

				const angle = (props.angle || 0) * (Math.PI / 180);

				const x = calculatePosition(props.x, canvasRect.width, width);
				const y = calculatePosition(props.y, canvasRect.height, height);

				let body: Matter.Body | null = null;

				try {
					if (props.bodyType === "circle") {
						const radius = Math.max(width, height) / 2;
						body = matter.Bodies.circle(x, y, radius, {
							...props.matterBodyOptions,
							angle: angle,
							render: {
								fillStyle: debug ? "#888888" : "#00000000",
								strokeStyle: debug ? "#333333" : "#00000000",
								lineWidth: debug ? 3 : 0,
							},
						});
					} else if (props.bodyType === "svg") {
						const paths = element.querySelectorAll("path");
						const vertexSets: Matter.Vector[][] = [];

						paths.forEach((path) => {
							const d = path.getAttribute("d");
							if (d) {
								const vertices = parsePathToVertices(d, props.sampleLength);
								if (vertices.length > 0) {
									vertexSets.push(vertices);
								}
							}
						});

						if (vertexSets.length > 0) {
							body = matter.Bodies.fromVertices(x, y, vertexSets, {
								...props.matterBodyOptions,
								angle: angle,
								render: {
									fillStyle: debug ? "#888888" : "#00000000",
									strokeStyle: debug ? "#333333" : "#00000000",
									lineWidth: debug ? 3 : 0,
								},
							});
						}
					} else {
						body = matter.Bodies.rectangle(x, y, width, height, {
							...props.matterBodyOptions,
							angle: angle,
							render: {
								fillStyle: debug ? "#888888" : "#00000000",
								strokeStyle: debug ? "#333333" : "#00000000",
								lineWidth: debug ? 3 : 0,
							},
						});
					}

					if (body) {
						matter.World.add(engine.current.world, [body]);
						bodiesMap.current.set(id, { element, body, props });
					}
				} catch (error) {
					console.error("Failed to create Matter.js body:", error);
				}
			},
			[debug],
		);

		// Unregister Matter.js body from the physics world
		const unregisterElement = useCallback((id: string) => {
			if (!matter || !engine.current) return;

			const physicsBody = bodiesMap.current.get(id);
			if (physicsBody) {
				try {
					matter.World.remove(engine.current.world, physicsBody.body);
					bodiesMap.current.delete(id);
				} catch (error) {
					console.error("Failed to remove Matter.js body:", error);
				}
			}
		}, []);

		// Keep react elements in sync with the physics world
		const updateElements = useCallback(() => {
			if (!isRunning.current) return;

			bodiesMap.current.forEach(({ element, body }) => {
				const { x, y } = body.position;
				const rotation = body.angle * (180 / Math.PI);

				element.style.transform = `translate(${
					x - element.offsetWidth / 2
				}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
			});

			frameId.current = requestAnimationFrame(updateElements);
		}, []);

		const startEngine = useCallback(() => {
			if (!matter || !runner.current || !engine.current) return;

			runner.current.enabled = true;
			matter.Runner.run(runner.current, engine.current);

			if (render.current) {
				matter.Render.run(render.current);
			}

			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
			}
			frameId.current = requestAnimationFrame(updateElements);
			isRunning.current = true;
		}, [updateElements]);

		const initializeRenderer = useCallback(() => {
			if (!canvas.current || !matter || !matterLoaded) return;

			const height = canvas.current.offsetHeight;
			const width = canvas.current.offsetWidth;

			// Ensure canvas has dimensions
			if (width === 0 || height === 0) {
				console.warn("Canvas has zero dimensions, delaying initialization");
				setTimeout(initializeRenderer, 100);
				return;
			}

			setCanvasSize({ width, height });

			engine.current = matter.Engine.create();
			engine.current.gravity.x = gravity.x;
			engine.current.gravity.y = gravity.y;

			render.current = matter.Render.create({
				element: canvas.current,
				engine: engine.current,
				options: {
					width,
					height,
					wireframes: false,
					background: "#00000000",
				},
			});

			const mouse = matter.Mouse.create(render.current?.canvas);
			mouseConstraint.current = matter.MouseConstraint.create(engine.current, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: debug,
					},
				},
			});

			// Add walls
			const walls = [
				// Floor
				matter.Bodies.rectangle(width / 2, height + 10, width, 20, {
					isStatic: true,
					friction: 1,
					render: {
						visible: debug,
					},
				}),

				// Right wall
				matter.Bodies.rectangle(width + 10, height / 2, 20, height, {
					isStatic: true,
					friction: 1,
					render: {
						visible: debug,
					},
				}),

				// Left wall
				matter.Bodies.rectangle(-10, height / 2, 20, height, {
					isStatic: true,
					friction: 1,
					render: {
						visible: debug,
					},
				}),
			];

			const topWall = addTopWall
				? matter.Bodies.rectangle(width / 2, -10, width, 20, {
						isStatic: true,
						friction: 1,
						render: {
							visible: debug,
						},
					})
				: null;

			if (topWall) {
				walls.push(topWall);
			}

			const touchingMouse = () =>
				matter!.Query.point(
					engine.current!.world.bodies,
					mouseConstraint.current?.mouse.position || { x: 0, y: 0 },
				).length > 0;

			if (grabCursor && canvas.current) {
				matter.Events.on(engine.current, "beforeUpdate", () => {
					if (canvas.current) {
						if (!mouseDown.current && !touchingMouse()) {
							canvas.current.style.cursor = "default";
						} else if (touchingMouse()) {
							canvas.current.style.cursor = mouseDown.current
								? "grabbing"
								: "grab";
						}
					}
				});

				const handleMouseDown = () => {
					mouseDown.current = true;
					if (canvas.current) {
						if (touchingMouse()) {
							canvas.current.style.cursor = "grabbing";
						} else {
							canvas.current.style.cursor = "default";
						}
					}
				};

				const handleMouseUp = () => {
					mouseDown.current = false;
					if (canvas.current) {
						if (touchingMouse()) {
							canvas.current.style.cursor = "grab";
						} else {
							canvas.current.style.cursor = "default";
						}
					}
				};

				canvas.current.addEventListener("mousedown", handleMouseDown);
				canvas.current.addEventListener("mouseup", handleMouseUp);
			}

			matter.World.add(engine.current.world, [
				mouseConstraint.current,
				...walls,
			]);

			if (render.current) {
				render.current.mouse = mouse;
			}

			runner.current = matter.Runner.create();

			if (render.current) {
				matter.Render.run(render.current);
			}

			runner.current.enabled = false;

			if (autoStart) {
				startEngine();
			}
		}, [
			debug,
			autoStart,
			addTopWall,
			grabCursor,
			gravity,
			startEngine,
			matterLoaded,
		]);

		// Clear the Matter.js world
		const clearRenderer = useCallback(() => {
			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
				frameId.current = 0;
			}

			if (!matter || !engine.current) return;

			if (mouseConstraint.current) {
				matter.World.remove(engine.current.world, mouseConstraint.current);
				mouseConstraint.current = null;
			}

			if (render.current) {
				if (render.current.mouse) {
					matter.Mouse.clearSourceEvents(render.current.mouse);
				}
				matter.Render.stop(render.current);
				if (render.current.canvas) {
					render.current.canvas.remove();
				}
				render.current = null;
			}

			if (runner.current) {
				matter.Runner.stop(runner.current);
				runner.current = null;
			}

			if (engine.current) {
				matter.World.clear(engine.current.world, false);
				matter.Engine.clear(engine.current);
				engine.current = null;
			}

			bodiesMap.current.clear();
			isRunning.current = false;
		}, []);

		const handleResize = useCallback(() => {
			if (!canvas.current || !resetOnResize || !matterLoaded) return;

			const newWidth = canvas.current.offsetWidth;
			const newHeight = canvas.current.offsetHeight;

			if (newWidth === 0 || newHeight === 0) return;

			// Clear and reinitialize
			clearRenderer();
			setTimeout(initializeRenderer, 50);
		}, [clearRenderer, initializeRenderer, resetOnResize, matterLoaded]);

		const stopEngine = useCallback(() => {
			if (!isRunning.current || !matter) return;

			if (runner.current) {
				matter.Runner.stop(runner.current);
			}
			if (render.current) {
				matter.Render.stop(render.current);
			}
			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
				frameId.current = 0;
			}
			isRunning.current = false;
		}, []);

		const reset = useCallback(() => {
			if (!matter || !engine.current) return;

			stopEngine();
			bodiesMap.current.forEach(({ element, body, props }) => {
				const angle = (props.angle || 0) * (Math.PI / 180);
				matter!.Body.setAngle(body, angle);

				const x = calculatePosition(
					props.x,
					canvasSize.width,
					element.offsetWidth,
				);
				const y = calculatePosition(
					props.y,
					canvasSize.height,
					element.offsetHeight,
				);
				matter!.Body.setPosition(body, { x, y });
				matter!.Body.setVelocity(body, { x: 0, y: 0 });
				matter!.Body.setAngularVelocity(body, 0);
			});
			updateElements();
		}, [canvasSize, stopEngine, updateElements]);

		useImperativeHandle(
			ref,
			() => ({
				start: startEngine,
				stop: stopEngine,
				reset,
			}),
			[startEngine, stopEngine, reset],
		);

		useEffect(() => {
			if (!resetOnResize || !matterLoaded) return;

			const debouncedResize = debounce(handleResize, 500);
			window.addEventListener("resize", debouncedResize);

			return () => {
				window.removeEventListener("resize", debouncedResize);
				debouncedResize.cancel();
			};
		}, [handleResize, resetOnResize, matterLoaded]);

		useEffect(() => {
			if (mounted && matterLoaded) {
				const timer = setTimeout(initializeRenderer, 50);
				return () => clearTimeout(timer);
			}
		}, [mounted, matterLoaded, initializeRenderer]);

		useEffect(() => {
			return () => {
				clearRenderer();
			};
		}, [clearRenderer]);

		if (!mounted || !matterLoaded) return null;

		return (
			<GravityContext.Provider value={{ registerElement, unregisterElement }}>
				<div
					ref={canvas}
					className={cn(className, "absolute top-0 left-0 w-full h-full")}
					{...props}
				>
					{children}
				</div>
			</GravityContext.Provider>
		);
	},
);

Gravity.displayName = "Gravity";
export default Gravity;
