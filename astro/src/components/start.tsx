import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import LetterSwapForward from "./ui/letter-swap";

export function StartButton({ className }: { className?: string }) {
	return (
		<Button size={"lg"} className={cn("rounded-full", className)}>
			<a href="/contact" className="flex items-center gap-2">
				<LetterSwapForward label="Start a Project" reverse />
			</a>
		</Button>
	);
}
