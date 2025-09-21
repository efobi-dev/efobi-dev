import { defineField, defineType } from "sanity";

export default defineType({
	name: "testimonial",
	title: "Testimonial",
	type: "document",
	fields: [
		defineField({
			name: "clientName",
			title: "Client Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "clientTitleAndCompany",
			title: "Client Title/Company",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "quote",
			title: "Quote",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
	],
});
