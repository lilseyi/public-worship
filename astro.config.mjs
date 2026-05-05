import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const useCustomDomain = process.env.PW_DEPLOY_TARGET === "custom-domain";
const basePath = useCustomDomain ? "" : "/public-worship";

export default defineConfig({
  site: useCustomDomain
    ? "https://publicworship.life"
    : "https://lilseyi.github.io",
  base: useCustomDomain ? "/" : "/public-worship",
  trailingSlash: "ignore",
  redirects: {
    "/about": `${basePath}/#about`,
    "/impact": `${basePath}/#impact`,
    "/links": `${basePath}/#links`,
    "/faq": `${basePath}/#faq`,
  },
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
