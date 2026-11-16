import process from "node:process";

/** @type {import('@ladle/react').UserConfig} */
const config = {
  viteConfig: process.cwd() + "/.ladle/ladle-vite.config.ts",
};

export default config;