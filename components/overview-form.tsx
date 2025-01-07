"use client";

import type { z } from "zod";
import { Form, FormControl, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { overviewSchema } from "@/lib/constant";
import { formStore, useStepStore } from "@/lib/store";
import { BlurFade } from "./ui/blur-fade";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { ArrowUpDown, CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Slider } from "./ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

export function OverviewForm() {
	const { setStep, step } = useStepStore();
	const { setOverview, overview } = formStore();
	const [showOptional, setShowOptional] = useState(false);
	const [inspiration, setInspiration] = useState("");
	const [inspirations, setInspirations] = useState<string[]>();
	const [goal, setGoal] = useState("");
	const [goals, setGoals] = useState<string[]>();
	const [reference, setReference] = useState("");
	const [references, setReferences] = useState<string[]>();
	const form = useForm<z.infer<typeof overviewSchema>>({
		defaultValues: overview ?? {
			name: "",
			description: "",
			primary_goal: "",
			problem: "",
			target: "",
			launch_date: new Date(),
			budget: "500",
			inspirations,
			secondary_goals: goals,
			references,
		},
	});

	const handleReferenceAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (reference) {
			const updatedReferences = references
				? [...references, reference]
				: [reference];
			setReferences(updatedReferences);
			setReference("");
			form.setValue("references", updatedReferences);
		}
	};
	const handleInspirationAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (inspiration) {
			const updatedInspirations = inspirations
				? [...inspirations, inspiration]
				: [inspiration];
			setInspirations(updatedInspirations);
			setInspiration("");
			form.setValue("inspirations", updatedInspirations);
		}
	};
	const handleGoalsAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (goal) {
			const updatedGoals = goals ? [...goals, goal] : [goal];
			setGoals(updatedGoals);
			setGoal("");
			form.setValue("secondary_goals", updatedGoals);
		}
	};
	const { toast } = useToast();

	const submit = (values: z.infer<typeof overviewSchema>) => {
		try {
			setOverview(values);
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

	return (
		<BlurFade>
			<Card className="bg-inherit w-full h-full">
				<CardHeader>
					<CardTitle>
						{" "}
						<h2>Project overview</h2>
					</CardTitle>
					<CardDescription>
						These questions help understand the project's purpose and scope.
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
								label="What is the name of the project? *"
								name="name"
								className="grid gap-2"
								render={({ field }) => (
									<FormControl>
										<Input {...field} placeholder="efobi.dev" required />
									</FormControl>
								)}
							/>
							<FormField
								label="Provide a brief description of the project *"
								name="description"
								className="grid gap-2"
								render={({ field }) => (
									<FormControl>
										<Textarea
											{...field}
											placeholder="A website for a web development agency and the first point of contact to potential clients"
											required
										/>
									</FormControl>
								)}
							/>
							<FormField
								label="What is the primary goal of your project? *"
								name="primary_goal"
								className="grid gap-2"
								render={({ field }) => (
									<FormControl>
										<Textarea
											{...field}
											placeholder="Attract and generate leads to potential client"
											required
										/>
									</FormControl>
								)}
							/>
							<FormField
								label="What specific problem does your project solve? *"
								name="problem"
								className="grid gap-2"
								render={({ field }) => (
									<FormControl>
										<Textarea
											{...field}
											placeholder="Uses artificial intelligence to better help understand the client's proposals"
											required
										/>
									</FormControl>
								)}
							/>
							<FormField
								label="Who is your target audience? *"
								name="target"
								className="grid gap-2"
								render={({ field }) => (
									<FormControl>
										<Input
											{...field}
											placeholder="Potential clients, founders, startups and companies with early funding rounding"
											required
										/>
									</FormControl>
								)}
							/>
							<FormField
								label="What is the desired launch date for your project? *"
								name="launch_date"
								className="grid gap-2"
								render={({ field }) => (
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) => date < new Date()}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
								)}
							/>
							<div className="flex flex-col">
								<div className="flex items-center justify-between">
									<span className="text-xl">
										{Number(form.watch("budget")) < 500
											? "🫠"
											: Number(form.watch("budget")) < 1000
												? "🫡"
												: Number(form.watch("budget")) < 3000
													? "😄"
													: "🤑"}
									</span>
									<span className="text-xl text-secondary-foreground">
										${form.watch("budget")}
									</span>
								</div>
								<FormField
									className="grid gap-2"
									label="What is your budget for this project? *"
									name="budget"
									render={({ field }) => (
										<FormControl>
											<Slider
												max={5000}
												step={100}
												onValueChange={(value) => field.onChange(value[0])}
												value={[field.value]}
											/>
										</FormControl>
									)}
								/>
							</div>
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
												Are there any competitors whose websites or apps inspire
												you? (If yes, provide examples.)
											</Label>
											<div className="flex items-center justify-between gap-2">
												<Input
													value={reference}
													onChange={(e) => setReference(e.target.value)}
													placeholder="Vercel"
												/>
												<Button size={"icon"} onClick={handleReferenceAdd}>
													<Plus />
												</Button>
											</div>
											<ul>
												{references?.map((ref) => (
													<li
														onClick={() => {
															setReferences(
																references?.filter((refer) => refer !== ref),
															);
															form.setValue("references", references);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																setReferences(
																	references?.filter((refer) => refer !== ref),
																);
															}
															form.setValue("references", references);
														}}
														key={ref}
													>
														{ref}
													</li>
												))}
											</ul>
										</div>
										<div className="grid gap-2">
											<Label>
												Are there any additional objectives or secondary goals
												for this project?
											</Label>
											<div className="flex items-center justify-between gap-2">
												<Textarea
													value={goal}
													onChange={(e) => setGoal(e.target.value)}
													placeholder="Boost visibility and outreach"
												/>
												<Button size={"icon"} onClick={handleGoalsAdd}>
													<Plus />
												</Button>
											</div>
											{goals && (
												<ul>
													{goals.map((g) => (
														<li
															onClick={() => {
																setGoals(goals.filter((goal) => goal !== g));
																form.setValue("secondary_goals", goals);
															}}
															onKeyDown={(e) => {
																if (e.key === "Enter" || e.key === " ") {
																	setGoals(goals.filter((goal) => goal !== g));
																}
																form.setValue("secondary_goals", goals);
															}}
															key={g}
														>
															{g}
														</li>
													))}
												</ul>
											)}
										</div>
										<div className="grid gap-2">
											<Label>
												Are there any competitors whose websites or apps inspire
												you? (If yes, please provide examples.)
											</Label>
											<div className="flex items-center justify-between gap-2">
												<Input
													type="url"
													value={inspiration}
													onChange={(e) => setInspiration(e.target.value)}
													placeholder="https://owenstack.github.io"
												/>
												<Button
													size={"icon"}
													onClick={(e: React.MouseEvent) => {
														try {
															new URL(inspiration);
															handleInspirationAdd(e);
														} catch (error) {
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
															form.setValue("inspirations", inspirations);
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
							<Button type="submit">Next &rarr;</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</BlurFade>
	);
}
