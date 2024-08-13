/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "fama.b-cdn.net",
      "i0.wp.com",
      "ashgamewitted.wpcomstaging.com",
      "https://i0.wp.com/ashgamewitted.wpcomstaging.com/wp-content/uploads/2024/05/",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/ads.txt",
        destination: "https://config.playwire.com/dyn_ads/1025324/75084/ads.txt",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
