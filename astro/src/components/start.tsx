import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function StartButton({ className }: { className?: string }) {
	return (
		<Button size={"lg"} className={cn("rounded-full", className)}>
			<a href="/contact" className="flex items-center gap-2">
				<Send className="animate-pulse" />
				Start a Project
			</a>
		</Button>
	);
}
