"use client";

import type { z } from "zod";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { featuresSchema } from "@/lib/constant";
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
export function FeaturesForm() {
	const { step, setStep } = useStepStore();
	const { setFeatures, features } = formStore();
	const { toast } = useToast();
	const [showOptional, setShowOptional] = useState(false);
	const [core, setCore] = useState("");
	const [cores, setCores] = useState<string[]>();
	const [integration, setIntegration] = useState("");
	const [integrations, setIntegrations] = useState<string[]>();
	const [technology, setTechnology] = useState("");
	const [technologies, setTechnologies] = useState<string[]>();
	const [advance, setAdvance] = useState("");
	const [advances, setAdvances] = useState<string[]>();
	const form = useForm<z.infer<typeof featuresSchema>>({
		defaultValues: features ?? {
			core_features: cores,
			responsive_design: true,
			third_party_integrations: integrations,
			content_management: "none",
			preferred_technologies: technologies,
			advanced_features: advances,
		},
	});
	const submit = (values: z.infer<typeof featuresSchema>) => {
		try {
			setFeatures(values);
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

	const handleCoreAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (core) {
			const updatedCores = cores ? [...cores, core] : [core];
			setCores(updatedCores);
			setCore("");
			form.setValue("core_features", updatedCores);
		}
	};

	const handleIntegrationsAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (integration) {
			const updatedIntegrations = integrations
				? [...integrations, integration]
				: [integration];
			setIntegrations(updatedIntegrations);
			setIntegration("");
			form.setValue("third_party_integrations", updatedIntegrations);
		}
	};

	const handleTechnologiesAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (technology) {
			const updatedTechnologies = technologies
				? [...technologies, technology]
				: [technology];
			setTechnologies(updatedTechnologies);
			setTechnology("");
			form.setValue("preferred_technologies", updatedTechnologies);
		}
	};

	const handleAdvanceAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (advance) {
			const updatedAdvances = advances ? [...advances, advance] : [advance];
			setAdvances(updatedAdvances);
			setAdvance("");
			form.setValue("advanced_features", updatedAdvances);
		}
	};
	return (
		<BlurFade>
			<Card className="bg-inherit w-full h-full">
				<CardHeader>
					<CardTitle>
						<h2>Features and functionality</h2>
					</CardTitle>
					<CardDescription>To define technical needs</CardDescription>
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
							<div className="grid gap-2">
								<Label>
									What core features must your project include (e.g.,
									e-commerce, user registration, admin dashboard)? *
								</Label>
								<div className="flex items-center justify-between gap-2">
									<Input
										value={core}
										onChange={(e) => setCore(e.target.value)}
										placeholder="Admin dashboard"
									/>
									<Button size={"icon"} onClick={handleCoreAdd}>
										<Plus />
									</Button>
								</div>
								<div className="flex flex-wrap gap-2">
									{cores?.map((core) => (
										<Badge
											variant={"outline"}
											key={core}
											onClick={() => {
												setCores(cores?.filter((item) => item !== core));
												form.setValue("core_features", cores);
											}}
										>
											{core}
										</Badge>
									))}
								</div>
							</div>
							<FormField
								name="responsive_design"
								className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
								label="Do you require responsiveness for mobile, tablet, and desktop devices? *"
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
							<div className="grid gap-2">
								<Label>
									What third-party integrations are necessary (e.g., payment
									gateways, APIs)?
								</Label>
								<div className="flex items-center justify-between gap-2">
									<Input
										value={integration}
										onChange={(e) => setIntegration(e.target.value)}
										placeholder="OpenAI for AI features, Umami for Analytics, CloudFlare for rate-limiting and bot detection"
									/>
									<Button size={"icon"} onClick={handleIntegrationsAdd}>
										<Plus />
									</Button>
								</div>
								<div className="flex flex-wrap gap-2">
									{integrations?.map((integer) => (
										<Badge
											variant={"outline"}
											key={integer}
											onClick={() => {
												setIntegrations(
													integrations?.filter((item) => item !== integer),
												);
												form.setValue("third_party_integrations", integrations);
											}}
										>
											{integer}
										</Badge>
									))}
								</div>
							</div>
							<FormField
								name="content_management"
								className="grid gap-2"
								label="Do you need content management functionality? If yes, what kind?"
								render={({ field }) => (
									<Input
										{...field}
										placeholder="Payload CMS for managing the projects and blogs displayed"
									/>
								)}
							/>
							<div className="grid gap-4">
								<div className="flex justify-between items-center">
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
										<div className="grid gap-2">
											<Label>
												Are there any specific technologies or frameworks you'd
												prefer us to use?
											</Label>
											<div className="flex items-center justify-between gap-2">
												<Input
													value={technology}
													onChange={(e) => setTechnology(e.target.value)}
													placeholder="NextJS, React 19 and Server Actions"
												/>
												<Button size={"icon"} onClick={handleTechnologiesAdd}>
													<Plus />
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{technologies?.map((tech) => (
													<Badge
														variant={"outline"}
														key={tech}
														onClick={() => {
															setTechnologies(
																technologies.filter((item) => item !== tech),
															);
															form.setValue(
																"preferred_technologies",
																technologies,
															);
														}}
													>
														{tech}
													</Badge>
												))}
											</div>
										</div>
										<div className="grid gap-2">
											<Label>
												Do you need advanced features like real-time chat or
												analytics dashboards?
											</Label>
											<div className="flex items-center justify-between gap-2">
												<Input
													placeholder="AI features, summarization and personalized feedback"
													value={advance}
													onChange={(e) => setAdvance(e.target.value)}
												/>
												<Button onClick={handleAdvanceAdd}>
													<Plus />
												</Button>
											</div>
											{advances?.map((ad) => (
												<Badge
													variant={"outline"}
													key={ad}
													onClick={() => {
														setAdvances(advances.filter((item) => item !== ad));
														form.setValue("advanced_features", advances);
													}}
												>
													{ad}
												</Badge>
											))}
										</div>
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
