import gdsc from "@/assets/logos/gdsc.svg?url";
import jiji from "@/assets/logos/jiji.png?url";
import paystack from "@/assets/logos/paystack.svg?url";
import BreathingText from "../ui/breathing-text";

export function LogoSection() {
	return (
		<section className="flex flex-col w-full py-16 md:py-24 lg:py-32">
			<div className="flex flex-col items-center text-center mb-16 md:mb-20 lg:mb-24 px-4">
				<h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold mb-4 max-w-4xl">
					Proud to work with{" "}
					<span className="inline-block whitespace-nowrap">
						<BreathingText
							staggerDuration={0.08}
							fromFontVariationSettings="'wght' 100, 'slnt' 0"
							toFontVariationSettings="'wght' 800, 'slnt' -10"
						>
							incredible
						</BreathingText>
					</span>{" "}
					partners.{" "}
				</h2>{" "}
			</div>
			<div className="max-w-6xl mx-auto w-full px-4">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					<div className="border border-border rounded-2xl h-32 md:h-48 lg:h-56 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
						<img
							src={gdsc}
							alt="Google Developer Student Club"
							className="max-w-[70%] max-h-[60%] object-contain filter group-hover:brightness-110 transition-all duration-300"
						/>
					</div>
					<div className="border border-border rounded-2xl h-32 md:h-48 lg:h-56 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2">
						<img
							src={paystack}
							alt="Paystack"
							className="max-w-[70%] max-h-[60%] object-contain filter group-hover:brightness-110 transition-all duration-300"
						/>
					</div>
					<div className="border border-border rounded-2xl h-32 md:h-48 lg:h-56 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2">
						<img
							src={jiji}
							alt="Jiji"
							className="max-w-[70%] max-h-[60%] object-contain filter group-hover:brightness-110 transition-all duration-300"
						/>
					</div>
					<div className="border border-border rounded-2xl h-32 md:h-48 lg:h-56 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
						<a href="/projects">
							<span className="text-lg md:text-2xl lg:text-3xl">
								amongst others...
							</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
