/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["shwzrosvwhhhqopbtxhk.supabase.co"], // Add your Supabase domain here
  },
};

module.exports = nextConfig;
