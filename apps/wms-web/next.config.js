/** @type {import('next').NextConfig} */
const path = require("path");
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
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
module.exports = withNextIntl(nextConfig);
