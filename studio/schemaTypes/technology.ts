import { defineField, defineType } from "sanity";

export default defineType({
	name: "technology",
	title: "Technology",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		defineField({
			name: "logo",
			title: "Logo",
			type: "image",
		}),
	],
});
