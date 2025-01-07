"use client";

import type { z } from "zod";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { communicationSchema } from "@/lib/constant";
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
import { Badge } from "./ui/badge";

export function CommunicationForm() {
	const { step, setStep } = useStepStore();
	const { setCommunication, communication } = formStore();
	const { toast } = useToast();
	const [showOptional, setShowOptional] = useState(false);
	const [tool, setTool] = useState("");
	const [tools, setTools] = useState<string[]>();
	const form = useForm<z.infer<typeof communicationSchema>>({
		defaultValues: communication ?? {
			main_contact: "",
			communication_method: "",
			update_frequency: "",
			feedback_preference: "",
			collaboration_tools: [""],
			meeting_schedule: "",
		},
	});
	const submit = (values: z.infer<typeof communicationSchema>) => {
		try {
			setCommunication(values);
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
	const handleToolsAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (tool) {
			const updatedTools = tools ? [...tools, tool] : [tool];
			setTools(updatedTools);
			setTool("");
			form.setValue("collaboration_tools", updatedTools);
		}
	};
	return (
		<BlurFade>
			<Card className="bg-inherit w-full h-full">
				<CardHeader>
					<CardTitle>
						<h2>Communication and Feedback</h2>
					</CardTitle>
					<CardDescription>For project collaboration</CardDescription>
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
								name="main_contact"
								className="grid gap-2"
								label="Who will be the main point of contact for this project?"
								render={({ field }) => <Input {...field} required />}
							/>
							<FormField
								name="communication_method"
								className="grid gap-2"
								label="What is your preferred method of communication (email, video calls, chat)?"
								render={({ field }) => <Input {...field} required />}
							/>
							<FormField
								name="update_frequency"
								className="grid gap-2"
								label="How frequently would you like progress updates?"
								render={({ field }) => <Input {...field} required />}
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
											name="feedback_preference"
											className="grid gap-2"
											label="Do you prefer milestone-based feedback or continuous updates?"
											render={({ field }) => <Input {...field} />}
										/>
										<div className="grid gap-2">
											<Label>
												Are there specific collaboration tools you’d like us to
												use (e.g., Trello, Slack)?
											</Label>
											<div className="flex items-center justify-between gap-2">
												<Input
													value={tool}
													onChange={(e) => setTool(e.target.value)}
												/>
												<Button size={"icon"} onClick={handleToolsAdd}>
													<Plus />
												</Button>
											</div>
											<div className="flex flex-wrap gap-2">
												{tools?.map((stuff) => (
													<Badge
														key={stuff}
														variant={"outline"}
														onClick={() => {
															setTools(tools.filter((item) => item !== stuff));
															form.setValue("collaboration_tools", tools);
														}}
													>
														{stuff}
													</Badge>
												))}
											</div>
										</div>
										<FormField
											className="grid gap-2"
											name="meeting_schedule"
											label="Is there a preferred time or schedule for meetings?"
											render={({ field }) => <Input {...field} />}
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
