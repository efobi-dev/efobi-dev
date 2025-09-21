import { sanityClient } from "sanity:client";
import type * as sanityTypes from "@efobi-dev/studio/sanity/types";
import { createGroqBuilder, makeSafeQueryRunner, z } from "groqd";

export const runQuery = makeSafeQueryRunner((query) =>
	sanityClient.fetch(query),
);

const q = createGroqBuilder<{
	schemaTypes: sanityTypes.AllSanitySchemaTypes;
	referenceSymbol: typeof sanityTypes.internalGroqTypeReferenceTo;
}>();

export const getSomeCaseStudiesQuery = (amount = 4) =>
	q.star
		.filterByType("caseStudy")
		.order("_updatedAt asc")
		.slice(0, amount)
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
