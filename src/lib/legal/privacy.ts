/**
 * Maxfiylik siyosati matni (uz / ru / en).
 *
 * Nega i18n JSON'da emas: uzun huquqiy matn, bo'limlari tuzilmali va uchala
 * tilda bitta joyda turgani yangilashda tillar orasida farq qolmasligiga yordam beradi.
 * Inglizcha versiya Meta App Review tekshiruvchilari uchun har ikki sahifada ko'rsatiladi.
 *
 * MUHIM: matndagi har bir va'da (masalan, "30 kun ichida o'chiramiz") — kompaniya majburiyati.
 * Jarayon o'zgarsa (yangi xizmat, yangi ma'lumot turi), shu faylni ham yangilang va UPDATED sanasini o'zgartiring.
 */

export const PRIVACY_UPDATED = "2026-10-13";

export type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  after?: string[];
};

export type PolicyText = {
  title: string;
  metaDescription: string;
  updatedLabel: string;
  intro: string[];
  sections: PolicySection[];
};

const CONTACT = {
  phone: "+998 78 113 18 19",
  messenger: "+998 99 557 38 00",
  email: "info@parkentplants.uz",
  address: {
    uz: "Toshkent viloyati, Parkent tumani, Boyqozon mahallasi",
    ru: "Ташкентская обл., Паркентский р-н, махалля Бойкозон",
    en: "Boyqozon mahalla, Parkent district, Tashkent region, Uzbekistan",
  },
};

export const PRIVACY: Record<"uz" | "ru" | "en", PolicyText> = {
  uz: {
    title: "Maxfiylik siyosati",
    metaDescription:
      "Parkent Plants mijozlar ma'lumotlarini qanday yig'adi, nima uchun ishlatadi, kimga beradi va ularni qanday o'chirish mumkin.",
    updatedLabel: "Oxirgi yangilanish",
    intro: [
      "Bu siyosat Parkent Plants mevali ko'chatchilik xo'jaligi (keyingi o'rinlarda — «biz») sayt, telefon, Instagram, Facebook, Telegram va WhatsApp orqali murojaat qilgan mijozlarning shaxsiy ma'lumotlari bilan qanday ishlashini tushuntiradi.",
      "Biz ma'lumotlaringizni sotmaymiz va reklama uchun boshqa kompaniyalarga bermaymiz.",
    ],
    sections: [
      {
        id: "kim-biz",
        title: "1. Ma'lumotlar uchun kim javob beradi",
        bullets: [
          `Parkent Plants — ${CONTACT.address.uz}`,
          `Telefon: ${CONTACT.phone}`,
          `Elektron pochta: ${CONTACT.email}`,
        ],
      },
      {
        id: "qanday-malumot",
        title: "2. Qanday ma'lumotlarni yig'amiz",
        bullets: [
          "Siz o'zingiz yozgan ma'lumotlar: ism, telefon raqami, viloyat, xo'jalik yoki kompaniya nomi, qiziqqan meva turlari, buyurtma hajmi va izoh — sayt formasi, Facebook/Instagram reklamasidagi so'rov formasi yoki Telegram bot orqali.",
          "Yozishmalar: Instagram Direct, Facebook Messenger, Telegram va WhatsApp'da bizga yozgan xabarlaringiz matni, yuborilgan vaqti, profil nomingiz va platforma bergan identifikator.",
          "Telefon qo'ng'iroqlari: call-center qo'ng'iroqlari yozib olinadi. Yozuvlar xizmat sifatini nazorat qilish uchun avtomatik ravishda matnga aylantiriladi va baholanadi.",
          "Saytdan foydalanish statistikasi: cookie-fayllar, IP-manzil, qurilma va brauzer turi, ko'rilgan sahifalar. Buning uchun Google Analytics, Yandex Metrika (jumladan Webvisor — sahifadagi harakatlar yozuvi), Meta Pixel va Vercel Analytics ishlatiladi.",
        ],
      },
      {
        id: "nima-uchun",
        title: "3. Ma'lumotlardan nima uchun foydalanamiz",
        bullets: [
          "So'rovingizga javob berish, maslahat, narx va buyurtmani rasmiylashtirish.",
          "Ko'chatlarni yetkazib berish va sotuvdan keyingi agronomik yordam.",
          "Xizmat sifatini nazorat qilish: murojaatga qancha vaqtda javob berildi, javobsiz qolgan murojaat bormi, qo'ng'iroq sifati.",
          "Reklama samaradorligini o'lchash (qaysi reklama qancha murojaat va xarid olib keldi) — umumlashgan raqamlar ko'rinishida.",
          "Qonunchilikda belgilangan majburiyatlarni bajarish.",
        ],
      },
      {
        id: "meta",
        title: "4. Facebook va Instagram'dan olinadigan ma'lumotlar",
        paragraphs: [
          "Biz Meta platformasining rasmiy API'si orqali faqat o'zimizning Facebook sahifamiz va Instagram akkauntimizga kelgan ma'lumotlarni olamiz: reklamadagi so'rov formalari javoblari va sahifamizga yozilgan xabarlar.",
          "Bu ma'lumotlar faqat 3-bo'limdagi maqsadlarda — sizga javob berish va javob tezligini nazorat qilish uchun ishlatiladi. Ular sotilmaydi, boshqa kompaniyalarga berilmaydi, siz haqingizda reklama profili tuzish uchun ishlatilmaydi. Meta'dan olingan ma'lumotlar faqat 5-bo'limda ko'rsatilgan xizmat ko'rsatuvchilarda saqlanadi.",
        ],
      },
      {
        id: "kimga",
        title: "5. Ma'lumotlarni kim ko'radi",
        paragraphs: [
          "Ma'lumotlarni faqat murojaatingiz bilan ishlaydigan xodimlarimiz ko'radi. Ish uchun quyidagi xizmatlardan foydalanamiz — ular ma'lumotlarni bizning topshirig'imiz bilan saqlaydi yoki qayta ishlaydi:",
        ],
        bullets: [
          "Bitrix24 — mijozlar bazasi (CRM), telefoniya va onlayn-chatlar.",
          "Supabase — ma'lumotlar bazasi va hisobotlar.",
          "Vercel va Railway — sayt va ichki dasturlar joylashgan serverlar.",
          "Google (Gemini) — qo'ng'iroq yozuvlarini matnga aylantirish va baholash; Google Analytics — sayt statistikasi.",
          "Yandex Metrika — sayt statistikasi.",
          "Meta (Facebook, Instagram, WhatsApp) va Telegram — siz yozgan platformaning o'zi.",
        ],
        after: [
          "Bu xizmatlarning serverlari O'zbekistondan tashqarida joylashgan bo'lishi mumkin.",
          "Davlat organlariga ma'lumot faqat qonunda belgilangan hollarda beriladi.",
        ],
      },
      {
        id: "saqlash",
        title: "6. Qancha muddat saqlaymiz",
        paragraphs: [
          "Ma'lumotlar siz bilan hamkorlik davom etayotgan va undan keyin buyurtma, kafolat va hisob-kitob masalalari uchun kerak bo'lgan muddat davomida saqlanadi. Keyin o'chiriladi yoki shaxsni aniqlab bo'lmaydigan holga keltiriladi. O'chirishni so'rasangiz — 8-bo'limga qarang.",
        ],
      },
      {
        id: "huquqlar",
        title: "7. Sizning huquqlaringiz",
        bullets: [
          "Biz siz haqingizda qanday ma'lumot saqlayotganimizni bilish.",
          "Noto'g'ri ma'lumotni tuzattirish.",
          "Ma'lumotlaringizni o'chirishni talab qilish.",
          "Reklama xabarlari va qo'ng'iroqlardan voz kechish — «Bezovta qilmang» deb yozing yoki ayting, sizni ro'yxatdan chiqaramiz.",
        ],
      },
      {
        id: "malumotlarni-ochirish",
        title: "8. Ma'lumotlaringizni qanday o'chirish mumkin",
        paragraphs: ["Quyidagilardan birini qiling:"],
        bullets: [
          `${CONTACT.email} manziliga «Ma'lumotlarimni o'chiring» mavzusida xat yozing.`,
          `Yoki ${CONTACT.phone} raqamiga qo'ng'iroq qiling, yoki ${CONTACT.messenger} raqamiga Telegram/WhatsApp'da yozing.`,
          "Yoki bizning Instagram yoki Facebook sahifamizga «Ma'lumotlarimni o'chiring» deb yozing.",
        ],
        after: [
          "Xabarda bizga murojaat qilgan telefon raqamingiz yoki profil nomingizni ko'rsating — shu bo'yicha sizni topamiz.",
          "Biz 30 kun ichida ma'lumotlaringizni CRM va ma'lumotlar bazamizdan o'chiramiz va bu haqda o'sha kanal orqali xabar beramiz. Qonun bo'yicha saqlanishi shart bo'lgan hujjatlar (masalan, sotuv hujjatlari) qonunda belgilangan muddat tugaguncha saqlanadi.",
          "Facebook, Instagram, Telegram yoki WhatsApp'dagi yozishma nusxasini o'sha platformaning o'zida ham o'chirishingiz mumkin.",
        ],
      },
      {
        id: "xavfsizlik",
        title: "9. Xavfsizlik",
        paragraphs: [
          "Ma'lumotlar shifrlangan aloqa (HTTPS) orqali uzatiladi. Tizimlarga kirish huquqi faqat ishi uchun kerak bo'lgan xodimlarga beriladi.",
        ],
      },
      {
        id: "ozgarishlar",
        title: "10. O'zgarishlar va aloqa",
        paragraphs: [
          "Siyosat o'zgarsa, shu sahifada yangi matn va sana e'lon qilinadi.",
          `Savollar bo'lsa: ${CONTACT.email}, ${CONTACT.phone}.`,
        ],
      },
    ],
  },

  ru: {
    title: "Политика конфиденциальности",
    metaDescription:
      "Какие данные клиентов собирает Parkent Plants, зачем использует, кому передаёт и как их удалить.",
    updatedLabel: "Последнее обновление",
    intro: [
      "Эта политика объясняет, как питомник плодовых саженцев Parkent Plants (далее — «мы») обращается с персональными данными клиентов, которые связываются с нами через сайт, по телефону, в Instagram, Facebook, Telegram и WhatsApp.",
      "Мы не продаём ваши данные и не передаём их другим компаниям для рекламы.",
    ],
    sections: [
      {
        id: "kim-biz",
        title: "1. Кто отвечает за данные",
        bullets: [
          `Parkent Plants — ${CONTACT.address.ru}`,
          `Телефон: ${CONTACT.phone}`,
          `Эл. почта: ${CONTACT.email}`,
        ],
      },
      {
        id: "qanday-malumot",
        title: "2. Какие данные мы собираем",
        bullets: [
          "Данные, которые вы указываете сами: имя, телефон, область, название хозяйства или компании, интересующие культуры, объём заказа и комментарий — через форму на сайте, форму заявки в рекламе Facebook/Instagram или Telegram-бот.",
          "Переписка: текст и время ваших сообщений в Instagram Direct, Facebook Messenger, Telegram и WhatsApp, имя профиля и идентификатор, который передаёт платформа.",
          "Телефонные звонки: звонки в call-центр записываются. Записи автоматически переводятся в текст и оцениваются для контроля качества обслуживания.",
          "Статистика сайта: cookie, IP-адрес, тип устройства и браузера, просмотренные страницы. Для этого используются Google Analytics, Яндекс Метрика (включая Вебвизор — запись действий на странице), Meta Pixel и Vercel Analytics.",
        ],
      },
      {
        id: "nima-uchun",
        title: "3. Зачем мы используем данные",
        bullets: [
          "Чтобы ответить на ваш запрос, проконсультировать, назвать цену и оформить заказ.",
          "Для доставки саженцев и агрономической поддержки после продажи.",
          "Для контроля качества: как быстро ответили на обращение, нет ли обращений без ответа, качество звонков.",
          "Для оценки эффективности рекламы (какая реклама сколько обращений и покупок принесла) — в виде обобщённых цифр.",
          "Для выполнения требований законодательства.",
        ],
      },
      {
        id: "meta",
        title: "4. Данные из Facebook и Instagram",
        paragraphs: [
          "Через официальный API платформы Meta мы получаем только данные, адресованные нашей собственной странице Facebook и аккаунту Instagram: ответы на формы заявок в рекламе и сообщения, написанные нам.",
          "Эти данные используются только для целей из раздела 3 — чтобы ответить вам и контролировать скорость ответа. Они не продаются, не передаются другим компаниям и не используются для построения рекламного профиля о вас. Данные из Meta хранятся только у поставщиков услуг, перечисленных в разделе 5.",
        ],
      },
      {
        id: "kimga",
        title: "5. Кто видит данные",
        paragraphs: [
          "Данные видят только наши сотрудники, которые работают с вашим обращением. Мы пользуемся следующими сервисами — они хранят или обрабатывают данные по нашему поручению:",
        ],
        bullets: [
          "Bitrix24 — клиентская база (CRM), телефония и онлайн-чаты.",
          "Supabase — база данных и отчёты.",
          "Vercel и Railway — серверы, на которых работают сайт и внутренние программы.",
          "Google (Gemini) — перевод записей звонков в текст и их оценка; Google Analytics — статистика сайта.",
          "Яндекс Метрика — статистика сайта.",
          "Meta (Facebook, Instagram, WhatsApp) и Telegram — сама платформа, где вы нам пишете.",
        ],
        after: [
          "Серверы этих сервисов могут находиться за пределами Узбекистана.",
          "Государственным органам данные передаются только в случаях, предусмотренных законом.",
        ],
      },
      {
        id: "saqlash",
        title: "6. Сколько мы храним данные",
        paragraphs: [
          "Данные хранятся, пока продолжается сотрудничество, и после него — столько, сколько нужно для вопросов по заказу, гарантии и расчётам. Затем они удаляются или обезличиваются. Если хотите удалить данные раньше — см. раздел 8.",
        ],
      },
      {
        id: "huquqlar",
        title: "7. Ваши права",
        bullets: [
          "Узнать, какие данные о вас мы храним.",
          "Исправить неверные данные.",
          "Потребовать удалить ваши данные.",
          "Отказаться от рекламных сообщений и звонков — напишите или скажите «Не беспокоить», и мы исключим вас из рассылки.",
        ],
      },
      {
        id: "malumotlarni-ochirish",
        title: "8. Как удалить ваши данные",
        paragraphs: ["Сделайте одно из следующего:"],
        bullets: [
          `Напишите на ${CONTACT.email} с темой «Удалите мои данные».`,
          `Или позвоните по номеру ${CONTACT.phone}, или напишите в Telegram/WhatsApp на ${CONTACT.messenger}.`,
          "Или напишите «Удалите мои данные» на нашу страницу в Instagram или Facebook.",
        ],
        after: [
          "Укажите номер телефона или имя профиля, с которого вы к нам обращались, — по нему мы вас найдём.",
          "В течение 30 дней мы удалим ваши данные из CRM и нашей базы данных и сообщим об этом через тот же канал. Документы, которые закон обязывает хранить (например, документы о продаже), хранятся до окончания установленного законом срока.",
          "Копию переписки в Facebook, Instagram, Telegram или WhatsApp вы также можете удалить в самой платформе.",
        ],
      },
      {
        id: "xavfsizlik",
        title: "9. Безопасность",
        paragraphs: [
          "Данные передаются по зашифрованному соединению (HTTPS). Доступ к системам есть только у сотрудников, которым он нужен для работы.",
        ],
      },
      {
        id: "ozgarishlar",
        title: "10. Изменения и контакты",
        paragraphs: [
          "Если политика изменится, новый текст и дата будут опубликованы на этой странице.",
          `Вопросы: ${CONTACT.email}, ${CONTACT.phone}.`,
        ],
      },
    ],
  },

  en: {
    title: "Privacy Policy",
    metaDescription:
      "What customer data Parkent Plants collects, why, who it is shared with, and how to have it deleted.",
    updatedLabel: "Last updated",
    intro: [
      "This policy explains how Parkent Plants, a fruit tree nursery in Uzbekistan (\"we\"), handles the personal data of customers who contact us through our website, by phone, and on Instagram, Facebook, Telegram and WhatsApp.",
      "We do not sell your data and do not share it with other companies for advertising.",
    ],
    sections: [
      {
        id: "en-controller",
        title: "1. Who is responsible for the data",
        bullets: [
          `Parkent Plants — ${CONTACT.address.en}`,
          `Phone: ${CONTACT.phone}`,
          `Email: ${CONTACT.email}`,
        ],
      },
      {
        id: "en-data",
        title: "2. What data we collect",
        bullets: [
          "Data you provide: name, phone number, region, farm or company name, fruit types of interest, order size and comments — via our website form, Facebook/Instagram lead ads forms, or our Telegram bot.",
          "Messages: the text and time of messages you send us on Instagram Direct, Facebook Messenger, Telegram and WhatsApp, your profile name, and the identifier provided by the platform.",
          "Phone calls: calls to our call center are recorded. Recordings are automatically transcribed and scored to monitor service quality.",
          "Website usage: cookies, IP address, device and browser type, pages viewed. We use Google Analytics, Yandex Metrica (including Webvisor session recording), Meta Pixel and Vercel Analytics.",
        ],
      },
      {
        id: "en-purpose",
        title: "3. Why we use the data",
        bullets: [
          "To answer your request, give advice and prices, and process your order.",
          "To deliver saplings and provide after-sale agronomy support.",
          "To monitor service quality: how quickly each inquiry was answered, whether any inquiry was left unanswered, and call quality.",
          "To measure advertising performance (which ads led to inquiries and purchases) in aggregated form.",
          "To meet legal obligations.",
        ],
      },
      {
        id: "en-meta",
        title: "4. Data from Facebook and Instagram",
        paragraphs: [
          "Through Meta's official APIs we receive only data addressed to our own Facebook Page and Instagram account: lead ads form submissions and messages people send to us.",
          "This data is used only for the purposes in section 3 — to reply to you and to monitor our response times. It is not sold, not shared with other companies, and not used to build advertising profiles. Data received from Meta is stored only with the service providers listed in section 5.",
        ],
      },
      {
        id: "en-sharing",
        title: "5. Who can see the data",
        paragraphs: [
          "Only our employees who handle your inquiry can see your data. We use the following service providers, which store or process data on our behalf:",
        ],
        bullets: [
          "Bitrix24 — CRM, telephony and chat inbox.",
          "Supabase — database and reporting.",
          "Vercel and Railway — servers hosting our website and internal software.",
          "Google (Gemini) — call transcription and scoring; Google Analytics — website statistics.",
          "Yandex Metrica — website statistics.",
          "Meta (Facebook, Instagram, WhatsApp) and Telegram — the platform you message us on.",
        ],
        after: [
          "These providers' servers may be located outside Uzbekistan.",
          "We disclose data to authorities only where required by law.",
        ],
      },
      {
        id: "en-retention",
        title: "6. How long we keep data",
        paragraphs: [
          "We keep data while we work with you and afterwards for as long as needed for order, warranty and accounting matters. It is then deleted or anonymized. To request earlier deletion, see section 8.",
        ],
      },
      {
        id: "en-rights",
        title: "7. Your rights",
        bullets: [
          "Ask what data we hold about you.",
          "Have incorrect data corrected.",
          "Have your data deleted.",
          "Opt out of marketing messages and calls — write or say \"Do not disturb\" and we will remove you from our lists.",
        ],
      },
      {
        id: "data-deletion",
        title: "8. How to delete your data",
        paragraphs: ["Do any one of the following:"],
        bullets: [
          `Email ${CONTACT.email} with the subject "Delete my data".`,
          `Or call ${CONTACT.phone}, or message ${CONTACT.messenger} on Telegram or WhatsApp.`,
          "Or send \"Delete my data\" to our Instagram account or Facebook Page.",
        ],
        after: [
          "Include the phone number or profile name you contacted us from, so we can find your records.",
          "Within 30 days we delete your data from our CRM and database and confirm through the same channel. Documents we are legally required to keep (such as sales records) are kept until the legal retention period ends.",
          "You can also delete your copy of the conversation in Facebook, Instagram, Telegram or WhatsApp itself.",
        ],
      },
      {
        id: "en-security",
        title: "9. Security",
        paragraphs: [
          "Data is transmitted over encrypted connections (HTTPS). Access to our systems is limited to employees who need it for their work.",
        ],
      },
      {
        id: "en-changes",
        title: "10. Changes and contact",
        paragraphs: [
          "If this policy changes, the new text and date will be published on this page.",
          `Questions: ${CONTACT.email}, ${CONTACT.phone}.`,
        ],
      },
    ],
  },
};
