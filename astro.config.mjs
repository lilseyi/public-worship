import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const useCustomDomain = process.env.PW_DEPLOY_TARGET === "custom-domain";

export default defineConfig({
  site: useCustomDomain
    ? "https://publicworship.life"
    : "https://lilseyi.github.io",
  base: useCustomDomain ? "/" : "/public-worship",
  trailingSlash: "ignore",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
