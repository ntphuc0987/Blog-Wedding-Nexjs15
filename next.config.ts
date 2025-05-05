import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextjs.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.kinde.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "singaporebrides.com",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "djhjvd1v9hhoj.cloudfront.net",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "img.icons8.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
