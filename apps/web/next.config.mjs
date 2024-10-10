/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_VERSION: process.env.npm_package_version
    }
};

export default nextConfig;
