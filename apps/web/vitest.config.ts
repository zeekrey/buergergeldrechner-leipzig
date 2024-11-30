import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["node_modules/**", "tests/**"],
    includeSource: ["src/**/*.{js,ts,tsx,jsx}"],
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
