/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'

const nextConfig = {
    env: {
        APP_VERSION: process.env.npm_package_version
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
    options: {},
})

export default withMDX(nextConfig);
