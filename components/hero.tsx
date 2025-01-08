"use client";

import { useEffect, useState } from "react";
import { BlurIn } from "./ui/blur-in";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const actions = [
	"Design",
	"Develop",
	"Build",
	"Prototype",
	"Innovate",
	"Create",
];

export function Hero() {
	const [index, setIndex] = useState(0);
	const router = useRouter();

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((prev) => (prev === actions.length - 1 ? 0 : prev + 1));
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="grid grid-rows-2 min-h-[calc(100dvh/2)] md:min-h-[calc(100dvh-120px)] gap-4 mx-4">
			<h2 className="flex gap-2 justify-start items-center font-bold mx-8 p-4">
				<span className="text-2xl md:text-4xl translate-y-[-50%]">We</span>
				<span className="inline-block max-w-[150px] md:max-w-[220px]">
					<BlurIn key={index} word={actions[index]} />
				</span>
			</h2>{" "}
			<div className="flex justify-between mx-4 pt-4 mt-4">
				<Button
					variant={"link"}
					size={"lg"}
					// onClick={() => router.push("/quote")}
				>
					<Link href="mailto:owen@efobi.dev">Get a quote &rarr;</Link>
				</Button>
				<h2 className="text-xl md:text-2xl lg:text-3xl">
					Design Driven Development for your products.
				</h2>
			</div>
		</div>
	);
}
