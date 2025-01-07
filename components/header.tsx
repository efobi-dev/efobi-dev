"use client";

import { Logo } from "./logo";
import { Button } from "./ui/button";
import { MailPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
	const pathname = usePathname();
	const router = useRouter();
	return (
		<header className="sticky top-0 flex items-center justify-between bg-transparent mx-4 p-4 gap-4">
			<Logo className="text-2xl md:text-4xl" />
			<nav>
				<Button
					variant={"link"}
					className={pathname === "/" ? "text-primary" : ""}
					onClick={() => router.push("/")}
				>
					HOME
				</Button>
				<Button
					variant={"link"}
					className={pathname === "/portfolio" ? "text-primary" : ""}
					// onClick={() => router.push("/portfolio")}
				>
					<Link href={"https://github.com/efobi-dev"}>PROJECTS</Link>
					{/* PORTFOLIO */}
				</Button>
			</nav>
			<Button size={"icon"} variant={"ghost"} className="rounded-full">
				<Link href={"mailto:jenukohaefobi@gmail.com"}>
					<MailPlus className="size-6" />
				</Link>
			</Button>
		</header>
	);
}
