import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function ServicesHero() {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden bg-background">
			{/* Grain texture overlay */}
			<div
				className="absolute inset-0 opacity-[0.015] pointer-events-none"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
				}}
			/>

			{/* Diagonal accent gradient */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/20 to-transparent" />
			</div>

			<div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-0">
				{/* Asymmetric grid layout */}
				<div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
					{/* Left: Main content (spans 7 columns) */}
					<div className="md:col-span-7">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-8"
						>
							{/* Eyebrow */}
							<div className="inline-block">
								<span className="text-xs md:text-sm font-mono tracking-wider text-muted-foreground uppercase border-l-2 border-primary pl-3">
									Virtual Services / BPO
								</span>
							</div>

							{/* Headline - Editorial style with dramatic scale */}
							<h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-secondary-foreground">
								Human
								<br />
								<span className="text-primary">+ Machine</span>
								<br />
								Excellence
							</h1>

							{/* Subtitle - asymmetric width */}
							<p className="text-lg md:text-xl text-accent-foreground leading-relaxed max-w-xl">
								We deliver data entry, virtual assistance, and specialized
								back-office services at <strong>3× the speed</strong> and{" "}
								<strong>98% accuracy</strong> by fusing AI automation with
								Nigerian expertise.
							</p>

							{/* Stats bar - bold numbers */}
							<div className="flex gap-8 md:gap-12 pt-4">
								<div>
									<div className="text-4xl md:text-5xl font-black text-primary">
										3×
									</div>
									<div className="text-sm text-muted-foreground mt-1">
										Faster
									</div>
								</div>
								<div>
									<div className="text-4xl md:text-5xl font-black text-primary">
										98%
									</div>
									<div className="text-sm text-muted-foreground mt-1">
										Accurate
									</div>
								</div>
								<div>
									<div className="text-4xl md:text-5xl font-black text-primary">
										24/7
									</div>
									<div className="text-sm text-muted-foreground mt-1">
										Available
									</div>
								</div>
							</div>

							{/* CTAs - asymmetric buttons */}
							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								<a
									href="/contact"
									className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:gap-3"
								>
									Start a Project
									<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
								</a>
								<a
									href="#pricing"
									className="inline-flex items-center justify-center px-8 py-4 border-2 border-border font-semibold text-lg hover:border-primary hover:text-primary transition-colors duration-300"
								>
									View Pricing
								</a>
							</div>
						</motion.div>
					</div>

					{/* Right: Visual element (spans 5 columns) */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, delay: 0.2 }}
						className="md:col-span-5 hidden md:block"
					>
						{/* Large decorative number/icon */}
						<div className="relative h-[500px] flex items-center justify-center">
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-[20rem] font-black text-primary/5 leading-none select-none">
									01
								</div>
							</div>

							{/* Overlaid content */}
							<div className="relative z-10 space-y-6 p-8">
								<div className="bg-card/80 backdrop-blur-sm border border-border p-6 hover:border-primary/50 transition-colors">
									<div className="text-sm font-mono text-primary mb-2">
										→ AI Pre-Processing
									</div>
									<div className="text-base text-foreground">
										Automated workflow analysis & task structuring
									</div>
								</div>

								<div className="bg-card/80 backdrop-blur-sm border border-border p-6 hover:border-primary/50 transition-colors ml-12">
									<div className="text-sm font-mono text-primary mb-2">
										→ Human Verification
									</div>
									<div className="text-base text-foreground">
										Expert quality control & final polish
									</div>
								</div>

								<div className="bg-card/80 backdrop-blur-sm border border-border p-6 hover:border-primary/50 transition-colors">
									<div className="text-sm font-mono text-primary mb-2">
										→ Continuous Improvement
									</div>
									<div className="text-base text-foreground">
										Learn from every project, faster over time
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
