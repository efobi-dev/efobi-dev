import { actions } from "astro:actions";
import { Loader, Send } from "lucide-react";
import {
	type ChangeEvent,
	type FormEvent,
	useState,
	useTransition,
} from "react";
import { toast } from "sonner";
import { contactFormSchema } from "@/lib/zod";
import { Button } from "../ui/button";

type FormData = {
	name: string;
	email: string;
	message: string;
};

export function ContactForm() {
	const [pending, startTransition] = useTransition();
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
		{},
	);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (errors[name as keyof FormData]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValid = contactFormSchema.safeParse(formData);
		if (!isValid.success) {
			const fieldErrors = isValid.error.flatten().fieldErrors;
			const formattedErrors = Object.fromEntries(
				Object.entries(fieldErrors).map(([key, value]) => [
					key,
					value?.[0] || "",
				]),
			);
			setErrors(formattedErrors);
			return;
		}
		startTransition(async () => {
			try {
				const res = await actions.contact(formData);
				if (res.error) {
					toast.error(res.error.message);
					return;
				}
				const { error, message } = res.data;
				if (error) {
					toast.error(error);
					return;
				}
				toast.success(message);
				setFormData({
					name: "",
					email: "",
					message: "",
				});
			} catch (error) {
				toast.error(
					error instanceof Error ? error.message : "Internal server error",
				);
			}
		});
	};

	return (
		<div className="max-w-2xl mx-auto p-8 bg-transparent backdrop-blur rounded-2xl">
			<h1 className="text-4xl font-light text-gray-800 mb-2">
				Tell us about your project
			</h1>
			<form className="space-y-8" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name" className="block text-lg text-gray-600 mb-3">
						What's your name?
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						placeholder="Marie Curie"
						className="w-full text-xl text-white bg-transparent border-none border-b-2 border-gray-200 focus:border-gray-400 focus:outline-none pb-2 transition-colors duration-200"
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mt-1">{errors.name}</p>
					)}
				</div>

				<div>
					<label htmlFor="email" className="block text-lg text-gray-600 mb-3">
						What's your email?
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						placeholder="marie@efobi.dev"
						className="w-full text-xl text-white bg-transparent border-none border-b-2 border-gray-200 focus:border-gray-400 focus:outline-none pb-2 transition-colors duration-200"
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email}</p>
					)}
				</div>

				<div>
					<label htmlFor="message" className="block text-lg text-gray-600 mb-3">
						Your message
					</label>
					<textarea
						name="message"
						value={formData.message}
						onChange={handleInputChange}
						placeholder="I have this great idea for an app..."
						className="w-full text-xl text-white bg-transparent border-none border-b-2 border-gray-200 focus:border-gray-400 focus:outline-none pb-2 transition-colors duration-200"
					/>
					{errors.message && (
						<p className="text-red-500 text-sm mt-1">{errors.message}</p>
					)}
				</div>

				<div className="pt-8">
					<Button
						type="submit"
						className="w-full rounded-full"
						disabled={pending}
					>
						{pending ? (
							<>
								<Loader className="animate-spin w-4 h-4 mr-2" />
								Sending...
							</>
						) : (
							<>
								<Send className="w-4 h-4 mr-2" />
								Send Message
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
