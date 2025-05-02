import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'th', 'jp'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,

};

export default nextConfig;
