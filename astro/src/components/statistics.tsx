import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import NumberTicker, { type NumberTickerRef } from "./ui/number-ticker";

const tickerContent: {
	number: number;
	sign: "+" | "%" | "M+";
	title: string;
	description: string;
}[] = [
	{
		number: 17,
		sign: "+",
		title: "Active clients",
		description: "Ambitious brands we partner with worldwide",
	},
	{
		number: 98,
		sign: "%",
		title: "Client retention",
		description: "Partners stay for compounding results and a clear process",
	},
	{
		number: 10,
		sign: "M+",
		title: "Audience reached",
		description: "Our work engages millions every month",
	},
	{
		number: 4,
		sign: "+",
		title: "Years of experience",
		description: "Proven delivery from strategy to launch",
	},
];

export function StatisticsCard() {
	const containerRef = useRef<HTMLDivElement>(null);
	const tickerRefs = useRef<(NumberTickerRef | null)[]>([]);
	const inView = useInView(containerRef, {
		once: true, // Changed to true so animation only happens once
		margin: "-100px", // Trigger animation when element is 100px into view
	});

	useEffect(() => {
		if (inView) {
			tickerRefs.current.forEach((ref, index) => {
				if (ref) {
					setTimeout(() => {
						ref.startAnimation();
					}, index * 150); // 150ms delay between each animation
				}
			});
		}
	}, [inView]);

	return (
		<div
			ref={containerRef}
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
		>
			{tickerContent.map((item, index) => (
				<div key={item.title} className="group relative">
					<div className="relative rounded-3xl border border-gray-200/80 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/60 backdrop-blur-sm p-6 lg:p-8 shadow-sm hover:shadow-lg hover:border-gray-300/80 dark:hover:border-gray-600/50 transition-all duration-500 hover:-translate-y-1">
						<div className="flex items-baseline gap-1 mb-4">
							<span className="tabular-nums font-semibold text-4xl lg:text-5xl leading-none tracking-tight text-gray-900 dark:text-white">
								<NumberTicker
									from={0}
									target={item.number}
									ref={(el) => {
										tickerRefs.current[index] = el;
									}}
									transition={{
										duration: 2.5,
										ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smooth easing
										type: "tween",
									}}
									autoStart={false}
								/>
								{item.sign}
							</span>
						</div>
						<div className="space-y-2">
							<h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white leading-tight">
								{item.title}
							</h3>
							<p className="text-sm lg:text-base leading-relaxed text-gray-600 dark:text-gray-400">
								{item.description}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
