import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Link from "next/link";

const logo = localFont({
	src: "../assets/fonts/logo.ttf",
});

export function Logo({ className }: { className?: string }) {
	return (
		<h1 className={cn(logo.className, "text-nowrap font-semibold", className)}>
			<Link href={"/"}>efobi.dev</Link>
		</h1>
	);
}
