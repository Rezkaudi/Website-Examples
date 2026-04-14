/* ═══════════════════════════════════════════
   QUICKBITE — FOOD DELIVERY LANDING PAGE
   script.js
═══════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   I18N — Multi-language support: English · Arabic · Japanese
══════════════════════════════════════════════════════════════ */
(function initI18n() {

  const translations = {
    en: {
      'preloader.text'      : 'Preparing your experience',
      'nav.features'        : 'Features',
      'nav.menu'            : 'Menu',
      'nav.app'             : 'App',
      'nav.reviews'         : 'Reviews',
      'nav.order'           : 'Order Now',
      'hero.badge'          : 'Live in 50+ Cities',
      'hero.h1'             : 'Delicious Food<br/><span class="gradient-text">Delivered Fast</span>',
      'hero.p'              : 'From your favourite restaurants straight to your door — hot, fresh, and in under 30 minutes.',
      'hero.search.ph'      : 'Search pizza, burgers, sushi...',
      'hero.search.btn'     : 'Search',
      'hero.cta.explore'    : 'Explore Menu',
      'hero.cta.demo'       : 'Watch Demo',
      'hero.stat.customers' : 'Happy Customers',
      'hero.stat.restaurants': 'Restaurants',
      'hero.stat.delivery'  : 'On-time Delivery',
      'features.tag'        : 'Why QuickBite?',
      'features.h2'         : 'Everything you love about<br/><span class="gradient-text">food delivery, perfected</span>',
      'feat1.h3'            : '30-Min Delivery',
      'feat1.p'             : 'Our optimised routing ensures your food arrives hot and on time, every single order.',
      'feat2.h3'            : 'Top Restaurants',
      'feat2.p'             : 'Curated selection of over 1,200 verified restaurants with ratings, menus and offers.',
      'feat3.h3'            : 'Live Tracking',
      'feat3.p'             : 'Real-time GPS tracking from the kitchen to your front door — never wonder where your food is.',
      'feat4.h3'            : 'Secure Payments',
      'feat4.p'             : 'Multiple payment options with bank-grade encryption keeping every transaction safe.',
      'menu.tag'            : 'Popular Right Now',
      'menu.live'           : 'Live',
      'menu.h2'             : 'Trending <span class="gradient-text">this week</span>',
      'menu.sub'            : "Discover what 50,000+ customers can't stop ordering right now",
      'filter.all'          : 'All',
      'filter.burgers'      : 'Burgers',
      'filter.pizza'        : 'Pizza',
      'filter.sushi'        : 'Sushi',
      'filter.desserts'     : 'Desserts',
      'card1.cat'           : 'Burgers',
      'card1.name'          : 'Double Smash Burger',
      'card1.week'          : '2,400 orders this week',
      'card2.cat'           : 'Pizza',
      'card2.name'          : 'Margherita Royale',
      'card2.week'          : '1,850 orders this week',
      'card3.cat'           : 'Sushi',
      'card3.name'          : 'Signature Roll Trio',
      'card3.week'          : '1,120 orders this week',
      'card4.cat'           : 'Desserts',
      'card4.name'          : 'Triple Scoop Dream',
      'card4.week'          : '980 orders this week',
      'card5.cat'           : 'Burgers',
      'card5.name'          : 'Crispy Buffalo Wings',
      'card5.week'          : '760 orders this week',
      'card6.cat'           : 'Pizza',
      'card6.name'          : 'Arrabbiata Pasta',
      'card6.week'          : '640 orders this week',
      'menu.viewall'        : 'Explore All Dishes',
      'menu.viewhint'       : '200+ dishes from top local restaurants',
      'how.h2'              : 'Order in <span class="gradient-text">3 easy steps</span>',
      'how.sub'             : 'Getting your favourite meal delivered has never been simpler — from browse to bite in minutes.',
      'step1.label'         : 'Step 01',
      'step1.h3'            : 'Browse Restaurants',
      'step1.p'             : 'Explore hundreds of local restaurants. Filter by cuisine, rating, or delivery time.',
      'step2.label'         : 'Step 02',
      'step2.h3'            : 'Place Your Order',
      'step2.p'             : 'Add items to your cart and confirm with one tap. Secure checkout in under 60 seconds.',
      'step3.label'         : 'Step 03',
      'step3.h3'            : 'Fast Delivery',
      'step3.p'             : 'Track your rider live on the map. Food arrives hot and fresh in under 30 minutes.',
      'how.promo1'          : '100% Contactless Delivery',
      'how.promo2'          : 'Real-time GPS Tracking',
      'how.promo3'          : 'Free Delivery on First Order',
      'app.tag'             : 'Download the App',
      'app.h2'              : "Your favourite food,<br/>one tap away",
      'app.p'               : "Track your order in real-time, save your favourite restaurants, and get exclusive in-app deals — all in our beautifully designed mobile app.",
      'app.perk1'           : 'Exclusive app-only discounts up to 30%',
      'app.perk2'           : 'Live GPS tracking with push notifications',
      'app.perk3'           : 'Reorder with one tap — saved favourites',
      'testi.tag'           : 'Real Reviews',
      'testi.h2'            : 'Loved by food fans <span class="gradient-text">everywhere</span>',
      'testi.metric1'       : 'Average Rating',
      'testi.metric2'       : 'Happy Customers',
      'testi.metric3'       : 'On-Time Delivery',
      'testi.review1'       : '"QuickBite is hands down the best food delivery app I\'ve used. My order always arrives hot and exactly on time!"',
      'testi.author1'       : 'Sarah M.',
      'testi.author1.sub'   : 'Food Blogger · London',
      'testi.review2'       : '"The live tracking feature is a game changer. I always know exactly when my food is coming. Incredible service!"',
      'testi.author2'       : 'James T.',
      'testi.author2.sub'   : 'Software Engineer · NYC',
      'testi.review3'       : '"I order lunch every weekday. The restaurant selection is amazing and the app is super easy to use. 10/10!"',
      'testi.author3'       : 'Aisha K.',
      'testi.author3.sub'   : 'Marketing Director · Dubai',
      'testi.review4'       : '"Fast delivery, great packaging, and the food is always fresh. QuickBite has spoiled me — I can\'t order anywhere else!"',
      'testi.author4'       : 'Raj P.',
      'testi.author4.sub'   : 'Chef & Restaurateur · Mumbai',
      'testi.verified'      : 'Verified',
      'footer.brand.p'      : "Bringing the world's best food to your door — fast, fresh, and always delicious.",
      'footer.nl.h5'        : 'Get exclusive deals',
      'footer.nl.sub'       : 'Join 50,000+ food lovers. Get weekly deals & offers.',
      'footer.nl.ph'        : 'Your email address',
      'footer.nl.btn'       : 'Subscribe',
      'footer.col1.h4'      : 'Company',
      'footer.col1.about'   : 'About Us',
      'footer.col1.careers' : 'Careers',
      'footer.col1.press'   : 'Press',
      'footer.col1.blog'    : 'Blog',
      'footer.col2.h4'      : 'For Restaurants',
      'footer.col2.partner' : 'Partner with Us',
      'footer.col2.dash'    : 'Restaurant Dashboard',
      'footer.col2.mkt'     : 'Marketing Tools',
      'footer.col2.support' : 'Support',
      'footer.col3.h4'      : 'Help',
      'footer.col3.faqs'    : 'FAQs',
      'footer.col3.track'   : 'Track Order',
      'footer.col3.contact' : 'Contact Us',
      'footer.col3.privacy' : 'Privacy Policy',
      'footer.bottom'       : '© 2026 QuickBite Technologies Ltd. All rights reserved.',
      'toast.added'         : 'Added to cart!',
    },

    ar: {
      'preloader.text'      : 'جاري التحضير لك…',
      'nav.features'        : 'المميزات',
      'nav.menu'            : 'القائمة',
      'nav.app'             : 'التطبيق',
      'nav.reviews'         : 'التقييمات',
      'nav.order'           : 'اطلب الآن',
      'hero.badge'          : 'متاح في 50+ مدينة',
      'hero.h1'             : 'طعام لذيذ<br/><span class="gradient-text">يُوصَّل بسرعة</span>',
      'hero.p'              : 'من مطاعمك المفضلة إلى بابك مباشرةً — ساخن وطازج وفي أقل من 30 دقيقة.',
      'hero.search.ph'      : 'ابحث عن بيتزا، برغر، سوشي...',
      'hero.search.btn'     : 'بحث',
      'hero.cta.explore'    : 'استكشف القائمة',
      'hero.cta.demo'       : 'شاهد العرض',
      'hero.stat.customers' : 'عميل سعيد',
      'hero.stat.restaurants': 'مطعم',
      'hero.stat.delivery'  : 'توصيل في الوقت',
      'features.tag'        : 'لماذا كويك بايت؟',
      'features.h2'         : 'كل ما تحبه في<br/><span class="gradient-text">توصيل الطعام، بشكل مثالي</span>',
      'feat1.h3'            : 'توصيل في 30 دقيقة',
      'feat1.p'             : 'يضمن نظام التوجيه المتطور وصول طعامك ساخناً وفي وقته في كل طلب.',
      'feat2.h3'            : 'أفضل المطاعم',
      'feat2.p'             : 'تشكيلة مختارة من أكثر من 1,200 مطعم معتمد مع التقييمات والقوائم والعروض.',
      'feat3.h3'            : 'تتبع مباشر',
      'feat3.p'             : 'تتبع GPS في الوقت الفعلي من المطبخ إلى بابك — لا تتساءل أبداً أين طعامك.',
      'feat4.h3'            : 'مدفوعات آمنة',
      'feat4.p'             : 'خيارات دفع متعددة بتشفير بنكي لحماية كل معاملة.',
      'menu.tag'            : 'الأكثر طلباً الآن',
      'menu.live'           : 'مباشر',
      'menu.h2'             : 'الأكثر رواجاً <span class="gradient-text">هذا الأسبوع</span>',
      'menu.sub'            : 'اكتشف ما لا يتوقف عن طلبه أكثر من 50,000 عميل الآن',
      'filter.all'          : 'الكل',
      'filter.burgers'      : 'برغر',
      'filter.pizza'        : 'بيتزا',
      'filter.sushi'        : 'سوشي',
      'filter.desserts'     : 'حلويات',
      'card1.cat'           : 'برغر',
      'card1.name'          : 'دبل سماش برغر',
      'card1.week'          : 'هذا الأسبوع 2,400 طلب',
      'card2.cat'           : 'بيتزا',
      'card2.name'          : 'مارغريتا رويال',
      'card2.week'          : 'هذا الأسبوع 1,850 طلب',
      'card3.cat'           : 'سوشي',
      'card3.name'          : 'ثلاثي الرولز المميز',
      'card3.week'          : 'هذا الأسبوع 1,120 طلب',
      'card4.cat'           : 'حلويات',
      'card4.name'          : 'ثلاثي الآيس كريم',
      'card4.week'          : 'هذا الأسبوع 980 طلب',
      'card5.cat'           : 'برغر',
      'card5.name'          : 'أجنحة بافالو المقرمشة',
      'card5.week'          : 'هذا الأسبوع 760 طلب',
      'card6.cat'           : 'بيتزا',
      'card6.name'          : 'باستا أرابياتا',
      'card6.week'          : 'هذا الأسبوع 640 طلب',
      'menu.viewall'        : 'استكشف جميع الأطباق',
      'menu.viewhint'       : '200+ طبق من أفضل المطاعم المحلية',
      'how.h2'              : 'اطلب في <span class="gradient-text">3 خطوات سهلة</span>',
      'how.sub'             : 'الحصول على وجبتك المفضلة لم يكن أسهل من هكذا — من التصفح إلى اللقمة في دقائق.',
      'step1.label'         : 'الخطوة 01',
      'step1.h3'            : 'تصفح المطاعم',
      'step1.p'             : 'استكشف مئات المطاعم المحلية. صفّح حسب المطبخ أو التقييم أو وقت التوصيل.',
      'step2.label'         : 'الخطوة 02',
      'step2.h3'            : 'أكمل طلبك',
      'step2.p'             : 'أضف العناصر إلى سلتك وأكد بنقرة واحدة. دفع آمن في أقل من 60 ثانية.',
      'step3.label'         : 'الخطوة 03',
      'step3.h3'            : 'توصيل سريع',
      'step3.p'             : 'تتبع موصّلك مباشرةً على الخريطة. يصل الطعام ساخناً وطازجاً في أقل من 30 دقيقة.',
      'how.promo1'          : '100% توصيل غير لمسي',
      'how.promo2'          : 'تتبع GPS في الوقت الفعلي',
      'how.promo3'          : 'توصيل مجاني لأول طلب',
      'app.tag'             : 'حمّل التطبيق',
      'app.h2'              : 'طعامك المفضل،<br/>على بعد نقرة واحدة',
      'app.p'               : 'تتبع طلبك في الوقت الفعلي، احفظ مطاعمك المفضلة، واحصل على عروض حصرية داخل التطبيق.',
      'app.perk1'           : 'خصومات حصرية للتطبيق تصل إلى 30٪',
      'app.perk2'           : 'تتبع GPS مباشر مع إشعارات فورية',
      'app.perk3'           : 'إعادة الطلب بنقرة واحدة — المفضلة المحفوظة',
      'testi.tag'           : 'آراء حقيقية',
      'testi.h2'            : 'محبوب من عشاق الطعام <span class="gradient-text">في كل مكان</span>',
      'testi.metric1'       : 'متوسط التقييم',
      'testi.metric2'       : 'عملاء سعداء',
      'testi.metric3'       : 'توصيل في الوقت',
      'testi.review1'       : '"كويك بايت هو بلا شك أفضل تطبيق توصيل طعام استخدمته. طلبي يصل دائماً ساخناً وفي وقته تماماً!"',
      'testi.author1'       : 'سارة م.',
      'testi.author1.sub'   : 'مدوّنة طعام · لندن',
      'testi.review2'       : '"ميزة التتبع المباشر غيّرت القواعد. أعرف دائماً متى يأتي طعامي. خدمة رائعة!"',
      'testi.author2'       : 'جيمس ت.',
      'testi.author2.sub'   : 'مهندس برمجيات · نيويورك',
      'testi.review3'       : '"أطلب الغداء كل يوم عمل. تشكيلة المطاعم رائعة والتطبيق سهل الاستخدام. 10/10!"',
      'testi.author3'       : 'عائشة ك.',
      'testi.author3.sub'   : 'مديرة تسويق · دبي',
      'testi.review4'       : '"توصيل سريع، تغليف رائع، والطعام طازج دائماً. كويك بايت دلّعني — لا أستطيع الطلب من مكان آخر!"',
      'testi.author4'       : 'راج ب.',
      'testi.author4.sub'   : 'طاهٍ وصاحب مطعم · مومباي',
      'testi.verified'      : 'موثّق',
      'footer.brand.p'      : 'نجلب أفضل الأطعمة في العالم إلى بابك — بسرعة وطازجة ولذيذة دائماً.',
      'footer.nl.h5'        : 'احصل على عروض حصرية',
      'footer.nl.sub'       : 'انضم لأكثر من 50,000 محب للطعام. احصل على صفقات وعروض أسبوعية.',
      'footer.nl.ph'        : 'بريدك الإلكتروني',
      'footer.nl.btn'       : 'اشترك',
      'footer.col1.h4'      : 'الشركة',
      'footer.col1.about'   : 'عنّا',
      'footer.col1.careers' : 'وظائف',
      'footer.col1.press'   : 'الصحافة',
      'footer.col1.blog'    : 'المدونة',
      'footer.col2.h4'      : 'للمطاعم',
      'footer.col2.partner' : 'انضم إلينا',
      'footer.col2.dash'    : 'لوحة تحكم المطعم',
      'footer.col2.mkt'     : 'أدوات التسويق',
      'footer.col2.support' : 'الدعم',
      'footer.col3.h4'      : 'المساعدة',
      'footer.col3.faqs'    : 'الأسئلة الشائعة',
      'footer.col3.track'   : 'تتبع الطلب',
      'footer.col3.contact' : 'تواصل معنا',
      'footer.col3.privacy' : 'سياسة الخصوصية',
      'footer.bottom'       : '© 2026 كويك بايت تكنولوجيز المحدودة. جميع الحقوق محفوظة.',
      'toast.added'         : 'تمت الإضافة إلى السلة!',
    },

    ja: {
      'preloader.text'      : '準備中...',
      'nav.features'        : '特徴',
      'nav.menu'            : 'メニュー',
      'nav.app'             : 'アプリ',
      'nav.reviews'         : 'レビュー',
      'nav.order'           : '今すぐ注文',
      'hero.badge'          : '50以上の都市で展開中',
      'hero.h1'             : '美味しい料理を<br/><span class="gradient-text">素早くお届け</span>',
      'hero.p'              : 'お気に入りのレストランからドアまで直送 — 熱々、新鮮、30分以内にお届け。',
      'hero.search.ph'      : 'ピザ、バーガー、寿司を検索...',
      'hero.search.btn'     : '検索',
      'hero.cta.explore'    : 'メニューを見る',
      'hero.cta.demo'       : 'デモを見る',
      'hero.stat.customers' : '満足したお客様',
      'hero.stat.restaurants': 'レストラン',
      'hero.stat.delivery'  : '時間通り配達',
      'features.tag'        : 'なぜQuickBite？',
      'features.h2'         : 'デリバリーの<br/><span class="gradient-text">すべてを完璧に</span>',
      'feat1.h3'            : '30分配達',
      'feat1.p'             : '最適化されたルーティングで、すべての注文が熱々でタイムリーに届きます。',
      'feat2.h3'            : '一流レストラン',
      'feat2.p'             : '評価・メニュー・特典付きの1,200以上の認定レストランを厳選。',
      'feat3.h3'            : 'ライブ追跡',
      'feat3.p'             : 'キッチンから玄関までリアルタイムGPS追跡 — 食事がどこにあるか常に把握。',
      'feat4.h3'            : '安全な支払い',
      'feat4.p'             : '銀行グレードの暗号化で、複数の支払い方法から安全に決済。',
      'menu.tag'            : '今人気',
      'menu.live'           : 'ライブ',
      'menu.h2'             : '今週の<span class="gradient-text">トレンド</span>',
      'menu.sub'            : '50,000人以上のお客様が今週注文し続けているものを発見',
      'filter.all'          : 'すべて',
      'filter.burgers'      : 'バーガー',
      'filter.pizza'        : 'ピザ',
      'filter.sushi'        : '寿司',
      'filter.desserts'     : 'デザート',
      'card1.cat'           : 'バーガー',
      'card1.name'          : 'ダブルスマッシュバーガー',
      'card1.week'          : '今週2,400件の注文',
      'card2.cat'           : 'ピザ',
      'card2.name'          : 'マルゲリータロワイヤル',
      'card2.week'          : '今週1,850件の注文',
      'card3.cat'           : '寿司',
      'card3.name'          : 'シグネチャーロールトリオ',
      'card3.week'          : '今週1,120件の注文',
      'card4.cat'           : 'デザート',
      'card4.name'          : 'トリプルスクープドリーム',
      'card4.week'          : '今週980件の注文',
      'card5.cat'           : 'バーガー',
      'card5.name'          : 'クリスピーバッファローウィング',
      'card5.week'          : '今週760件の注文',
      'card6.cat'           : 'ピザ',
      'card6.name'          : 'アラビアータパスタ',
      'card6.week'          : '今週640件の注文',
      'menu.viewall'        : 'すべての料理を見る',
      'menu.viewhint'       : '地元トップレストランの200以上の料理',
      'how.h2'              : '<span class="gradient-text">3つの簡単な</span>ステップで注文',
      'how.sub'             : 'お気に入りの食事を届けてもらうのがこれほど簡単になりました。',
      'step1.label'         : 'ステップ 01',
      'step1.h3'            : 'レストランを探す',
      'step1.p'             : '地元の何百ものレストランを探索。料理、評価、配達時間でフィルタリング。',
      'step2.label'         : 'ステップ 02',
      'step2.h3'            : '注文する',
      'step2.p'             : 'カートに商品を追加して、ワンタップで確定。60秒以内に安全なチェックアウト。',
      'step3.label'         : 'ステップ 03',
      'step3.h3'            : '素早い配達',
      'step3.p'             : '地図でライダーをリアルタイム追跡。食事が30分以内に熱々で届きます。',
      'how.promo1'          : '100%非接触デリバリー',
      'how.promo2'          : 'リアルタイムGPS追跡',
      'how.promo3'          : '初回注文送料無料',
      'app.tag'             : 'アプリをダウンロード',
      'app.h2'              : 'お気に入りの料理を、<br/>ワンタップで',
      'app.p'               : '注文をリアルタイムで追跡し、お気に入りのレストランを保存し、アプリ限定のお得情報を手に入れましょう。',
      'app.perk1'           : 'アプリ限定割引最大30%',
      'app.perk2'           : 'プッシュ通知付きGPSライブ追跡',
      'app.perk3'           : 'ワンタップで再注文 — お気に入り保存',
      'testi.tag'           : '本物のレビュー',
      'testi.h2'            : 'フードファンに愛されています <span class="gradient-text">世界中で</span>',
      'testi.metric1'       : '平均評価',
      'testi.metric2'       : '満足したお客様',
      'testi.metric3'       : '時間通り配達',
      'testi.review1'       : '"QuickBiteは間違いなく最高のフードデリバリーアプリです。いつも熱々で時間通りに届きます！"',
      'testi.author1'       : 'サラ・M',
      'testi.author1.sub'   : 'フードブロガー · ロンドン',
      'testi.review2'       : '"ライブ追跡機能はゲームチェンジャーです。食事がいつ来るか常に把握できます。素晴らしいサービス！"',
      'testi.author2'       : 'ジェームズ・T',
      'testi.author2.sub'   : 'ソフトウェアエンジニア · NYC',
      'testi.review3'       : '"毎週平日にランチを注文します。レストランの品揃えが素晴らしく、アプリも使いやすい。10/10！"',
      'testi.author3'       : 'アイシャ・K',
      'testi.author3.sub'   : 'マーケティングディレクター · ドバイ',
      'testi.review4'       : '"素早い配達、素晴らしいパッケージ、食事はいつも新鮮。QuickBiteに甘やかされて他では注文できません！"',
      'testi.author4'       : 'ラージ・P',
      'testi.author4.sub'   : 'シェフ＆レストラン経営者 · ムンバイ',
      'testi.verified'      : '認証済み',
      'footer.brand.p'      : '世界最高の料理をあなたのドアまで届けます — 素早く、新鮮で、いつも美味しい。',
      'footer.nl.h5'        : '限定ディールを手に入れよう',
      'footer.nl.sub'       : '50,000人以上のフードラバーに参加。毎週のお得情報をゲット。',
      'footer.nl.ph'        : 'メールアドレス',
      'footer.nl.btn'       : '登録',
      'footer.col1.h4'      : '会社情報',
      'footer.col1.about'   : '私たちについて',
      'footer.col1.careers' : '採用情報',
      'footer.col1.press'   : 'プレス',
      'footer.col1.blog'    : 'ブログ',
      'footer.col2.h4'      : 'レストランへ',
      'footer.col2.partner' : 'パートナーになる',
      'footer.col2.dash'    : 'レストランダッシュボード',
      'footer.col2.mkt'     : 'マーケティングツール',
      'footer.col2.support' : 'サポート',
      'footer.col3.h4'      : 'ヘルプ',
      'footer.col3.faqs'    : 'よくある質問',
      'footer.col3.track'   : '注文追跡',
      'footer.col3.contact' : 'お問い合わせ',
      'footer.col3.privacy' : 'プライバシーポリシー',
      'footer.bottom'       : '© 2026 QuickBite Technologies Ltd. 全権利留保。',
      'toast.added'         : 'カートに追加しました！',
    },
  };

  /* ── Apply a language ── */
  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update <html> lang + dir attributes
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

    // Load Noto Sans JP for Japanese (once)
    if (lang === 'ja' && !document.getElementById('font-noto-jp')) {
      const link   = document.createElement('link');
      link.id      = 'font-noto-jp';
      link.rel     = 'stylesheet';
      link.href    = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800;900&display=swap';
      document.head.appendChild(link);
    }

    // Switch body font
    document.documentElement.style.setProperty(
      '--font',
      lang === 'ja'
        ? "'Noto Sans JP', 'Plus Jakarta Sans', system-ui, sans-serif"
        : "'Plus Jakarta Sans', 'Segoe UI', system-ui, -apple-system, sans-serif"
    );

    // data-i18n → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });

    // data-i18n-html → innerHTML (for elements with nested gradient spans)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = t[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });

    // data-i18n-placeholder → placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = t[el.dataset.i18nPlaceholder];
      if (v !== undefined) el.placeholder = v;
    });

    // Highlight active lang button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('qb-lang', lang);
  }

  /* ── Wire up buttons ── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  /* ── Apply saved / default language ── */
  applyLanguage(localStorage.getItem('qb-lang') || 'ja');

})();


/* ══════════════════════════════════════════════════════════════
   0. PRELOADER — cinematic loading screen
══════════════════════════════════════════════════════════════ */
document.body.classList.add('loading');

(function initPreloader() {
  const loader = document.getElementById('preloader');
  if (!loader) { document.body.classList.remove('loading'); return; }

  function run() {
    if (typeof gsap === 'undefined') { setTimeout(run, 40); return; }

    const bar = loader.querySelector('.pl-bar');

    gsap.to(bar, {
      width: '100%',
      duration: 1.9,
      ease: 'power2.inOut',
      onComplete() {
        gsap.timeline()
          .to(loader, { scaleY: 0, transformOrigin: 'bottom center', duration: 0.55, ease: 'power4.inOut' })
          .call(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
          });
      },
    });
  }

  run();
})();


/* ══════════════════════════════════════════════════════════════
   0b. SCROLL PROGRESS BAR
══════════════════════════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const pct = scrollHeight === clientHeight ? 100 : (scrollTop / (scrollHeight - clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════════
   0c. CUSTOM CURSOR — GSAP-tracked dot + follower ring
══════════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot      = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!dot || !follower) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows instantly
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  }, { passive: true });

  // Follower ring lerps behind cursor
  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  // Expand follower on interactive elements
  document.querySelectorAll('a, button, .menu-card, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width  = '58px';
      follower.style.height = '58px';
      follower.style.borderColor = 'rgba(255,107,53,.85)';
      dot.style.width  = '14px';
      dot.style.height = '14px';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width  = '';
      follower.style.height = '';
      follower.style.borderColor = '';
      dot.style.width  = '';
      dot.style.height = '';
    });
  });
})();


/* ──────────────────────────────────────────
   1. NAVBAR — scroll behaviour + hamburger
──────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Add scrolled class after the hero is passed
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();


/* ──────────────────────────────────────────
   2. SMOOTH SCROLL — native CSS handles it,
      but this polyfills older browsers
──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ──────────────────────────────────────────
   3. ANIMATED COUNTERS
   Counts up when the hero stats scroll into view
──────────────────────────────────────────── */
(function initCounters() {
  const counters  = document.querySelectorAll('.counter');
  let started     = false;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = +el.dataset.target;
    const duration = 2000; // ms
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOut(progress) * target);

      // Format with commas for large numbers
      el.textContent = value >= 1000
        ? value.toLocaleString()
        : value;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Trigger when stats section enters viewport
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      counters.forEach(animateCounter);
    }
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) observer.observe(statsEl);
})();


/* ──────────────────────────────────────────
   4. SCROLL-REVEAL — handled by GSAP ScrollTrigger (see section 15)
──────────────────────────────────────────── */


/* ──────────────────────────────────────────
   5. MENU FILTER TABS — sliding indicator + GSAP card transitions
──────────────────────────────────────────── */
(function initMenuFilter() {
  const tabs    = document.querySelectorAll('.tab');
  const track   = document.getElementById('tabTrack');
  const cards   = document.querySelectorAll('.menu-card');

  /* ── Sliding pill indicator ── */
  function moveTrack(activeTab) {
    if (!track || !activeTab) return;
    const tabsEl  = document.getElementById('filterTabs');
    const pRect   = tabsEl.getBoundingClientRect();
    const tRect   = activeTab.getBoundingClientRect();
    track.style.left    = (tRect.left - pRect.left) + 'px';
    track.style.width   = tRect.width + 'px';
    track.style.opacity = '1';
  }

  // Position on load (after fonts/layout settle)
  requestAnimationFrame(() => {
    const active = document.querySelector('.tab.active');
    moveTrack(active);
  });

  /* ── Filter with stagger animation ── */
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;

      // Swap active class
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      moveTrack(tab);

      const filter = tab.dataset.filter;

      // Split cards into show/hide
      const toShow = [];
      const toHide = [];
      cards.forEach(c => {
        const match = filter === 'all' || c.dataset.category === filter;
        if (match) toShow.push(c); else toHide.push(c);
      });

      if (typeof gsap !== 'undefined') {
        // Animate out
        if (toHide.length) {
          gsap.to(toHide, {
            opacity: 0, scale: 0.9, y: 10,
            duration: 0.22, stagger: 0.04, ease: 'power2.in',
            onComplete() {
              toHide.forEach(c => c.classList.add('hidden'));
            },
          });
        }
        // Animate in (after slight delay)
        setTimeout(() => {
          toShow.forEach(c => { c.classList.remove('hidden'); gsap.set(c, { opacity: 0, scale: 0.88, y: 18 }); });
          gsap.to(toShow, {
            opacity: 1, scale: 1, y: 0,
            duration: 0.42, stagger: 0.07,
            ease: 'back.out(1.5)',
            clearProps: 'all',
          });
        }, toHide.length ? 180 : 0);
      } else {
        toHide.forEach(c => c.classList.add('hidden'));
        toShow.forEach(c => c.classList.remove('hidden'));
      }
    });
  });
})();


/* ──────────────────────────────────────────
   5b. LIKE BUTTON — heart animation
──────────────────────────────────────────── */
(function initLikeButtons() {
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isLiked = btn.classList.toggle('liked');

      if (typeof gsap !== 'undefined') {
        gsap.timeline()
          .to(btn, { scale: 0.72, duration: 0.12, ease: 'power2.in' })
          .to(btn, { scale: 1.28, duration: 0.22, ease: 'back.out(3)' })
          .to(btn, { scale: 1,    duration: 0.16, ease: 'power2.out' });

        if (isLiked) {
          // Burst particles
          const rect = btn.getBoundingClientRect();
          for (let i = 0; i < 6; i++) {
            const dot = document.createElement('span');
            dot.style.cssText = `
              position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top + rect.height/2}px;
              width:6px;height:6px;border-radius:50%;pointer-events:none;z-index:9999;
              background:${['#ef4444','#f59e0b','#ff6b35'][i % 3]};
            `;
            document.body.appendChild(dot);
            const angle = (i / 6) * Math.PI * 2;
            gsap.to(dot, {
              x: Math.cos(angle) * 28, y: Math.sin(angle) * 28,
              opacity: 0, duration: 0.55, ease: 'power2.out',
              onComplete: () => dot.remove(),
            });
          }
        }
      }
    });
  });
})();


/* ──────────────────────────────────────────
   5c. VIEW-ALL button — ripple click effect
──────────────────────────────────────────── */
(function initViewAllBtn() {
  const btn = document.querySelector('.view-all-btn');
  if (!btn) return;
  btn.addEventListener('click', e => {
    const rect   = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size   = Math.max(rect.width, rect.height) * 1.6;
    ripple.style.cssText = `
      position:absolute;border-radius:50%;
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top  - size/2}px;
      background:rgba(255,255,255,0.3);
      pointer-events:none;transform:scale(0);
    `;
    btn.appendChild(ripple);
    if (typeof gsap !== 'undefined') {
      gsap.to(ripple, { scale: 1, opacity: 0, duration: 0.55, ease: 'power2.out', onComplete: () => ripple.remove() });
    } else {
      ripple.remove();
    }
  });
})();


/* ──────────────────────────────────────────
   6. QUICK-ADD BUTTON — cart toast feedback
──────────────────────────────────────────── */
(function initCartButtons() {
  const toast   = document.getElementById('cartToast');
  let toastTimer = null;

  document.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();

      // Animate the button
      btn.style.transform = 'scale(0.85)';
      setTimeout(() => { btn.style.transform = ''; }, 200);

      // Show toast
      clearTimeout(toastTimer);
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
})();


/* ──────────────────────────────────────────
   7. TESTIMONIALS — no JS needed (CSS Grid)
──────────────────────────────────────────── */


/* ──────────────────────────────────────────
   8. FEATURE CARD — 3D tilt on hover
──────────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;  // max ±8 deg
      const rotateY = ((x - cx) / cx) *  8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ──────────────────────────────────────────
   9. MENU CARD — clean lift hover (no 3-D tilt)
   3-D perspective on menu cards causes the browser to drop
   overflow:hidden border-radius, making images go rectangular.
   CSS handles the lift; JS only adds a subtle shadow bloom.
──────────────────────────────────────────── */
(function initMenuHover() {
  if (typeof gsap === 'undefined') return;

  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        boxShadow: '0 24px 56px rgba(0,0,0,.16)',
        duration: 0.35,
        ease: 'power2.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,.06)',
        duration: 0.45,
        ease: 'power3.out',
      });
    });
  });
})();


/* ──────────────────────────────────────────
   10. FLOATING ITEMS — parallax on mouse
──────────────────────────────────────────── */
(function initParallax() {
  const hero   = document.getElementById('hero');
  const floats = hero ? hero.querySelectorAll('.float-item') : [];

  if (!floats.length) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const mx   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 … 0.5
    const my   = (e.clientY - rect.top)  / rect.height - 0.5;

    floats.forEach((el, i) => {
      const depth  = (i + 1) * 12; // each item moves a bit more
      const tx     = mx * depth;
      const ty     = my * depth;
      // Apply on top of existing animation via CSS variable workaround
      el.style.setProperty('--px', `${tx}px`);
      el.style.setProperty('--py', `${ty}px`);
      el.style.transform = `translate(var(--px), var(--py))`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    floats.forEach(el => { el.style.transform = ''; });
  });
})();


/* ──────────────────────────────────────────
   11. HOW IT WORKS — progressive step & SVG animations
──────────────────────────────────────────── */
(function initStepAnimations() {
  const section    = document.querySelector('.how-it-works');
  if (!section) return;

  const cards      = Array.from(section.querySelectorAll('.step-card'));
  const connectors = Array.from(section.querySelectorAll('.step-connector'));
  let   triggered  = false;

  /* Accurate dashoffset only for connector paths — icons are filled SVGs, not stroked */
  section.querySelectorAll('.connector-path, .connector-arrow').forEach(el => {
    try {
      const len = el.getTotalLength();
      el.style.strokeDasharray  = len;
      el.style.strokeDashoffset = len;
    } catch (_) { /* CSS fallback (300) already set */ }
  });

  /* Sequential reveal: card 1 → arrow 1 → card 2 → arrow 2 → card 3 */
  const sequence = [
    () => cards[0]?.classList.add('step-visible'),           //    0 ms
    () => connectors[0]?.classList.add('connector-visible'), //  600 ms
    () => cards[1]?.classList.add('step-visible'),           //  880 ms
    () => connectors[1]?.classList.add('connector-visible'), // 1500 ms
    () => cards[2]?.classList.add('step-visible'),           // 1780 ms
  ];
  const delays = [0, 600, 880, 1500, 1780];

  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || triggered) return;
    triggered = true;
    sequence.forEach((fn, i) => setTimeout(fn, delays[i]));
  }, { threshold: 0.12 });

  observer.observe(section);
})();


/* ──────────────────────────────────────────
   12. NEWSLETTER FORM — subscribe feedback
──────────────────────────────────────────── */
function handleNewsletter(e) {
  e.preventDefault();
  const form  = e.target;
  const input = form.querySelector('input');
  const btn   = form.querySelector('button');
  const orig  = btn.textContent;

  const lang = localStorage.getItem('qb-lang') || 'en';
  const successMsg = { en: '✓ Subscribed!', ar: '✓ تم الاشتراك!', ja: '✓ 登録完了！' };
  btn.textContent = successMsg[lang] || '✓ Subscribed!';
  btn.style.background = '#22c55e';
  input.value = '';

  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 3000);

  return false;
}

/* ──────────────────────────────────────────
   12. HERO SEARCH — focus effect + Enter key
──────────────────────────────────────────── */
(function initHeroSearch() {
  const input = document.querySelector('.search-input');
  const btn   = document.querySelector('.search-btn');
  if (!input || !btn) return;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });

  btn.addEventListener('click', () => {
    if (!input.value.trim()) return;
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      const top = menuSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    input.value = '';
  });
})();


/* ──────────────────────────────────────────
   14. ACTIVE NAV LINK — highlight on scroll
──────────────────────────────────────────── */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  function update() {
    const scrollY = window.scrollY + 120;
    let active = '';

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) active = sec.id;
    });

    links.forEach(a => {
      const href = a.getAttribute('href').slice(1);
      a.style.color = href === active ? 'var(--orange)' : '';
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ══════════════════════════════════════════════════════════════
   15. THREE.JS — HERO 3D SCENE
   Floating food models: burger, pizza, sushi, drink
   + orbiting torus rings + particle cloud + mouse parallax
══════════════════════════════════════════════════════════════ */
(function initHero3D() {
  /* Guard: Three.js must be loaded, canvas must exist, not mobile */
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('hero-canvas');
  const hero   = document.getElementById('hero');
  if (!canvas || !hero) return;
  if (window.innerWidth < 900) return; // skip on mobile (canvas display:none via CSS)

  const W = hero.clientWidth  || window.innerWidth;
  const H = hero.clientHeight || window.innerHeight;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping         = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace    = THREE.SRGBColorSpace;

  /* ── Scene & Camera ── */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.z = 7;

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const dirLight = new THREE.DirectionalLight(0xfff4e0, 1.0);
  dirLight.position.set(5, 8, 5);
  scene.add(dirLight);

  const pl1 = new THREE.PointLight(0xff6b35, 4.5, 22); pl1.position.set(4, 2, 4);   scene.add(pl1);
  const pl2 = new THREE.PointLight(0x8b5cf6, 2.5, 18); pl2.position.set(-3, -2, 3); scene.add(pl2);
  const pl3 = new THREE.PointLight(0xf59e0b, 2.0, 14); pl3.position.set(1, -4, 2);  scene.add(pl3);

  /* ── Helper: physical material with clearcoat for gloss ── */
  const stdMat = color => new THREE.MeshPhysicalMaterial({
    color,
    roughness:          0.42,
    metalness:          0.08,
    clearcoat:          0.85,
    clearcoatRoughness: 0.12,
  });

  /* ═══ BURGER ═══ */
  function makeBurger() {
    const g = new THREE.Group();

    const addCyl = (ry, h, color, py) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(ry, ry, h, 40), stdMat(color));
      m.position.y = py; g.add(m);
    };

    // Buns, patty, cheese, lettuce, tomato
    addCyl(0.55, 0.24, 0xd4882a, 0);      // bottom bun
    addCyl(0.52, 0.13, 0x5c2800, 0.19);   // patty
    addCyl(0.56, 0.06, 0xf59e0b, 0.30);   // cheese
    addCyl(0.48, 0.06, 0x4caf50, 0.36);   // lettuce
    addCyl(0.50, 0.05, 0xef4444, 0.42);   // tomato

    // Top bun (dome)
    const top = new THREE.Mesh(
      new THREE.SphereGeometry(0.56, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
      stdMat(0xd4882a)
    );
    top.position.y = 0.49;
    g.add(top);

    // Sesame seeds
    [[-0.18, 0.05], [0.0, 0.13], [0.18, 0.05]].forEach(([x, z]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), stdMat(0xfff8dc));
      s.position.set(x, 1.04, z);
      g.add(s);
    });

    return g;
  }

  /* ═══ PIZZA ═══ */
  function makePizza() {
    const g = new THREE.Group();

    // Crust ring
    const crust = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.1, 16, 64), stdMat(0xd4882a));
    crust.rotation.x = Math.PI / 2;
    g.add(crust);

    // Base disc layers
    const base   = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.08, 40), stdMat(0xe8c484));
    const sauce  = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.09, 40), stdMat(0xdc2626));
    const cheese = new THREE.Mesh(new THREE.CylinderGeometry(0.51, 0.51, 0.05, 40), stdMat(0xf7b731));
    sauce.position.y  = 0.01;
    cheese.position.y = 0.06;
    g.add(base); g.add(sauce); g.add(cheese);

    // Pepperoni
    [0, 1.26, 2.51, 3.77, 5.03].forEach(angle => {
      const r  = 0.28 + (angle % 2) * 0.1;
      const pp = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16), stdMat(0xb91c1c));
      pp.position.set(Math.cos(angle) * r, 0.11, Math.sin(angle) * r);
      g.add(pp);
    });

    return g;
  }

  /* ═══ SUSHI ROLL ═══ */
  function makeSushi() {
    const g = new THREE.Group();
    const nori   = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.60, 32), stdMat(0x1a2e1a));
    const rice   = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.62, 32), stdMat(0xf5f0e8));
    const fill   = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.64, 16), stdMat(0xff8c69));
    g.add(nori); g.add(rice); g.add(fill);
    g.rotation.z = Math.PI / 2;
    return g;
  }

  /* ═══ DRINK CUP ═══ */
  function makeDrink() {
    const g = new THREE.Group();
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.40, 0.30, 0.90, 32),
      new THREE.MeshStandardMaterial({ color: 0xff6b35, roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.88 })
    );
    const lid   = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.07, 32), stdMat(0xff8c5a));
    lid.position.y = 0.49;

    const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.2, 8), stdMat(0xffffff));
    straw.position.set(0.16, 0.85, 0);
    straw.rotation.z = 0.18;

    g.add(cup); g.add(lid); g.add(straw);
    return g;
  }

  /* ── Place food models ── */
  const foodGroup = new THREE.Group();
  foodGroup.position.x = 1.5; // offset right, away from text
  scene.add(foodGroup);

  const burger = makeBurger();
  burger.position.set(-1.4, 0.8, 0.4);
  burger.scale.setScalar(0.65);
  foodGroup.add(burger);

  const pizza = makePizza();
  pizza.position.set(1.2, 1.25, -0.3);
  pizza.rotation.y = 0.5;
  pizza.scale.setScalar(0.70);
  foodGroup.add(pizza);

  const sushi = makeSushi();
  sushi.position.set(1.4, -0.6, 0.4);
  sushi.scale.setScalar(0.65);
  foodGroup.add(sushi);

  const drink = makeDrink();
  drink.position.set(-1.2, -0.9, 0.3);
  drink.scale.setScalar(0.60);
  foodGroup.add(drink);

  /* ── Orbiting torus rings ── */
  const ringGroup = new THREE.Group();
  ringGroup.position.x = 1.5;
  scene.add(ringGroup);

  [
    { r: 3.0, tube: 0.022, color: 0xff6b35, emissive: 0.7, rx: 1.10, ry: 0.40, op: 0.45 },
    { r: 2.4, tube: 0.018, color: 0x8b5cf6, emissive: 0.6, rx: 0.40, ry: 1.20, op: 0.35 },
    { r: 2.0, tube: 0.015, color: 0xf59e0b, emissive: 0.5, rx: 0.80, ry: 1.80, op: 0.30 },
  ].forEach(({ r, tube, color, emissive, rx, ry, op }, i) => {
    const mat  = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: emissive, transparent: true, opacity: op });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 16, 120), mat);
    ring.rotation.x = rx;
    ring.rotation.y = ry;
    ring.userData.rsX = 0.003 + i * 0.001;
    ring.userData.rsY = 0.004 + i * 0.0015;
    ringGroup.add(ring);
  });

  /* ── Particle cloud ── */
  const N   = 500;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const pal = [[1.0,0.42,0.21],[0.97,0.62,0.04],[0.55,0.36,0.96],[1.0,0.55,0.35],[0.13,0.77,0.37]];

  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 12;
    pos[i*3+1] = (Math.random() - 0.5) * 8;
    pos[i*3+2] = (Math.random() - 0.5) * 6;
    const c = pal[Math.floor(Math.random() * pal.length)];
    col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.046, vertexColors: true, transparent: true, opacity: 0.65, sizeAttenuation: true });
  scene.add(new THREE.Points(pGeo, pMat));

  /* ── Mouse parallax ── */
  let mx = 0, my = 0, tx = 0, ty = 0;
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width  * 2 - 1;
    my = (e.clientY - r.top)  / r.height * -2 + 1;
  }, { passive: true });

  /* ── Per-object float data ── */
  const floatData = [
    { obj: burger, offset: 0.0, spd: 0.45, rx: 0.004, ry: 0.007 },
    { obj: pizza,  offset: 1.3, spd: 0.35, rx: 0.006, ry: 0.004 },
    { obj: sushi,  offset: 2.6, spd: 0.55, rx: 0.003, ry: 0.008 },
    { obj: drink,  offset: 3.9, spd: 0.40, rx: 0.005, ry: 0.006 },
  ];

  /* ── Animation loop ── */
  const clock = new THREE.Clock();
  let rafId;

  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Float + rotate each food model
    floatData.forEach(({ obj, offset, spd, rx, ry }) => {
      obj.position.y += Math.sin(t * spd + offset) * 0.003;
      obj.rotation.x += rx;
      obj.rotation.y += ry;
    });

    // Spin rings
    ringGroup.children.forEach(ring => {
      ring.rotation.x += ring.userData.rsX;
      ring.rotation.y += ring.userData.rsY;
    });

    // Slow particle drift
    pGeo.attributes.position.array.forEach((_, idx) => {
      if (idx % 3 === 1) pGeo.attributes.position.array[idx] += Math.sin(t + idx) * 0.0002;
    });
    pGeo.attributes.position.needsUpdate = true;

    // Smooth mouse parallax
    tx += (mx - tx) * 0.04;
    ty += (my - ty) * 0.04;
    foodGroup.rotation.y  = tx * 0.25;
    foodGroup.rotation.x  = ty * 0.12;
    ringGroup.rotation.y  = tx * 0.12;
    ringGroup.rotation.x  = ty * 0.06;

    // Pulsating point lights
    pl1.intensity = 4.5 + Math.sin(t * 1.2) * 0.7;
    pl2.intensity = 2.5 + Math.sin(t * 1.8 + 1.0) * 0.5;

    renderer.render(scene, camera);
  }
  animate();

  /* ── Responsive resize ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth < 900) { cancelAnimationFrame(rafId); return; }
    const w = hero.clientWidth, h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════════
   16. GSAP — HERO ENTRANCE + SCROLL-TRIGGERED REVEALS
══════════════════════════════════════════════════════════════ */
(function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Word-split hero headline ── */
  const h1El = document.querySelector('.hero-text h1');
  if (h1El) {
    h1El.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const frag = document.createDocumentFragment();
        const words = node.textContent.trim().split(' ');
        words.forEach((word, i) => {
          const wrap  = document.createElement('span');
          const inner = document.createElement('span');
          wrap.className  = 'word-wrap';
          inner.className = 'word-inner';
          inner.textContent = word;
          wrap.appendChild(inner);
          frag.appendChild(wrap);
          if (i < words.length - 1) frag.appendChild(document.createTextNode(' '));
        });
        node.parentNode.replaceChild(frag, node);
      }
    });
    const grad = h1El.querySelector('.gradient-text');
    if (grad && !grad.querySelector('.word-wrap')) {
      const words = grad.textContent.trim().split(' ');
      grad.innerHTML = words.map(w =>
        `<span class="word-wrap"><span class="word-inner">${w}</span></span>`
      ).join(' ');
    }
  }

  /* ── Hero entrance timeline (starts after preloader ~2.6s) ── */
  const tl = gsap.timeline({ delay: 2.8 });
  tl
    .from('.badge',                { y: -30, opacity: 0, duration: 0.65, ease: 'power3.out' })
    .from('.hero-text h1 .word-inner', { y: '115%', duration: 0.85, stagger: 0.055, ease: 'power4.out' }, '-=0.3')
    .from('.hero-text p',      { y: 40,  opacity: 0, duration: 0.70, ease: 'power3.out' }, '-=0.55')
    .from('.hero-search',      { y: 28,  opacity: 0, duration: 0.60, ease: 'power3.out' }, '-=0.45')
    .from('.hero-actions > *', { y: 22,  opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' }, '-=0.40')
    .from('.hero-stats .stat', { y: 18,  opacity: 0, duration: 0.50, stagger: 0.1, ease: 'power3.out' }, '-=0.35')
    .from('.hero-visual',      { x: 80,  opacity: 0, duration: 0.90, ease: 'power3.out' }, '-=0.80');

  /* ── Section headers (each child staggers in) ── */
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: 'top 86%' },
      y: 40, opacity: 0, duration: 0.70, stagger: 0.14, ease: 'power3.out',
    });
  });

  /* ── Feature cards ── */
  gsap.from('.feature-card', {
    scrollTrigger: { trigger: '.features-grid', start: 'top 76%' },
    y: 60, opacity: 0, duration: 0.70, stagger: 0.14, ease: 'power3.out', clearProps: 'all',
  });

  /* ── Menu section background orbs parallax ── */
  gsap.to('.menu-orb-1', {
    scrollTrigger: { trigger: '.menu', start: 'top bottom', end: 'bottom top', scrub: 1.8 },
    y: -80, x: 30, ease: 'none',
  });
  gsap.to('.menu-orb-2', {
    scrollTrigger: { trigger: '.menu', start: 'top bottom', end: 'bottom top', scrub: 2.2 },
    y: -60, x: -20, ease: 'none',
  });
  gsap.to('.menu-orb-3', {
    scrollTrigger: { trigger: '.menu', start: 'top bottom', end: 'bottom top', scrub: 1.4 },
    y: -40, ease: 'none',
  });

  /* ── Menu sparks parallax ── */
  gsap.to('.menu-spark-1', {
    scrollTrigger: { trigger: '.menu', start: 'top bottom', end: 'bottom top', scrub: 1 },
    y: -50, rotation: 45, ease: 'none',
  });
  gsap.to('.menu-spark-3', {
    scrollTrigger: { trigger: '.menu', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    y: -35, rotation: -30, ease: 'none',
  });

  /* ── Filter tabs stagger in ── */
  gsap.from('.filter-tabs .tab', {
    scrollTrigger: { trigger: '.filter-tabs', start: 'top 88%' },
    y: 22, opacity: 0, duration: 0.42, stagger: 0.07, ease: 'back.out(1.8)',
  });

  /* ── Menu cards: scale + fade stagger ── */
  gsap.from('.menu-card', {
    scrollTrigger: { trigger: '.menu-grid', start: 'top 80%' },
    y: 60, opacity: 0, scale: 0.88, duration: 0.65, stagger: 0.10,
    ease: 'back.out(1.4)', clearProps: 'all',
  });

  /* ── View-all CTA reveal ── */
  gsap.from('.menu-view-all', {
    scrollTrigger: { trigger: '.menu-view-all', start: 'top 92%' },
    y: 30, opacity: 0, duration: 0.55, ease: 'power3.out',
  });

  /* ── How-it-works promo strip ── */
  gsap.from('.how-promo', {
    scrollTrigger: { trigger: '.how-promo', start: 'top 88%' },
    y: 24, opacity: 0, duration: 0.55, ease: 'power3.out',
  });

  /* ── App section ── */
  gsap.from('.app-text > *', {
    scrollTrigger: { trigger: '.app-inner', start: 'top 76%' },
    x: -50, opacity: 0, duration: 0.70, stagger: 0.11, ease: 'power3.out',
  });
  gsap.from('.phone-wrap', {
    scrollTrigger: { trigger: '.app-inner', start: 'top 76%' },
    x: 80, opacity: 0, duration: 0.90, ease: 'power3.out',
  });

  /* ── Testimonial cards ── */
  gsap.from('.testi-card', {
    scrollTrigger: { trigger: '.testi-grid', start: 'top 82%' },
    y: 40, opacity: 0, duration: 0.60, stagger: 0.12, ease: 'power3.out',
  });

  /* ── Footer columns ── */
  gsap.from('.footer-top > *', {
    scrollTrigger: { trigger: '.footer-top', start: 'top 92%' },
    y: 30, opacity: 0, duration: 0.60, stagger: 0.10, ease: 'power3.out',
  });

  /* ── Parallax: plate-wrapper floats up on scroll ── */
  gsap.to('.plate-wrapper', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
    y: -90,
    ease: 'none',
  });

  /* ── Brand ticker (GSAP infinite scroll) ── */
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    gsap.to(ticker, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });
  }

  /* ── Hero canvas fades as user scrolls past hero ── */
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    gsap.to(heroCanvas, {
      scrollTrigger: { trigger: '#hero', start: 'center top', end: 'bottom top', scrub: true },
      opacity: 0,
      ease: 'none',
    });
  }
})();


/* ══════════════════════════════════════════════════════════════
   17. MAGNETIC BUTTONS — premium hover attraction
══════════════════════════════════════════════════════════════ */
(function initMagneticButtons() {
  if (typeof gsap === 'undefined') return;

  document.querySelectorAll('.btn-primary, .btn-nav').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect   = btn.getBoundingClientRect();
      const relX   = e.clientX - rect.left - rect.width  / 2;
      const relY   = e.clientY - rect.top  - rect.height / 2;
      gsap.to(btn, {
        x: relX * 0.28,
        y: relY * 0.28,
        duration: 0.35,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
})();


/* ══════════════════════════════════════════════════════════════
   18. HERO SECTION — ambient particle interaction
   Particles gently repel from mouse on desktop
══════════════════════════════════════════════════════════════ */
// (Three.js particle repulsion handled inside the 3D loop via mouse coords)
