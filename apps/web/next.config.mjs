/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'

import pkg from './package.json' with { type: "json" };

const nextConfig = {
    env: {
        APP_VERSION: pkg.version
    },
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
