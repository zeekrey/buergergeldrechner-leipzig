import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { perfectionist },
    rules: { "perfectionist/sort-imports": "error" },
  },
  prettierConfig,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
