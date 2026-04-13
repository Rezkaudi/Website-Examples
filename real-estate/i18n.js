/* ============================================================
   LUXESTATE — INTERNATIONALISATION (i18n)
   Supports: English (en) | Arabic (ar) | Japanese (ja)
   ============================================================ */

'use strict';

/* ── Translation data ──────────────────────────────────────── */
const TRANSLATIONS = {

  /* ─── ENGLISH ─────────────────────────────────────────────── */
  en: {
    /* Nav */
    'nav.properties'  : 'Properties',
    'nav.categories'  : 'Categories',
    'nav.about'       : 'About',
    'nav.process'     : 'Process',
    'nav.reviews'     : 'Reviews',
    'nav.bookViewing' : 'Book Viewing',

    /* Hero */
    'hero.tag'       : 'Premium Real Estate Since 2009',
    'hero.title'     : 'Find Your<br><em>Perfect</em> Luxury<br>Home',
    'hero.subtitle'  : 'Discover exclusive properties in the world\'s most coveted locations.<br>Where extraordinary living begins.',
    'hero.explore'   : 'Explore Properties',
    'hero.story'     : 'Our Story',
    'hero.scroll'    : 'Scroll',

    /* Search bar */
    'search.buy'         : 'Buy',
    'search.rent'        : 'Rent',
    'search.invest'      : 'Invest',
    'search.location'    : 'Location',
    'search.propType'    : 'Property Type',
    'search.priceRange'  : 'Price Range',
    'search.search'      : 'Search',

    /* Floating cards */
    'float.listed'  : 'Properties Listed',
    'float.volume'  : 'Sales Volume',

    /* Stats */
    'stats.sold'        : 'Properties Sold',
    'stats.satisfaction': 'Client Satisfaction',
    'stats.volume'      : 'Sales Volume',
    'stats.years'       : 'Years of Excellence',

    /* Morph section */
    'morph.tag'        : 'Defining Home',
    'morph.title'      : 'From Structure<br>to <em>Sanctuary</em>',
    'morph.lead'       : 'Every extraordinary property begins as four walls. We transform it into the perfect expression of luxury living — where architecture meets aspiration.',
    'morph.fact1'      : '2,500+ homes placed',
    'morph.fact2'      : 'Average 21-day close',
    'morph.fact3'      : 'Lifetime client guarantee',
    'morph.explore'    : 'Explore Properties',
    'morph.svgLabel'   : 'SVG Morph Animation',

    /* Featured */
    'featured.tag'     : 'Curated Selection',
    'featured.title'   : 'Exceptional <em>Properties</em>',
    'featured.sub'     : 'Handpicked luxury properties for the most discerning buyers worldwide',
    'featured.viewAll' : 'View All Properties',

    /* Filter buttons */
    'filter.all'       : 'All',
    'filter.penthouse' : 'Penthouse',
    'filter.villa'     : 'Villa',
    'filter.estate'    : 'Estate',
    'filter.apartment' : 'Apartment',

    /* Property card internals */
    'card.beds'       : 'Beds',
    'card.baths'      : 'Baths',
    'card.sqft'       : 'sqft',
    'card.marketVal'  : 'Market Value',
    'card.viewDetails': 'View Details',

    /* About */
    'about.tag'          : 'Our Story',
    'about.title'        : 'Redefining Luxury<br><em>Real Estate</em> Since 2009',
    'about.lead'         : 'Founded on the principle that every client deserves an extraordinary experience, LuxEstate has grown to become the most trusted name in ultra-premium properties.',
    'about.body'         : 'With offices in New York, London, Monaco, and Dubai, our team of 200+ world-class agents brings unparalleled market intelligence and discretion to every transaction — no matter the scale or complexity.',
    'about.f1.title'     : 'Global Network',
    'about.f1.sub'       : 'Properties across 30+ countries',
    'about.f2.title'     : 'White-Glove Service',
    'about.f2.sub'       : 'Dedicated agents for each client',
    'about.f3.title'     : 'Off-Market Access',
    'about.f3.sub'       : 'Exclusive listings not found elsewhere',
    'about.f4.title'     : 'Investment Advisory',
    'about.f4.sub'       : 'Strategic portfolio guidance',
    'about.meetTeam'     : 'Meet Our Team',
    'about.badgeLabel'   : 'Years of<br>Excellence',

    /* Categories */
    'cat.tag'           : 'Browse By Type',
    'cat.title'         : 'Property <em>Categories</em>',
    'cat.sub'           : 'Find the perfect property type that matches your lifestyle and aspirations',
    'cat.penthouse'     : 'Penthouse',
    'cat.villa'         : 'Luxury Villa',
    'cat.estate'        : 'Grand Estate',
    'cat.apartments'    : 'Apartments',
    'cat.commercial'    : 'Commercial',
    'cat.cta.title'     : 'Explore All Categories',
    'cat.cta.sub'       : 'Discover 336+ premium properties across all types',
    'cat.cta.btn'       : 'Browse Now',

    /* SVG showcase */
    'showcase.tag'   : 'Architecture & Presence',
    'showcase.title' : 'Iconic Buildings,<br><em>Global Footprint</em>',
    'showcase.sub'   : 'A curated skyline of properties across the world\'s most prestigious addresses',
    'map.tag'        : 'Global Portfolio',
    'map.title'      : 'Exclusive Properties<br>in <em>5 Continents</em>',
    'map.sub'        : 'Our curated portfolio spans the world\'s most coveted real estate markets — from Manhattan penthouses to Monaco villas.',
    'city.ny'        : 'New York City',
    'city.bh'        : 'Beverly Hills',
    'city.mc'        : 'Monaco & Riviera',
    'city.db'        : 'Dubai Marina',
    'city.pr'        : 'Paris, France',

    /* Process */
    'process.tag'    : 'How It Works',
    'process.title'  : 'Your Journey to an<br><em>Extraordinary</em> Home',
    'process.sub'    : 'A seamless, curated process from first consultation to final key handover',
    'step1.title'    : 'Consultation',
    'step1.desc'     : 'Meet with your dedicated advisor to define your vision, lifestyle requirements, and investment goals.',
    'step2.title'    : 'Property Search',
    'step2.desc'     : 'We leverage our exclusive network to surface on-market and off-market properties matching your exact criteria.',
    'step3.title'    : 'Private Viewings',
    'step3.desc'     : 'Experience curated property tours — in-person or virtually — with expert commentary at every step.',
    'step4.title'    : 'Closing & Keys',
    'step4.desc'     : 'Our legal and financial team manages every detail ensuring a seamless, stress-free transaction.',

    /* Testimonials */
    'test.tag'   : 'Client Stories',
    'test.title' : 'Words From Our<br><em>Valued</em> Clients',

    /* Parallax skyline */
    'psky.tag'   : 'A Global Vision',
    'psky.title' : 'Your <em>Skyline</em> Awaits',

    /* Skyline draw */
    'sky.tag'      : 'A Global Vision',
    'sky.title'    : 'Cities <em>Drawn</em> for You',
    'sky.sub'      : 'Scroll to reveal the skylines where extraordinary homes await',
    'sky.revealed' : 'of the world revealed',

    /* CTA */
    'cta.tag'      : 'Take the Next Step',
    'cta.title'    : 'Begin Your Journey to<br><em>Extraordinary</em> Living',
    'cta.sub'      : 'Connect with a LuxEstate advisor today and discover properties<br>that redefine what home can mean.',
    'cta.book'     : 'Book a Consultation',

    /* Contact */
    'contact.tag'     : 'Book a Viewing',
    'contact.title'   : 'Connect With an <em>Advisor</em>',
    'contact.sub'     : 'Our team is available around the clock to arrange private viewings and answer every question.',
    'contact.call'    : 'Call Us',
    'contact.email'   : 'Email Us',
    'contact.visit'   : 'Visit Us',
    'contact.hours'   : 'Office Hours',
    'contact.hoursVal': 'Mon – Sat, 9 am – 8 pm EST',

    /* Form */
    'form.name'        : 'Full Name',
    'form.email'       : 'Email Address',
    'form.phone'       : 'Phone Number',
    'form.interest'    : 'Property Interest',
    'form.message'     : 'Your Message',
    'form.send'        : 'Send Request',
    'form.privacy'     : 'Your details are kept strictly confidential.',
    'form.ph.name'     : 'Your full name',
    'form.ph.email'    : 'your@email.com',
    'form.ph.phone'    : '+1 (555) 000-0000',
    'form.ph.message'  : 'Tell us about your ideal property, budget, timeline…',
    'form.sel.default' : 'Select type',
    'form.sel.ph'      : 'Penthouse',
    'form.sel.villa'   : 'Luxury Villa',
    'form.sel.estate'  : 'Grand Estate',
    'form.sel.apt'     : 'Apartment',
    'form.sel.invest'  : 'Investment Portfolio',

    /* Footer */
    'footer.tagline'    : 'Redefining luxury real estate worldwide. Where extraordinary properties meet exceptional service.',
    'footer.props'      : 'Properties',
    'footer.company'    : 'Company',
    'footer.newsletter' : 'Stay Informed',
    'footer.nl.desc'    : 'Receive exclusive listings and market insights directly to your inbox.',
    'footer.nl.ph'      : 'Your email address',
    'footer.l.penthouse': 'Penthouse Collections',
    'footer.l.villas'   : 'Luxury Villas',
    'footer.l.estates'  : 'Grand Estates',
    'footer.l.apts'     : 'City Apartments',
    'footer.l.water'    : 'Waterfront Homes',
    'footer.l.offplan'  : 'Off-Plan Developments',
    'footer.l.about'    : 'About LuxEstate',
    'footer.l.agents'   : 'Our Agents',
    'footer.l.careers'  : 'Careers',
    'footer.l.press'    : 'Press & Media',
    'footer.l.partner'  : 'Partner Program',
    'footer.l.investor' : 'Investor Relations',
    'footer.copy'       : '© 2026 LuxEstate. All rights reserved.',
    'footer.privacy'    : 'Privacy Policy',
    'footer.terms'      : 'Terms of Service',
    'footer.cookies'    : 'Cookie Policy',

    /* Mobile menu */
    'mm.book'    : 'Book a Viewing',
    'mm.tagline' : 'Extraordinary properties. Exceptional service.',
  },

  /* ─── ARABIC ──────────────────────────────────────────────── */
  ar: {
    /* Nav */
    'nav.properties'  : 'العقارات',
    'nav.categories'  : 'التصنيفات',
    'nav.about'       : 'عن الشركة',
    'nav.process'     : 'كيف نعمل',
    'nav.reviews'     : 'آراء العملاء',
    'nav.bookViewing' : 'احجز زيارة',

    /* Hero */
    'hero.tag'       : 'عقارات فاخرة منذ 2009',
    'hero.title'     : 'ابحث عن<br>منزلك <em>المثالي</em><br>الفاخر',
    'hero.subtitle'  : 'اكتشف عقارات حصرية في أرقى المواقع حول العالم.<br>حيث يبدأ العيش الاستثنائي.',
    'hero.explore'   : 'استعرض العقارات',
    'hero.story'     : 'قصتنا',
    'hero.scroll'    : 'تمرير',

    /* Search bar */
    'search.buy'        : 'شراء',
    'search.rent'       : 'إيجار',
    'search.invest'     : 'استثمار',
    'search.location'   : 'الموقع',
    'search.propType'   : 'نوع العقار',
    'search.priceRange' : 'نطاق السعر',
    'search.search'     : 'بحث',

    /* Floating cards */
    'float.listed'  : 'عقارات مدرجة',
    'float.volume'  : 'حجم المبيعات',

    /* Stats */
    'stats.sold'        : 'عقارات تم بيعها',
    'stats.satisfaction': 'رضا العملاء',
    'stats.volume'      : 'حجم المبيعات',
    'stats.years'       : 'سنوات من التميز',

    /* Morph section */
    'morph.tag'      : 'تعريف المنزل',
    'morph.title'    : 'من بنية<br>إلى <em>ملاذ</em>',
    'morph.lead'     : 'كل عقار استثنائي يبدأ بأربعة جدران. نحن نحوّله إلى التعبير المثالي عن الرقي والفخامة — حيث تلتقي العمارة بالطموح.',
    'morph.fact1'    : 'أكثر من 2,500 منزل تم توزيعه',
    'morph.fact2'    : 'متوسط إغلاق 21 يومًا',
    'morph.fact3'    : 'ضمان عمر للعميل',
    'morph.explore'  : 'استعرض العقارات',
    'morph.svgLabel' : 'رسوم متحركة SVG',

    /* Featured */
    'featured.tag'     : 'مختارة بعناية',
    'featured.title'   : 'عقارات <em>استثنائية</em>',
    'featured.sub'     : 'عقارات فاخرة مختارة بعناية لأكثر المشترين تميزًا حول العالم',
    'featured.viewAll' : 'عرض جميع العقارات',

    /* Filter buttons */
    'filter.all'       : 'الكل',
    'filter.penthouse' : 'بنتهاوس',
    'filter.villa'     : 'فيلا',
    'filter.estate'    : 'منتجع',
    'filter.apartment' : 'شقة',

    /* Property card internals */
    'card.beds'        : 'غرف',
    'card.baths'       : 'حمامات',
    'card.sqft'        : 'قدم مربع',
    'card.marketVal'   : 'القيمة السوقية',
    'card.viewDetails' : 'عرض التفاصيل',

    /* About */
    'about.tag'         : 'قصتنا',
    'about.title'       : 'إعادة تعريف العقارات<br><em>الفاخرة</em> منذ 2009',
    'about.lead'        : 'تأسست على مبدأ أن كل عميل يستحق تجربة استثنائية، نمت LuxEstate لتصبح الاسم الأكثر موثوقية في مجال العقارات الفائقة الفخامة.',
    'about.body'        : 'مع مكاتب في نيويورك ولندن وموناكو ودبي، يجلب فريقنا المكون من أكثر من 200 وكيل عالمي المعرفة السوقية اللامثيل والتقدير لكل صفقة — بغض النظر عن حجمها أو تعقيدها.',
    'about.f1.title'    : 'شبكة عالمية',
    'about.f1.sub'      : 'عقارات في أكثر من 30 دولة',
    'about.f2.title'    : 'خدمة متميزة',
    'about.f2.sub'      : 'وكلاء مخصصون لكل عميل',
    'about.f3.title'    : 'وصول حصري',
    'about.f3.sub'      : 'قوائم حصرية غير متاحة في أي مكان آخر',
    'about.f4.title'    : 'استشارات الاستثمار',
    'about.f4.sub'      : 'توجيه استراتيجي للمحفظة الاستثمارية',
    'about.meetTeam'    : 'تعرف على فريقنا',
    'about.badgeLabel'  : 'سنوات من<br>التميز',

    /* Categories */
    'cat.tag'          : 'تصفح حسب النوع',
    'cat.title'        : 'فئات <em>العقارات</em>',
    'cat.sub'          : 'ابحث عن نوع العقار المثالي الذي يتناسب مع أسلوب حياتك وطموحاتك',
    'cat.penthouse'    : 'بنتهاوس',
    'cat.villa'        : 'فيلا فاخرة',
    'cat.estate'       : 'منتجع كبير',
    'cat.apartments'   : 'شقق',
    'cat.commercial'   : 'تجاري',
    'cat.cta.title'    : 'استعرض جميع الفئات',
    'cat.cta.sub'      : 'اكتشف أكثر من 336 عقارًا فاخرًا من جميع الأنواع',
    'cat.cta.btn'      : 'تصفح الآن',

    /* SVG showcase */
    'showcase.tag'   : 'العمارة والتواجد',
    'showcase.title' : 'مبانٍ أيقونية،<br><em>حضور عالمي</em>',
    'showcase.sub'   : 'مجموعة عقارات متميزة في أرقى العناوين في العالم',
    'map.tag'        : 'محفظة عالمية',
    'map.title'      : 'عقارات حصرية<br>في <em>5 قارات</em>',
    'map.sub'        : 'تمتد محفظتنا المختارة عبر أكثر الأسواق العقارية المرغوبة في العالم — من بنتهاوس مانهاتن إلى فيلات موناكو.',
    'city.ny'        : 'مدينة نيويورك',
    'city.bh'        : 'بيفرلي هيلز',
    'city.mc'        : 'موناكو والريفيرا',
    'city.db'        : 'مرسى دبي',
    'city.pr'        : 'باريس، فرنسا',

    /* Process */
    'process.tag'    : 'كيف نعمل',
    'process.title'  : 'رحلتك نحو<br>منزل <em>استثنائي</em>',
    'process.sub'    : 'عملية سلسة ومنسقة من أول استشارة حتى تسليم المفتاح النهائي',
    'step1.title'    : 'الاستشارة',
    'step1.desc'     : 'التقِ بمستشارك المخصص لتحديد رؤيتك ومتطلبات نمط حياتك وأهدافك الاستثمارية.',
    'step2.title'    : 'البحث عن العقارات',
    'step2.desc'     : 'نستفيد من شبكتنا الحصرية للكشف عن العقارات المدرجة وغير المدرجة التي تطابق معاييرك بالضبط.',
    'step3.title'    : 'المشاهدات الخاصة',
    'step3.desc'     : 'استمتع بجولات عقارية مختارة — شخصيًا أو افتراضيًا — مع تعليق الخبراء في كل خطوة.',
    'step4.title'    : 'الإغلاق والمفاتيح',
    'step4.desc'     : 'يدير فريقنا القانوني والمالي كل التفاصيل لضمان صفقة سلسة وخالية من التوتر.',

    /* Testimonials */
    'test.tag'   : 'قصص العملاء',
    'test.title' : 'كلمات من<br>عملائنا <em>الكرام</em>',

    /* Parallax skyline */
    'psky.tag'   : 'رؤية عالمية',
    'psky.title' : 'أفقك <em>الرائع</em> ينتظرك',

    /* Skyline draw */
    'sky.tag'      : 'رؤية عالمية',
    'sky.title'    : 'مدن <em>رُسمت</em> من أجلك',
    'sky.sub'      : 'مرر للكشف عن مدن الأفق حيث تنتظرك المنازل الاستثنائية',
    'sky.revealed' : 'من العالم تم الكشف عنه',

    /* CTA */
    'cta.tag'      : 'الخطوة التالية',
    'cta.title'    : 'ابدأ رحلتك نحو<br>حياة <em>استثنائية</em>',
    'cta.sub'      : 'تواصل مع مستشار LuxEstate اليوم واكتشف عقارات<br>تعيد تعريف مفهوم المنزل.',
    'cta.book'     : 'احجز استشارة',

    /* Contact */
    'contact.tag'     : 'احجز زيارة',
    'contact.title'   : 'تواصل مع <em>مستشار</em>',
    'contact.sub'     : 'فريقنا متاح على مدار الساعة لترتيب المشاهدات الخاصة والإجابة على كل سؤال.',
    'contact.call'    : 'اتصل بنا',
    'contact.email'   : 'راسلنا',
    'contact.visit'   : 'زورونا',
    'contact.hours'   : 'ساعات العمل',
    'contact.hoursVal': 'الإثنين – السبت، 9 صباحًا – 8 مساءً',

    /* Form */
    'form.name'        : 'الاسم الكامل',
    'form.email'       : 'البريد الإلكتروني',
    'form.phone'       : 'رقم الهاتف',
    'form.interest'    : 'نوع العقار المطلوب',
    'form.message'     : 'رسالتك',
    'form.send'        : 'إرسال الطلب',
    'form.privacy'     : 'بياناتك محفوظة بشكل سري تام.',
    'form.ph.name'     : 'اسمك الكامل',
    'form.ph.email'    : 'بريدك@الإيميل.com',
    'form.ph.phone'    : '+1 (555) 000-0000',
    'form.ph.message'  : 'أخبرنا عن العقار المثالي لك، ميزانيتك، وجدولك الزمني…',
    'form.sel.default' : 'اختر النوع',
    'form.sel.ph'      : 'بنتهاوس',
    'form.sel.villa'   : 'فيلا فاخرة',
    'form.sel.estate'  : 'منتجع كبير',
    'form.sel.apt'     : 'شقة',
    'form.sel.invest'  : 'محفظة استثمارية',

    /* Footer */
    'footer.tagline'    : 'إعادة تعريف العقارات الفاخرة على مستوى العالم. حيث تلتقي العقارات الاستثنائية بالخدمة المتميزة.',
    'footer.props'      : 'العقارات',
    'footer.company'    : 'الشركة',
    'footer.newsletter' : 'ابق على اطلاع',
    'footer.nl.desc'    : 'احصل على قوائح حصرية ورؤى السوق مباشرة في بريدك الإلكتروني.',
    'footer.nl.ph'      : 'بريدك الإلكتروني',
    'footer.l.penthouse': 'مجموعات البنتهاوس',
    'footer.l.villas'   : 'فلل فاخرة',
    'footer.l.estates'  : 'منتجعات كبيرة',
    'footer.l.apts'     : 'شقق المدينة',
    'footer.l.water'    : 'منازل على الواجهة المائية',
    'footer.l.offplan'  : 'مشاريع قيد التطوير',
    'footer.l.about'    : 'عن LuxEstate',
    'footer.l.agents'   : 'وكلاؤنا',
    'footer.l.careers'  : 'الوظائف',
    'footer.l.press'    : 'الصحافة والإعلام',
    'footer.l.partner'  : 'برنامج الشركاء',
    'footer.l.investor' : 'علاقات المستثمرين',
    'footer.copy'       : '© 2026 LuxEstate. جميع الحقوق محفوظة.',
    'footer.privacy'    : 'سياسة الخصوصية',
    'footer.terms'      : 'شروط الخدمة',
    'footer.cookies'    : 'سياسة الكوكيز',

    /* Mobile menu */
    'mm.book'    : 'احجز زيارة',
    'mm.tagline' : 'عقارات استثنائية. خدمة متميزة.',
  },

  /* ─── JAPANESE ────────────────────────────────────────────── */
  ja: {
    /* Nav */
    'nav.properties'  : '物件',
    'nav.categories'  : 'カテゴリー',
    'nav.about'       : '会社概要',
    'nav.process'     : 'プロセス',
    'nav.reviews'     : 'レビュー',
    'nav.bookViewing' : '内覧予約',

    /* Hero */
    'hero.tag'       : '2009年から続くプレミアム不動産',
    'hero.title'     : '<em>完璧な</em>高級<br>住宅を<br>見つけよう',
    'hero.subtitle'  : '世界で最も人気のある場所にある独占物件をご覧ください。<br>特別な生活が始まる場所。',
    'hero.explore'   : '物件を探す',
    'hero.story'     : '私たちの物語',
    'hero.scroll'    : 'スクロール',

    /* Search bar */
    'search.buy'        : '購入',
    'search.rent'       : '賃貸',
    'search.invest'     : '投資',
    'search.location'   : '所在地',
    'search.propType'   : '物件タイプ',
    'search.priceRange' : '価格帯',
    'search.search'     : '検索',

    /* Floating cards */
    'float.listed'  : '掲載物件数',
    'float.volume'  : '売上高',

    /* Stats */
    'stats.sold'        : '売却済み物件',
    'stats.satisfaction': '顧客満足度',
    'stats.volume'      : '売上高',
    'stats.years'       : '卓越の年数',

    /* Morph section */
    'morph.tag'      : '家の定義',
    'morph.title'    : '構造から<br><em>聖域</em>へ',
    'morph.lead'     : 'すべての特別な物件は四つの壁から始まります。私たちはそれを高級な生活の完璧な表現へと変えます — 建築と夢が出会う場所。',
    'morph.fact1'    : '2,500件以上の住宅を仲介',
    'morph.fact2'    : '平均21日でのクロージング',
    'morph.fact3'    : '生涯顧客保証',
    'morph.explore'  : '物件を探す',
    'morph.svgLabel' : 'SVGモーフアニメーション',

    /* Featured */
    'featured.tag'     : '厳選コレクション',
    'featured.title'   : '特別な<em>物件</em>',
    'featured.sub'     : '世界で最も目の肥えたバイヤーのために厳選された高級物件',
    'featured.viewAll' : '全物件を見る',

    /* Filter buttons */
    'filter.all'       : 'すべて',
    'filter.penthouse' : 'ペントハウス',
    'filter.villa'     : 'ヴィラ',
    'filter.estate'    : '邸宅',
    'filter.apartment' : 'アパート',

    /* Property card internals */
    'card.beds'        : 'ベッド',
    'card.baths'       : 'バス',
    'card.sqft'        : '平方フィート',
    'card.marketVal'   : '市場価値',
    'card.viewDetails' : '詳細を見る',

    /* About */
    'about.tag'         : '私たちの物語',
    'about.title'       : '2009年から高級不動産を<br><em>再定義</em>',
    'about.lead'        : 'すべての顧客が特別な体験を受けるべきというポリシーのもとに設立されたLuxEstateは、超高級物件で最も信頼される名前へと成長しました。',
    'about.body'        : 'ニューヨーク、ロンドン、モナコ、ドバイにオフィスを持ち、200人以上の世界クラスのエージェントチームが、あらゆる規模や複雑さの取引に比類のない市場知識と慎重さをもたらします。',
    'about.f1.title'    : 'グローバルネットワーク',
    'about.f1.sub'      : '30ヶ国以上の物件',
    'about.f2.title'    : 'ホワイトグローブサービス',
    'about.f2.sub'      : '各顧客専属エージェント',
    'about.f3.title'    : 'オフマーケットアクセス',
    'about.f3.sub'      : '他では見られない独占的なリスト',
    'about.f4.title'    : '投資アドバイザリー',
    'about.f4.sub'      : '戦略的なポートフォリオガイダンス',
    'about.meetTeam'    : 'チームに会う',
    'about.badgeLabel'  : '卓越の<br>年数',

    /* Categories */
    'cat.tag'          : 'タイプで探す',
    'cat.title'        : '物件<em>カテゴリー</em>',
    'cat.sub'          : 'あなたのライフスタイルと目標に合った完璧な物件タイプを見つけてください',
    'cat.penthouse'    : 'ペントハウス',
    'cat.villa'        : 'ラグジュアリーヴィラ',
    'cat.estate'       : 'グランドエステート',
    'cat.apartments'   : 'アパートメント',
    'cat.commercial'   : 'コマーシャル',
    'cat.cta.title'    : '全カテゴリーを探す',
    'cat.cta.sub'      : '336件以上のプレミアム物件を全タイプで発見',
    'cat.cta.btn'      : '今すぐ探す',

    /* SVG showcase */
    'showcase.tag'   : '建築とプレゼンス',
    'showcase.title' : '象徴的な建物、<br><em>グローバルな存在感</em>',
    'showcase.sub'   : '世界で最も権威ある住所の物件を厳選したスカイライン',
    'map.tag'        : 'グローバルポートフォリオ',
    'map.title'      : '<em>5大陸</em>の<br>厳選物件',
    'map.sub'        : '私たちの厳選ポートフォリオは、マンハッタンのペントハウスからモナコのヴィラまで、世界で最も人気のある不動産市場に広がっています。',
    'city.ny'        : 'ニューヨーク市',
    'city.bh'        : 'ビバリーヒルズ',
    'city.mc'        : 'モナコ＆リヴィエラ',
    'city.db'        : 'ドバイマリーナ',
    'city.pr'        : 'パリ、フランス',

    /* Process */
    'process.tag'    : '仕組み',
    'process.title'  : '<em>特別な</em>住宅への<br>あなたの旅',
    'process.sub'    : '最初のコンサルテーションから鍵の引き渡しまでのシームレスなプロセス',
    'step1.title'    : 'コンサルテーション',
    'step1.desc'     : '専任アドバイザーとのミーティングで、ビジョン、ライフスタイルの要件、投資目標を定義します。',
    'step2.title'    : '物件検索',
    'step2.desc'     : '独占ネットワークを活用して、ご要望に合う市場内外の物件を探し出します。',
    'step3.title'    : 'プライベート内覧',
    'step3.desc'     : '対面またはバーチャルで厳選された物件ツアーを体験し、各ステップで専門家のコメントを提供します。',
    'step4.title'    : 'クロージング＆鍵の引き渡し',
    'step4.desc'     : '法務・財務チームがすべての詳細を管理し、シームレスでストレスフリーな取引を確保します。',

    /* Testimonials */
    'test.tag'   : 'お客様の声',
    'test.title' : '<em>大切な</em>お客様からの<br>言葉',

    /* Parallax skyline */
    'psky.tag'   : 'グローバルビジョン',
    'psky.title' : 'あなたの<em>スカイライン</em>が待っている',

    /* Skyline draw */
    'sky.tag'      : 'グローバルビジョン',
    'sky.title'    : 'あなたのために<em>描かれた</em>都市',
    'sky.sub'      : 'スクロールして特別な住宅が待つスカイラインを明らかにしましょう',
    'sky.revealed' : 'の世界が明らかに',

    /* CTA */
    'cta.tag'      : '次のステップへ',
    'cta.title'    : '<em>特別な</em>生活への<br>旅を始めよう',
    'cta.sub'      : '今日LuxEstateのアドバイザーに連絡して、<br>家の概念を再定義する物件を発見しましょう。',
    'cta.book'     : 'コンサルテーションを予約',

    /* Contact */
    'contact.tag'     : '内覧を予約',
    'contact.title'   : '<em>アドバイザー</em>に相談',
    'contact.sub'     : 'チームは24時間対応し、プライベート内覧の手配とあらゆる質問にお答えします。',
    'contact.call'    : 'お電話',
    'contact.email'   : 'メール',
    'contact.visit'   : '訪問',
    'contact.hours'   : '営業時間',
    'contact.hoursVal': '月〜土、午前9時〜午後8時（EST）',

    /* Form */
    'form.name'        : 'フルネーム',
    'form.email'       : 'メールアドレス',
    'form.phone'       : '電話番号',
    'form.interest'    : '希望する物件',
    'form.message'     : 'メッセージ',
    'form.send'        : 'リクエストを送る',
    'form.privacy'     : 'お客様の情報は厳重に管理されます。',
    'form.ph.name'     : 'フルネームを入力',
    'form.ph.email'    : 'your@email.com',
    'form.ph.phone'    : '+81 (000) 000-0000',
    'form.ph.message'  : '理想の物件、予算、スケジュールについてお聞かせください…',
    'form.sel.default' : 'タイプを選択',
    'form.sel.ph'      : 'ペントハウス',
    'form.sel.villa'   : 'ラグジュアリーヴィラ',
    'form.sel.estate'  : 'グランドエステート',
    'form.sel.apt'     : 'アパートメント',
    'form.sel.invest'  : '投資ポートフォリオ',

    /* Footer */
    'footer.tagline'    : '世界中で高級不動産を再定義。特別な物件と卓越したサービスが出会う場所。',
    'footer.props'      : '物件',
    'footer.company'    : '会社',
    'footer.newsletter' : '最新情報',
    'footer.nl.desc'    : '独占的な物件リストと市場インサイトをメールで直接受け取りましょう。',
    'footer.nl.ph'      : 'メールアドレス',
    'footer.l.penthouse': 'ペントハウスコレクション',
    'footer.l.villas'   : 'ラグジュアリーヴィラ',
    'footer.l.estates'  : 'グランドエステート',
    'footer.l.apts'     : 'シティアパートメント',
    'footer.l.water'    : 'ウォーターフロントホーム',
    'footer.l.offplan'  : 'オフプラン開発',
    'footer.l.about'    : 'LuxEstateについて',
    'footer.l.agents'   : 'エージェント',
    'footer.l.careers'  : '採用情報',
    'footer.l.press'    : 'プレス＆メディア',
    'footer.l.partner'  : 'パートナープログラム',
    'footer.l.investor' : '投資家向け情報',
    'footer.copy'       : '© 2026 LuxEstate. 全著作権所有。',
    'footer.privacy'    : 'プライバシーポリシー',
    'footer.terms'      : '利用規約',
    'footer.cookies'    : 'Cookieポリシー',

    /* Mobile menu */
    'mm.book'    : '内覧を予約',
    'mm.tagline' : '卓越した物件。卓越したサービス。',
  },
};


/* ============================================================
   LANGUAGE ENGINE
   ============================================================ */

let currentLang = localStorage.getItem('luxestate_lang') || 'ja';
window.currentLang = currentLang;

/** Translate a key in the active language. Falls back to English. */
function t(key) {
  return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

/** Apply selected language to the entire document. */
function applyLanguage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem('luxestate_lang', lang);

  /* html element attributes */
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  /* Plain text nodes */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  /* Nodes that need inner HTML (contain <em>, <br>, etc.) */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  /* Input placeholders */
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });

  /* aria-label */
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nLabel));
  });

  /* Mark active lang button */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  /* Re-render JS-generated content */
  if (typeof renderProperties === 'function') {
    const activeFilter =
      document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    renderProperties(activeFilter);
  }

}

/* ============================================================
   LANGUAGE SWITCHER INIT
   ============================================================ */

function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  /* Apply saved / default language on load */
  applyLanguage(currentLang);
}

/* Boot */
document.addEventListener('DOMContentLoaded', initLangSwitcher);
