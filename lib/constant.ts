import { z } from "zod";

export const overviewSchema = z.object({
	name: z.string(),
	description: z.string(),
	primary_goal: z.string(),
	problem: z.string(),
	target: z.string(),
	launch_date: z.date(),
	budget: z.string(),
	references: z.array(z.string()).optional(),
	inspirations: z.array(z.string()).optional(),
	secondary_goals: z.array(z.string()).optional(),
});

export const designSchema = z.object({
	brand_identity: z.string(),
	style_theme: z.string(),
	color_preferences: z.string(),
	layout_preferences: z.string(),
	design_inspiration: z.array(z.string()).optional(),
	logo_design_needed: z.boolean().optional(),
	visual_elements: z.array(z.string()).optional(),
});

export const featuresSchema = z.object({
	core_features: z.array(z.string()),
	responsive_design: z.boolean(),
	third_party_integrations: z.array(z.string()),
	content_management: z.string(),
	preferred_technologies: z.array(z.string()).optional(),
	advanced_features: z.array(z.string()).optional(),
});

export const contentSchema = z.object({
	content_provider: z.string(),
	seo_optimization: z.boolean(),
	sitemap: z.boolean(),
	content_tone: z.string().optional(),
	multilingual: z
		.object({
			required: z.boolean(),
			languages: z.array(z.string()),
		})
		.optional(),
	imagery_assistance: z.boolean().optional(),
});

export const testingSchema = z.object({
	testing_requirements: z.array(z.string()),
	hosting_platform: z.string(),
	ongoing_support: z.boolean(),
	documentation_needed: z.boolean().optional(),
	training_required: z.boolean().optional(),
});

export const communicationSchema = z.object({
	main_contact: z.string(),
	communication_method: z.string(),
	update_frequency: z.string(),
	feedback_preference: z.string().optional(),
	collaboration_tools: z.array(z.string()).optional(),
	meeting_schedule: z.string().optional(),
});
