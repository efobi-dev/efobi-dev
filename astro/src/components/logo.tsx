import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
	return (
		<h1 className={cn("font-[logo] text-nowrap font-semibold", className)}>
			<a href={"/"}>efobi.dev</a>
		</h1>
	);
}
