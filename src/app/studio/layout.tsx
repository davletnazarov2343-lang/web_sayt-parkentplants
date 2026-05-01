/**
 * Studio layout — metadata va viewport export qiladi (server component).
 * Sahifa o'zi (`[[...tool]]/page.tsx`) "use client" bo'lganligi uchun bu yerda saqlanadi.
 */

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
