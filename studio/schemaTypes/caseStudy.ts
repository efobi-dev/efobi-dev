import { defineField, defineType } from "sanity";

export default defineType({
	name: "caseStudy",
	title: "Case Study",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "client",
			title: "Client",
			type: "string",
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "projectOverview",
			title: "Project Overview",
			type: "text",
		}),
		defineField({
			name: "theChallenge",
			title: "The Challenge",
			type: "blockContent",
		}),
		defineField({
			name: "myRole",
			title: "My Role",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "theProcessAndSolution",
			title: "The Process & Solution",
			type: "blockContent",
		}),
		defineField({
			name: "technologiesUsed",
			title: "Technologies Used",
			type: "array",
			of: [{ type: "reference", to: { type: "technology" } }],
		}),
		defineField({
			name: "liveUrl",
			title: "Live URL",
			type: "url",
		}),
		defineField({
			name: "testimonial",
			title: "Testimonial",
			type: "reference",
			to: { type: "testimonial" },
		}),
	],

	preview: {
		select: {
			title: "title",
			client: "client",
			media: "mainImage",
		},
		prepare(selection) {
			const { client } = selection;
			return { ...selection, subtitle: client && `by ${client}` };
		},
	},
});
