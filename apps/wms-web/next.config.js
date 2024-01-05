/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/items",
        permanent: true,
      },
    ];
  },
}
module.exports = nextConfig;
