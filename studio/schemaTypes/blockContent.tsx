import { defineArrayMember, defineType } from "sanity";

export default defineType({
	title: "Block Content",
	name: "blockContent",
	type: "array",
	of: [
		defineArrayMember({
			title: "Block",
			type: "block",
			styles: [
				{ title: "Normal", value: "normal" },
				{ title: "H1", value: "h1" },
				{ title: "H2", value: "h2" },
				{ title: "H3", value: "h3" },
				{ title: "H4", value: "h4" },
				{ title: "Quote", value: "blockquote" },
			],
			lists: [{ title: "Bullet", value: "bullet" }],
			marks: {
				decorators: [
					{ title: "Strong", value: "strong" },
					{ title: "Emphasis", value: "em" },
					{ title: "Code", value: "code" },
					{
						title: "Highlight",
						value: "highlight",
						icon: () => <span style={{ fontWeight: "bold" }}>H</span>,
						component: (props) => (
							<span style={{ backgroundColor: "yellow" }}>
								{props.children}
							</span>
						),
					},
				],
				annotations: [
					{
						title: "URL",
						name: "link",
						type: "object",
						fields: [
							{
								title: "URL",
								name: "href",
								type: "url",
							},
						],
					},
				],
			},
		}),
		defineArrayMember({
			type: "image",
			options: { hotspot: true },
		}),
		defineArrayMember({
			name: "alert",
			type: "object",
			fields: [
				{
					name: "type",
					type: "string",
					options: {
						list: [
							{ title: "Info", value: "info" },
							{ title: "Warning", value: "warning" },
							{ title: "Danger", value: "danger" },
						],
					},
				},
				{
					name: "message",
					type: "text",
				},
			],
		}),
	],
});
