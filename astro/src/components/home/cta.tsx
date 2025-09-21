import { StartButton } from "../start";
import { StatisticsCard } from "../statistics";

export function CallToActionSection() {
	return (
		<section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl w-full">
				<div className="mb-16 md:mb-20">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white max-w-4xl">
						Visibility alone isn't enough.{" "}
						<span className="text-gray-600 dark:text-gray-400 font-normal">
							Turn attention into momentum and move forward together, in sync.
						</span>
					</h2>
				</div>
				<div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
					<div className="lg:col-span-5 lg:col-start-2 space-y-8">
						<div className="space-y-6">
							<p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
								We help ambitious brands turn bold goals into measurable
								momentum combining sharp strategy, standout creativity, and a
								network of top-tier talent.
							</p>
							<p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-400">
								All without burning out your team. Clear process, healthy pace,
								real results.
							</p>
						</div>
						<div className="pt-4">
							<StartButton />
						</div>
					</div>
					<div className="lg:col-span-4 lg:col-start-8">
						<div className="relative">
							<img
								src="/abstract.png"
								alt="Abstract visual representation"
								className="w-full h-auto rounded-2xl shadow-sm"
							/>
						</div>
					</div>
				</div>
				<div className="w-full my-16 md:my-20 lg:my-24" />
				<StatisticsCard />
			</div>
		</section>
	);
}
