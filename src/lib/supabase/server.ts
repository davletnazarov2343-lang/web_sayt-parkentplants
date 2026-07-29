import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (service_role key bilan).
 * RLS chetlab o'tadi — faqat API route'lar va boshqa server kodida ishlatish.
 *
 * Env yo'q bo'lsa null qaytaradi — chaquvchi shu holatni handle qiladi.
 */

let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    // Qiymatni EMAS — faqat qaysi env o'zgaruvchi yo'qligini log qilamiz,
    // shunda Vercel loglarida sabab darhol ko'rinadi (lid jimgina yo'qolmaydi).
    const missing = [
      !url && "NEXT_PUBLIC_SUPABASE_URL",
      !serviceKey && "SUPABASE_SERVICE_ROLE_KEY",
    ].filter(Boolean);
    console.error(
      `[supabase] Sozlanmagan — quyidagi env o'zgaruvchi(lar) Vercel'da yo'q: ${missing.join(", ")}`,
    );
    cached = null;
    return null;
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
