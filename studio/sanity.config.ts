import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
	name: "default",
	title: "efobi-dev",

	projectId: "k745sfhh",
	dataset: "production",

	plugins: [structureTool(), visionTool(), unsplashImageAsset()],

	schema: {
		types: schemaTypes,
	},
});
