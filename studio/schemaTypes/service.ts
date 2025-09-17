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
		}),
		defineField({
			name: "icon",
			title: "Icon",
			type: "image",
		}),
		defineField({
			name: "shortDescription",
			title: "Short Description",
			type: "text",
		}),
		defineField({
			name: "detailedDescription",
			title: "Detailed Description",
			type: "blockContent",
		}),
	],
});
