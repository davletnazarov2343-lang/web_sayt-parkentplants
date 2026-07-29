/**
 * Studio layout — metadata va viewport export qiladi (server component).
 * Sahifa o'zi (`[[...tool]]/page.tsx`) "use client" bo'lganligi uchun bu yerda saqlanadi.
 *
 * Eslatma: `src/app/layout.tsx` (root) <html>/<body> render qilmaydi — bu
 * vazifani `[locale]/layout.tsx` bajaradi. `/studio` yo'li `[locale]` ostida
 * emas, shu sababli <html>/<body> shu yerda beriladi, aks holda hujjat
 * qobig'isiz qoladi.
 */

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
