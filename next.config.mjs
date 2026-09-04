import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

// Content-Security-Policy — hozircha faqat Report-Only rejimida.
// Sabab: sayt reklama atributsiyasiga bog'liq (Meta Pixel, GA, Yandex
// Metrika), qattiq CSP ularni jimgina o'ldirishi mumkin. Avval brauzer
// konsoli/hisobot orqali kuzatamiz, keyin (kerak bo'lsa report-uri bilan)
// asl `Content-Security-Policy` header'iga o'tkazamiz va 'unsafe-inline'/
// 'unsafe-eval'ni qattiqlashtiramiz.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://mc.yandex.ru https://connect.facebook.net https://www.google-analytics.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com https://mc.yandex.ru https://www.facebook.com https://www.google-analytics.com https://www.googletagmanager.com https://cdn.sanity.io https://maps.gstatic.com https://maps.googleapis.com",
  "font-src 'self' data:",
  // www.facebook.com — Meta Pixel yashirin iframe yaratadi (jonli
  // kuzatuvda tasdiqlangan, 2026-09-04)
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://maps.google.com https://www.google.com https://www.facebook.com",
  // wss://mc.yandex.ru — Yandex Metrika WebSocket ochadi (jonli kuzatuv)
  "connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru wss://mc.yandex.ru https://connect.facebook.net https://www.facebook.com https://vitals.vercel-insights.com https://*.sanity.io",
  "object-src 'none'",
  "base-uri 'self'",
  // www.facebook.com — Meta Pixel ma'lumotni form POST orqali yuboradi
  // (jonli kuzatuvda tasdiqlangan). Lid formasi o'z saytiga boradi.
  "form-action 'self' https://www.facebook.com",
  "frame-ancestors 'self'",
].join("; ");

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
  async headers() {
    return [
      {
        // Barcha yo'llarga (shu jumladan /studio) taalluqli xavfsizlik
        // header'lari.
        source: "/:path*",
        headers: [
          {
            // ATAYLAB `includeSubDomains` va `preload` YO'Q: ular brauzerda
            // uzoq muddat eslab qolinadi va HTTPS'siz subdomen bo'lsa uni
            // ochib bo'lmay qoladi. Barcha subdomenlar HTTPS ekani
            // tasdiqlangach kengaytirish mumkin.
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Faqat kuzatish uchun — hech narsani bloklamaydi.
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspDirectives,
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
