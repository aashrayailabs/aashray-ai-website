import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Expose environment variables to the client via publicRuntimeConfig
  publicRuntimeConfig: {
    BUILD_SHA: process.env.NEXT_PUBLIC_BUILD_SHA,
    BUILD_TIME: process.env.NEXT_PUBLIC_BUILD_TIME,
    BRANCH: process.env.NEXT_PUBLIC_BRANCH,
    DEPLOY_URL: process.env.NEXT_PUBLIC_DEPLOY_URL,
    ENVIRONMENT: process.env.NEXT_PUBLIC_ENV,
    NODE_VERSION: process.version,
    NEXT_VERSION: require("next/package.json").version,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NEXT_PUBLIC_BUILD_SHA": JSON.stringify(process.env.NEXT_PUBLIC_BUILD_SHA),
        "process.env.NEXT_PUBLIC_BUILD_TIME": JSON.stringify(process.env.NEXT_PUBLIC_BUILD_TIME),
        "process.env.NEXT_PUBLIC_BRANCH": JSON.stringify(process.env.NEXT_PUBLIC_BRANCH),
        "process.env.NEXT_PUBLIC_DEPLOY_URL": JSON.stringify(process.env.NEXT_PUBLIC_DEPLOY_URL),
        "process.env.NEXT_PUBLIC_ENV": JSON.stringify(process.env.NEXT_PUBLIC_ENV),
      })
    );
    return config;
  },
};

export default nextConfig;
