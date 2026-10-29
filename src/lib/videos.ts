/**
 * Sayt'da ko'rsatiladigan YouTube videolar ro'yxati.
 * Bu yerdan VideoSlider komponenti hamda VideoObject JSON-LD foydalanadi.
 *
 * Yangi video qo'shish uchun shu massivga ID + sarlavhasini qo'shing.
 */

export type SiteVideo = {
  id: string;
  title: string;
  topic: string;
  /** YouTube sahifasidagi haqiqiy yuklangan sana (ISO 8601) */
  uploadDate: string;
};

export const SITE_VIDEOS: SiteVideo[] = [
  {
    id: "6N6WojKxnlc",
    title: "Norchontol ko'chatzoriga sayohat!",
    topic: "Ko'chatzor",
    uploadDate: "2025-06-28T08:08:44-07:00",
  },
  {
    id: "AlzVDFIUDig",
    title: "Nimaga bu sirli giloslarni ekishimizni istashmayapti?",
    topic: "Gilos",
    uploadDate: "2025-05-26T09:40:42-07:00",
  },
  {
    id: "g0Cnyzx4jE8",
    title: "Endi bu giloslarni yashirishdan foyda yo'q! Sababi?",
    topic: "Gilos",
    uploadDate: "2026-06-05T07:28:36-07:00",
  },
  {
    id: "Q17JMDhQxow",
    title: "Biz bilgan va bilmagan shaftoli-nektarinlar!",
    topic: "Shaftoli",
    uploadDate: "2025-06-17T09:25:21-07:00",
  },
  {
    id: "sYpa522n7pI",
    title: "Qaysi biri yaxshiroq? Urug'siz yoki oddiy uzum?",
    topic: "Uzum",
    uploadDate: "2025-08-23T07:45:52-07:00",
  },
  {
    id: "-9izSnjGlrI",
    title: "Urug'siz uzum ko'chatlariga aksiya boshlandi!",
    topic: "Aksiya",
    uploadDate: "2025-07-23T23:58:45-07:00",
  },
];
