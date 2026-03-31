/**
 * Brand configuration
 *
 * Centralized brand identity management.
 * Update these constants to rebrand the entire application.
 */

export const BRAND = {
  /**
   * Primary brand name
   */
  name: "VAGINA",

  /**
   * Brand tagline / subtitle
   */
  tagline: "Voice AGI Notepad Agent",

  /**
   * Full brand description
   */
  description:
    "Think with your voice, let AGI write. A next-generation assistant that shapes your thoughts through real-time voice dialogue and AGI notepad.",

  /**
   * External links
   */
  links: {
    github: "https://github.com/yuki-js/vagina",
    app: "https://vagina.app",
    api: "https://server.vagina.app",
    docs: "/docs",
    product: "/#product",
    pricing: "/#pricing",
    terms: "/terms",
    privacy: "/privacy",
    company: "https://aoki.app",
  },

  /**
   * Copyright holder name
   */
  copyright: "AokiApp Inc.",

  /**
   * Legal / company name (if different from brand name)
   */
  legalName: "AokiApp Inc.",
} as const;
