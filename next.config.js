//import type { NextConfig } from "next";
const path = require("path");

const nextConfig = {
  /* config options here */
  images: {
    qualities: [25, 50, 75, 85],
  },
  experimental: {
    optimizeCss: false,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
