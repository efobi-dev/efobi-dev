import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const steps = [
	{
		number: "01",
		title: "Brief Us",
		description:
			"Tell us what you need. Scope, timeline, special requirements. We'll clarify any questions within the hour.",
	},
	{
		number: "02",
		title: "AI Analyzes",
		description:
			"Our system structures the workflow, identifies edge cases, and handles bulk pre-processing automatically.",
	},
	{
		number: "03",
		title: "Humans Execute",
		description:
			"Expert team tackles the work with speed and precision. Quality checks at every stage. No detail overlooked.",
	},
	{
		number: "04",
		title: "You Receive",
		description:
			"Delivered on time (or early). Review, request revisions if needed. We stand by our work.",
	},
];

export function ProcessSection() {
	return (
		<section className="relative py-32 md:py-40 bg-background">
			<div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
				{/* Section header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-20"
				>
					<span className="text-sm font-mono tracking-wider text-primary uppercase border-l-2 border-primary pl-3 inline-block mb-6">
						Process
					</span>
					<h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter text-secondary-foreground max-w-4xl">
						From Inquiry
						<br />
						to Delivery
					</h2>
				</motion.div>

				{/* Steps - vertical timeline */}
				<div className="relative">
					{/* Connecting line */}
					<div className="absolute left-0 md:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

					<div className="space-y-16 md:space-y-20">
						{steps.map((step, index) => (
							<motion.div
								key={step.number}
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="relative"
							>
								<div className="grid md:grid-cols-12 gap-8 items-start">
									{/* Number badge */}
									<div className="md:col-span-2">
										<div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 border-2 border-primary bg-background">
											<span className="text-2xl md:text-3xl font-black text-primary">
												{step.number}
											</span>
											{/* Dot on timeline */}
											<div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
										</div>
									</div>

									{/* Content */}
									<div className="md:col-span-10">
										<div className="space-y-4">
											<h3 className="text-3xl md:text-4xl font-black">
												{step.title}
											</h3>
											<p className="text-lg md:text-xl text-accent-foreground leading-relaxed max-w-2xl">
												{step.description}
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* CTA - bold callout */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-32 p-12 md:p-16 border-4 border-primary bg-primary/5"
				>
					<div className="max-w-3xl">
						<h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
							Ready to work 3× faster?
						</h3>
						<p className="text-xl text-accent-foreground mb-8 leading-relaxed">
							Start your first project today. No commitment required. Pay only
							for completed work.
						</p>
						<a
							href="/contact"
							className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg hover:gap-4 transition-all duration-300"
						>
							Start Your First Project
							<ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
