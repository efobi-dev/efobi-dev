import { IconCloud } from "./ui/icon-cloud";
import { BlurFade } from "./ui/blur-fade";
import {
	ArrowsUpFromLine,
	Brain,
	Code,
	MailPlus,
	Palette,
	ShoppingCart,
	TabletSmartphone,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const slugs = [
	"typescript",
	"javascript",
	"react",
	"nextdotjs",
	"git",
	"github",
	"visualstudiocode",
	"amazonaws",
	"android",
	"apple",
	"express",
	"figma",
	"php",
	"postgresql",
	"nodedotjs",
	"medusa",
	"mdx",
	"astro",
	"mysql",
	"cloudflare",
	"expo",
	"tailwindcss",
	"gnubash",
	"googlecloud",
	"python",
];

const content = [
	{
		id: 1,
		title: "Web Design",
		description: "Crafting modern websites tailored to your brand.",
		icon: Brain,
		className: "col-span-1",
	},
	{
		id: 2,
		title: "App Development",
		description:
			"Developing high-performance mobile and desktop applications for various platforms.",
		icon: TabletSmartphone,
		className: "col-span-2",
	},
	{
		id: 3,
		title: "Custom Software Development",
		description:
			"Creating tailored software solutions to meet your specific business needs.",
		icon: Code,
		className: "col-span-2",
	},
	{
		id: 4,
		title: "Branding",
		description: "Creating a unique identity for your business.",
		icon: Palette,
		className: "col-span-1",
	},
	{
		id: 5,
		title: "E-commerce",
		description: "Building custom e-commerce platforms for your business.",
		icon: ShoppingCart,
		className: "col-span-1",
	},
	{
		id: 6,
		title: "SEO Optimization",
		description:
			"Improving your site's visibility and rankings on search engines.",
		icon: ArrowsUpFromLine,
		className: "col-span-2",
	},
];

export function BentoHero() {
	const router = useRouter();
	return (
		<BlurFade className="grid lg:grid-cols-2 items-center min-h-[calc(100dvh/2)] md:min-h-[calc(100dvh-120px)]">
			<div className="flex flex-col mx-4">
				<IconCloud iconSlugs={slugs} />
				<Button
					variant={"outline"}
					size={"icon"}
					className="rounded-full place-self-end animate-pulse"
					onClick={() => router.push("/quote")}
				>
					<Link href={"mailto:owen@efobi.dev"}>
						<MailPlus />
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-3 h-[calc(100dvh-100px)] gap-4 p-4">
				{content.map((c) => (
					<Card
						key={c.id}
						className={`${c.className} group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-inherit`}
					>
						<CardContent className="relative p-6">
							<div className="flex flex-col transform-gpu z-10 gap-2.5 transition-all duration-500 ease-out group-hover:-translate-y-10">
								<c.icon className="size-12 origin-left transform-gpu transition-all duration-500 ease-out group-hover:scale-90 group-hover:text-accent" />
								<h3 className="text-xl font-semibold text-secondary">
									{c.title}
								</h3>
								<p className="max-w-lg text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:text-foreground">
									{c.description}
								</p>
							</div>
						</CardContent>
					</Card>
				))}{" "}
			</div>
		</BlurFade>
	);
}
