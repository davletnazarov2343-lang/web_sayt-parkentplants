/**
 * Shuhrat Abrorov — yagona faktlar manbai (bosh sahifa bloki, /shuhrat-abrorov
 * sahifasi va Person JSON-LD shu yerdan oladi).
 *
 * MANBA: Shuhrat Abrorovning rasmiy tarjimai holi va missiyalari
 * (Doniyorbek, 2026-11-02). Yangi fakt faqat tasdiqlangandan keyin qo'shilsin.
 * Eslatma: Parkent Plants'ni 2002-yildan EMAS — 2016-yildan sherik sifatida.
 */
import type { Locale } from "@/sanity/types";

type L = Record<Locale, string>;

export const FOUNDER_SLUG = "/shuhrat-abrorov";

export const FOUNDER = {
  name: { uz: "Shuhrat Abrorov", ru: "Шухрат Аброров" } as L,
  roles: {
    uz: ["Agronom", "Xalqaro konsultant", "Parkent Plants ta'sischisi"],
    ru: ["Агроном", "Международный консультант", "Соучредитель Parkent Plants"],
  } as Record<Locale, string[]>,
  quote: {
    uz: "Ilmsiz qilingan bog'da kelajak yo'q.",
    ru: "В саду, созданном без знаний, нет будущего.",
  } as L,
  /** Bosh sahifa uchun qisqa tanishtiruv */
  short: {
    uz: "Toshkent Davlat Agrar Universitetini tamomlagach, AQShning eng yirik danakli meva yetishtiruvchi kompaniyasi — Kaliforniyadagi Kingsburg Orchards'da ikki mavsum amaliyot o'tagan. 2016-yildan Parkent Plants (Norchontol) ko'chatchilik xo'jaligi sherigi. Bugun O'zbekiston bo'ylab 2 500 gektarga yaqin mevali bog'larda agronom-konsultant.",
    ru: "После Ташкентского государственного аграрного университета два сезона стажировался в Kingsburg Orchards (Калифорния) — крупнейшем производителе косточковых в США. С 2016 года — партнёр питомника Parkent Plants («Норчонтол»). Сегодня консультирует около 2 500 гектаров плодовых садов по всему Узбекистану.",
  } as L,
  /** To'liq tanishtiruv (sahifa hero) */
  intro: {
    uz: "Shuhrat Abrorov — O'zbekistonlik agronom va bog'dorchilik bo'yicha xalqaro konsultant. 5 qit'adagi 30 dan ortiq davlatning eng zamonaviy bog'larida bo'lib, yig'gan tajriba va ilmni O'zbekiston bog'lariga moslashtirib kelmoqda. 20 ga yaqin kitob muallifi, Agronomlar maktabi va Fruit House Organics konsalting firmasi asoschisi.",
    ru: "Шухрат Аброров — узбекский агроном и международный консультант по садоводству. Побывал в самых современных садах более 30 стран на 5 континентах и адаптирует собранный опыт к садам Узбекистана. Автор около 20 книг, основатель «Школы агрономов» и консалтинговой фирмы Fruit House Organics.",
  } as L,
  stats: [
    { value: "20+", label: { uz: "yil amaliy tajriba", ru: "лет практики" } as L },
    { value: "30+", label: { uz: "davlat, 5 qit'a bog'lari", ru: "стран, сады 5 континентов" } as L },
    { value: "~2 500", label: { uz: "gektar bog' konsultatsiyada", ru: "га садов на консультации" } as L },
    { value: "~20", label: { uz: "kitob muallifi", ru: "книг автора" } as L },
    { value: "200+", label: { uz: "agronom o'qitilgan", ru: "агрономов обучено" } as L },
  ],
  timeline: [
    {
      year: "1983",
      title: { uz: "Andijon, Marhamat", ru: "Андижан, Мархамат" } as L,
      text: {
        uz: "22-mayda Andijon viloyati Marhamat tumanida tug'ilgan.",
        ru: "Родился 22 мая в Мархаматском районе Андижанской области.",
      } as L,
    },
    {
      year: "2006",
      title: { uz: "Toshkent Davlat Agrar Universiteti", ru: "Ташкентский государственный аграрный университет" } as L,
      text: {
        uz: "Universitetni tamomlab, tajriba uchun AQShga yo'l oldi.",
        ru: "Окончил университет и уехал за опытом в США.",
      } as L,
    },
    {
      year: "2006–2008",
      title: { uz: "Kingsburg Orchards, Kaliforniya (AQSh)", ru: "Kingsburg Orchards, Калифорния (США)" } as L,
      text: {
        uz: "AQShning eng yirik danakli meva yetishtiruvchi kompaniyasida ikki mavsum amaliyot.",
        ru: "Два сезона стажировки в крупнейшей компании США по выращиванию косточковых.",
      } as L,
    },
    {
      year: "2008",
      title: { uz: "USAID loyihalari", ru: "Проекты USAID" } as L,
      text: {
        uz: "Vatanga qaytib, USAID loyihalarida bog'dorchilik yo'nalishida ishladi.",
        ru: "Вернувшись на родину, работал в проектах USAID по направлению садоводства.",
      } as L,
    },
    {
      year: "2009",
      title: { uz: "Ilk kitob", ru: "Первая книга" } as L,
      text: {
        uz: "Kitob yozishni boshladi — bugungacha 20 ga yaqin kitob.",
        ru: "Начал писать книги — на сегодня их около 20.",
      } as L,
    },
    {
      year: "2015",
      title: { uz: "AGROMIR, Samarqand — bosh agronom", ru: "AGROMIR, Самарканд — главный агроном" } as L,
      text: {
        uz: "800 gektarlik (hozir 2 000 gektardan oshgan) mevali bog'larda bosh agronom.",
        ru: "Главный агроном плодовых садов на 800 гектарах (сейчас более 2 000 га).",
      } as L,
    },
    {
      year: "2016",
      title: { uz: "Parkent Plants (Norchontol)", ru: "Parkent Plants («Норчонтол»)" } as L,
      text: {
        uz: "Ko'chatchilik xo'jaligida sherikchilikda ish boshladi.",
        ru: "Начал работу партнёром в питомнике.",
      } as L,
    },
    {
      year: "2019",
      title: { uz: "Fruit House Organics", ru: "Fruit House Organics" } as L,
      text: {
        uz: "Fransiyalik ustozi, olim Fabian Martel bilan konsalting firmasiga asos soldi.",
        ru: "Вместе со своим наставником, французским учёным Фабианом Мартелем, основал консалтинговую фирму.",
      } as L,
    },
    {
      year: "2023",
      title: { uz: "Agronomlar maktabi", ru: "«Школа агрономов»" } as L,
      text: {
        uz: "Maktabga asos solib, ikki yilda 200 dan ortiq agronomni onlayn o'qitdi.",
        ru: "Основал школу и за два года обучил онлайн более 200 агрономов.",
      } as L,
    },
    {
      year: { uz: "Bugun", ru: "Сегодня" },
      title: { uz: "2 500 gektarga yaqin bog'lar", ru: "Около 2 500 гектаров садов" } as L,
      text: {
        uz: "O'zbekiston bo'ylab mevali bog'larda agronom-konsultant sifatida faoliyat yuritmoqda.",
        ru: "Работает агрономом-консультантом в плодовых садах по всему Узбекистану.",
      } as L,
    },
  ] as Array<{ year: string | L; title: L; text: L }>,
  missions: [
    {
      icon: "trending",
      title: { uz: "Agronom va xalqaro konsultant", ru: "Агроном и международный консультант" } as L,
      goal: {
        uz: "O'zbekistondagi katta bog'larni maksimal yuqori daromadga olib chiqish",
        ru: "Вывести крупные сады Узбекистана на максимально высокий доход",
      } as L,
    },
    {
      icon: "school",
      title: { uz: "Agronomlarga ta'lim", ru: "Обучение агрономов" } as L,
      goal: {
        uz: "1 000 nafar agronomni meva yetishtirish bo'yicha o'qitish",
        ru: "Обучить плодоводству 1 000 агрономов",
      } as L,
    },
    {
      icon: "book",
      title: { uz: "Kitoblar muallifi", ru: "Автор книг" } as L,
      goal: {
        uz: "Bog'dorchilik bo'yicha har yili o'zbek tilida 2 ta kitob chiqarish",
        ru: "Выпускать 2 книги по садоводству на узбекском языке каждый год",
      } as L,
    },
    {
      icon: "video",
      title: { uz: "Bloger", ru: "Блогер" } as L,
      goal: {
        uz: "Mevachilik va agrobiznesdagi dolzarb mavzularni yoritib berish",
        ru: "Освещать актуальные темы плодоводства и агробизнеса",
      } as L,
    },
    {
      icon: "sprout",
      title: { uz: "Sifatli ko'chat yetishtiruvchi", ru: "Производитель качественных саженцев" } as L,
      goal: {
        uz: "Yiliga 3 million sifatli ko'chat (mevali va rezavor) yetishtirish",
        ru: "Выращивать 3 миллиона качественных саженцев в год (плодовых и ягодных)",
      } as L,
    },
    {
      icon: "heart",
      title: { uz: "Mehribon ota", ru: "Заботливый отец" } as L,
      goal: {
        uz: "O'z sohasining ekspertlarini tarbiyalash",
        ru: "Воспитать экспертов своего дела",
      } as L,
    },
  ] as const,
  gallery: [
    { src: "/team/shuhrat/seminar.jpg", caption: { uz: "Bog'dorchilik seminarida ma'ruza", ru: "Доклад на семинаре по садоводству" } as L },
    { src: "/team/shuhrat/gilos-bogi.jpg", caption: { uz: "Gilos hosili", ru: "Урожай черешни" } as L },
    { src: "/team/shuhrat/bogda-mutaxassislar.jpg", caption: { uz: "Intensiv bog'da ustozi, fransiyalik olim Fabian Martel bilan", ru: "В интенсивном саду с наставником, французским учёным Фабианом Мартелем" } as L, wide: true },
    { src: "/team/shuhrat/olma-bogi.jpg", caption: { uz: "Olma bog'ida, hosil mavsumi", ru: "В яблоневом саду, сезон урожая" } as L },
    { src: "/team/shuhrat/versal.jpg", caption: { uz: "Fransiya — Versal bog'lari", ru: "Франция — сады Версаля" } as L },
    { src: "/team/shuhrat/dala-korigi.jpg", caption: { uz: "Bog' ko'rigi", ru: "Осмотр сада" } as L },
    { src: "/team/shuhrat/parij.jpg", caption: { uz: "Fransiya, Parij", ru: "Франция, Париж" } as L },
    { src: "/team/shuhrat/budapesht.jpg", caption: { uz: "Vengriya, Budapesht", ru: "Венгрия, Будапешт" } as L },
    { src: "/team/shuhrat/boku.jpg", caption: { uz: "Ozarbayjon, Boku", ru: "Азербайджан, Баку" } as L },
  ] as Array<{ src: string; caption: L; wide?: boolean }>,
};

export const t = (value: string | L, locale: Locale) =>
  typeof value === "string" ? value : value[locale];
