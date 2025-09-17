import { defineField, defineType } from "sanity";

export default defineType({
	name: "author",
	title: "Author",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		defineField({
			name: "profileImage",
			title: "Profile Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "bio",
			title: "Bio",
			type: "text",
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "profileImage",
		},
	},
});
