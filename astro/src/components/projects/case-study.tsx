import { ArrowUpRight } from "lucide-react";

export const CaseStudyCard = ({
	caseStudy,
}: {
	caseStudy: {
		slug: string;
		_id: string;
		title: string;
		mainImage: string | null;
	};
}) => {
	return (
		<a
			href={`/projects/${caseStudy.slug}`}
			className="group block border-r border-b border-dotted border-gray-300 last:border-r-0 lg:odd:border-r lg:even:border-r-0 transition-all duration-500"
		>
			<div className="p-8 lg:p-12 h-full flex flex-col justify-between min-h-[400px] lg:min-h-[500px] relative overflow-hidden">
				<div className="absolute inset-0">
					<img
						src={caseStudy.mainImage ?? "/placeholder.png"}
						alt={caseStudy.title}
						aria-hidden="true"
						className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-700 will-change-transform group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/60 transition-colors duration-700 group-hover:from-white/40 group-hover:via-white/30 group-hover:to-white/20" />
				</div>
				<div className="relative z-10">
					<h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mb-8 lg:mb-12 group-hover:text-gray-700 transition-colors duration-300">
						{caseStudy.title}
					</h3>
				</div>
				<div className="relative z-10 mt-auto">
					<div className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
						<span className="text-base font-medium mr-3">
							Read full case study
						</span>
						<ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
					</div>
				</div>
			</div>
		</a>
	);
};
