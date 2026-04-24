# Parkent Plants Website

Parkent Plants — Toshkent viloyatidagi mevali koʻchatchilik xoʻjaligi (2002 yildan buyon) uchun yangi korporativ sayt. Maqsad: Markaziy Osiyodagi eng kuchli koʻchatchilik sayti.

## Texnologiyalar

- **Framework:** Next.js 14 (App Router)
- **Til:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl (uz / ru)
- **Ikonlar:** lucide-react
- **Shriftlar:** @fontsource/inter, @fontsource/fraunces (lokal)
- **Utilities:** clsx, tailwind-merge

## Ishga tushirish

```bash
npm install
npm run dev
```

Soʻng brauzerda oching:

- [http://localhost:3000/uz](http://localhost:3000/uz) — oʻzbek tili (default)
- [http://localhost:3000/ru](http://localhost:3000/ru) — rus tili

Asosiy `/` manzili middleware tomonidan avtomatik `/uz` ga yoʻnaltiriladi.

### Boshqa buyruqlar

```bash
npm run build   # production build
npm run start   # production server
npm run lint    # ESLint
```

## Papka strukturasi

```
src/
├── app/
│   ├── [locale]/          # Dinamik locale segment (uz | ru)
│   │   ├── layout.tsx     # Locale layout (html/body + NextIntlClientProvider)
│   │   └── page.tsx       # Bosh sahifa
│   ├── layout.tsx         # Ildiz layout (shriftlar import qilinadi)
│   └── globals.css        # Global Tailwind stillar
├── components/
│   ├── ui/                # Asosiy qayta ishlatiluvchi UI (Button, Card, Input...)
│   ├── sections/          # Sahifa bloklari (Hero, Stats, FeaturedVarieties...)
│   └── layout/            # Header, Footer, Navigation
├── lib/
│   ├── utils.ts           # `cn()` yordamchi funksiyasi (clsx + twMerge)
│   └── constants.ts       # Brend konstantalari, statistika, locale roʻyxati
├── i18n/
│   ├── messages/
│   │   ├── uz.json        # Oʻzbek tarjimalari
│   │   └── ru.json        # Rus tarjimalari
│   └── config.ts          # next-intl serverside konfiguratsiyasi
├── types/
│   └── index.ts           # Global TypeScript tiplari
└── middleware.ts          # next-intl locale middleware (default: uz)
```

## Brend dizayn tizimi

### Ranglar palitrasi (Tailwind'da mavjud)

**Forest (asosiy yashil)**

| Token | Hex |
| --- | --- |
| `forest-50` | `#D8F3DC` |
| `forest-100` | `#B7E4C7` |
| `forest-200` | `#95D5B2` |
| `forest-400` | `#52B788` |
| `forest-600` | `#40916C` |
| `forest-700` | `#2D6A4F` |
| `forest-900` | `#1B4332` |

**Gold (accent)**

| Token | Hex |
| --- | --- |
| `gold-100` | `#E8D4A0` |
| `gold-400` | `#C9A961` |
| `gold-700` | `#8B6F47` |

**Warm neutrals**

| Token | Hex | Foydalanish |
| --- | --- | --- |
| `cream` | `#FEFCF8` | Asosiy fon |
| `cream-100` | `#F5F1EA` | Ikkinchi fon |
| `earth-400` | `#A8A39B` | Chegaralar |
| `earth-700` | `#5A5A5A` | Muted matn |
| `earth-900` | `#1A1A1A` | Asosiy matn |

### Shriftlar

- **Fraunces** (serif) — sarlavhalar (`h1..h6`, `.font-serif`). Latin + Latin-ext subset. *Eslatma: Fraunces'da Cyrillic subset yoʻq; rus tilidagi sarlavhalar uchun brauzer Georgia fallback shriftiga oʻtadi. Kelgusida Cyrillic uchun alternativ serif tanlash mumkin.*
- **Inter** (sans-serif) — asosiy matn. Latin + Cyrillic subsetlar (400, 500, 600, 700).

## Keyingi qadamlar

Bu faqat poydevor. Keyingi iteratsiyalarda qoʻshiladi:

- Header / Footer / Navigation
- Hero sektsiya
- Stats (500k+ koʻchat, 135+ nav, 2002-dan buyon, 2 pitomnik)
- Navlar katalogi (Featured varieties)
- Kontakt forma / B2B soʻrov
- Xarita va pitomnik galeriyasi
