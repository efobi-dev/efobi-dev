import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../animate-ui/components/radix/accordion";

export function FAQSection() {
	const accordionContent: {
		question: string;
		answer: string;
	}[] = [
		{
			question: "How long does it take to design and develop a website?",
			answer:
				"Timelines depend on scope, content readiness, and feedback speed. A streamlined marketing site typically takes 4–8 weeks from kickoff, while larger or custom builds can run 10–16+ weeks. We share a clear schedule after discovery.",
		},
		{
			question: "How much does a new website cost?",
			answer:
				"Pricing is based on complexity, page count, design depth, integrations, and custom features. After a short discovery call, we provide a scoped proposal and options, including phased approaches if helpful.",
		},
		{
			question: "Do you provide SEO services?",
			answer:
				"Yes. We handle technical and on-page SEO, including keyword guidance, metadata, structured data, performance optimization, and sitemap/Search Console setup. Ongoing SEO support and reporting are available.",
		},
		{
			question: "Will my website show on Google?",
			answer:
				"We build with SEO best practices, submit sitemaps, and set up essential tools so your site can be indexed. While rankings can't be guaranteed, strong content and ongoing optimization improve results over time.",
		},
		{
			question: "Do you offer ongoing maintenance and support?",
			answer:
				"Yes. We offer maintenance plans that cover updates, backups, monitoring, security patches, and performance checks. Flexible support retainers are available for enhancements and priorities as your needs evolve.",
		},
		{
			question: "What is your design and development process?",
			answer:
				"Discovery and planning, UX/UI design, content preparation, development, QA (accessibility, performance, cross-browser), launch, and post-launch support. We keep communication clear at every step.",
		},
		{
			question: "Can I update the site myself?",
			answer:
				"Yes. We set up an intuitive CMS so you can manage pages, media, and content. We also provide handover training and simple documentation.",
		},
		{
			question: "Do you provide content or copywriting?",
			answer:
				"Yes. We can collaborate on messaging, provide copywriting or editing, and offer content outlines to speed up production if you prefer to write in-house.",
		},
		{
			question: "Where will the site be hosted, and who owns it?",
			answer:
				"We can recommend or manage hosting, or work with your provider. You own your code, content, and assets. We hand over repos, credentials, and deployment instructions at project close.",
		},
		{
			question: "Will the website be mobile-friendly and accessible?",
			answer:
				"Yes. We design responsively for modern devices and follow WCAG 2.1 AA best practices as part of our QA process.",
		},
		{
			question: "Can you integrate with our existing tools?",
			answer:
				"Yes. We integrate CRMs, analytics, email marketing, scheduling, payment providers, and more. Share your stack and we'll recommend the best approach.",
		},
		{
			question: "Do you build e-commerce sites?",
			answer:
				"Yes. We set up secure stores, product catalogs, and checkout flows, and integrate with payment gateways. We also optimize for speed and conversion.",
		},
		{
			question: "What happens after launch?",
			answer:
				"We include a stabilisation window for fixes, provide analytics setup, and can plan a roadmap for enhancements. Maintenance and support keep everything running smoothly.",
		},
	];

	return (
		<section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl w-full">
				<div className="mb-16 md:mb-20">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white max-w-4xl">
						FAQ's
					</h2>
					<p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-400">
						Have questions? We have answers. Explore our frequently asked
						questions to find the information you need.
					</p>
				</div>
				<Accordion
					type="single"
					collapsible
					className="w-full space-y-4 md:space-y-5"
				>
					{accordionContent.map((item, index) => (
						<AccordionItem
							// biome-ignore lint/suspicious/noArrayIndexKey: <index used for iteration>
							key={index}
							value={`item-${index}`}
							className="rounded-xl border border-gray-200/70 dark:border-gray-800/70 bg-white/60 dark:bg-gray-900/40 backdrop-blur shadow-sm transition-all hover:shadow-md data-[state=open]:shadow-lg data-[state=open]:border-primary/40"
						>
							<AccordionTrigger
								showArrow
								className="w-full text-left font-semibold text-lg md:text-2xl px-4 md:px-6 py-4 md:py-5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 data-[state=open]:text-primary"
							>
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 text-muted-foreground text-base md:text-lg leading-relaxed border-t border-gray-100 dark:border-gray-800">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
