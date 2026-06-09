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
};

export const SITE_VIDEOS: SiteVideo[] = [
  {
    id: "6N6WojKxnlc",
    title: "Norchontol ko'chatzoriga sayohat!",
    topic: "Ko'chatzor",
  },
  {
    id: "AlzVDFIUDig",
    title: "Nimaga bu sirli giloslarni ekishimizni istashmayapti?",
    topic: "Gilos",
  },
  {
    id: "g0Cnyzx4jE8",
    title: "Endi bu giloslarni yashirishdan foyda yo'q! Sababi?",
    topic: "Gilos",
  },
  {
    id: "Q17JMDhQxow",
    title: "Biz bilgan va bilmagan shaftoli-nektarinlar!",
    topic: "Shaftoli",
  },
  {
    id: "sYpa522n7pI",
    title: "Qaysi biri yaxshiroq? Urug'siz yoki oddiy uzum?",
    topic: "Uzum",
  },
  {
    id: "-9izSnjGlrI",
    title: "Urug'siz uzum ko'chatlariga aksiya boshlandi!",
    topic: "Aksiya",
  },
];
