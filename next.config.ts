import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  images: {
    domains: ["i.pravatar.cc"],
  },
};

export default nextConfig;
