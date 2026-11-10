/**
 * SHTAB TABAKA - Official Web Application Core Logic
 * Fast-food & Chicken Tabaka Grill Delivery in Tashkent
 * Features: Multi-language (RU/UZ), Interactive Menu, Banquet Calculator,
 * Slide-over Cart with localStorage, Telegram Bot API integration, Toast System.
 */

// =============================================================================
// 1. DATASETS: DISHES & MENU ITEMS
// =============================================================================
const DISHES = [
  {
    id: 'tabaka-signature',
    category: 'chicken',
    nameRu: 'Фирменный цыпленок табака с черри и лимоном',
    nameUz: 'Cherri va limonli maxsus tovuq tabaka',
    descRu: 'Целый фермерский цыпленок под гнетом в авторском маринаде из 15 восточных специй, запеченный до золотистой хрустящей корочки. Подается с сочными томатами черри, дольками карамелизированного лимона и чесночной подливкой.',
    descUz: '15 xil sharqona ziravorlar bilan marinadlangan, press ostida qovurilgan butun ferma jo‘jasi. Qarsildoq tillarang qobiq, sersuv cherri pomidorlari, karamellangan limon va maxsus sarimsoqli sous bilan tortiladi.',
    price: 85000,
    oldPrice: 95000,
    weight: '850 г',
    calories: '920 ккал',
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Острота',
    optionsLabelUz: 'Achchiqlik darajasi',
    options: [
      { id: 'mild', nameRu: 'Классический (Неострый)', nameUz: 'Klassik (Achchiqsiz)', priceMod: 0 },
      { id: 'medium', nameRu: 'Среднеострый (С чесноком)', nameUz: 'O‘rtacha achchiq', priceMod: 0 },
      { id: 'hot', nameRu: 'Острый чили', nameUz: 'Achchiq chili', priceMod: 3000 }
    ]
  },
  {
    id: 'tabaka-garlic',
    category: 'chicken',
    nameRu: 'Цыпленок табака в чесночно-сливочном соусе',
    nameUz: 'Sarimsoq-qaymoqli sousdagi tovuq tabaka',
    descRu: 'Классический цыпленок табака, обильно политый горячим чесночно-сливочным соусом со свежей зеленью кинзы и райхона. Нежнейшее сочное мясо, тающее во рту.',
    descUz: 'Issiq sarimsoq-qaymoqli sous, yangi uzilgan kashnich va rayhon bilan boyitilgan klassik tabaka. Og‘izda eriydigan nihoyatda mayin va sersuv go‘sht.',
    price: 88000,
    oldPrice: null,
    weight: '870 г',
    calories: '980 ккал',
    badge: 'halal',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Острота',
    optionsLabelUz: 'Achchiqlik darajasi',
    options: [
      { id: 'standard', nameRu: 'Стандартный чесночный', nameUz: 'Standart sarimsoqli', priceMod: 0 },
      { id: 'extra-garlic', nameRu: 'Двойной чеснок + зелень', nameUz: 'Qo‘shimcha sarimsoq va ko‘kat', priceMod: 4000 }
    ]
  },
  {
    id: 'tabaka-oriental-hot',
    category: 'chicken',
    nameRu: 'Огненный цыпленок табака по-восточному',
    nameUz: 'Sharqona olovli tovuq tabaka',
    descRu: 'Для любителей острых ощущений: цыпленок табака в пряной панировке с перцем халапеньо, паприкой и сушеным барбарисом. Подается с маринованным луком.',
    descUz: 'O‘tkir va achchiq ta’m ishqibozlari uchun: xalapeno qalampiri, shirin paprika va zirk bilan marinadlangan qizg‘in tabaka. Sirkaga bosilgan shirin piyoz bilan.',
    price: 89000,
    oldPrice: 99000,
    weight: '850 г',
    calories: '940 ккал',
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1527477378377-f8319f35952d?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Уровень перца',
    optionsLabelUz: 'Qalampir darajasi',
    options: [
      { id: 'hot-1', nameRu: '🔥 Острый', nameUz: '🔥 Achchiq', priceMod: 0 },
      { id: 'hot-2', nameRu: '🔥🔥 Экстра-острый', nameUz: '🔥🔥 Juda achchiq', priceMod: 2000 }
    ]
  },
  {
    id: 'oyoq-crispy-set',
    category: 'oyoq',
    nameRu: 'Хрустящие куриные ножки Oyoq (Сеты 4, 8, 12 шт)',
    nameUz: 'Qarsildoq tovuq oyoqchalari Oyoq (4, 8, 12 dona)',
    descRu: 'Ароматные куриные голени в золотистой хрустящей панировке со специями. Снаружи ультра-хруст, внутри сочнейшее мясо. Подаются с фирменным красным соусом.',
    descUz: 'Ziravorli tillarang qarsildoq qoplamadagi xushbo‘y tovuq boldirlari. Tashqarisi karsillagan, ichi esa sersuv va mayin. Maxsus qizil sous bilan taqdim etiladi.',
    price: 45000,
    oldPrice: 50000,
    weight: 'от 380 г',
    calories: '680 ккал',
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Размер сета',
    optionsLabelUz: 'Set hajmi',
    options: [
      { id: 'set-4', nameRu: 'Сет 4 шт (380г)', nameUz: '4 talik set (380g)', priceMod: 0 },
      { id: 'set-8', nameRu: 'Сет 8 шт (750г)', nameUz: '8 talik set (750g)', priceMod: 40000 },
      { id: 'set-12', nameRu: 'Сет 12 шт (1.1кг)', nameUz: '12 talik set (1.1kg)', priceMod: 75000 }
    ]
  },
  {
    id: 'oyoq-spicy-bbq',
    category: 'oyoq',
    nameRu: 'Куриные ножки Oyoq в глазури BBQ & Мед',
    nameUz: 'BBQ va asal glazuridagi Oyoq tovuq oyoqchalari',
    descRu: 'Запеченные куриные ножки, покрытые тягучей карамельной глазурью с дымком барбекю и натуральным горным медом. Посыпаются жареным белым кунжутом.',
    descUz: 'Barbekyu tutuni va tabiiy tog‘ asali qo‘shilgan karamelli sir bilan qoplangan tovuq boldirlari. Qovurilgan oq kunjut sepilgan.',
    price: 49000,
    oldPrice: null,
    weight: '420 г (4 шт)',
    calories: '740 ккал',
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Порция',
    optionsLabelUz: 'Porsiya',
    options: [
      { id: 'bbq-4', nameRu: '4 шт в глазури', nameUz: '4 dona glazurda', priceMod: 0 },
      { id: 'bbq-8', nameRu: '8 шт в глазури', nameUz: '8 dona glazurda', priceMod: 44000 }
    ]
  },
  {
    id: 'set-sultan-banquet',
    category: 'tadbir',
    nameRu: 'Большой банкетный сет в фольге с карвинг-нарезкой (Sultan)',
    nameUz: 'Sulton katta banket seti (Zarbof folgada va karving sabzavotlar)',
    descRu: 'Грандиозный банкетный сет для свадеб и торжеств: 3 целых цыпленка табака, 12 хрустящих ножек Oyoq, золотистый картофель по-деревенски, овощная карвинг-нарезка, 4 фирменных соуса и горячий узбекский лаваш.',
    descUz: 'To‘y va tantanalar uchun ulkan sultonona set: 3 ta butun tovuq tabaka, 12 ta qarsildoq Oyoq boldirlari, qishloqcha uslubdagi tillarang kartoshka, karving san’ati bilan bezatilgan sabzavotlar, 4 xil maxsus sous va issiq non.',
    price: 360000,
    oldPrice: 410000,
    weight: '4.5 кг',
    calories: '4200 ккал',
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Комплектация',
    optionsLabelUz: 'Tarkibi',
    options: [
      { id: 'sultan-base', nameRu: 'Стандарт (3 цыпленка + 12 ножек)', nameUz: 'Standart (3 tovuq + 12 oyoq)', priceMod: 0 },
      { id: 'sultan-plus', nameRu: 'VIP (+ самса 6 шт и напитки)', nameUz: 'VIP (+ 6 dona somsa va ichimlik)', priceMod: 65000 }
    ]
  },
  {
    id: 'set-family-fest',
    category: 'tadbir',
    nameRu: 'Семейный сет «Оилавий Штаб»',
    nameUz: '«Oilaviy Shtab» jamlanmasi',
    descRu: 'Идеальный выбор для семьи из 4-6 человек: 2 сочных цыпленка табака, двойная порция картофеля фри, салат Ачик-чучук, 2 фирменных соуса и Coca-Cola 1.5 л.',
    descUz: '4-6 kishilik oila uchun ajoyib to‘plam: 2 ta sersuv tovuq tabaka, ikki barobar kartoshka fri, Achchiq-chuchuk salati, 2 xil sous va 1.5 litrlik Coca-Cola.',
    price: 215000,
    oldPrice: 245000,
    weight: '2.6 кг',
    calories: '2800 ккал',
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Напиток',
    optionsLabelUz: 'Ichimlik',
    options: [
      { id: 'cola', nameRu: 'Coca-Cola 1.5L', nameUz: 'Coca-Cola 1.5L', priceMod: 0 },
      { id: 'fanta', nameRu: 'Fanta 1.5L', nameUz: 'Fanta 1.5L', priceMod: 0 },
      { id: 'mors', nameRu: 'Домашний морс 1L', nameUz: 'Uy mors 1L', priceMod: 5000 }
    ]
  },
  {
    id: 'set-oyoq-party',
    category: 'tadbir',
    nameRu: 'Сет «Oyoq Party» на компанию (16 ножек)',
    nameUz: '«Oyoq Party» do‘stlar uchun set (16 dona)',
    descRu: '16 аппетитных куриных ножек в двух видах панировки (хрустящие классические и пикантные), большая порция картофеля фри и 3 фирменных соуса.',
    descUz: '16 dona ishtahabop tovuq boldirlari (klassik va ziravorli), katta porsiya kartoshka fri va 3 ta mualliflik sousi.',
    price: 185000,
    oldPrice: 210000,
    weight: '1.8 кг',
    calories: '2200 ккал',
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Соусы',
    optionsLabelUz: 'Souslar',
    options: [
      { id: 'trio-std', nameRu: 'Чесночный + Томатный + BBQ', nameUz: 'Sarimsoqli + Pomidorli + BBQ', priceMod: 0 },
      { id: 'trio-hot', nameRu: 'Острый чили + Чесночный + Сырный', nameUz: 'Achchiq chili + Sarimsoq + Pishloqli', priceMod: 3000 }
    ]
  },
  {
    id: 'side-french-fries',
    category: 'sides',
    nameRu: 'Хрустящий картофель фри с паприкой',
    nameUz: 'Paprikali qarsildoq kartoshka fri',
    descRu: 'Отборные ломтики золотистого картофеля, обжаренные до идеального хруста с добавлением сладкой паприки и морской соли.',
    descUz: 'Maxsus navli kartoshkadan tayyorlangan, shirin paprika va dengiz tuzi sepilgan tillarang qarsildoq fri.',
    price: 22000,
    oldPrice: null,
    weight: '200 г',
    calories: '380 ккал',
    badge: 'halal',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Размер',
    optionsLabelUz: 'Hajmi',
    options: [
      { id: 'fries-std', nameRu: 'Стандарт (200 г)', nameUz: 'Standart (200 g)', priceMod: 0 },
      { id: 'fries-big', nameRu: 'Большая (350 г)', nameUz: 'Katta (350 g)', priceMod: 14000 }
    ]
  },
  {
    id: 'side-country-potatoes',
    category: 'sides',
    nameRu: 'Картофель по-деревенски со специями',
    nameUz: 'Sharqona ziravorli qishloqcha kartoshka',
    descRu: 'Крупные дольки картофеля в кожуре с розмарином, чесноком и тимьяном. Мягкие внутри и хрустящие снаружи.',
    descUz: 'Rozmarin, sarimsoq va tog‘ kiyik o‘ti bilan duxovkada pishirilgan to‘yimli kartoshka tilimlari.',
    price: 24000,
    oldPrice: null,
    weight: '250 г',
    calories: '410 ккал',
    badge: 'halal',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Приправа',
    optionsLabelUz: 'Ziravor',
    options: [
      { id: 'country-herbs', nameRu: 'С розмарином и чесноком', nameUz: 'Rozmarin va sarimsoq bilan', priceMod: 0 },
      { id: 'country-spicy', nameRu: 'С острым перцем чили', nameUz: 'Achchiq qalampir bilan', priceMod: 2000 }
    ]
  },
  {
    id: 'salad-achichuk',
    category: 'sides',
    nameRu: 'Свежий салат «Ачик-чучук» с райхоном',
    nameUz: 'Yangi uzilgan rayhonli «Achchiq-chuchuk» salati',
    descRu: 'Традиционный узбекский салат из сладких юсуповских помидоров, тонко нарезанного лука, свежего фиолетового райхона и острого стручкового перца.',
    descUz: 'Shirin Yusupov pomidorlari, yupqa to‘g‘ralgan piyoz, xushbo‘y binafsharang rayhon va qalampirli milliy salat.',
    price: 18000,
    oldPrice: null,
    weight: '220 г',
    calories: '85 ккал',
    badge: 'halal',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Перец',
    optionsLabelUz: 'Qalampir',
    options: [
      { id: 'salad-mild', nameRu: 'Неострый', nameUz: 'Achchiqsiz', priceMod: 0 },
      { id: 'salad-hot', nameRu: 'С острым перцем', nameUz: 'Achchiq qalampir bilan', priceMod: 0 }
    ]
  },
  {
    id: 'salad-carving-platter',
    category: 'sides',
    nameRu: 'Овощная нарезка «Карвинг Ассорти»',
    nameUz: '«Karving Assorti» sabzavotlar kompozitsiyasi',
    descRu: 'Праздничное блюдо из фигурно нарезанных огурцов, сочных томатов, болгарского перца, редиса, оливок и букета свежей зелени.',
    descUz: 'Figurali to‘g‘ralgan bodring, pomidor, bulg‘or qalampiri, turp, zaytun va ko‘katlardan iborat tantanali likopcha.',
    price: 32000,
    oldPrice: null,
    weight: '450 г',
    calories: '110 ккал',
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Подача',
    optionsLabelUz: 'Taqdim etish',
    options: [
      { id: 'carving-std', nameRu: 'Классическая сервировка', nameUz: 'Klassik taqdimot', priceMod: 0 }
    ]
  },
  {
    id: 'sauce-white-garlic',
    category: 'drinks',
    nameRu: 'Фирменный белый чесночный соус «Штаб»',
    nameUz: '«Shtab» oq maxsus sarimsoqli sousi',
    descRu: 'Густой чесночный соус на основе натурального сюзьма-йогурта с зеленью и белым перцем. Идеальная пара к цыпленку табака.',
    descUz: 'Suzma, sarimsoq, tog‘ giyohlari va oq murch asosida tayyorlangan maxsus sous. Tabaka uchun eng zo‘r tanlov.',
    price: 6000,
    oldPrice: null,
    weight: '80 г',
    calories: '140 ккал',
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Порция',
    optionsLabelUz: 'Porsiya',
    options: [
      { id: 'sauce-1', nameRu: '1 шт (80 г)', nameUz: '1 dona (80 g)', priceMod: 0 },
      { id: 'sauce-2', nameRu: '2 шт (160 г)', nameUz: '2 dona (160 g)', priceMod: 5000 }
    ]
  },
  {
    id: 'sauce-red-tomato',
    category: 'drinks',
    nameRu: 'Фирменный красный томатно-кинзовый соус',
    nameUz: '«Shtab» qizil pomidor va kashnichli sous',
    descRu: 'Пряный соус из спелых томатов, запеченного сладкого перца, свежей кинзы и чеснока. С легкой пикантной ноткой.',
    descUz: 'Pishgan pomidor, qovurilgan bulg‘or qalampiri, sarimsoq va kashnich qo‘shilgan mazali qizil sous.',
    price: 6000,
    oldPrice: null,
    weight: '80 г',
    calories: '65 ккал',
    badge: 'halal',
    image: 'https://images.unsplash.com/photo-1589135233689-d56d115981ee?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Порция',
    optionsLabelUz: 'Porsiya',
    options: [
      { id: 'red-1', nameRu: '1 шт (80 г)', nameUz: '1 dona (80 g)', priceMod: 0 },
      { id: 'red-2', nameRu: '2 шт (160 г)', nameUz: '2 dona (160 g)', priceMod: 5000 }
    ]
  },
  {
    id: 'drink-berry-mors',
    category: 'drinks',
    nameRu: 'Домашний ягодный морс (1 Литр)',
    nameUz: 'Uy sharoitida tayyorlangan rezavorli mors (1 Litr)',
    descRu: 'Натуральный охлаждающий напиток из вишни, черной смородины и клюквы без красителей и консервантов. Идеально утоляет жажду.',
    descUz: 'Olcha, smorodina va klyukvadan tabiiy tayyorlangan, muzdek tetiklashtiruvchi mevali mors.',
    price: 22000,
    oldPrice: 26000,
    weight: '1000 мл',
    calories: '180 ккал',
    badge: 'hit',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Температура',
    optionsLabelUz: 'Harorati',
    options: [
      { id: 'mors-cold', nameRu: 'Ледяной из холодильника', nameUz: 'Muzdek sovutilgan', priceMod: 0 },
      { id: 'mors-room', nameRu: 'Комнатной температуры', nameUz: 'Xona haroratida', priceMod: 0 }
    ]
  },
  {
    id: 'drink-cola-original',
    category: 'drinks',
    nameRu: 'Coca-Cola Classic (1.5 л, ледяная)',
    nameUz: 'Coca-Cola Classic (1.5 litr, muzdek)',
    descRu: 'Классическая газировка в бутылке 1.5 литра. Доставляется сильно охлажденной.',
    descUz: 'Klassik yaxna gazlangan ichimlik 1.5 litr. Yetkazilganda muzdek holda bo‘ladi.',
    price: 18000,
    oldPrice: null,
    weight: '1500 мл',
    calories: '630 ккал',
    badge: 'halal',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    optionsLabelRu: 'Вид напитка',
    optionsLabelUz: 'Ichimlik turi',
    options: [
      { id: 'coke', nameRu: 'Coca-Cola Classic', nameUz: 'Coca-Cola Classic', priceMod: 0 },
      { id: 'fanta', nameRu: 'Fanta Orange', nameUz: 'Fanta Orange', priceMod: 0 },
      { id: 'sprite', nameRu: 'Sprite Lemon-Lime', nameUz: 'Sprite Lemon-Lime', priceMod: 0 }
    ]
  }
];

// =============================================================================
// 2. MULTI-LANGUAGE TRANSLATION DICTIONARY (RU / UZ)
// =============================================================================
const I18N = {
  ru: {
    brandSubtitle: 'Цыпленок гриль & табака • Ташкент',
    navMenu: 'Меню',
    navEvents: 'Мероприятия',
    navCalc: 'Калькулятор банкета',
    navAbout: 'О нас',
    navBranches: 'Филиалы',
    navFaq: 'Отзывы & FAQ',
    callBtn: 'Позвонить',
    cartBtn: 'Корзина',
    heroTicker: '⭐ TADBIR VA MAROSIMLAR UCHUN BUYURTMALAR QABUL QILAMIZ — ПРИНИМАЕМ ЗАКАЗЫ НА МЕРОПРИЯТИЯ ⭐',
    badgeHalal: '100% Халяль',
    badgeExpress: 'Экспресс-доставка за 40 мин',
    heroTitle1: 'НАСТОЯЩИЙ ЦЫПЛЕНОК ТАБАКА',
    heroTitle2: 'И СОЧНЫЕ НОЖКИ В ТАШКЕНТЕ',
    heroDesc: 'Фирменный секретный маринад из 15 специй, свежая фермерская курица и хрустящая золотистая корочка под гнетом. Доставляем обжигающе горячим прямо к вашему дастархану!',
    heroBtnMenu: 'Открыть меню',
    heroBtnEvent: 'Заказать на банкет',
    statCustomers: '5 000+ довольных гостей',
    statHalal: '100% Halol sertifikatlangan',
    statSpeed: 'до 40 мин по городу',
    
    advFreshTitle: 'Фермерская свежесть',
    advFreshDesc: 'Используем только охлажденных суточных цыплят',
    advMarinadeTitle: 'Авторский маринад',
    advMarinadeDesc: 'Выдержка 12 часов в травах и восточных специях',
    advSpeedTitle: 'Термо-доставка за 40 мин',
    advSpeedDesc: 'Специальные термобоксы сохраняют хруст и жар',
    advEventTitle: 'Праздники под ключ',
    advEventDesc: 'Специальные сеты на To\'y, Marosimlar и Iftorlik',

    menuSectionSub: 'Наш аппетитный каталог',
    menuSectionTitle: 'Фирменное меню SHTAB TABAKA',
    menuSectionDesc: 'Все блюда готовятся непосредственно после подтверждения заказа на открытом огне и под гнетом.',
    catAll: 'Все блюда',
    catChicken: 'Chicken (Tovuq) — Табака',
    catOyoq: 'Oyoq — Куриные ножки',
    catTadbir: 'Праздничные сеты',
    catSides: 'Гарниры и салаты',
    catDrinks: 'Соусы и напитки',
    searchPlaceholder: 'Поиск вкусного блюда...',
    sortLabel: 'Сортировка:',
    sortPopular: 'По популярности',
    sortPriceAsc: 'Сначала дешевле',
    sortPriceDesc: 'Сначала дороже',
    addToCart: 'В корзину',
    addedToCart: 'Добавлено!',
    emptyMenuText: 'По вашему запросу ничего не найдено. Попробуйте изменить фильтр.',

    eventsSub: 'Банкеты и традиции',
    eventsTitle: 'Заказы на мероприятия и торжества',
    eventsDesc: 'Готовим щедрые дастарханы на любые события: Свадьбы (To\'y), Маросим (Xudoyi), Дни рождения, Корпоративы и Ифтар.',
    eventsBannerTitle: 'Большие объемы — особая забота и выгода!',
    eventsBannerText: 'При заказе от 30 порций предоставляем индивидуальную скидку до 15%, бесплатную термо-доставку в фольге к точному времени и сервировку овощным карвингом.',
    calcGuestsLabel: 'Количество гостей:',
    calcTypeLabel: 'Тип мероприятия:',
    calcPackageLabel: 'Уровень дастархана:',
    calcResultTitle: 'Предварительный расчет банкета',
    calcResultSub: 'Ориентировочная комплектация стола:',
    calcTovuqCount: 'Целых цыплят табака (Tovuq):',
    calcOyoqCount: 'Хрустящих ножек Oyoq:',
    calcSidesCount: 'Гарниров и салатов:',
    calcSauceCount: 'Фирменных соусов и лаваша:',
    calcPerPerson: 'Цена на одного гостя:',
    calcTotalSum: 'ИТОГО К ОПЛАТЕ:',
    calcDiscountText: 'Применена скидка за объем:',
    calcOrderBtn: 'Оформить предзаказ на банкет',

    aboutSub: 'Наша история',
    aboutTitle: 'Вкус, за которым возвращаются семьями',
    aboutText1: '«SHTAB TABAKA» — это заведение, основанное на любви к аутентичным традициям приготовления цыпленка табака. Мы соединили старинный кавказский рецепт жарки под тяжелым прессом и колорит узбекских специй: отборный черный перец, райхон, кориандр и сладкую паприку.',
    aboutText2: 'Каждое утро на наши кухни поступает свежая охлажденная фермерская птица со строгим соблюдением стандартов Halal. Мы никогда не используем заморозку или полуфабрикаты.',
    aboutFeat1Title: 'Строгий Халяль контроль',
    aboutFeat1Desc: 'Все поставщики проверены и имеют соответствующие сертификаты.',
    aboutFeat2Title: 'Особый температурный режим',
    aboutFeat2Desc: 'Жарим на чистом масле при температуре 190°C для хрустящей корочки.',
    aboutFeat3Title: 'Пунктуальность для маросимлар',
    aboutFeat3Desc: 'Доставляем точно к назначенному часу минута в минуту.',

    branchesSub: 'Где мы находимся',
    branchesTitle: 'Наши филиалы в Ташкенте',
    branchesDesc: 'Вы можете забрать заказ самовывозом со скидкой 5% или оформить доставку до двери.',
    branchStatusOpen: 'Открыто сейчас (до 23:00)',
    branchSchedule: 'Ежедневно: 10:00 — 23:00',
    branchBtnCall: 'Позвонить',
    branchBtnRoute: 'Яндекс.Карты',
    branchQrText: 'Наведите камеру смартфона, чтобы открыть точку на карте',
    instaTextTitle: 'Мы в Instagram @shtabtabaka',
    instaTextDesc: 'Смотрите аппетитные видео приготовления, закулисье кухни и розыгрыши сетов!',
    instaBtn: 'Перейти в Instagram',

    reviewsSub: 'Что говорят гости',
    reviewsTitle: 'Отзывы наших постоянных клиентов',
    faqSub: 'Остались вопросы?',
    faqTitle: 'Часто задаваемые вопросы (FAQ)',

    cartTitle: 'Ваша корзина',
    cartEmptyTitle: 'В корзине пока пусто',
    cartEmptyDesc: 'Выберите аппетитного цыпленка или хрустящие ножки в меню!',
    deliveryTypeDelivery: 'Доставка',
    deliveryTypePickup: 'Самовывоз',
    selectBranchLabel: 'Выберите филиал:',
    promoPlaceholder: 'ПРОМОКОД',
    promoApplyBtn: 'Применить',
    promoSuccess: 'Промокод активирован!',
    promoError: 'Неверный промокод',
    cartSubtotal: 'Сумма блюд:',
    cartDiscount: 'Скидка:',
    cartDeliveryFee: 'Доставка:',
    cartFreeDelivery: 'Бесплатно (от 250 000 сум)',
    cartTotal: 'Итого к оплате:',
    cartCheckoutBtn: 'Оформить заказ',

    modalCheckoutTitle: 'Оформление доставки',
    modalEventTitle: 'Заявка на мероприятие / Банкет',
    labelName: 'Ваше имя *',
    labelPhone: 'Номер телефона *',
    labelAddress: 'Адрес доставки (район, улица, дом, ориентир) *',
    labelComment: 'Комментарий к заказу (этаж, код двери, пожелания)',
    labelPayment: 'Способ оплаты:',
    payCash: 'Наличными',
    payClick: 'Click',
    payPayme: 'Payme',
    btnSendOrder: 'Подтвердить и отправить заказ',
    btnSendEvent: 'Отправить заявку на банкет',

    tgModalTitle: 'Настройки Telegram-бота',
    tgModalDesc: 'Укажите BOT_TOKEN и CHAT_ID для приема реальных заказов в ваш Telegram канал или группу:',
    tgSaveBtn: 'Сохранить настройки',
    tgTestBtn: 'Проверить отправку',
    
    orderSuccessToast: 'Ваш заказ успешно сформирован и передан оператору!',
    orderDemoToast: 'Заказ отправлен! (Внимание: Telegram Bot Token работает в штатном режиме)',
    copySuccessToast: 'Скопировано в буфер обмена!'
  },
  uz: {
    brandSubtitle: 'Gril tovuq & tabaka • Toshkent',
    navMenu: 'Menyu',
    navEvents: 'Tadbirlar',
    navCalc: 'Banket kalkulyatori',
    navAbout: 'Biz haqimizda',
    navBranches: 'Filiallar',
    navFaq: 'Fikrlar & FAQ',
    callBtn: 'Qo‘ng‘iroq',
    cartBtn: 'Savat',
    heroTicker: '⭐ TADBIR VA MAROSIMLAR UCHUN BUYURTMALAR QABUL QILAMIZ — ISHONCHLI VA MAZALI! ⭐',
    badgeHalal: '100% Halol',
    badgeExpress: '40 daqiqada tezkor yetkazish',
    heroTitle1: 'HAQIQIY TOVUQ TABAKA',
    heroTitle2: 'VA SHIRALI QARSILDOQ OYOQ',
    heroDesc: '15 xil sharqona ziravorlardan iborat maxsus marinad, yangi ferma tovuqlari va press ostida qovurilgan qarsildoq tilla qobiq. Dasturxoningizga qaynoq holda yetkazib beramiz!',
    heroBtnMenu: 'Menyuni ochish',
    heroBtnEvent: 'Tadbirga buyurtma',
    statCustomers: '5 000+ mamnun mijozlar',
    statHalal: '100% Halol kafolati',
    statSpeed: 'Toshkent bo‘ylab 40 min',

    advFreshTitle: 'Ferma sofligi',
    advFreshDesc: 'Faqat kunlik yangi so‘yilgan tovuqlardan foydalanamiz',
    advMarinadeTitle: 'Mualliflik marinadi',
    advMarinadeDesc: '12 soat davomida maxsus ziravorlarda saqlanadi',
    advSpeedTitle: 'Termo-yetkazish 40 min',
    advSpeedDesc: 'Maxsus termobokslar issiqlik va qarsildoqni saqlaydi',
    advEventTitle: 'Marosimlar uchun',
    advEventDesc: 'To‘y, Ehson, Marosim va Iftorlik uchun katta setlar',

    menuSectionSub: 'Bizning ishtahabop taomnoma',
    menuSectionTitle: 'SHTAB TABAKA maxsus menyusi',
    menuSectionDesc: 'Har bir taom buyurtma tasdiqlangach ochiq olovda va press ostida pishiriladi.',
    catAll: 'Barchasi',
    catChicken: 'Chicken (Tovuq) — Tabaka',
    catOyoq: 'Oyoq — Tovuq oyoqchalari',
    catTadbir: 'Tadbir setlari',
    catSides: 'Garnir va salatlar',
    catDrinks: 'Sous va ichimliklar',
    searchPlaceholder: 'Mazali taomni qidirish...',
    sortLabel: 'Saralash:',
    sortPopular: 'Ommabopligi bo‘yicha',
    sortPriceAsc: 'Avval arzonlari',
    sortPriceDesc: 'Avval qimmatlari',
    addToCart: 'Savatga',
    addedToCart: 'Qo‘shildi!',
    emptyMenuText: 'Ushbu so‘rov bo‘yicha hech narsa topilmadi.',

    eventsSub: 'Tadbirlar va an’analar',
    eventsTitle: 'Tadbirlar va marosimlar uchun buyurtmalar',
    eventsDesc: 'To‘y, Ehson (Xudoyi), Tug‘ilgan kun, Korporativ va Iftorlik dasturxonlari uchun katta hajmda buyurtmalar qabul qilamiz.',
    eventsBannerTitle: 'Katta buyurtmalar uchun maxsus chegirmalar!',
    eventsBannerText: '30 tadan ortiq porsiya buyurtma qilganda 15% gacha chegirma, belgilangan vaqtga issiq folgada yetkazish va karving sabzavotlar sovg‘a qilinadi.',
    calcGuestsLabel: 'Mehmonlar soni:',
    calcTypeLabel: 'Tadbir turi:',
    calcPackageLabel: 'Dasturxon darajasi:',
    calcResultTitle: 'Tadbir dasturxonini hisoblash',
    calcResultSub: 'Dasturxon uchun tavsiya etilgan taomlar:',
    calcTovuqCount: 'Butun tovuq tabaka (Tovuq):',
    calcOyoqCount: 'Qarsildoq tovuq Oyoqchalari:',
    calcSidesCount: 'Garnir va salatlar porsiyasi:',
    calcSauceCount: 'Maxsus souslar va issiq non:',
    calcPerPerson: 'Bir mehmonga to‘g‘ri keladigan summa:',
    calcTotalSum: 'JAMI TO‘LOV:',
    calcDiscountText: 'Hajm uchun chegirma qo‘llandi:',
    calcOrderBtn: 'Tadbirga buyurtma berish',

    aboutSub: 'Bizning tariximiz',
    aboutTitle: 'Mijozlar qayta-qayta keladigan haqiqiy ta’m',
    aboutText1: '«SHTAB TABAKA» — haqiqiy tovuq tabaka tayyorlash an’analariga sodiq maskan. Biz qadimiy tog‘ uslubidagi og‘ir press ostida qovurish texnologiyasini sharqona rayhon, qora murch va shirin paprika ifori bilan birlashtirdik.',
    aboutText2: 'Har kuni ertalab oshxonamizga Halol standartlariga to‘liq javob beradigan yangi tovuq go‘shti keltiriladi. Muzlatilgan mahsulotlardan aslo foydalanmaymiz.',
    aboutFeat1Title: 'Qat’iy Halol nazorat',
    aboutFeat1Desc: 'Barcha yetkazib beruvchilar tekshirilgan va sertifikatlarga ega.',
    aboutFeat2Title: 'Maxsus pishirish harorati',
    aboutFeat2Desc: 'Toza o‘simlik yog‘ida 190°C haroratda qovuriladi.',
    aboutFeat3Title: 'Marosimlar uchun aniqlik',
    aboutFeat3Desc: 'Katta ehson va marosimlarga daqiqasigacha o‘z vaqtida yetkazamiz.',

    branchesSub: 'Manzillarimiz',
    branchesTitle: 'Toshkentdagi filiallarimiz',
    branchesDesc: 'Buyurtmani o‘zingiz olib ketib 5% tejashingiz yoki tezkor yetkazib berish xizmatidan foydalanishingiz mumkin.',
    branchStatusOpen: 'Hozir ochiq (23:00 gacha)',
    branchSchedule: 'Har kuni: 10:00 — 23:00',
    branchBtnCall: 'Qo‘ng‘iroq qilish',
    branchBtnRoute: 'Yandex Xarita',
    branchQrText: 'Xaritada ochish uchun kamerani QR-kodga qarating',
    instaTextTitle: 'Instagram sahifamiz @shtabtabaka',
    instaTextDesc: 'Ishtahaochar videoroliklar, pishirish jarayoni va maxsus tanlovlarimizni kuzating!',
    instaBtn: 'Instagramga o‘tish',

    reviewsSub: 'Mijozlar fikri',
    reviewsTitle: 'Doimiy mehmonlarimizning sharhlari',
    faqSub: 'Savollaringiz bormi?',
    faqTitle: 'Ko‘p beriladigan savollar (FAQ)',

    cartTitle: 'Sizning savatingiz',
    cartEmptyTitle: 'Savatingiz hozircha bo‘sh',
    cartEmptyDesc: 'Menyudan mazali tabaka yoki qarsildoq oyoqchalarni tanlang!',
    deliveryTypeDelivery: 'Yetkazib berish',
    deliveryTypePickup: 'Olib ketish',
    selectBranchLabel: 'Filialni tanlang:',
    promoPlaceholder: 'PROMOKOD',
    promoApplyBtn: 'Qo‘llash',
    promoSuccess: 'Promokod qabul qilindi!',
    promoError: 'Noto‘g‘ri promokod',
    cartSubtotal: 'Taomlar narxi:',
    cartDiscount: 'Chegirma:',
    cartDeliveryFee: 'Yetkazib berish:',
    cartFreeDelivery: 'Bepul (250 000 so‘mdan yuqori)',
    cartTotal: 'Jami to‘lov:',
    cartCheckoutBtn: 'Buyurtmani rasmiylashtirish',

    modalCheckoutTitle: 'Buyurtmani rasmiylashtirish',
    modalEventTitle: 'Tadbir va marosim uchun buyurtma',
    labelName: 'Ismingiz *',
    labelPhone: 'Telefon raqamingiz *',
    labelAddress: 'Yetkazish manzili (tuman, ko‘cha, uy, mo‘ljal) *',
    labelComment: 'Izoh (qavat, eshik kodi yoki maxsus istaklar)',
    labelPayment: 'To‘lov usuli:',
    payCash: 'Naqd pul',
    payClick: 'Click',
    payPayme: 'Payme',
    btnSendOrder: 'Buyurtmani tasdiqlash va yuborish',
    btnSendEvent: 'Tadbir buyurtmasini yuborish',

    tgModalTitle: 'Telegram-bot sozlamalari',
    tgModalDesc: 'Saytdan keladigan buyurtmalarni o‘z Telegram guruhingizga qabul qilish uchun quyidagilarni kiriting:',
    tgSaveBtn: 'Sozlamalarni saqlash',
    tgTestBtn: 'Sinov xabarini yuborish',

    orderSuccessToast: 'Buyurtmangiz muvaffaqiyatli qabul qilindi! Operatorimiz tez orada bog‘lanadi.',
    orderDemoToast: 'Buyurtma jo‘natildi! (Eslatma: Telegram bot rejimida ishlamoqda)',
    copySuccessToast: 'Nusxalandi!'
  }
};

// =============================================================================
// 3. APPLICATION STATE & LOCAL STORAGE
// =============================================================================
let currentLang = localStorage.getItem('shtab_lang') || 'ru';
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'popular';
let cart = JSON.parse(localStorage.getItem('shtab_cart') || '[]');
let activePromo = null;
let deliveryType = 'delivery'; // 'delivery' or 'pickup'
let selectedBranch = 'shtab-main'; // 'shtab-main' or 'chilonzor'

// Telegram Bot Credentials (Stored in localStorage or default fallback)
const DEFAULT_TG_BOT_TOKEN = '8153406560:AAFX7mY_7t87yA1q7j76cIqXp0qPexample';
const DEFAULT_TG_CHAT_ID = '-1002233445566';

let tgBotToken = localStorage.getItem('shtab_tg_token') || DEFAULT_TG_BOT_TOKEN;
let tgChatId = localStorage.getItem('shtab_tg_chat_id') || DEFAULT_TG_CHAT_ID;

// Delivery Pricing Constant
const DELIVERY_FLAT_FEE = 20000; // 20,000 UZS
const FREE_DELIVERY_THRESHOLD = 250000; // Free delivery above 250k UZS

// =============================================================================
// 4. FORMATTING UTILITIES
// =============================================================================
function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS';
}

function showToast(message, type = 'success', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconHtml = '🍗';
  if (type === 'error') iconHtml = '⚠️';
  if (type === 'success') iconHtml = '✅';

  toast.innerHTML = `
    <span class="toast-icon">${iconHtml}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, duration);
}

// =============================================================================
// 5. LANGUAGE CONTROLLER & I18N RENDERER
// =============================================================================
function setLanguage(lang) {
  if (lang !== 'ru' && lang !== 'uz') lang = 'ru';
  currentLang = lang;
  localStorage.setItem('shtab_lang', lang);

  // Update switcher button classes
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[currentLang] && I18N[currentLang][key]) {
      el.textContent = I18N[currentLang][key];
    }
  });

  // Translate placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[currentLang] && I18N[currentLang][key]) {
      el.placeholder = I18N[currentLang][key];
    }
  });

  // Re-render dynamic components
  renderMenu();
  renderCart();
  calculateBanquet();
}

// =============================================================================
// 6. MENU RENDERING & FILTERS
// =============================================================================
function getFilteredDishes() {
  return DISHES.filter(dish => {
    const matchesCat = (activeCategory === 'all') || (dish.category === activeCategory);
    const searchLow = searchQuery.toLowerCase().trim();
    const nameMatch = (currentLang === 'ru' ? dish.nameRu : dish.nameUz).toLowerCase().includes(searchLow) ||
                      dish.nameRu.toLowerCase().includes(searchLow) ||
                      dish.nameUz.toLowerCase().includes(searchLow);
    const descMatch = (currentLang === 'ru' ? dish.descRu : dish.descUz).toLowerCase().includes(searchLow);
    return matchesCat && (nameMatch || descMatch);
  }).sort((a, b) => {
    if (currentSort === 'price-asc') return a.price - b.price;
    if (currentSort === 'price-desc') return b.price - a.price;
    return (b.badge === 'hit' ? 1 : 0) - (a.badge === 'hit' ? 1 : 0);
  });
}

function renderMenu() {
  const container = document.getElementById('dishes-container');
  if (!container) return;

  const dishes = getFilteredDishes();

  if (dishes.length === 0) {
    container.innerHTML = `
      <div class="empty-menu-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3>${I18N[currentLang].emptyMenuText}</h3>
      </div>
    `;
    return;
  }

  container.innerHTML = dishes.map(dish => {
    const title = currentLang === 'ru' ? dish.nameRu : dish.nameUz;
    const desc = currentLang === 'ru' ? dish.descRu : dish.descUz;
    const optLabel = currentLang === 'ru' ? dish.optionsLabelRu : dish.optionsLabelUz;
    
    let badgeHtml = '';
    if (dish.badge === 'hit') {
      badgeHtml = `<span class="dish-badge badge-hit">🔥 ${currentLang === 'ru' ? 'ХИТ' : 'XIT'}</span>`;
    } else if (dish.badge === 'new') {
      badgeHtml = `<span class="dish-badge badge-new">✨ ${currentLang === 'ru' ? 'НОВИНКА' : 'YANGI'}</span>`;
    } else if (dish.badge === 'halal') {
      badgeHtml = `<span class="dish-badge badge-halal">✅ HALAL</span>`;
    }

    const optionsHtml = dish.options && dish.options.length > 0 ? `
      <div class="dish-options-row">
        <span class="dish-option-label">${optLabel}:</span>
        <div class="dish-option-pills" id="opt-pills-${dish.id}">
          ${dish.options.map((opt, idx) => `
            <button type="button" 
              class="option-pill ${idx === 0 ? 'active' : ''}" 
              data-dish-id="${dish.id}" 
              data-opt-id="${opt.id}" 
              data-price-mod="${opt.priceMod}"
              onclick="selectDishOption('${dish.id}', '${opt.id}')">
              ${currentLang === 'ru' ? opt.nameRu : opt.nameUz}
            </button>
          `).join('')}
        </div>
      </div>
    ` : '';

    return `
      <div class="dish-card" id="card-${dish.id}" data-category="${dish.category}">
        <div class="dish-media-wrap">
          ${badgeHtml}
          <img src="${dish.image}" alt="${title}" class="dish-img" loading="lazy" />
          <span class="dish-weight-tag">${dish.weight} • ${dish.calories}</span>
        </div>
        <div class="dish-details">
          <h4 class="dish-title">${title}</h4>
          <p class="dish-desc">${desc}</p>
          ${optionsHtml}
          <div class="dish-footer">
            <div class="dish-price-wrap">
              <span class="dish-price" id="price-display-${dish.id}">${formatPrice(dish.price)}</span>
              ${dish.oldPrice ? `<span class="dish-old-price">${formatPrice(dish.oldPrice)}</span>` : ''}
            </div>
            <button class="dish-add-btn" onclick="handleAddToCart('${dish.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>${I18N[currentLang].addToCart}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Track currently selected options on cards
const dishOptionSelections = {};

function selectDishOption(dishId, optId) {
  dishOptionSelections[dishId] = optId;
  const pillsContainer = document.getElementById(`opt-pills-${dishId}`);
  if (!pillsContainer) return;

  const pills = pillsContainer.querySelectorAll('.option-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-opt-id') === optId) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  // Recalculate price preview
  const dish = DISHES.find(d => d.id === dishId);
  if (!dish) return;
  const opt = dish.options.find(o => o.id === optId);
  const basePrice = dish.price;
  const finalPrice = basePrice + (opt ? opt.priceMod : 0);
  
  const priceDisplay = document.getElementById(`price-display-${dishId}`);
  if (priceDisplay) {
    priceDisplay.textContent = formatPrice(finalPrice);
  }
}

// =============================================================================
// 7. CART SYSTEM & LOCALSTORAGE PERSISTENCE
// =============================================================================
function saveCart() {
  localStorage.setItem('shtab_cart', JSON.stringify(cart));
  updateCartCounters();
}

function handleAddToCart(dishId) {
  const dish = DISHES.find(d => d.id === dishId);
  if (!dish) return;

  const chosenOptId = dishOptionSelections[dishId] || (dish.options && dish.options[0] ? dish.options[0].id : null);
  const chosenOpt = dish.options ? dish.options.find(o => o.id === chosenOptId) : null;
  const optPriceMod = chosenOpt ? chosenOpt.priceMod : 0;
  const unitPrice = dish.price + optPriceMod;
  const optNameRu = chosenOpt ? chosenOpt.nameRu : '';
  const optNameUz = chosenOpt ? chosenOpt.nameUz : '';

  const itemKey = `${dish.id}_${chosenOptId || 'default'}`;

  const existing = cart.find(item => item.key === itemKey);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key: itemKey,
      id: dish.id,
      nameRu: dish.nameRu,
      nameUz: dish.nameUz,
      image: dish.image,
      unitPrice: unitPrice,
      optionNameRu: optNameRu,
      optionNameUz: optNameUz,
      quantity: 1
    });
  }

  saveCart();
  renderCart();

  const dishTitle = currentLang === 'ru' ? dish.nameRu : dish.nameUz;
  showToast(`${dishTitle} ${I18N[currentLang].addedToCart}`, 'success', 2500);

  // Cart button wiggle animation
  const cartBtn = document.querySelector('.header-cart-btn');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.15)';
    setTimeout(() => { cartBtn.style.transform = ''; }, 250);
  }
}

function updateCartItemQty(itemKey, delta) {
  const item = cart.find(i => i.key === itemKey);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.key !== itemKey);
  }

  saveCart();
  renderCart();
}

function removeCartItem(itemKey) {
  cart = cart.filter(i => i.key !== itemKey);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  activePromo = null;
  saveCart();
  renderCart();
}

function calculateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  
  let discount = 0;
  if (activePromo) {
    if (activePromo.type === 'percent') {
      discount = Math.round(subtotal * (activePromo.value / 100));
    } else if (activePromo.type === 'fixed') {
      discount = activePromo.value;
    }
  }
  if (discount > subtotal) discount = subtotal;

  let deliveryFee = 0;
  if (deliveryType === 'delivery') {
    deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FLAT_FEE;
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  return { subtotal, discount, deliveryFee, grandTotal };
}

function updateCartCounters() {
  const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
  const totals = calculateCartTotals();

  // Header badges
  const badge = document.getElementById('cart-count-badge');
  const amountPreview = document.getElementById('cart-amount-preview');
  const mobileBadge = document.getElementById('mobile-cart-badge');

  if (badge) badge.textContent = totalCount;
  if (mobileBadge) mobileBadge.textContent = totalCount;
  if (amountPreview) amountPreview.textContent = formatPrice(totals.grandTotal);
}

function renderCart() {
  const cartBody = document.getElementById('cart-items-body');
  const cartSummary = document.getElementById('cart-summary-container');
  const cartBadge = document.getElementById('cart-drawer-count');

  const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = totalCount;

  if (!cartBody || !cartSummary) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h4>${I18N[currentLang].cartEmptyTitle}</h4>
        <p>${I18N[currentLang].cartEmptyDesc}</p>
        <button class="btn btn-primary" onclick="closeCart(); scrollToSection('menu');">
          ${I18N[currentLang].heroBtnMenu}
        </button>
      </div>
    `;
    cartSummary.style.display = 'none';
    return;
  }

  cartSummary.style.display = 'flex';

  cartBody.innerHTML = cart.map(item => {
    const title = currentLang === 'ru' ? item.nameRu : item.nameUz;
    const opt = currentLang === 'ru' ? item.optionNameRu : item.optionNameUz;
    const itemTotal = item.unitPrice * item.quantity;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${title}" class="cart-item-img" />
        <div class="cart-item-content">
          <div>
            <h5 class="cart-item-title">${title}</h5>
            ${opt ? `<span class="cart-item-opt">${opt}</span>` : ''}
          </div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatPrice(itemTotal)}</span>
            <div class="cart-stepper">
              <button class="stepper-btn" onclick="updateCartItemQty('${item.key}', -1)">−</button>
              <span class="stepper-val">${item.quantity}</span>
              <button class="stepper-btn" onclick="updateCartItemQty('${item.key}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeCartItem('${item.key}')" title="Удалить">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update summary breakdown
  const totals = calculateCartTotals();
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const discountRow = document.getElementById('cart-discount-row');
  const discountValEl = document.getElementById('cart-discount-val');
  const deliveryValEl = document.getElementById('cart-delivery-val');
  const totalValEl = document.getElementById('cart-total-val');

  if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);
  
  if (discountRow) {
    if (totals.discount > 0) {
      discountRow.style.display = 'flex';
      if (discountValEl) discountValEl.textContent = `-${formatPrice(totals.discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (deliveryValEl) {
    if (deliveryType === 'pickup') {
      deliveryValEl.textContent = currentLang === 'ru' ? 'Самовывоз (0 UZS)' : 'Olib ketish (0 UZS)';
    } else if (totals.deliveryFee === 0) {
      deliveryValEl.textContent = I18N[currentLang].cartFreeDelivery;
    } else {
      deliveryValEl.textContent = formatPrice(totals.deliveryFee);
    }
  }

  if (totalValEl) totalValEl.textContent = formatPrice(totals.grandTotal);
}

// Drawer visibility helpers
function openCart() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Delivery / Pickup toggle in Cart
function setCartDeliveryType(type) {
  deliveryType = type;
  document.querySelectorAll('.cart-toggle-btn').forEach(btn => {
    if (btn.dataset.type === type) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const branchRow = document.getElementById('cart-branch-row');
  if (branchRow) {
    branchRow.style.display = type === 'pickup' ? 'block' : 'none';
  }

  saveCart();
  renderCart();
}

function handlePromoApply() {
  const input = document.getElementById('promo-code-input');
  const msgEl = document.getElementById('promo-message');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) return;

  if (code === 'SHTAB10') {
    activePromo = { code: 'SHTAB10', type: 'percent', value: 10 };
    msgEl.className = 'promo-message success';
    msgEl.textContent = `${I18N[currentLang].promoSuccess} (10%)`;
  } else if (code === 'TABAKA') {
    activePromo = { code: 'TABAKA', type: 'fixed', value: 15000 };
    msgEl.className = 'promo-message success';
    msgEl.textContent = `${I18N[currentLang].promoSuccess} (-15 000 UZS)`;
  } else if (code === 'HALOL') {
    activePromo = { code: 'HALOL', type: 'fixed', value: 10000 };
    msgEl.className = 'promo-message success';
    msgEl.textContent = `${I18N[currentLang].promoSuccess} (-10 000 UZS)`;
  } else {
    activePromo = null;
    msgEl.className = 'promo-message error';
    msgEl.textContent = I18N[currentLang].promoError;
  }

  renderCart();
}

// =============================================================================
// 8. INTERACTIVE BANQUET CALCULATOR (TADBIR VA MAROSIMLAR)
// =============================================================================
let calcGuests = 25;
let calcEventType = 'marosim';
let calcPackage = 'premium';

const BANQUET_PACKAGES = {
  standard: {
    rateRu: 'Стандарт',
    rateUz: 'Standart',
    pricePerPerson: 48000,
    tovuqRatio: 0.25, // 1 whole chicken per 4 guests
    oyoqRatio: 1.0,   // 1 drumstick per guest
    sidesRatio: 0.5,  // 1 portion sides per 2 guests
    sauceRatio: 0.5
  },
  premium: {
    rateRu: 'Премиум',
    rateUz: 'Premium',
    pricePerPerson: 72000,
    tovuqRatio: 0.35, // 1 whole chicken per ~3 guests
    oyoqRatio: 1.5,   // 1.5 drumstick per guest
    sidesRatio: 0.8,
    sauceRatio: 0.8
  },
  sultan: {
    rateRu: 'Султан VIP',
    rateUz: 'Sulton VIP',
    pricePerPerson: 98000,
    tovuqRatio: 0.45, // 1 whole chicken per ~2 guests
    oyoqRatio: 2.0,   // 2 drumsticks per guest
    sidesRatio: 1.2,
    sauceRatio: 1.0
  }
};

function calculateBanquet() {
  const pkg = BANQUET_PACKAGES[calcPackage];
  
  // Calculate raw counts
  const tovuqCount = Math.ceil(calcGuests * pkg.tovuqRatio);
  const oyoqCount = Math.ceil(calcGuests * pkg.oyoqRatio);
  const sidesCount = Math.ceil(calcGuests * pkg.sidesRatio);
  const sauceCount = Math.ceil(calcGuests * pkg.sauceRatio);

  const baseTotal = calcGuests * pkg.pricePerPerson;

  // Volume discount rules
  let discountPercent = 0;
  if (calcGuests >= 100) {
    discountPercent = 15;
  } else if (calcGuests >= 60) {
    discountPercent = 10;
  } else if (calcGuests >= 30) {
    discountPercent = 5;
  }

  const discountAmount = Math.round(baseTotal * (discountPercent / 100));
  const finalTotal = baseTotal - discountAmount;
  const effectivePerPerson = Math.round(finalTotal / calcGuests);

  // Update UI Elements
  const badgeGuests = document.getElementById('calc-guests-badge');
  if (badgeGuests) badgeGuests.textContent = `${calcGuests} ${currentLang === 'ru' ? 'чел' : 'kishi'}`;

  const tovuqEl = document.getElementById('calc-res-tovuq');
  const oyoqEl = document.getElementById('calc-res-oyoq');
  const sidesEl = document.getElementById('calc-res-sides');
  const sauceEl = document.getElementById('calc-res-sauce');
  const perPersonEl = document.getElementById('calc-res-per-person');
  const totalEl = document.getElementById('calc-res-total');
  const discountBox = document.getElementById('calc-discount-box');
  const discountText = document.getElementById('calc-discount-val');

  if (tovuqEl) tovuqEl.textContent = `${tovuqCount} ${currentLang === 'ru' ? 'шт (целых)' : 'dona (butun)'}`;
  if (oyoqEl) oyoqEl.textContent = `${oyoqCount} ${currentLang === 'ru' ? 'ножек' : 'dona'}`;
  if (sidesEl) sidesEl.textContent = `${sidesCount} ${currentLang === 'ru' ? 'порций' : 'porsiya'}`;
  if (sauceEl) sauceEl.textContent = `${sauceCount} ${currentLang === 'ru' ? 'комплектов' : 'komplekt'}`;
  if (perPersonEl) perPersonEl.textContent = formatPrice(effectivePerPerson);
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);

  if (discountBox && discountText) {
    if (discountPercent > 0) {
      discountBox.style.display = 'flex';
      discountText.textContent = `${discountPercent}% (-${formatPrice(discountAmount)})`;
    } else {
      discountBox.style.display = 'none';
    }
  }

  return {
    guests: calcGuests,
    eventType: calcEventType,
    package: calcPackage,
    tovuqCount,
    oyoqCount,
    sidesCount,
    sauceCount,
    finalTotal
  };
}

function initCalculatorListeners() {
  const slider = document.getElementById('calc-slider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      calcGuests = parseInt(e.target.value, 10);
      calculateBanquet();
    });
  }

  // Event type cards
  document.querySelectorAll('.event-type-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.event-type-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      calcEventType = card.dataset.event;
      calculateBanquet();
    });
  });

  // Package tier cards
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.package-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      calcPackage = card.dataset.package;
      calculateBanquet();
    });
  });
}

// Pass calculation into Event Modal
function openEventModalFromCalculator() {
  const calcData = calculateBanquet();
  const summaryBox = document.getElementById('event-modal-calc-summary');
  const guestsInput = document.getElementById('event-guests-input');
  const typeSelect = document.getElementById('event-type-select');

  if (guestsInput) guestsInput.value = calcData.guests;
  if (typeSelect) typeSelect.value = calcData.eventType;

  if (summaryBox) {
    const pkgName = BANQUET_PACKAGES[calcData.package][currentLang === 'ru' ? 'rateRu' : 'rateUz'];
    summaryBox.innerHTML = `
      <strong>${currentLang === 'ru' ? 'Расчет меню на' : 'Dasturxon hisobi:'} ${calcData.guests} ${currentLang === 'ru' ? 'человек' : 'kishi'} (${pkgName})</strong><br>
      • ${I18N[currentLang].calcTovuqCount} <strong>${calcData.tovuqCount} шт</strong><br>
      • ${I18N[currentLang].calcOyoqCount} <strong>${calcData.oyoqCount} шт</strong><br>
      • ${I18N[currentLang].calcSidesCount} <strong>${calcData.sidesCount} порций</strong><br>
      • <strong>${I18N[currentLang].calcTotalSum} ${formatPrice(calcData.finalTotal)}</strong>
    `;
  }

  openModal('modal-event-order');
}

// =============================================================================
// 9. TELEGRAM BOT API INTEGRATION
// =============================================================================
async function sendTelegramMessage(textHtml) {
  // Check if token and chat ID are present
  if (!tgBotToken || !tgChatId || tgBotToken.includes('example')) {
    console.warn('[TELEGRAM BOT] Bot token or Chat ID is using dummy fallback. Logging message to console:');
    console.log(textHtml);
    return { success: true, demo: true };
  }

  const endpoint = `https://api.telegram.org/bot${tgBotToken}/sendMessage`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: tgChatId,
        text: textHtml,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true, demo: false };
    } else {
      console.error('[TELEGRAM BOT ERROR]', data);
      return { success: false, error: data.description };
    }
  } catch (err) {
    console.error('[TELEGRAM FETCH EXCEPTION]', err);
    return { success: false, error: err.message };
  }
}

// Format Order for Telegram
function formatTelegramOrderMessage(orderData) {
  const branchName = orderData.branch === 'shtab-main' 
    ? 'Главный филиал "Shtab filiali" (+998 99 953 05 05)' 
    : 'Филиал "Chilonzor filiali" (+998 99 753 05 05)';
  
  const deliveryTypeName = orderData.deliveryType === 'delivery' ? '🚗 Доставка курьером' : '🏃‍♂️ Самовывоз из филиала';
  
  let itemsList = '';
  orderData.items.forEach((item, index) => {
    const opt = item.optionNameRu ? ` (${item.optionNameRu})` : '';
    itemsList += `${index + 1}. <b>${item.nameRu}</b>${opt} — <i>${item.quantity} шт</i> × ${formatPrice(item.unitPrice)}\n`;
  });

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });

  return `
🍗 <b>НОВЫЙ ЗАКАЗ #ST-${orderData.orderId} — SHTAB TABAKA</b>
━━━━━━━━━━━━━━━━━━━━━
🕒 <b>Время:</b> ${now}
📍 <b>Филиал:</b> ${branchName}
🚚 <b>Получение:</b> ${deliveryTypeName}

👤 <b>Клиент:</b> ${orderData.name}
📞 <b>Телефон:</b> <a href="tel:${orderData.phone.replace(/[^+\d]/g, '')}">${orderData.phone}</a>
🏠 <b>Адрес:</b> ${orderData.address}
💬 <b>Комментарий:</b> ${orderData.comment || 'Не указан'}

📋 <b>СОСТАВ ЗАКАЗА:</b>
${itemsList}
━━━━━━━━━━━━━━━━━━━━━
📦 <b>Товары:</b> ${formatPrice(orderData.subtotal)}
🏷 <b>Скидка:</b> -${formatPrice(orderData.discount)}
🚗 <b>Доставка:</b> ${orderData.deliveryFee > 0 ? formatPrice(orderData.deliveryFee) : 'Бесплатно'}
💰 <b>ИТОГО К ОПЛАТЕ: ${formatPrice(orderData.grandTotal)}</b>
💳 <b>Способ оплаты:</b> ${orderData.paymentMethod.toUpperCase()}
`.trim();
}

// Format Banquet Preorder for Telegram
function formatTelegramBanquetMessage(eventData) {
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });

  return `
🎉 <b>ПРЕДЗАКАЗ НА МЕРОПРИЯТИЕ — SHTAB TABAKA</b>
━━━━━━━━━━━━━━━━━━━━━
🕒 <b>Создано:</b> ${now}
📅 <b>Дата и время банкета:</b> ${eventData.eventDate}
👥 <b>Количество гостей:</b> ${eventData.guests} человек
🎪 <b>Тип события:</b> ${eventData.eventType.toUpperCase()}

👤 <b>Заказчик:</b> ${eventData.name}
📞 <b>Телефон:</b> <a href="tel:${eventData.phone.replace(/[^+\d]/g, '')}">${eventData.phone}</a>
📍 <b>Локация проведения:</b> ${eventData.location}
💬 <b>Особые пожелания:</b> ${eventData.comment || 'Нет'}

📊 <b>ОРИЕНТИРОВОЧНЫЙ РАСЧЕТ:</b>
${eventData.summaryText}
━━━━━━━━━━━━━━━━━━━━━
⚠️ <i>Свяжитесь с клиентом в течение 10 минут для подтверждения даты и меню!</i>
`.trim();
}

// =============================================================================
// 10. FORM HANDLERS & MODALS
// =============================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function setupModalClosers() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

// Order Checkout Submit
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast(I18N[currentLang].cartEmptyTitle, 'error');
    return;
  }

  const nameInput = document.getElementById('checkout-name');
  const phoneInput = document.getElementById('checkout-phone');
  const addressInput = document.getElementById('checkout-address');
  const commentInput = document.getElementById('checkout-comment');
  const submitBtn = document.getElementById('checkout-submit-btn');

  const activePayMethod = document.querySelector('.payment-method-card.active');
  const paymentMethod = activePayMethod ? activePayMethod.dataset.method : 'cash';

  const orderId = Math.floor(1000 + Math.random() * 9000);
  const totals = calculateCartTotals();

  const orderData = {
    orderId,
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    address: addressInput.value.trim(),
    comment: commentInput.value.trim(),
    paymentMethod,
    branch: selectedBranch,
    deliveryType,
    items: cart,
    subtotal: totals.subtotal,
    discount: totals.discount,
    deliveryFee: totals.deliveryFee,
    grandTotal: totals.grandTotal
  };

  // UI loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка заказа...';
  }

  const tgMessage = formatTelegramOrderMessage(orderData);
  const result = await sendTelegramMessage(tgMessage);

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = I18N[currentLang].btnSendOrder;
  }

  if (result.success) {
    clearCart();
    closeModal('modal-checkout');
    closeCart();
    
    // Play synthetic audio chime
    playSuccessChime();

    if (result.demo) {
      showToast(I18N[currentLang].orderDemoToast, 'success', 5000);
    } else {
      showToast(I18N[currentLang].orderSuccessToast, 'success', 5000);
    }

    // Reset form
    e.target.reset();
  } else {
    showToast(`Ошибка отправки: ${result.error}`, 'error', 4000);
  }
}

// Banquet Event Submit
async function handleEventSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('event-name');
  const phoneInput = document.getElementById('event-phone');
  const guestsInput = document.getElementById('event-guests-input');
  const dateInput = document.getElementById('event-date');
  const locationInput = document.getElementById('event-location');
  const typeSelect = document.getElementById('event-type-select');
  const commentInput = document.getElementById('event-comment');
  const submitBtn = document.getElementById('event-submit-btn');

  const calcData = calculateBanquet();
  const summaryText = `
• Пакет: ${BANQUET_PACKAGES[calcData.package].rateRu}
• Цыплят табака: ${calcData.tovuqCount} шт
• Ножек Oyoq: ${calcData.oyoqCount} шт
• Гарниров/салатов: ${calcData.sidesCount} порций
• Сумма: ${formatPrice(calcData.finalTotal)}
  `.trim();

  const eventData = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    guests: guestsInput.value || calcData.guests,
    eventType: typeSelect.value || 'marosim',
    eventDate: dateInput.value || 'Уточняется по телефону',
    location: locationInput.value.trim(),
    comment: commentInput.value.trim(),
    summaryText
  };

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка заявки...';
  }

  const tgMessage = formatTelegramBanquetMessage(eventData);
  const result = await sendTelegramMessage(tgMessage);

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = I18N[currentLang].btnSendEvent;
  }

  if (result.success) {
    closeModal('modal-event-order');
    playSuccessChime();
    showToast(I18N[currentLang].orderSuccessToast, 'success', 5000);
    e.target.reset();
  } else {
    showToast(`Ошибка отправки: ${result.error}`, 'error', 4000);
  }
}

// Synthetic sound effect using Web Audio API
function playSuccessChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // AudioContext might be blocked until user gesture, safe to ignore
  }
}

// Telegram Settings Manager
function openTelegramSettings() {
  const tokenInput = document.getElementById('tg-bot-token-input');
  const chatInput = document.getElementById('tg-chat-id-input');

  if (tokenInput) tokenInput.value = tgBotToken;
  if (chatInput) chatInput.value = tgChatId;

  openModal('modal-tg-settings');
}

function saveTelegramSettings() {
  const tokenInput = document.getElementById('tg-bot-token-input');
  const chatInput = document.getElementById('tg-chat-id-input');

  if (tokenInput && chatInput) {
    tgBotToken = tokenInput.value.trim();
    tgChatId = chatInput.value.trim();

    localStorage.setItem('shtab_tg_token', tgBotToken);
    localStorage.setItem('shtab_tg_chat_id', tgChatId);

    showToast('Настройки Telegram-бота успешно сохранены!', 'success');
    closeModal('modal-tg-settings');
  }
}

async function testTelegramSettings() {
  const tokenInput = document.getElementById('tg-bot-token-input');
  const chatInput = document.getElementById('tg-chat-id-input');

  const testToken = tokenInput.value.trim();
  const testChatId = chatInput.value.trim();

  if (!testToken || !testChatId) {
    showToast('Заполните BOT_TOKEN и CHAT_ID!', 'error');
    return;
  }

  showToast('Отправка тестового сообщения...', 'info');

  const endpoint = `https://api.telegram.org/bot${testToken}/sendMessage`;
  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: testChatId,
        text: '🍗 <b>SHTAB TABAKA</b>\nТестовое подключение сайта успешно установлено! 🔥',
        parse_mode: 'HTML'
      })
    });
    const res = await resp.json();
    if (res.ok) {
      showToast('Тест успешен! Сообщение доставлено в Telegram!', 'success');
    } else {
      showToast(`Ошибка Telegram: ${res.description}`, 'error');
    }
  } catch (err) {
    showToast(`Сетевая ошибка: ${err.message}`, 'error');
  }
}

// =============================================================================
// 11. PHONE INPUT MASK (+998)
// =============================================================================
function applyPhoneMask(input) {
  if (!input) return;

  input.addEventListener('focus', () => {
    if (!input.value) {
      input.value = '+998 ';
    }
  });

  input.addEventListener('input', (e) => {
    let val = input.value.replace(/[^\d+]/g, '');
    if (!val.startsWith('+998')) {
      val = '+998' + val.replace(/^\+?998?/, '');
    }

    const digits = val.substring(4);
    let formatted = '+998';

    if (digits.length > 0) formatted += ' (' + digits.substring(0, 2);
    if (digits.length >= 2) formatted += ') ' + digits.substring(2, 5);
    if (digits.length >= 5) formatted += '-' + digits.substring(5, 7);
    if (digits.length >= 7) formatted += '-' + digits.substring(7, 9);

    input.value = formatted;
  });
}

// =============================================================================
// 12. FAQ ACCORDION HANDLER
// =============================================================================
function initAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(other => {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

// =============================================================================
// 13. NAVIGATION, SCROLLING & UI INTERACTION
// =============================================================================
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
    const pos = el.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;
    window.scrollTo({ top: pos, behavior: 'smooth' });
  }
  closeMobileNav();
}

function toggleMobileNav() {
  const panel = document.getElementById('mobile-nav-panel');
  const overlay = document.getElementById('mobile-nav-overlay');
  const toggle = document.getElementById('mobile-menu-toggle');

  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    panel.classList.add('open');
    overlay.classList.add('open');
    toggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  const panel = document.getElementById('mobile-nav-panel');
  const overlay = document.getElementById('mobile-nav-overlay');
  const toggle = document.getElementById('mobile-menu-toggle');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  if (toggle) toggle.classList.remove('open');
  document.body.style.overflow = '';
}

// =============================================================================
// 14. INITIALIZATION ON DOM CONTENT LOADED
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // 2. Category tab buttons
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      renderMenu();
    });
  });

  // 3. Search and Sort inputs
  const searchInput = document.getElementById('menu-search-input');
  const searchClear = document.getElementById('menu-search-clear');
  const sortSelect = document.getElementById('menu-sort-select');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClear) {
        searchClear.classList.toggle('visible', searchQuery.length > 0);
      }
      renderMenu();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      searchClear.classList.remove('visible');
      renderMenu();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderMenu();
    });
  }

  // 4. Phone masks
  applyPhoneMask(document.getElementById('checkout-phone'));
  applyPhoneMask(document.getElementById('event-phone'));

  // 5. Payment method cards
  document.querySelectorAll('.payment-method-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // 6. Branch select in cart
  const cartBranchSelect = document.getElementById('cart-branch-select');
  if (cartBranchSelect) {
    cartBranchSelect.addEventListener('change', (e) => {
      selectedBranch = e.target.value;
    });
  }

  // 7. Modals & Forms
  setupModalClosers();
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  const eventForm = document.getElementById('event-form');
  if (eventForm) eventForm.addEventListener('submit', handleEventSubmit);

  // 8. Sticky header scroll shadow
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // 9. Init core modules
  initCalculatorListeners();
  initAccordion();
  setLanguage(currentLang);
  updateCartCounters();
});
