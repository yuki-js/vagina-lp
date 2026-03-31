import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import { BRAND } from "../config/brand";

export default {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,

  favicon: "/assets/favicon.ico",

  extends: [vikeReact],
} satisfies Config;
