import { defineField, defineType } from "sanity";

export default defineType({
	name: "article",
	title: "Article",
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
			name: "publishedDate",
			title: "Published Date",
			type: "datetime",
			validation: (Rule) => Rule.required(),
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
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "array",
			of: [
				{ type: "block" },
				{ type: "image" },
				{
					type: "code",
					name: "code",
					title: "Code Blocks",
					options: {
						languageAlternatives: [
							{ title: "", value: "" },
							{ title: "Javascript", value: "javascript" },
							{ title: "HTML", value: "html" },
							{ title: "CSS", value: "css" },
							{ title: "React", value: "react" },
							{ title: "Node", value: "node" },
							{ title: "MySql", value: "mysql" },
							{ title: "ZH", value: "zh", mode: "sh" },
						],
						withFilename: false,
					},
				},
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "author",
			title: "Author",
			type: "reference",
			to: { type: "author" },
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			title: "title",
			author: "author.name",
			media: "mainImage",
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});
