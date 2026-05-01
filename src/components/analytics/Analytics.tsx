/**
 * Analytics integratsiyasi.
 * Env vars'siz hech narsa yuklanmaydi (dev'da ortiqcha skript yo'q).
 *
 * Sozlash uchun .env.local'ga qo'shing:
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        (Google Analytics 4)
 *   NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678 (Yandex Metrika)
 *   NEXT_PUBLIC_META_PIXEL_ID=123456789012 (Meta/Facebook Pixel)
 */

import Script from "next/script";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {yandexId && <YandexMetrika yandexId={yandexId} />}
      {metaId && <MetaPixel metaId={metaId} />}
    </>
  );
}

function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}

function YandexMetrika({ yandexId }: { yandexId: string }) {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${yandexId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${yandexId}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </noscript>
    </>
  );
}

function MetaPixel({ metaId }: { metaId: string }) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
