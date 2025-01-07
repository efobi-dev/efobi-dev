"use client";
import { Hero } from "./hero";
import { BentoHero } from "./bento-hero";
import { Button } from "./ui/button";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Home() {
	const [index, setIndex] = useState(0);

	return (
		<main className="flex flex-col">
			{index === 0 ? <Hero /> : <BentoHero />}
			<Button
				size={"icon"}
				variant={"outline"}
				className={`rounded-full place-self-center animate-bounce z-10 ${index === 1 ? "hidden" : ""}`}
				onClick={() => setIndex((prev) => prev + 1)}
			>
				<ChevronDown />
			</Button>
		</main>
	);
}
