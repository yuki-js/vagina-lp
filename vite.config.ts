import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  plugins: [vike(), react()],
  ssr: {
    // Only bundle all dependencies when building (for Workers)
    // In dev, let Vite handle external dependencies to avoid CJS/ESM issues
    noExternal: command === "build" ? true : undefined,
  },
}));
