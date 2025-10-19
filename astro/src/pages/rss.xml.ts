import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { blogRSSQuery, caseStudyRSSQuery, runQuery } from "@/sanity/queries";

export async function GET(context: APIContext) {
	const [blogs, caseStudies] = await Promise.all([
		runQuery(blogRSSQuery),
		runQuery(caseStudyRSSQuery),
	]);

	const items: {
		title: string;
		pubDate: Date;
		description: string;
		link: string;
	}[] = blogs
		.map((blog) => ({
			title: blog.title,
			pubDate: new Date(blog.publishedDate),
			description: blog.excerpt,
			link: `/blog/${blog.slug}`,
		}))
		.concat(
			caseStudies.map((caseStudy) => ({
				title: caseStudy.title,
				pubDate: new Date(caseStudy._updatedAt),
				description: caseStudy.projectOverview,
				link: `/projects/${caseStudy.slug}`,
			})),
		)
		.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
	return rss({
		title: "efobi.dev. Design Driven Development Agency",
		description:
			"efobi.dev is a design-driven development agency that crafts beautiful, high-performance websites and applications tailored to your business needs.",
		site: context.site?.toString() as string,
		items,
		customData: `<language>en-us</language>`,
	});
}
