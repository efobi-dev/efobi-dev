import { useDirection } from "@radix-ui/react-direction";
import { Menu } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Logo } from "./logo";
import { StartButton } from "./start";
import { Button } from "./ui/button";
import ScrambleHover from "./ui/scramble-hover";
import {
	Sheet,
	SheetBody,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

const links: { href: string; text: string }[] = [
	{ href: "/", text: "HOME" },
	{ href: "/about", text: "ABOUT" },
	{ href: "/projects", text: "PROJECTS" },
	{ href: "/blog", text: "BLOG" },
	{ href: "/contact", text: "CONTACT" },
];

export function Header() {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const direction = useDirection();

	if (isMobile) {
		return (
			<header className="fixed top-0 pt-2 flex items-center justify-between gap-2 px-4 w-full z-50">
				<div className="bg-primary/30 backdrop-blur-md rounded-full shadow-lg border border-border p-2">
					<Logo />
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" className="rounded-full size-10">
							<Menu className="size-6" />
						</Button>
					</SheetTrigger>
					<SheetContent side="top" dir={direction}>
						<SheetHeader>
							<SheetTitle className="sr-only">Navigation</SheetTitle>
							<SheetDescription className="sr-only">
								Links to different sections of the site
							</SheetDescription>
						</SheetHeader>
						<SheetBody>
							<nav className="grid gap-4">
								{links.map((link) => (
									<div key={link.href}>
										<Button variant={"link"}>
											<a href={link.href}>
												<ScrambleHover
													scrambleSpeed={50}
													maxIterations={8}
													useOriginalCharsOnly={true}
													className="cursor-pointer"
													text={link.text}
												/>
											</a>
										</Button>
									</div>
								))}
							</nav>
						</SheetBody>
						<SheetFooter>
							<SheetClose asChild>
								<StartButton />
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</header>
		);
	}

	return (
		<header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center pt-2 px-4">
			<div className="bg-primary/30 backdrop-blur-md rounded-full shadow-lg border border-border p-2">
				<Logo />
			</div>
			<nav className="flex items-center bg-primary/30 backdrop-blur-md rounded-full shadow-lg border border-border p-1">
				<div className="flex items-center">
					{links.map((link) => (
						<div key={link.href} className="relative">
							<Button
								asChild
								variant="outline"
								className="rounded-full px-4 py-2 text-sm font-medium"
							>
								<a href={link.href}>
									<ScrambleHover
										scrambleSpeed={50}
										maxIterations={8}
										useOriginalCharsOnly={true}
										className="cursor-pointer"
										text={link.text}
									/>
								</a>
							</Button>
						</div>
					))}
				</div>
			</nav>
		</header>
	);
}
