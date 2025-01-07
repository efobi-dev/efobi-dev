"use client";

import type { z } from "zod";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { testingSchema } from "@/lib/constant";
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

export function TestingForm() {
	const { step, setStep } = useStepStore();
	const { testing, setTesting } = formStore();
	const [test, setTest] = useState("");
	const [tests, setTests] = useState<string[]>();
	const { toast } = useToast();
	const [showOptional, setShowOptional] = useState(false);
	const form = useForm<z.infer<typeof testingSchema>>({
		defaultValues: testing ?? {
			testing_requirements: tests,
			hosting_platform: "",
			ongoing_support: true,
			documentation_needed: true,
			training_required: true,
		},
	});
	const submit = (values: z.infer<typeof testingSchema>) => {
		try {
			setTesting(values);
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
	const handleTestAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (test) {
			const updatedTests = tests ? [...tests, test] : [test];
			setTests(updatedTests);
			setTest("");
			form.setValue("testing_requirements", updatedTests);
		}
	};
	return (
		<BlurFade>
			<Card className="bg-inherit w-full h-full">
				<CardHeader>
					<CardTitle>
						<h2>Testing and Deployment</h2>
					</CardTitle>
					<CardDescription>Address post development concerns</CardDescription>
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
									Do you require specific testing (e.g., cross-browser
									compatibility, load testing)? *
								</Label>
								<div className="flex items-center justify-between gap-2">
									<Input
										value={test}
										onChange={(e) => setTest(e.target.value)}
									/>
									<Button size={"icon"} onClick={handleTestAdd}>
										<Plus />
									</Button>
								</div>
								<div className="flex flex-wrap gap-2">
									{tests?.map((stuff) => (
										<Badge
											key={stuff}
											variant={"outline"}
											onClick={() => {
												setTests(tests?.filter((item) => item !== stuff));
												form.setValue("testing_requirements", tests);
											}}
										>
											{stuff}
										</Badge>
									))}
								</div>
							</div>
							<FormField
								name="hosting_platform"
								className="grid gap-2"
								label="What hosting or deployment platform would you like to use?"
								render={({ field }) => (
									<Input {...field} placeholder="Vercel Enterprise Plan" />
								)}
							/>
							<FormField
								name="ongoing_support"
								className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
								label="Do you need ongoing support and maintenance after deployment?"
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
										<FormField
											name="documentation_needed"
											className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
											label="Would you like detailed documentation for the project?"
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
											name="training_required"
											className="flex flex-row-reverse items-center lg:items-baseline gap-4 justify-center"
											label="Should we include training sessions on how to use or manage the project?"
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
