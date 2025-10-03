import { actions } from "astro:actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail, Send } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { contactFormSchema } from "@/lib/zod";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import WorldMap from "./ui/world-map";

export function Footer() {
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
		<div className="w-full bg-primary">
			<div className="relative z-10 bg-[#efefef] rounded-b-4xl">
				<div className="w-full min-h-[100dvh] flex flex-col p-6 md:p-12">
					{/* Header Section */}
					<div className="flex flex-col items-center text-center mb-12 md:mb-16">
						<h2 className="text-4xl md:text-6xl lg:text-7xl leading-tight font-semibold mb-4">
							Connect with us.
						</h2>
						<p className="mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">
							We're a remote-first design studio partnering with teams across
							every time zone. Let's build something amazing together.
						</p>
					</div>

					{/* Main Content */}
					<div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 flex-1">
						{/* World Map */}
						<div className="w-full lg:flex-1 order-2 lg:order-1">
							<div className="w-full border border-border rounded-2xl overflow-hidden shadow-lg bg-white/50 backdrop-blur-sm">
								<WorldMap
									dots={[
										{
											start: { lat: 39.9526, lng: -75.1652 }, // Philadelphia
											end: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
										},
										{
											start: { lat: 64.2008, lng: -149.4937 }, // Fairbanks, Alaska
											end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
										},
										{
											start: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
											end: { lat: -15.7975, lng: -47.8919 }, // Brasília, Brazil
										},
										{
											start: { lat: -15.7975, lng: -47.8919 }, // Brasília, Brazil
											end: { lat: 38.7223, lng: -9.1393 }, // Lisbon, Portugal
										},
										{
											start: { lat: 38.7223, lng: -9.1393 }, // Lisbon, Portugal
											end: { lat: 51.5074, lng: -0.1278 }, // London, UK
										},
										{
											start: { lat: 51.5074, lng: -0.1278 }, // London, UK
											end: { lat: 28.6139, lng: 77.209 }, // New Delhi, India
										},
										{
											start: { lat: 28.6139, lng: 77.209 }, // New Delhi, India
											end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok, Russia
										},
										{
											start: { lat: 28.6139, lng: 77.209 }, // New Delhi, India
											end: { lat: -1.2921, lng: 36.8219 }, // Nairobi, Kenya
										},
										{
											start: { lat: -1.2921, lng: 36.8219 }, // Nairobi, Kenya
											end: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
										},
										{
											start: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
											end: { lat: 51.5074, lng: -0.1278 }, // London, UK
										},
									]}
								/>
							</div>
						</div>

						{/* Contact Form */}
						<div className="w-full lg:w-96 order-1 lg:order-2">
							<div className="bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 shadow-xl">
								<div className="mb-6">
									<h3 className="text-xl md:text-2xl font-semibold mb-2">
										Start a conversation
									</h3>
									<p className="text-sm text-muted-foreground">
										Tell us about your project and we'll get back to you within
										24 hours.
									</p>
								</div>

								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(submit)}
										className="space-y-4"
									>
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
															className="h-12 bg-white/50 border-border/50 focus:bg-white focus:border-primary transition-all duration-200"
														/>
													</FormControl>
													<FormMessage className="text-xs" />
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
															className="h-12 bg-white/50 border-border/50 focus:bg-white focus:border-primary transition-all duration-200"
														/>
													</FormControl>
													<FormMessage className="text-xs" />
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
															className="bg-white/50 border-border/50 focus:bg-white focus:border-primary transition-all duration-200 resize-none"
														/>
													</FormControl>
													<FormMessage className="text-xs" />
												</FormItem>
											)}
										/>

										<Button type="submit" disabled={pending} className="w-full">
											{pending ? (
												<>
													<Loader className="animate-spin w-4 h-4" />
													Submitting...
												</>
											) : (
												<>
													<Send className="w-4 h-4" />
													Send Message
												</>
											)}
										</Button>
									</form>
								</Form>

								{/* Alternative Contact */}
								<div className="mt-6 pt-6 border-t border-border/30">
									<p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
										<Mail className="w-4 h-4" />
										Or email us at{" "}
										<a
											href="mailto:owen@efobi.dev"
											className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 underline underline-offset-2"
										>
											owen@efobi.dev
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Sticky Logo Footer */}
			<div className="sticky bottom-0 w-full h-[200px] flex justify-center items-center bg-primary z-0">
				<div className="relative overflow-hidden w-full h-full flex items-center justify-center">
					<Logo className="text-4xl md:text-9xl" hideMark={false} />
				</div>
			</div>
		</div>
	);
}
