/* Общие словари для кабинета и публичной страницы.
   Добавить язык: LANGS + индекс в строках ROWS (порядок ru, kk, en, ky, uz) + SALUT/BODY.
   Добавить категорию: CATS + GROUPS (+ CAT_FIELDS). Добавить шаблон: THEMES. */
const LANGS = {
  ru: { name: 'Русский', code: 'RU' }, kk: { name: 'Қазақша', code: 'KZ' }, ky: { name: 'Кыргызча', code: 'KG' },
  uz: { name: "O'zbekcha", code: 'UZ' }, en: { name: 'English', code: 'GB' }
};
const LK = ['ru', 'kk', 'en', 'ky', 'uz'];

/* ---------- Категории ---------- */
const CATS = {
  wedding: { ru: 'Свадьба', kk: 'Үйлену той', en: 'Wedding' },
  kyz: { ru: 'Қыз ұзату (проводы невесты)', kk: 'Қыз ұзату', en: "Bride's farewell" },
  syrga: { ru: 'Сырға салу', kk: 'Сырға салу', en: 'Syrga salu' },
  kudalyq: { ru: 'Құдалық (сватовство)', kk: 'Құдалық', en: 'Matchmaking' },
  merei: { ru: 'Юбилей', kk: 'Мерей той', en: 'Anniversary' },
  birthday: { ru: 'День рождения', kk: 'Туған күн', en: 'Birthday' },
  qonys: { ru: 'Новоселье', kk: 'Қоныс той', en: 'Housewarming' },
  auyzashar: { ru: 'Ауызашар (ифтар)', kk: 'Ауызашар, ораза', en: 'Iftar' },
  sundet: { ru: 'Сүндет той', kk: 'Сүндет той', en: 'Sundet toy' },
  shildekhana: { ru: 'Шілдехана (рождение ребёнка)', kk: 'Шілдехана', en: 'Newborn celebration' },
  tusaukeser: { ru: 'Тұсаукесер (первые шаги)', kk: 'Тұсаукесер', en: 'First steps' },
  besik: { ru: 'Бесік той', kk: 'Бесік той', en: 'Cradle celebration' },
  tilashar: { ru: 'Тілашар (первые слова)', kk: 'Тілашар', en: 'First words' },
  qyrqyn: { ru: 'Қырқынан шығару (40 дней)', kk: 'Қырқынан шығару', en: '40th day' }
};
const catName = (c, l) => (CATS[c] || CATS.wedding)[l] || (CATS[c] || CATS.wedding).ru;
const GROUPS = [
  { ru: 'Традиции', kk: 'Той салты', en: 'Traditions', items: [['wedding', '💍'], ['kyz', '👰'], ['syrga', '✨'], ['kudalyq', '🤝']] },
  { ru: 'Праздники', kk: 'Мерекелер', en: 'Celebrations', items: [['merei', '🎂'], ['birthday', '🎁'], ['qonys', '🏠'], ['auyzashar', '🌙']] },
  { ru: 'Детские праздники', kk: 'Балалар мерекелері', en: "Children's events", items: [['sundet', '👦'], ['shildekhana', '👶'], ['tusaukeser', '👣'], ['besik', '🍼'], ['tilashar', '📚'], ['qyrqyn', '👶']] }
];
/* какие поля имён показывать на шаге 1 */
const CAT_FIELDS = { wedding: ['groom', 'bride'], kyz: ['bride'], syrga: ['bride'], kudalyq: ['groom', 'bride'], merei: ['person'], birthday: ['person'],
  qonys: [], auyzashar: [], sundet: ['child'], shildekhana: ['child'], tusaukeser: ['child'], besik: ['child'], tilashar: ['child'], qyrqyn: ['child'] };

/* ---------- Шаблоны оформления (цвета страницы приглашения) ---------- */
const THEMES = {
  1: { name: 'Ivory Gold', bg: '#FBF7F0', champ: '#F1E8D8', gold: '#B8975A', ink: '#4A3F35', soft: '#8A7B6C', line: '#E3D6C1', paper: '#FFFFFF', h1: '#FFFFFF', h2: '#F1E8D8' },
  2: { name: 'Mono', bg: '#F5F5F3', champ: '#E6E6E3', gold: '#222222', ink: '#1A1A1A', soft: '#6F6F6F', line: '#D6D6D2', paper: '#FFFFFF', h1: '#FFFFFF', h2: '#CFCFCB' },
  3: { name: 'Night', bg: '#15120F', champ: '#241F1A', gold: '#D4B26A', ink: '#F3EBDD', soft: '#B9AA95', line: '#3A322A', paper: '#1C1814', h1: '#2A231C', h2: '#0F0D0B' },
  4: { name: 'Qazaq', bg: '#F7EBDC', champ: '#EBD5BA', gold: '#8C1D2F', ink: '#4A2A22', soft: '#8A6A5C', line: '#D9BFA0', paper: '#FFF9F0', h1: '#FFF3E1', h2: '#E8CBA4' }
};

/* ---------- Тексты публичной страницы: [ru, kk, en, ky, uz] ---------- */
const ROWS = {
  open: ['Открыть приглашение', 'Шақыруды ашу', 'Open invitation', 'Чакырууну ачуу', 'Taklifnomani ochish'],
  cd: ['До праздника осталось', 'Қалған уақыт', 'Time left', 'Калган убакыт', 'Qolgan vaqt'],
  d: ['ДНЕЙ', 'КҮН', 'DAYS', 'КҮН', 'KUN'], h: ['ЧАСОВ', 'САҒАТ', 'HOURS', 'СААТ', 'SOAT'],
  m: ['МИНУТ', 'МИНУТ', 'MINUTES', 'МИНУТА', 'DAQIQA'], s: ['СЕКУНД', 'СЕКУНД', 'SECONDS', 'СЕКУНДА', 'SONIYA'],
  place: ['Место проведения', 'Мекен-жайы', 'Venue', 'Өтө турган жери', 'Manzil'],
  map: ['Открыть на карте', 'Картаны ашу', 'Open in maps', 'Картадан ачуу', 'Xaritada ochish'],
  rsvp: ['Подтвердите присутствие', 'Қатысуыңызды растаңыз', 'Will you join us?', 'Катышууңузду ырастаңыз', 'Ishtirokingizni tasdiqlang'],
  status: ['Вы придёте?', 'Сіз келесіз бе?', 'Your answer', 'Келесизби?', 'Kelasizmi?'],
  name: ['Ваше имя и фамилия', 'Аты-жөніңіз', 'Full name', 'Атыңыз жана фамилияңыз', 'Ism va familiyangiz'],
  namePh: ['Введите имя и фамилию', 'Аты-жөніңізді жазыңыз', 'Enter your full name', 'Атыңызды жазыңыз', 'Ism familiyangizni yozing'],
  yes: ['Я приду', 'Иә, барамын!', "I'll be there", 'Келем', 'Boraman'],
  plus: ['Приду с парой (+1)', 'Жұбайыммен бірге барамын', "I'll bring a partner (+1)", 'Жубайым менен келем', 'Juftim bilan boraman'],
  no: ['К сожалению, не смогу', 'Өкінішке орай, келе алмаймын', "Sorry, I can't come", 'Тилекке каршы, келе албайм', 'Afsuski, kela olmayman'],
  drinks: ['Предпочтения по напиткам', 'Сусын таңдауы', 'Drink preferences', 'Суусундук тандоо', 'Ichimlik tanlovi'],
  wine: ['Вино', 'Шарап', 'Wine', 'Шарап', 'Vino'], whisky: ['Виски', 'Виски', 'Whisky', 'Виски', 'Viski'],
  cognac: ['Коньяк', 'Коньяк', 'Cognac', 'Коньяк', 'Konyak'], soft: ['Безалкогольные', 'Алкогольсіз', 'Non-alcoholic', 'Алкоголсуз', 'Alkogolsiz'],
  send: ['Отправить ответ', 'Жауап беру', 'Send reply', 'Жооп берүү', 'Javob yuborish'],
  sending: ['Отправка…', 'Жіберілуде…', 'Sending…', 'Жөнөтүлүүдө…', 'Yuborilmoqda…'],
  thanks: ['Спасибо! Ваш ответ успешно отправлен', 'Рақмет! Жауабыңыз сәтті жіберілді', 'Thank you! Your reply has been sent', 'Рахмат! Жообуңуз жөнөтүлдү', 'Rahmat! Javobingiz yuborildi'],
  fail: ['Не удалось отправить. Попробуйте ещё раз', 'Жіберу мүмкін болмады. Қайталап көріңіз', 'Could not send. Please try again', 'Жөнөтүү мүмкүн болбоду. Кайра аракет кылыңыз', "Yuborib bo'lmadi. Qayta urinib ko'ring"],
  dear: ['Дорогой(ая) {n}!', 'Құрметті {n}!', 'Dear {n},', 'Урматтуу {n}!', 'Hurmatli {n}!'],
  nf: ['Приглашение не найдено', 'Шақыру табылмады', 'Invitation not found', 'Чакыруу табылган жок', 'Taklifnoma topilmadi'],
  wa: ['{n}, приглашаем вас на наше торжество:', '{n}, сізді қуанышымызға шақырамыз:', '{n}, you are invited to our celebration:', '{n}, сизди майрамыбызга чакырабыз:', '{n}, sizni tantanamizga taklif qilamiz:'],
  hostsL: ['Хозяева торжества:', 'Іс-шара иелері:', 'Hosts:', 'Той ээлери:', 'Marosim egalari:'],
  start: ['Начало', 'Басталуы', 'Starts at', 'Башталышы', 'Boshlanishi'],
  wishH: ['Пожелания', 'Ізгі тілектер', 'Wishes', 'Тилектер', 'Tilaklar'],
  wishBtn: ['Отправить пожелание', 'Тілек жазу', 'Send wish', 'Тилек жазуу', 'Tilak yuborish'],
  wishPh: ['Ваше пожелание…', 'Тілегіңізді жазыңыз…', 'Your wish…', 'Тилегиңизди жазыңыз…', 'Tilagingizni yozing…'],
  wishEmpty: ['Станьте первым, кто оставит пожелание', 'Тілек қалдырған бірінші болыңыз', 'Be the first to leave a wish', 'Биринчи тилек калтырыңыз', "Birinchi bo'lib tilak qoldiring"],
  wishOk: ['Спасибо за тёплые слова!', 'Тілегіңіз үшін рақмет!', 'Thank you for your kind words!', 'Жылуу сөзүңүз үчүн рахмат!', 'Iliq soʻzlaringiz uchun rahmat!'],
  loc: ['ru-RU', 'kk-KZ', 'en-GB', 'ky-KG', 'uz-UZ']
};
const T = {};
LK.forEach((l, i) => { T[l] = {}; for (const k in ROWS) T[l][k] = ROWS[k][i]; });

/* Обращение и основной текст (подставляются на шаге 4; гость видит то, что оставил организатор) */
const SALUT = {
  kk: 'ҚҰРМЕТТІ АҒАЙЫН-ТУЫС, БАУЫРЛАР, ҚҰДА-ЖЕКЖАТ, НАҒАШЫ-ЖИЕН, БӨЛЕЛЕР, ҚҰРБЫ-ҚҰРДАС, ӘПКЕ-ЖЕЗДЕЛЕР, ДОС-ЖАРАНДАР, ӘРІПТЕСТЕР, КӨРШІЛЕР!',
  ru: 'Дорогие родные, близкие, друзья, коллеги и соседи!', en: 'Dear family, friends, colleagues and neighbours!',
  ky: 'Урматтуу туугандар, достор, кесиптештер жана кошуналар!', uz: "Hurmatli qarindosh-urug'lar, do'stlar, hamkasblar va qo'shnilar!"
};
const BODY = {
  kk: 'Сіз(дер)ді «{title}» салтанатына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.',
  ru: 'Приглашаем вас на торжество «{title}». Будем счастливы разделить этот день с вами за нашим дастарханом.',
  en: 'We warmly invite you to «{title}». We would be delighted to celebrate this day with you.',
  ky: '«{title}» майрамына чакырабыз. Бул кубанычтуу күндү сиз менен бөлүшүүгө абдан кубанабыз.',
  uz: "«{title}» tantanamizga taklif qilamiz. Bu quvonchli kunni siz bilan baham ko'rishdan xursand bo'lamiz."
};

/* ---------- Тексты конструктора (кабинет): [ru, kk, en]; для ky/uz используется ru ---------- */
const WROWS = {
  evType: ['Тип мероприятия', 'Іс-шара түрі', 'Event type'],
  tplH: ['Выберите шаблон', 'Үлгіні таңдаңыз', 'Choose a template'], tplTab: ['Шаблоны', 'Үлгілер', 'Templates'],
  vip: ['VIP', 'VIP', 'VIP'], custom: ['Индивидуальный заказ', 'Арнайы тапсырыс', 'Custom order'], soon: ['Скоро', 'Жақында', 'Soon'],
  price: ['/ приглашение', '/ шақыру', '/ invitation'], view: ['СМОТРЕТЬ', 'ҚАРАУ', 'VIEW'],
  howH: ['Как вы хотите создать приглашение?', 'Шақыруды қалай жасағыңыз келеді?', 'How would you like to create it?'],
  howNote: ['Цена одна: сделаете сами или через менеджера', 'Бағасы бірдей: өзіңіз жасасаңыз да, менеджер арқылы да', 'Same price: do it yourself or via a manager'],
  self: ['Сделаю сам', 'Өзім жасаймын', "I'll do it myself"],
  selfSub: ['Введите данные о событии и получите готовое приглашение за несколько минут', 'Той жайлы ақпаратты енгізіп, бірнеше минутта дайын шақыру алыңыз', 'Enter your event details and get a ready invitation in minutes'],
  mgr: ['Через менеджера', 'Менеджер арқылы', 'Via a manager'], mgrSub: ['Наш менеджер поможет вам создать приглашение', 'Біздің менеджер сізге жасауға көмектеседі', 'Our manager will help you create it'],
  mgrBtn: ['Написать менеджеру', 'Менеджерге жазу', 'Message the manager'],
  main: ['Основная информация', 'Негізгі ақпарат', 'Main information'], titleF: ['Название события', 'Іс-шараның атауы', 'Event title'],
  lgroom: ['Имя жениха', 'Үйленетін жігіттің есімін жазыңыз', "Groom's name"], lbride: ['Имя невесты', 'Тұрмысқа шығатын қыздың есімін жазыңыз', "Bride's name"],
  lperson: ['Имя виновника торжества', 'Мерекенің иесінің есімін жазыңыз', "Guest of honour's name"], lchild: ['Имя ребёнка', 'Баланың есімін жазыңыз', "Child's name"],
  dtH: ['Дата и время', 'Өткізілетін күн мен уақыт', 'Date and time'], dateF: ['Дата события', 'Іс-шара күні', 'Event date'],
  timeF: ['Время начала', 'Іс-шара уақыты', 'Start time'], timePh: ['Выберите время', 'Уақытты таңдаңыз', 'Select time'],
  imp: ['Важно', 'Маңызды', 'Important'],
  dtNote: ['Укажите точные дату и время. Они будут показаны на странице приглашения (время Астаны, UTC+5).', 'Дұрыс күні мен уақытын көрсетіңіз. Бұл мәліметтер шақыру бетінде көрсетіледі (Астана уақыты, UTC+5).', 'Enter the exact date and time. They will appear on the invitation page (Astana time, UTC+5).'],
  placeH: ['Адрес мероприятия', 'Іс-шараның мекенжайы', 'Venue address'], cityF: ['Город или населённый пункт', 'Қала, елді мекен немесе ауылыңыздың атауы', 'City or town'],
  addrF: ['Адрес', 'Мекенжай', 'Address'], mapF: ['Ссылка на карту (необязательно)', '2GIS сілтемесі (міндетті емес)', 'Map link (optional)'],
  mapNote: ['Поддерживаются: 2GIS, Google Maps, Яндекс.Карты', 'Қолдау көрсетіледі: 2GIS, Google Maps, Яндекс.Карталар', 'Supported: 2GIS, Google Maps, Yandex Maps'],
  textH: ['Текст приглашения', 'Шақыру мәтіні', 'Invitation text'],
  textNote: ['Внимательно проверьте текст. При необходимости его можно изменить.', 'Шақыру мәтінін мұқият тексеріп шығыңыз. Қажет болса, мәтінді өзгертуге болады.', 'Please check the text carefully. You can edit it if needed.'],
  salutF: ['Обращение к гостям', 'Қонақтарға үндеу', 'Greeting'], bodyF: ['Текст', 'Мәтін', 'Text'], hostsF: ['Хозяева события', 'Іс-шара иелері', 'Hosts'],
  next: ['Далее', 'Келесі', 'Next'], prev: ['Назад', 'Артқа', 'Back'], edit: ['Изменить', 'Өзгерту', 'Edit'], create: ['Создать сайт', 'Сайт жасау', 'Create site'],
  req: ['Заполните обязательные поля', 'Міндетті өрістерді толтырыңыз', 'Please fill in the required fields'],
  doneH: ['Приглашение готово!', 'Шақыру дайын!', 'Your invitation is ready!'], copy: ['Копировать ссылку', 'Сілтемені көшіру', 'Copy link'],
  copied: ['Ссылка скопирована', 'Сілтеме көшірілді', 'Link copied'], guests: ['Гости и ссылки', 'Қонақтар', 'Guests'], toList: ['К моим приглашениям', 'Менің шақыруларым', 'My invitations']
};
const WZ = {};
LK.forEach(l => { const j = l === 'kk' ? 1 : l === 'en' ? 2 : 0; WZ[l] = {}; for (const k in WROWS) WZ[l][k] = WROWS[k][j]; });
