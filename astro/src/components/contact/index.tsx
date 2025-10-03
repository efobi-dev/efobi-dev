import { motion } from "motion/react";
import Gravity, { MatterBody } from "../ui/gravity";
import { ContactForm } from "./form";

export function ContactSection() {
	const socialLinks = [
		{
			name: "LinkedIn",
			x: "15%",
			y: "15%",
			href: "https://linkedin.com/in/j1d30f0r.",
		},
		{
			name: "X (Twitter)",
			x: "20%",
			y: "35%",
			href: "https://twitter.com/@owenEEfobi",
		},
		{
			name: "Instagram",
			x: "25%",
			y: "25%",
			angle: 10,
			href: "https://instagram.com/ilu_owen",
		},
		{
			name: "GitHub",
			x: "35%",
			y: "15%",
			angle: -4,
			href: "https://github.com/efobi-dev",
		},
		{
			name: "Email",
			x: "15%",
			y: "80%",
			angle: 10,
			href: "mailto:owen@efobi.dev",
		},
	];

	// Professional skills and technologies with colors that complement #05f
	const techItems = [
		{
			name: "Full-Stack Development",
			x: "70%",
			y: "20%",
			color: "#0550ff", // Your primary color
		},
		{
			name: "UI/UX Design",
			x: "75%",
			y: "40%",
			color: "#3d7eff", // Lighter blue
			angle: 15,
		},
		{
			name: "Web Performance",
			x: "80%",
			y: "60%",
			color: "#1a4bff", // Darker blue
		},
		{
			name: "Mobile Development",
			x: "65%",
			y: "70%",
			color: "#6b9aff", // Light blue
			angle: -10,
		},
		{
			name: "API Development",
			x: "85%",
			y: "30%",
			color: "#0033cc", // Deep blue
		},
		{
			name: "Database Design",
			x: "70%",
			y: "85%",
			color: "#4d88ff", // Medium blue
			angle: 20,
		},
		{
			name: "DevOps & CI/CD",
			x: "90%",
			y: "50%",
			color: "#1f5eff", // Vibrant blue
		},
	];

	return (
		<section className="min-h-screen p-8 flex flex-col items-center justify-center relative">
			{/* Gravity container as background layer */}
			<Gravity
				gravity={{ x: 0, y: 1 }}
				className="absolute inset-0 w-full h-full z-0"
			>
				{/* Social links - non-draggable, positioned to avoid main content */}
				{socialLinks.map((link) => (
					<MatterBody
						key={link.name}
						matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
						x={link.x}
						y={link.y}
						angle={link.angle || 0}
						isDraggable={false}
					>
						<motion.div
							className="text-lg sm:text-xl md:text-2xl bg-white/10 backdrop-blur-sm text-[#05f] border-2 border-[#05f]/30 rounded-full hover:bg-[#05f]/10 hover:border-[#05f] transition-all duration-300 px-4 py-2 md:px-6 md:py-3"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<a
								href={link.href}
								className="block w-full h-full"
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.name}
							</a>
						</motion.div>
					</MatterBody>
				))}

				{/* Professional skills and technologies - draggable */}
				{techItems.map((item) => (
					<MatterBody
						key={item.name}
						matterBodyOptions={{
							friction: 0.3,
							restitution: 0.4,
							frictionAir: 0.01,
						}}
						x={item.x}
						y={item.y}
						angle={item.angle || 0}
						isDraggable={true}
					>
						<motion.div
							className="text-sm sm:text-base md:text-lg text-white rounded-full cursor-grab active:cursor-grabbing select-none px-4 py-2 md:px-6 md:py-3 font-medium shadow-lg"
							style={{ backgroundColor: item.color }}
							whileHover={{
								scale: 1.1,
								boxShadow: `0 8px 25px ${item.color}40`,
							}}
							whileTap={{ scale: 0.9 }}
							initial={{
								boxShadow: `0 4px 15px ${item.color}30`,
							}}
						>
							{item.name}
						</motion.div>
					</MatterBody>
				))}
			</Gravity>

			<div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-center md:justify-between min-h-[80vh] gap-16 text-center md:text-start relative z-10">
				<div className="flex items-center justify-center pointer-events-none">
					<div className="flex flex-col items-center md:items-start text-center md:text-start">
						<h1 className="text-[clamp(2.5rem,12vw,4rem)] md:text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] text-secondary-foreground m-0 tracking-[-0.02em] uppercase">
							Contact us.
						</h1>
						<p className="text-2xl leading-relaxed text-accent-foreground m-0 max-w-sm mt-4">
							Ready to collaborate? Reach out and let's create something
							extraordinary together.
						</p>
					</div>
				</div>
				<ContactForm />
			</div>
		</section>
	);
}
