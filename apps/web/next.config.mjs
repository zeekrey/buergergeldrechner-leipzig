/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'
import path from "node:path";
import { fileURLToPath } from "node:url";

import pkg from './package.json' with { type: "json" };

const appRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(appRoot, "../..");

const nextConfig = {
    env: {
        APP_VERSION: pkg.version
    },
    outputFileTracingIncludes: {
        '/api/chat': ['../../knowledge/**/*.md'],
    },
    outputFileTracingRoot: repositoryRoot,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    serverExternalPackages: ['resend'],
    turbopack: {
        resolveExtensions: [
            '.mdx',
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
            '.mjs',
            '.json',
        ],
    },
    experimental: {
        mdxRs: true
    },
    typescript: {
        // FIXME: Just here because of mdx import errors
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

const withMDX = createMDX({
    options: {},
})

export default withMDX(nextConfig);
