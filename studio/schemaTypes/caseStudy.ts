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
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "client",
			title: "Client",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "clientProfile",
			title: "Client Profile",
			type: "array",
			of: [{ type: "block" }, { type: "image" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "projectOverview",
			title: "Project Overview",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "theChallenge",
			title: "The Challenge",
			type: "array",
			of: [{ type: "block" }, { type: "image" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "myRole",
			title: "My Role",
			type: "array",
			of: [{ type: "string" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "theProcessAndSolution",
			title: "The Process & Solution",
			type: "array",
			of: [{ type: "block" }, { type: "image" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "results",
			title: "Results",
			type: "array",
			of: [{ type: "block" }, { type: "image" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "technologiesUsed",
			title: "Technologies Used",
			type: "array",
			of: [{ type: "reference", to: { type: "technology" } }],
			validation: (Rule) => Rule.required(),
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
