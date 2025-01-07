"use client";

import type { z } from "zod";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { contentSchema } from "@/lib/constant";
import { formStore, useStepStore } from "@/lib/store";
import { BlurFade } from "./ui/blur-fade";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "./ui/card";
import { Plus, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

export function ContentForm() {
	const { step, setStep } = useStepStore();
	const { content, setContent } = formStore();
	const { toast } = useToast();
	const [showOptional, setShowOptional] = useState(false);
	const [lang, setLang] = useState(false);
	const [language, setLanguage] = useState("");
	const [languages, setLanguages] = useState<string[]>();
	const form = useForm<z.infer<typeof contentSchema>>({
		defaultValues: content ?? {
			content_provider: "I, the client, will provide the content",
			seo_optimization: false,
			sitemap: false,
			content_tone: "",
			multilingual: {
				required: lang,
				languages,
			},
			imagery_assistance: false,
		},
	});
	const submit = (values: z.infer<typeof contentSchema>) => {
		try {
			setContent(values);
			setStep(step + 1);
		} catch (error) {
			console.error(error);
			toast({
				title: "Something went wrong",
				description:
					error instanceof Error ? error.message : "Internal server error",
				variant: "destructive",
			});
		}
	};

	const handleLanguagesAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (language) {
			const updatedLanguages = languages
				? [...languages, language]
				: [language];
			setLanguages(updatedLanguages);
			setLanguage("");
			form.setValue("multilingual.languages", updatedLanguages);
		}
	};
	return (
		<BlurFade>
			<Card className="bg-inherit w-full h-full">
				<CardHeader>
					<CardTitle>
						<h2>Content and Deliverables</h2>
					</CardTitle>
					<CardDescription>
						For understanding content and resource needs
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(submit, (errors) => {
								const errorMessages = Object.values(errors);
								console.error(errorMessages[0]);
								if (errorMessages.length > 0) {
									toast({
										title: "Invalid input",
										description: errorMessages[0].message,
										variant: "destructive",
									});
								}
							})}
							className="grid gap-4"
						>
							<FormField
								className="grid gap-2"
								name="content_provider"
								label="Will you provide all the content (text, images, videos), or should we create it? *"
								render={({ field }) => <Input {...field} />}
							/>
							<FormField
								name="seo_optimization"
								className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
								label="Do you require SEO optimization for your content? *"
								render={({ field }) => (
									<div className="flex items-center gap-2">
										<span>No</span>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
										<span>Yes</span>
									</div>
								)}
							/>
							<FormField
								name="sitemap"
								className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
								label="Do you have a sitemap or structure in mind for your project? *"
								render={({ field }) => (
									<div className="flex items-center gap-2">
										<span>No</span>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
										<span>Yes</span>
									</div>
								)}
							/>

							<div className="grid gap-4">
								<div className="flex justify-between items-center gap-2">
									<h3>Optional fields</h3>
									<Button
										size={"icon"}
										variant={"ghost"}
										onClick={() => setShowOptional(!showOptional)}
									>
										<ArrowUpDown />
									</Button>
								</div>
								{showOptional && (
									<>
										<FormField
											name="content_tone"
											className="grid gap-2"
											label="Do you have a preferred tone or style for the content? If yes, describe it"
											render={({ field }) => (
												<Textarea
													placeholder="Professional, while polite and encouraging"
													{...field}
												/>
											)}
										/>
										<div className="grid gap-2">
											<FormField
												name="multilingual.required"
												className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
												label="Should we include multilingual support? If yes, which languages?"
												render={({ field }) => (
													<div className="flex items-center gap-2">
														<span>No</span>
														<Switch
															checked={field.value}
															onCheckedChange={(value) => {
																field.onChange(value);
																setLang(value);
															}}
														/>
														<span>Yes</span>
													</div>
												)}
											/>
											{lang && (
												<div className="grid gap-2">
													<Label>
														Languages you will need included in multilingual
														support
													</Label>
													<div className="flex items-center justify-between gap-2">
														<Input
															value={language}
															placeholder="French, German"
															onChange={(e) => setLanguage(e.target.value)}
														/>
														<Button size={"icon"} onClick={handleLanguagesAdd}>
															<Plus />
														</Button>
													</div>
													{languages?.map((lang) => (
														<Badge
															key={lang}
															variant={"outline"}
															onClick={() => {
																setLanguages(
																	languages.filter((item) => item !== lang),
																);
																form.setValue(
																	"multilingual.languages",
																	languages,
																);
															}}
														>
															{lang}
														</Badge>
													))}
												</div>
											)}
										</div>
										<FormField
											name="imagery_assistance"
											className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
											label="Do you need assistance with stock imagery or custom illustrations?"
											render={({ field }) => (
												<div className="flex items-center gap-2">
													<span>No</span>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
													<span>Yes</span>
												</div>
											)}
										/>
									</>
								)}
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</BlurFade>
	);
}
