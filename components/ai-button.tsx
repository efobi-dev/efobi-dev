import { BrainCircuit } from "lucide-react";
import type { ButtonProps } from "./ui/button";

export function AIButton({
	onClick,
	disabled,
}: { onClick?: () => void; disabled?: boolean }) {
	return (
		<button
			disabled={disabled}
			className="ai text-2xl tracking-wide font-semibold bg-secondary/70 animate-pulse top-52"
			type="button"
			onClick={onClick}
		>
			<BrainCircuit className="size-10" />
		</button>
	);
}
