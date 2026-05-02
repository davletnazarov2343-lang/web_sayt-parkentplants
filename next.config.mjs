import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sanity CDN rasmlar uchun ruxsat (urlFor builder yaratadi)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
