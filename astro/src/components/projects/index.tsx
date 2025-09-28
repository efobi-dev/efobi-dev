import { Logo } from "../logo";
import { CaseStudyCard } from "./case-study";

export function ProjectsSection({
	caseStudies,
}: {
	caseStudies: {
		slug: string;
		_id: string;
		title: string;
		mainImage: string | null;
	}[];
}) {
	return (
		<div className="flex flex-col">
			<section className="py-16 sm:py-20 lg:py-24 min-h-screen grid place-items-center">
				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center text-center gap-6 sm:gap-8">
						<h2 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight max-w-5xl">
							See how leading companies
							<br />
							<span className="block">
								thrive with <Logo hideMark={false} />
							</span>
						</h2>

						<p className="max-w-3xl text-lg sm:text-xl lg:text-2xl leading-relaxed font-light mt-4">
							Trusted by hundreds of organizations,
							<br className="hidden sm:block" />
							from ambitious startups to global enterprises.
						</p>
					</div>
				</div>
			</section>
			<section className="border-t border-dotted border-gray-300 bg-background text-foreground">
				<div className="grid lg:grid-cols-2">
					{caseStudies.map((caseStudy) => (
						<CaseStudyCard key={caseStudy._id} caseStudy={caseStudy} />
					))}
				</div>
			</section>
		</div>
	);
}
