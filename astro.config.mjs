// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://browsewithnook.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],
  adapter: cloudflare(),
});