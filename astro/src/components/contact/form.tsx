import { contactFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import type { z } from "zod";
import { Loader, Send } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	FormItem,
	FormControl,
	FormMessage,
	Form,
	FormField,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ContactForm() {
	const [pending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof contactFormSchema>>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const submit = (values: z.infer<typeof contactFormSchema>) => {
		startTransition(async () => {
			try {
				const res = await actions.contact(values);
				if (res.error) {
					toast.error(res.error.message);
					return;
				}
				const { error, message } = res.data;
				if (error) {
					toast.error(error);
					return;
				}
				toast.success(message);
				form.reset();
			} catch (error) {
				toast.error(
					error instanceof Error ? error.message : "Internal server error",
				);
			}
		});
	};

	return (
		<div className="relative bg-transparent backdrop-blur-xl border border-white/30 rounded-lg p-6 shadow-xl w-full max-w-sm">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										variant="lg"
										autoComplete="name"
										placeholder="Your name*"
										className="
											h-12
											backdrop-blur-sm
											border-gray-300/60
											text-gray-900
											placeholder:text-gray-600
											focus:bg-white 
											focus:border-blue-500
											hover:bg-white/90
											transition-all 
											duration-200
										"
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-600" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										variant="lg"
										type="email"
										autoComplete="email"
										placeholder="Your email*"
										className="
											h-12
											backdrop-blur-sm
											border-gray-300/60
											text-gray-900
											placeholder:text-gray-600
											focus:bg-white 
											focus:border-blue-500
											hover:bg-white/90
											transition-all 
											duration-200
										"
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-600" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										{...field}
										variant="lg"
										placeholder="Tell us about your project...*"
										rows={4}
										className="
											backdrop-blur-sm
											border-gray-300/60
											text-gray-900
											placeholder:text-gray-600
											focus:bg-white 
											focus:border-blue-500
											hover:bg-white/90
											transition-all 
											duration-200
											resize-none
										"
									/>
								</FormControl>
								<FormMessage className="text-xs text-red-600" />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={pending} className="w-full">
						{pending ? (
							<>
								<Loader className="animate-spin w-4 h-4 mr-2" />
								Submitting...
							</>
						) : (
							<>
								<Send className="w-4 h-4 mr-2" />
								Send Message
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
