/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        config.resolve.fallback = {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ...config.resolve.fallback,
          fs: false,
          stream: false,
          crypto: false,
        };
      }
  
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      config.module.rules.push({
        test: /pdf\.worker\.(min\.)?js/,
        type: "asset/resource",
        generator: {
          filename: "static/worker/[hash][ext][query]",
        },
      });
  
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return config;
    },
  };

export default nextConfig;
    