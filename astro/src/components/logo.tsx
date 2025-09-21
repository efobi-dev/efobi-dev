import { cn } from "@/lib/utils";

export function Logo({
	className,
	hideMark = true,
}: {
	className?: string;
	hideMark?: boolean;
}) {
	return (
		<span className={cn("font-[logo] text-nowrap font-semibold", className)}>
			<a href={"/"}>efobi.dev {hideMark ? null : <sup>&reg;</sup>}</a>
		</span>
	);
}
