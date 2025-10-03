import { sanityClient } from "sanity:client";
import type * as sanityTypes from "@efobi-dev/studio/sanity/types";
import { createGroqBuilder, makeSafeQueryRunner, z } from "groqd";

export const runQuery = makeSafeQueryRunner((query, { parameters }) =>
	sanityClient.fetch(query, parameters),
);

const q = createGroqBuilder<{
	schemaTypes: sanityTypes.AllSanitySchemaTypes;
	referenceSymbol: typeof sanityTypes.internalGroqTypeReferenceTo;
}>();

export const getAllCaseStudiesQuery = q.star
	.filterByType("caseStudy")
	.order("_updatedAt asc")
	.project((sub) => ({
		_id: z.string(),
		title: z.string(),
		slug: sub.field("slug.current", z.string()),
		mainImage: sub
			.field("mainImage.asset")
			.deref()
			.field("url", z.string().url().nullable()),
	}));

export const getAllServicesQuery = q.star
	.filterByType("service")
	.order("serviceName asc")
	.project((sub) => ({
		_id: z.string(),
		serviceName: z.string(),
		icon: sub
			.field("icon.asset")
			.deref()
			.field("url", z.string().url().nullable()),
		shortDescription: z.string(),
	}));

export const getAllBlogsQuery = q.star
	.filterByType("article")
	.order("publishedDate asc")
	.project((sub) => ({
		_id: z.string(),
		title: z.string(),
		slug: sub.field("slug.current", z.string()),
		mainImage: sub
			.field("mainImage.asset")
			.deref()
			.field("url", z.string().url().nullable()),
		excerpt: z.string(),
		publishedDate: z.string().datetime(),
	}));

export const getCaseStudy = q
	.parameters<{ slug: string }>()
	.star.filterByType("caseStudy")
	.filterRaw("slug.current == $slug")
	.project((sub) => ({
		_id: z.string(),
		title: z.string(),
		client: z.string(),
		clientProfile: sub.field("clientProfile[]"),
		mainImage: sub
			.field("mainImage.asset")
			.deref()
			.field("url", z.string().url().nullable()),
		projectOverview: z.string(),
		theChallenge: sub.field("theChallenge[]"),
		myRole: z.array(z.string()),
		theProcessAndSolution: sub.field("theProcessAndSolution[]"),
		results: sub.field("results[]"),
		technologiesUsed: sub
			.field("technologiesUsed[]")
			.deref()
			.project((tech) => ({
				name: z.string(),
				logo: tech
					.field("logo.asset")
					.deref()
					.field("url", z.string().url().nullable()),
			})),
		liveUrl: z.string().url().nullable(),
		testimonial: sub
			.field("testimonial")
			.deref()
			.project({
				clientName: z.string(),
				clientTitleAndCompany: z.string(),
				quote: z.string(),
			})
			.nullable(true),
		_updatedAt: z.string().datetime(),
	}))
	.slice(0, 1);

export const getBlogPost = q
	.parameters<{ slug: string }>()
	.star.filterByType("article")
	.filterRaw("slug.current == $slug")
	.project((sub) => ({
		_id: z.string(),
		title: z.string(),
		mainImage: sub
			.field("mainImage.asset")
			.deref()
			.field("url", z.string().url().nullable()),
		excerpt: z.string(),
		publishedDate: z.string().datetime(),
		body: sub.field("body[]"),
	}))
	.slice(0, 1);
