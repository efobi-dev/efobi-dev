// @ts-check

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://efobi.dev",
    integrations: [react(), sanity({
      projectId: "k745sfhh",
      dataset: "production",
      useCdn: import.meta.env.MODE === "production", // for static builds
    }), sitemap()],

    vite: {
        plugins: [tailwindcss()],
    },
    output: "server",
    adapter: cloudflare(),
});