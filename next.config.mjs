import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sanity CDN rasmlar uchun ruxsat (urlFor builder yaratadi)
  // i.ytimg.com — VideoSlider.tsx YouTube thumbnaillari uchun
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
