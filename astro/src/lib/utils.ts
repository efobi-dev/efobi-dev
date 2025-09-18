import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function calculatePosition(
	value: number | string | undefined,
	containerSize: number,
	elementSize: number,
): number {
	// Handle percentage strings (e.g. "50%")
	if (typeof value === "string" && value.endsWith("%")) {
		const percentage = parseFloat(value) / 100;
		return containerSize * percentage;
	}

	// Handle direct pixel values
	if (typeof value === "number") {
		return value;
	}

	// If no value provided, center the element
	return (containerSize - elementSize) / 2;
}
