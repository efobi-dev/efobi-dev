import { defineAction } from "astro:actions";
import { Mailer } from "@efobi/mailer";
import { contactFormSchema } from "@/lib/zod";

const mailer = new Mailer({
	auth: {
		user: import.meta.env.SMTP_EMAIL,
		pass: import.meta.env.SMTP_API_KEY,
	},
	host: import.meta.env.SMTP_SERVER,
});

export const server = {
	contact: defineAction({
		accept: "json",
		handler: async (input) => {
			const { data, success, error } = contactFormSchema.safeParse(input);
			if (!success) {
				return { error: `Invalid body: ${error.issues[0].message}` };
			}
			try {
				await mailer.send({
					from: `${data.name} <${data.email}>`,
					to: "owen@efobi.dev",
					subject: `New contact form submission from ${data.name}`,
					text: data.message || "No message provided",
					priority: "high",
				});
				await mailer.send({
					from: "Owen <owen@efobi.dev>",
					to: data.email,
					subject: "Thanks for reaching out!",
					text: `Hi ${data.name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nOwen`,
					priority: "high",
				});
				return { message: "Message sent successfully" };
			} catch (error) {
				return {
					error:
						error instanceof Error ? error.message : "Internal server error",
				};
			}
		},
	}),
};
