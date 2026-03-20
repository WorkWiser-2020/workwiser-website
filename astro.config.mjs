import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://rococo-faun-f7353a.netlify.app",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
