import perfectionist from "eslint-plugin-perfectionist";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";
// import tseslint from 'typescript-eslint';
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });

// export default [{
//     ignores: ["**/node_modules", "src/components/ui"],
// }, ...compat.extends("next/core-web-vitals", "plugin:perfectionist/recommended-natural"), {
//     plugins: {
//         perfectionist,
//     },
// }, eslintPluginPrettierRecommended];

// @ts-check

import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    {
        plugins: {
            perfectionist,
        },
        rules: {
            'perfectionist/sort-imports': 'error',
        },
    },
    ...tseslint.configs.recommended,
    prettierConfig,
);