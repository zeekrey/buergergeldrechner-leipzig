/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'

const nextConfig = {
    env: {
        APP_VERSION: process.env.npm_package_version
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        turbo: {
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
        mdxRs: true
    },
    eslint: {
        ignoreDuringBuilds: true,
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
