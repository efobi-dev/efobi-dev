"use client";

import type { z } from "zod";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { designSchema } from "@/lib/constant";
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

export function DesignForm() {
	const [inspiration, setInspiration] = useState("");
	const [inspirations, setInspirations] = useState<string[]>();
	const { setStep, step } = useStepStore();
	const { setDesign, design } = formStore();
	const [optional, setOptional] = useState(false);
	const form = useForm<z.infer<typeof designSchema>>({
		defaultValues: design ?? {
			brand_identity: "",
			style_theme: "",
			color_preferences: "",
			layout_preferences: "",
			design_inspiration: inspirations,
			logo_design_needed: false,
			visual_elements: [""],
		},
	});
	const { toast } = useToast();
	const submit = (values: z.infer<typeof designSchema>) => {
		try {
			setDesign(values);
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

	const handleInspirationAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (inspiration) {
			const updatedInspiration = inspirations
				? [...inspirations, inspiration]
				: [inspiration];
			setInspirations(updatedInspiration);
			setInspiration("");
			form.setValue("design_inspiration", updatedInspiration);
		}
	};

	return (
		<BlurFade>
			<Card className="bg-inherit w-full h-full">
				<CardHeader>
					<CardTitle>
						{" "}
						<h2>Design and Branding</h2>
					</CardTitle>
					<CardDescription>
						These questions focus on visual and branding aspects.
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
								name="brand_identity"
								label="Do you have an existing brand identity (logo, color scheme, fonts)? *"
								render={({ field }) => (
									<Textarea
										{...field}
										required
										placeholder="Yes, efobi.dev is built on the color blue and it's varying shades which is the brand's color"
									/>
								)}
							/>
							<FormField
								name="style_theme"
								label="What style or theme do you envision for your project (e.g., minimalist, modern, vibrant) *"
								render={({ field }) => (
									<Textarea
										{...field}
										required
										placeholder="Minimalism taking a bit of inspiration from glassmorphism"
									/>
								)}
							/>
							<FormField
								name="color_preferences"
								label="Do you have specific colors or aesthetics you'd like to include or avoid? *"
								render={({ field }) => (
									<Textarea
										{...field}
										required
										placeholder="Main color is blue,and avoiding any other color that will steal the spotlight from blue"
									/>
								)}
							/>
							<FormField
								name="layout_preferences"
								label="Do you have preferred layout or navigation styles? *"
								render={({ field }) => (
									<Textarea
										{...field}
										required
										placeholder="Navigation is through the navigation menu at the top"
									/>
								)}
							/>
							<div className="grid gap-4">
								<div className="flex justify-between items-center">
									<h3>Optional fields</h3>
									<Button
										size={"icon"}
										variant={"ghost"}
										onClick={() => setOptional(!optional)}
									>
										<ArrowUpDown />
									</Button>
								</div>
								{optional && (
									<>
										<FormField
											name="logo_design_needed"
											className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
											label="Would you like us to design a logo or brand identity as part of this project?"
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
												Are there any websites whose design you admire?
											</Label>
											<div className="flex items-center justify-between gap-2">
												<Input
													value={inspiration}
													onChange={(e) => setInspiration(e.target.value)}
													type="url"
													placeholder="https://owenstack.github.io"
												/>
												<Button
													size={"icon"}
													onClick={(e: React.MouseEvent) => {
														try {
															new URL(inspiration);
															handleInspirationAdd(e);
														} catch {
															toast({
																title: "Invalid URL",
																description: "Please enter a valid website URL",
																variant: "destructive",
															});
														}
													}}
												>
													<Plus />
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{inspirations?.map((inspire) => (
													<Badge
														variant={"outline"}
														key={inspire}
														onClick={() => {
															setInspirations(
																inspirations.filter((item) => item !== inspire),
															);
															form.setValue("design_inspiration", inspirations);
														}}
													>
														{inspire}
													</Badge>
												))}
											</div>
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
