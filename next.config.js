

const nextConfig = {
  /* config options here */
  images: {
    qualities: [25, 50,70, 75, 85, 100],
  },
  experimental: {
    optimizeCss: false,
  },
  // Disable console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
