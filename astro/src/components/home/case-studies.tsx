import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import BoxCarousel, { type CarouselItem } from "../ui/box-carousel";
import { Button } from "../ui/button";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export function CaseStudies({
	caseStudies,
}: {
	caseStudies: {
		slug: string;
		_id: string;
		title: string;
		mainImage: string | null;
	}[];
}) {
	const [index, setIndex] = useState(0);
	const images: CarouselItem[] = caseStudies.map((c) => ({
		id: c._id,
		type: "image",
		src: c.mainImage ?? "/placeholder.webp",
		alt: c.title,
	}));
	const isMobile = useMediaQuery("(max-width: 768px)");
	const isTablet = useMediaQuery("(max-width: 1024px)");

	const getCarouselDimensions = () => {
		if (isMobile) {
			return { width: 280, height: 200 };
		}
		if (isTablet) {
			return { width: 320, height: 240 };
		}
		return { width: 400, height: 280 };
	};
	const { width, height } = getCarouselDimensions();

	return (
		<section className="py-16 md:py-24 lg:py-32">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 md:mb-20 gap-8">
					<div className="flex-1">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase mb-4 block">
							Our Work
						</span>
						<h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold mb-6 text-gray-900 dark:text-white">
							Featured case studies
						</h3>
						<div className="w-16 h-0.5 bg-gray-900 dark:bg-white"></div>
					</div>
					<div className="flex-1 max-w-lg">
						<p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
							We have helped businesses across industries achieve their goals.
							Here are some case studies showcasing our solutions and results.
						</p>
					</div>
				</div>

				{/* Content Section */}
				<div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-16">
					{/* Carousel Section */}
					<div className="flex-1 flex justify-center xl:justify-start">
						<BoxCarousel
							items={images}
							width={width}
							height={height}
							direction="right"
							onIndexChange={setIndex}
							enableDrag
							perspective={1000}
							autoPlay
							autoPlayInterval={4000}
						/>
					</div>

					{/* Details Section */}
					<div className="flex-1 max-w-xl">
						<div className="rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
							{/* Case study counter */}
							<div className="flex items-center justify-between mb-6">
								<span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase">
									Case Study
								</span>
								<span className="text-sm font-bold text-gray-900 dark:text-white">
									{String(index + 1).padStart(2, "0")} /{" "}
									{String(caseStudies.length).padStart(2, "0")}
								</span>
							</div>

							{/* Title */}
							<div key={index} className="mb-8">
								<h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
									<TextGenerateEffect words={caseStudies[index].title} />
								</h4>
							</div>
							<Button>
								<a href={`/projects/${caseStudies[index].slug}`}>
									Read full case study &rarr;
								</a>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
