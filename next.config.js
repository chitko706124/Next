/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the static export configuration to enable API routes
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  // Disable automatic static optimization for global CSS
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
