import { defineField, defineType } from "sanity";

export default defineType({
	name: "service",
	title: "Service",
	type: "document",
	fields: [
		defineField({
			name: "serviceName",
			title: "Service Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "icon",
			title: "Icon",
			type: "image",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "shortDescription",
			title: "Short Description",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "detailedDescription",
			title: "Detailed Description",
			type: "blockContent",
			validation: (Rule) => Rule.required(),
		}),
	],
});
