/**
 * IP bo'yicha sliding-window rate limiter — tashqi kutubxona/servis (Redis,
 * Upstash) ISHLATMAYDI, faqat process xotirasidagi Map orqali ishlaydi.
 *
 * CHEGARA: Vercel/Next.js serverless muhitida har bir funksiya chaqiruvi
 * boshqa instansiyada (yoki sovuq start bilan yangi xotirada) ishlashi
 * mumkin — bu holda Map bo'sh boshlanadi va limit "unutiladi". Ya'ni bu
 * himoya faqat bitta issiq instansiya doirasida kafolatlangan, ko'p
 * instansiyali yuklama yoki tarqalgan hujumdan to'liq himoya qilmaydi.
 * Kuchliroq himoya kerak bo'lsa — Upstash Redis kabi umumiy xotira talab
 * qilinadi (hozircha byudjet sabab ishlatilmayapti).
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 daqiqa
// O'zbekistonda mobil operatorlar (NAT) ko'p mijozni bitta tashqi IP orqali
// chiqaradi — chegara juda past bo'lsa haqiqiy mijoz rad etiladi. 10 ta
// skriptli hujumni (daqiqasiga yuzlab so'rov) baribir to'xtatadi.
const MAX_REQUESTS = 10; // shu oyna ichida ruxsat etilgan maksimal muvaffaqiyatli so'rov

// Kalit — IP manzil. Qiymat — shu IP dan oyna ichida kelgan so'rov
// vaqtlari (ms, epoch). Faqat "muvaffaqiyatli" deb hisoblangan so'rovlar
// shu yerga qo'shiladi (honeypot/validatsiya xatolari sanalmaydi).
const requestLog = new Map<string, number[]>();

/**
 * Muddati o'tgan (oynadan tashqariga chiqib ketgan) yozuvlarni tozalaydi.
 * Har `check` chaqiruvida ishlaydi — shuning uchun Map cheksiz o'smaydi,
 * alohida cron/interval kerak emas.
 */
function cleanup(now: number) {
  const stale: string[] = [];

  requestLog.forEach((timestamps: number[], ip: string) => {
    const fresh = timestamps.filter((t: number) => now - t < WINDOW_MS);
    if (fresh.length === 0) {
      stale.push(ip);
    } else {
      requestLog.set(ip, fresh);
    }
  });

  stale.forEach((ip) => requestLog.delete(ip));
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

/**
 * Berilgan IP uchun limitni tekshiradi va — agar ruxsat berilsa — shu
 * so'rovni darhol hisobga oladi (record). Rad etilgan so'rovlar hisobga
 * qo'shilmaydi, shuning uchun limitni oshirib yuborgan foydalanuvchi
 * qayta urinib ko'rganda ham oyna cho'zilib ketmaydi.
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  cleanup(now);

  const timestamps = requestLog.get(ip) ?? [];

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0] ?? now;
    const retryAfterSeconds = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    return { ok: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) };
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return { ok: true };
}

/**
 * Request headerlaridan mijoz IP manzilini olib beradi. Vercel/proksi
 * ortida `x-forwarded-for` bir nechta IP'ni vergul bilan ajratib
 * yuborishi mumkin — birinchisi (asl client) olinadi.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}
