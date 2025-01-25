import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["13.60.18.28"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "16.171.227.181",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
