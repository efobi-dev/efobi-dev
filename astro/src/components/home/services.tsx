import { animate, scroll } from "motion/react";
import { useEffect, useRef } from "react";

export function ServicesSection({
	services,
}: {
	services: {
		_id: string;
		serviceName: string;
		icon: string | null;
		shortDescription: string;
	}[];
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const groupRef = useRef<HTMLDivElement>(null);
	const initializedRef = useRef(false);

	useEffect(() => {
		if (initializedRef.current) return;

		const container = containerRef.current;
		const group = groupRef.current;

		if (!container || !group) return;
		scroll(
			animate(group, {
				transform: ["none", `translateX(-${services.length - 1}00vw)`],
			}),
			{ target: container },
		);
		initializedRef.current = true;
	}, [services.length]);

	return (
		<article className="w-full">
			<header className="h-[70vh] flex justify-center items-center">
				<div className="text-center space-y-6 px-8">
					<div>
						<span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase block mb-3">
							What We Do
						</span>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
							Our Services
						</h2>
					</div>
					<div className="w-12 h-0.5 bg-gray-900 dark:bg-white mx-auto"></div>
					<p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
						We deliver tailored, high-impact services that help businesses scale
						faster, operate smarter, and achieve measurable results.
					</p>
				</div>
			</header>
			<section
				ref={containerRef}
				className="relative"
				style={{ height: `${services.length * 100}vh` }}
			>
				<div className="sticky top-0 overflow-hidden h-screen">
					<div ref={groupRef} className="flex h-full">
						{services.map((service) => (
							<div
								key={service._id}
								className="service-item flex-shrink-0 w-screen h-full flex items-center justify-center"
								style={{
									backgroundImage: `url(${service.icon})`,
								}}
							>
								<div className="w-80 md:w-96 lg:w-[420px] h-80 md:h-96 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 md:p-10 lg:p-12 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200 bg-white dark:bg-gray-800">
									<div className="h-full flex flex-col justify-between">
										<div className="flex-grow space-y-4">
											<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
												{service.serviceName}
											</h3>
											<p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
												{service.shortDescription}
											</p>
										</div>
										<div className="flex-shrink-0 pt-6">
											<a
												href="/about"
												className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
											>
												Learn more &rarr;
											</a>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</article>
	);
}
