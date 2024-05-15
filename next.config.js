/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "fama.b-cdn.net",
      "i0.wp.com",
      "ashgamewitted.wpcomstaging.com",
      "https://i0.wp.com/ashgamewitted.wpcomstaging.com/wp-content/uploads/2024/05/"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
