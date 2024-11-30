// @ts-check
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import perfectionist from "eslint-plugin-perfectionist";
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