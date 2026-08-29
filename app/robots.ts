import type { MetadataRoute } from "next"

const baseUrl = "https://condino-profile.vercel.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard search crawlers — full access.
        userAgent: "*",
        allow: "/",
      },
      {
        // AI assistants and answer engines — explicitly allowed so this
        // portfolio can be cited/found through AI search and chat products.
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "GoogleOther",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
          "Amazonbot",
          "meta-externalagent",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
