# Parkent Plants — Web Sayt Handoff Hujjati

> Antigravity yoki boshqa IDE'da davom etish uchun to'liq qo'llanma.
> Yangilangan: 2026-05-29

---

## 1. Loyiha joylashuvi

| Resurs | URL / Yo'l |
|---|---|
| **Mahalliy kod** | `C:\parkent_plants_web\` |
| **GitHub repo** | https://github.com/davletnazarov2343-lang/web_sayt-parkentplants |
| **Hozirgi branch** | `master` |
| **Jonli sayt** | https://parkentplants.uz |
| **Vercel dashboard** | https://vercel.com/davletnazarov2343-8099s-projects/parkent_plants_web |
| **Vercel project ID** | `prj_VynlHjMv143vVjYwdZBqVFn5CSUn` |
| **Vercel team** | `davletnazarov2343-8099s-projects` (`team_7PtfnvFhma7Usu1HCvjDod7m`) |
| **Domen registrator** | ahost.uz (DNS panel: clients.ahost.uz, domain ID 275183) |
| **Manbalar papkasi** | `C:\Users\Doniyor\Desktop\Parkent Plants Materiallar\` |

---

## 2. Texnologik stack

```
Next.js 14.2.35 (App Router)
TypeScript (strict mode)
Tailwind CSS
next-intl (uz/ru i18n)
Sanity CMS v3.99 (schemas tayyor, env yo'q)
Supabase (lazy client, env yo'q)
Bitrix24 webhook (env yo'q)
Zod (validation)
lucide-react (icons)
Vercel (hosting, auto-deploy from GitHub master)
Node 24 (Vercel project sozlamasi)
```

---

## 3. Loyiha tuzilmasi

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                  ← Bosh sahifa (HomePage)
│   │   ├── layout.tsx                ← Header + Footer wrapper
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── varieties/                ← Katalog (hozir ishlatilmaydi)
│   │       ├── page.tsx
│   │       ├── [fruitType]/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/page.tsx
│   ├── api/leads/route.ts            ← Lead form API
│   ├── studio/[[...tool]]/page.tsx   ← Sanity Studio
│   ├── layout.tsx                    ← Root layout
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── sections/                     ← Bosh sahifa bo'limlari
│   │   ├── Hero.tsx                  ← Bosh ekran (Norchontol foto fonida)
│   │   ├── TrustBar.tsx              ← Sertifikatlar logotiplari
│   │   ├── Stats.tsx                 ← Raqamlar (3 qutida: 23+ yil, 500k+ ko'chat, 96 ga)
│   │   ├── CeoQuote.tsx              ← Shuhrat aka iqtibos
│   │   ├── About.tsx                 ← Biz haqimizda (4 ta xususiyat)
│   │   ├── B2BProcess.tsx            ← 6 bosqichli ish jarayoni
│   │   ├── Nurseries.tsx             ← Parkent + Yuqori Chirchiq filiallari
│   │   ├── Testimonials.tsx          ← Mijoz fikrlari
│   │   ├── KnowledgeCenter.tsx       ← Maqolalar preview
│   │   ├── Faq.tsx                   ← 7 ta savol-javob (varieties olib tashlandi)
│   │   ├── ContactPreview.tsx        ← Kontakt ma'lumotlari preview
│   │   ├── LeadForm.tsx              ← So'rov shakli (Supabase + Bitrix24 hozircha bog'lanmagan)
│   │   ├── FeaturedVarieties.tsx     ← ❌ ISHLATILMAYDI (page.tsx'dan olib tashlangan)
│   │   ├── TopApples.tsx             ← ❌ ISHLATILMAYDI
│   │   ├── TopPeaches.tsx            ← ❌ ISHLATILMAYDI
│   │   └── TopCherries.tsx           ← ❌ ISHLATILMAYDI
│   ├── layout/
│   │   ├── Header.tsx                ← Yuqori panel + ijtimoiy tarmoq + til
│   │   ├── Footer.tsx                ← Pastki panel
│   │   ├── Logo.tsx
│   │   ├── LocaleSwitcher.tsx        ← uz/ru almashtiruvchi
│   │   └── WhatsappFab.tsx           ← WhatsApp suzuvchi tugma
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   └── SocialIcons.tsx           ← Telegram, Instagram, Facebook, YouTube, WhatsApp SVG
│   ├── seo/
│   │   └── JsonLd.tsx                ← Organization, Product, FAQ schemas
│   ├── analytics/
│   │   └── Analytics.tsx
│   └── catalog/                      ← ❌ ISHLATILMAYDI (varieties olib tashlangan)
│       ├── VarietyCard.tsx
│       └── FruitTypeNav.tsx
├── i18n/
│   ├── messages/
│   │   ├── uz.json                   ← O'zbekcha (Latin)
│   │   └── ru.json                   ← Ruscha
│   ├── config.ts                     ← localePrefix: "always"
│   └── navigation.ts
├── lib/
│   ├── constants.ts                  ← BRAND, BRAND.name, BRAND.domain
│   ├── env.ts                        ← Env wrapper (soft fallback)
│   ├── utils.ts                      ← cn() helper
│   ├── apples/top-varieties.ts       ← 9 olma navi data (ishlatilmaydi)
│   ├── peaches/top-varieties.ts      ← 8 shaftoli navi data (ishlatilmaydi)
│   └── cherries/top-varieties.ts     ← 8 gilos navi data (ishlatilmaydi)
└── sanity/
    ├── client.ts
    ├── env.ts
    ├── fetch.ts                      ← getAllFruitTypes, getVarietiesByFruitType, ...
    ├── queries.ts                    ← GROQ queries
    ├── types.ts                      ← Locale, FruitType, Variety types
    └── schemas/
        ├── documents/
        │   ├── fruitType.ts
        │   └── variety.ts
        └── index.ts

public/
├── images/
│   └── hero-nursery.jpg              ← Norchontol pitomnik fotosi (1920x1080, 533KB)
├── brand/
│   ├── logo-dark.png
│   ├── logo-light.png
│   ├── icon-square.png
│   ├── og-banner.jpg
│   └── og-image.jpg
├── varieties/saplings/               ← 5 ta apple sapling fotosi (ishlatilmaydi)
└── team/README.txt

supabase/
└── migrations/
    └── 0001_create_leads.sql         ← leads jadvali sxemasi

vercel.json                           ← framework: nextjs
next.config.js
tailwind.config.ts
tsconfig.json
package.json
```

---

## 4. Bajarilgan ishlar (commit tarixi bo'yicha)

| Commit | Vazifa |
|---|---|
| `1143a8f` | Navlar haqida ma'lumot saytdan butunlay olib tashlandi |
| `136197c` | "B2B so'rov yuborish" → "Bepul maslahat olish" (uzbek) |
| `cf50ae4` | "pitomnik" → "ko'chatzor" (uz.json) |
| `679f81e` | Real Norchontol pitomnik fotosi (5MB → 533KB) |
| `1edc7ab` | Pitomnik qatorli foto |
| `5ce7f36` | PSB-stil meva bog'i fonografi |
| `3270482` | Header'ga Facebook ikonka |
| `ec2e450` | Footer'ga Facebook + JsonLd sameAs |
| `9fb73f6` | vercel.json — framework=nextjs |
| `881f56d` | Production build xatosi (SpecRow type) + FeaturedVarieties 404 fix |
| ... oldingi commitlar — Hero, TrustBar, Stats, About, FAQ, Nurseries, LeadForm, sanity setup, gilos/olma/shaftoli widget'lari |

### Bosh sahifa hozirgi tarkibi (`src/app/[locale]/page.tsx`):
```tsx
<Hero />
<TrustBar />
<Stats />
<CeoQuote />
<About />
<B2BProcess />
<Nurseries />
<Testimonials />
<KnowledgeCenter />
<Faq />
<ContactPreview />
<LeadForm locale={lang} />
```

### Header/Footer menyu:
```
home / nursery / about / contact
```
("varieties" olib tashlandi)

### Stats (3 ta quti):
- 23+ Yil tajriba
- 500 000+ Ko'chat yiliga
- 96 Gektar maydon

### Ijtimoiy tarmoq linklari (Header + Footer):
- Telegram: t.me/+Q2HYAuBIWn4wN2Vi
- Instagram: instagram.com/shuhrat_abrorov/
- Facebook: facebook.com/profile.php?id=61552782846741
- YouTube: youtube.com/@shuhrat_abrorov

### Norchontol kontaktlar (uz.json + ru.json):
- Call-center: +998 78 113 18 19
- WhatsApp: +998 99 557 38 00
- Manzil: Toshkent vil., Parkent t. (32 ga) + Yuqori Chirchiq filial (64 ga) = 96 ga
- Ish vaqti: Du-Sh 9:00–18:00

---

## 5. KERAK BO'LADIGAN ISHLAR (pending)

### 🔴 5.1. Hozirgi commit deploy qilinmagan
**Muammo:** EPERM xatosi tufayli `1143a8f` (variety removal) Vercel'ga deploy bo'lmadi.
**Bajarish:** Vercel CLI orqali:
```powershell
cd C:\parkent_plants_web
vercel --prod --yes --scope davletnazarov2343-8099s-projects
```
Yoki: Vercel dashboard'da "Redeploy" tugmasi bilan. Yoki: GitHub auto-deploy yoqilsa (Vercel Settings → Git → connect repo).

### 🟡 5.2. Lead form ishlatish (Supabase + Bitrix24)
Lead form joylashgan: `/uz#request` (`LeadForm.tsx` komponenti).
Hozir ma'lumotlar **hech qaerga saqlanmaydi** — env yo'q.

**Supabase sozlash:**
1. https://supabase.com/dashboard da yangi project yarating
2. SQL editor'da `supabase/migrations/0001_create_leads.sql` ni ishga tushiring
3. Project Settings → API'dan oling:
   - Project URL
   - service_role key (server uchun)
4. Vercel env vars (Settings → Environment Variables):
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

**Bitrix24 sozlash:**
1. Bitrix24'da Inbound webhook yarating
2. URL formati: `https://YOUR.bitrix24.uz/rest/USER_ID/TOKEN/`
3. Vercel env:
   ```
   BITRIX_WEBHOOK_URL=https://...
   BITRIX_RESPONSIBLE_ID=1
   ```

API route: `src/app/api/leads/route.ts` — Zod validation + parallel Supabase insert + Bitrix24 `crm.lead.add`.

### 🟡 5.3. Sanity CMS sozlash (katalog uchun)
Schema'lar tayyor (`src/sanity/schemas/`), faqat env yo'q.

1. https://sanity.io/manage'da yangi project yarating
2. Vercel env:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=skXXX (Editor role)
   ```
3. `https://parkentplants.uz/studio` ga kiring va `fruitType` + `variety` document'larini to'ldiring

### 🟢 5.4. Alohida sahifalar yaratish (landing → to'liq sayt)
Hozir hammasi bitta uzun sahifa. Tavsiya — alohida route'lar:
- `/about` — Norchontol hikoyasi, Shuhrat aka portreti, jamoa, sertifikatlar
- `/nurseries` — Parkent + Yuqori Chirchiq filiallari batafsil, xarita
- `/contact` — to'liq kontakt sahifasi
- `/b2b` — hamkorlar uchun shartlar, narx, shartnoma
- `/knowledge` + `/knowledge/[slug]` — maqolalar

### 🟢 5.5. Boshqa fikrlar
- Real CEO foto (Shuhrat aka portreti) — hozir yo'q
- Pitomnik xaritasi (Yandex / Google Maps)
- Email manzil (info@parkentplants.uz yoki haqiqiy)
- Google Search Console — sayt'ni Google'ga indeksatsiya
- Google Analytics / Plausible — trafik kuzatish

### 🟢 5.6. Olib tashlangan komponentlarni o'chirish (ixtiyoriy)
Quyidagi fayllar hozir ishlatilmaydi (page.tsx'dan olib tashlangan) lekin diskda turibdi:
- `src/components/sections/FeaturedVarieties.tsx`
- `src/components/sections/TopApples.tsx`
- `src/components/sections/TopPeaches.tsx`
- `src/components/sections/TopCherries.tsx`
- `src/components/catalog/*` (VarietyCard, FruitTypeNav)
- `src/lib/{apples,peaches,cherries}/top-varieties.ts`
- `src/app/[locale]/varieties/*` (3 ta route)

Agar kelajakda kerak bo'lmasa — o'chirib tashlash mumkin. Kerak bo'lsa — page.tsx'ga import qo'shib qaytarsa bo'ladi.

---

## 6. Deploy jarayoni

### Avtomatik (GitHub auto-deploy yoqilsa):
```
git add ... && git commit -m "..." && git push origin master
# Vercel avtomatik build qiladi
```

### Qo'lda (hozirgi sozlama):
```powershell
cd C:\parkent_plants_web
git add -A
git commit -m "feat: ..."
git push origin master
vercel --prod --yes --scope davletnazarov2343-8099s-projects
```

### Mahalliy dev:
```powershell
cd C:\parkent_plants_web
npm install   # birinchi marta
npm run dev   # http://localhost:3000
```

### Build tekshirish:
```powershell
npm run build
```
> ⚠️ Windows'da ba'zan EPERM xatosi chiqadi (jest-worker fork). Yechim: `taskkill /F /IM node.exe` va qayta urinish. Yoki to'g'ridan-to'g'ri Vercel'ga deploy (Linux build).

---

## 7. DNS sozlamalari (parkentplants.uz)

ahost.uz panelida (clients.ahost.uz → Мои домены → parkentplants.uz → DNS-менеджер):

| Name | Type | Value | TTL |
|---|---|---|---|
| `@` | A | `76.76.21.21` | 14400 |
| `www` | CNAME | `cname.vercel-dns.com` | 14400 |
| `mail` | CNAME | `parkentplants.uz` | 14400 |
| `ftp` | CNAME | `parkentplants.uz` | 14400 |
| `@` | MX | `parkentplants.uz` (priority 0) | 14400 |
| `default._domainkey` | TXT | DKIM string | 14400 |
| `@` | TXT | SPF (`v=spf1 ...`) | 14400 |
| `_dmarc` | TXT | DMARC string | 14400 |

**Vercel domains:**
- `parkentplants.uz` (primary)
- `www.parkentplants.uz` (redirect to apex)
- `parkentplantsweb.vercel.app` (Vercel default alias)

---

## 8. Brand atamalari

| Atama | Foydalanish |
|---|---|
| Brand nomi | **Parkent Plants** (rasmiy nom) yoki **Parkent Plants by Norchontol farm** |
| Asoschi | Shuhrat Abrorov ("Shuhrat aka") |
| Xo'jalik nomi | Norchontol fermer xo'jaligi |
| Asosiy joy | Toshkent viloyati, Parkent tumani (32 ga) |
| Filial | Yuqori Chirchiq tumani (64 ga) |
| Jami maydon | 96 gektar |
| Tashkil etilgan | 2002 yil |
| Tajriba | 23+ yil (2026 da) |
| Yillik quvvat | 500 000+ ko'chat |
| Eksport | O'zbekiston + Tojikiston, Qirg'iziston, Turkmaniston, Qozog'iston |

---

## 9. Materiallar joylashuvi (C:\Users\Doniyor\Desktop\)

```
Parkent Plants Materiallar/
├── 01-hujjatlar/           — Sertifikatlar, davlat ruxsatlari
├── 02-meva-turlari/        — Meva bo'yicha tahlil hujjatlari
│   └── 03-olcha-gilos/_KITOB_TAHLILI.md  — Shuhrat aka kitobi tahlil
├── 03-fotograflar/         — Foto, video
├── 04-mijozlar/            — Mijoz reviews, testimonials
└── 05-irgeler-katalog/     — irgeler.com.tr'dan scrape (17 JSON fayl, 333 nav)
    ├── apple.json (28 nav)
    ├── apricot.json (52 nav)
    ├── cherry.json (19 nav)
    ├── peach.json (53 nav)
    ├── nectarine.json (70 nav)
    └── ... boshqalari

ko'chatzor.jpg — Hero foto manbasi (5 MB, asl)
new.jpg, sh.jpg — boshqa ko'chatzor fotolari
```

---

## 10. Muhim eslatmalar

1. **Sayt navlar haqida hozir HECH NIMA ko'rsatmaydi** — bu user qarori. Faqat brand + kontakt + Norchontol haqida. Kelajakda Sanity to'ldirilsa, katalog ochiladi.

2. **CMS bo'sh** — Sanity sozlanmagan. `/varieties` sahifalarga kirish menyudan olib tashlangan (lekin route'lar mavjud, to'g'ridan-to'g'ri URL bilan kirsa bo'sh ko'rinadi).

3. **Lead form ishlamaydi** — Supabase/Bitrix24 env yo'q. Forma yuborilganda "Yuborildi" ko'rsatadi, lekin ma'lumot saqlanmaydi.

4. **HTTPS sertifikat avtomatik** — Vercel'da Let's Encrypt orqali.

5. **Russian tilida "Питомник"** saqlangan (uzbekcha "ko'chatzor"). Bu mantiqiy: rus tilida "ko'chatzor" yo'q.

6. **Russian'da "B2B so'rov"** saqlangan (uzbek "Bepul maslahat olish"). Sababi: Rus tilli auditoriya — qo'shni davlatlar ulgurji xaridorlari, ular B2B atamasini biladi.

7. **Apostrof** — kod va matnda doim **ASCII apostrof** (`'`) ishlatiladi, kontekstli emas (`'`).

8. **GitHub remote**: `https://github.com/davletnazarov2343-lang/web_sayt-parkentplants.git`

---

## 11. Antigravity uchun ochish

```powershell
# Antigravity'da yoki boshqa IDE'da
cd C:\parkent_plants_web
npm install   # birinchi marta
npm run dev
```

Brauzer: http://localhost:3000

Sanity Studio (env sozlangach): http://localhost:3000/studio

---

**Savol bo'lsa, oxirgi commit'lar va bu hujjatdan boshlang. Hammasi tushuntirilgan.**
