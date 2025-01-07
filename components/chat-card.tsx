"use client";

import { TypingAnimation } from "./ui/typing-animation";
import { Card, CardContent } from "./ui/card";
import { BlurFade } from "./ui/blur-fade";
import { AIButton } from "./ai-button";
import { useStepStore } from "@/lib/store";
import { OverviewForm } from "./overview-form";
import { DesignForm } from "./design-form";
import { FeaturesForm } from "./features-form";
import { ContentForm } from "./content-form";
import { TestingForm } from "./testing-form";
import { CommunicationForm } from "./comm-form";

export function ChatCard() {
	const { step, setStep } = useStepStore();
	return (
		<div className="grid md:grid-cols-2 md:min-h-[calc(100dvh-120px)] gap-4 p-4 place-content-center">
			<AIButton
				disabled={step === 2 || step === 4 || step === 6}
				onClick={() => setStep(step + 1)}
			/>
			<div key={step}>
				{step === 0 ? (
					<BlurFade>
						<Card className="bg-inherit w-full h-full">
							<CardContent className="p-4">
								<TypingAnimation
									className="font-semibold"
									text="Hi there! I'm efobiAI, your friendly assistant here at efobi.dev."
								/>
								<TypingAnimation text="I'm here to make this process smooth and enjoyable. Together, we'll create a clear plan for your project. Each step will help us understand your goals, needs, and vision better so we can deliver something truly exceptional. Click on me to continue." />
							</CardContent>
						</Card>
					</BlurFade>
				) : step === 1 ? (
					<TypingCard text="First things first, let's talk about your project's big picture! This step helps us understand what you're aiming for and who you're creating this for. Don't worry about being overly specific here—think of it as setting the stage for your masterpiece. Click me to continue" />
				) : step === 2 ? (
					<OverviewForm />
				) : step === 3 ? (
					<TypingCard text="Now, let’s bring your project’s personality to life! Design and branding are how your project speaks to the world—its colors, style, and overall vibe. In this step, I’ll ask questions to capture your vision, but feel free to share your ideas, even if they’re just sketches in your mind. Let’s design something unforgettable! Click me to continue" />
				) : step === 4 ? (
					<DesignForm />
				) : step === 5 ? (
					<TypingCard text="Every great project has its key features—the things that make it work for your audience. This step is all about what your project does. We’ll discuss the tools, functionality, and interactions you’d like to include. Think of it as crafting the backbone of your vision. Let’s make it as useful as possible!" />
				) : step === 6 ? (
					<FeaturesForm />
				) : step === 7 ? (
					<TypingCard text="Content is what tells your story—it’s the words, images, and elements that connect with your audience. This step ensures we know exactly what content you have or need and how it fits into the bigger picture. Let’s work on making your project’s story compelling!" />
				) : step === 8 ? (
					<ContentForm />
				) : step === 9 ? (
					<TypingCard text="Here’s where we make sure your project works perfectly and is ready to shine! We’ll talk about testing for quality, where and how to host your project, and what happens after launch. This step is key to ensuring everything runs smoothly. Ready? Let’s prep for success!" />
				) : step === 10 ? (
					<TestingForm />
				) : step === 11 ? (
					<TypingCard text="Finally, let’s talk about how we’ll collaborate. Clear communication is essential for a seamless process, and this step ensures we’re on the same page. Whether it’s progress updates, feedback, or scheduling, I’ll help make sure we work together effortlessly. Let’s keep things smooth and stress-free!" />
				) : step === 12 ? (
					<CommunicationForm />
				) : (
					<div>Something</div>
				)}
			</div>
		</div>
	);
}

const TypingCard = ({ text }: { text: string }) => {
	return (
		<BlurFade>
			<Card className="bg-inherit w-full h-full">
				<CardContent className="p-4">
					<TypingAnimation text={text} />
				</CardContent>
			</Card>
		</BlurFade>
	);
};
