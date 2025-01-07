import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
	overviewSchema,
	designSchema,
	featuresSchema,
	contentSchema,
	testingSchema,
	communicationSchema,
} from "./constant";
import type { z } from "zod";

type FormState = {
	overview: z.infer<typeof overviewSchema> | null;
	design: z.infer<typeof designSchema> | null;
	features: z.infer<typeof featuresSchema> | null;
	content: z.infer<typeof contentSchema> | null;
	testing: z.infer<typeof testingSchema> | null;
	communication: z.infer<typeof communicationSchema> | null;
	setOverview: (data: z.infer<typeof overviewSchema>) => void;
	setDesign: (data: z.infer<typeof designSchema>) => void;
	setFeatures: (data: z.infer<typeof featuresSchema>) => void;
	setContent: (data: z.infer<typeof contentSchema>) => void;
	setTesting: (data: z.infer<typeof testingSchema>) => void;
	setCommunication: (data: z.infer<typeof communicationSchema>) => void;
	clearStore: () => void;
};
type stepState = {
	step: number;
	setStep: (step: number) => void;
};

export const useStepStore = create<stepState>()(
	persist(
		(set) => ({
			step: 0,
			setStep: (step) => set({ step }),
		}),
		{
			name: "step-storage",
		},
	),
);
export const formStore = create<FormState>()(
	persist(
		(set) => ({
			overview: null,
			design: null,
			features: null,
			content: null,
			testing: null,
			communication: null,
			setOverview: (data) => set({ overview: data }),
			setDesign: (data) => set({ design: data }),
			setFeatures: (data) => set({ features: data }),
			setContent: (data) => set({ content: data }),
			setTesting: (data) => set({ testing: data }),
			setCommunication: (data) => set({ communication: data }),
			clearStore: () =>
				set({
					overview: null,
					design: null,
					features: null,
					content: null,
					testing: null,
					communication: null,
				}),
		}),
		{
			name: "form-storage",
		},
	),
);
