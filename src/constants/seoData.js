// SEO and navigation data for Beyt
// Updated with provided SEO entries including contact section

const seoData = {
  home: {
    en: {
      link: "{baseurl}/en/",
      title:
        "Property for Sale & Rent in {countryNameEnglish} | Villas, Apartments & More – Beyt",
      metaDescription:
        "Beyt is {countryNameEnglish}’s real estate marketplace—browse apartments, villas, offices & more for sale or rent. Advertise your property free today",
      metaKeywords:
        "{countryNameEnglish} property, buy property {countryNameEnglish}, rent property {countryNameEnglish}, villas for rent, apartments for sale, offices, commercial space, chalets, farms, real estate {countryNameEnglish}, property listings, property search",
      h1: "{countryNameEnglish} Real Estate Marketplace: Apartments, Villas, Offices for Sale & Rent",
      h2: "Advertise Your Property Free on Beyt and Find Your Ideal Home with Advanced Filters",
      hrefEn: "{baseurl}/en/",
      hrefAr: "{baseurl}/ar/",
      hrefDefault: "{baseurl}/en/",
      canonical: "{baseurl}/en/",
    },
    ar: {
      link: "{baseurl}/ar/",
      title:
        "شقق، فلل، مكاتب والمزيد للبيع والإيجار في {countryNameArabic} | بيت",
      metaDescription:
        "بيت هو سوق العقارات في {countryNameArabic}—تصفح شقق، فلل، مكاتب والمزيد للبيع أو للإيجار. أعلن عقارك مجاناً اليوم مع بيت",
      metaKeywords:
        "عقارات {countryNameArabic}, شقق للإيجار في {countryNameArabic}, شقق للبيع في {countryNameArabic}, فلل للإيجار, فلل للبيع, مكاتب للإيجار, مكاتب للبيع, عقارات تجارية, بيت, سوق العقارات {countryNameArabic}",
      h1: "بيت | سوق العقارات في {countryNameArabic}",
      h2: "تصفح شقق، فلل، مكاتب والمزيد للبيع أو للإيجار وأعلن عقارك مجاناً مع بيت",
      hrefEn: "{baseurl}/en/",
      hrefAr: "{baseurl}/ar/",
      hrefDefault: "{baseurl}/ar/",
      canonical: "{baseurl}/ar/",
    },
  },
  properties: {
    en: {
      link: "{baseurl}/en/properties/",
      title:
        "Search & Filter {countryNameEnglish} Properties | Apartments, Villas & More – Beyt",
      metaDescription:
        "Use Beyt’s powerful search and filters to browse apartments, villas, offices & more for sale or rent in {countryNameEnglish}. Advertise your property free today!",
      metaKeywords:
        "{countryNameEnglish} property search, filter properties {countryNameEnglish}, apartments for rent, villas for sale, offices for rent, commercial space, free listing, Beyt",
      h1: "Search | Filter {countryNameEnglish} Properties: Apartments, Villas, Offices | More",
      h2: "Advertise Your Property Free on Beyt and Easily Find Your Next Home or Workspace",
      hrefEn: "{baseurl}/en/properties/",
      hrefAr: "{baseurl}/ar/properties/",
      hrefDefault: "{baseurl}/en/properties/",
      canonical: "{baseurl}/en/properties/",
    },
    ar: {
      link: "{baseurl}/ar/properties/",
      title:
        "ابحث وصنف عقارات {countryNameArabic} | شقق، فلل، مكاتب والمزيد – بيت",
      metaDescription:
        "استخدم البحث والفلاتر المتقدمة في بيت لتصفح شقق، فلل، مكاتب والمزيد للبيع أو للإيجار في {countryNameArabic}. أعلن عقارك مجاناً اليوم",
      metaKeywords:
        "بحث عقارات {countryNameArabic}, تصفية عقارات, شقق للإيجار, فلل للبيع, مكاتب للإيجار, عقارات تجارية, إعلان مجاني, بيت",
      h1: "ابحث وصنف عقارات {countryNameArabic}: شقق، فلل، مكاتب والمزيد",
      h2: "أعلن عقارك مجاناً مع بيت وابحث بسهولة عن منزلك أو مكتبك القادم",
      hrefEn: "{baseurl}/en/properties/",
      hrefAr: "{baseurl}/ar/properties/",
      hrefDefault: "{baseurl}/ar/properties/",
      canonical: "{baseurl}/ar/properties/",
    },
  },
  rent: {
    en: {
      link: "{baseurl}/en/explore/rent",
      title:
        "Search | Filter Properties for Rent in {countryNameEnglish} | Beyt",
      metaDescription:
        "Use Beyt’s powerful search and filters to browse rental properties in {countryNameEnglish}. Advertise your rental property free today!",
      metaKeywords:
        "properties for rent {countryNameEnglish}, rent property {countryNameEnglish}, rental listings {countryNameEnglish}, apartments for rent, villas for rent, free listing, Beyt",
      h1: "Search | Filter Properties for Rent in {countryNameEnglish}",
      h2: "Advertise Your Rental Property Free on Beyt and Find Your Ideal Home or Workspace",
      hrefEn: "{baseurl}/en/explore/rent",
      hrefAr: "{baseurl}/ar/properties/?status=rent",
      hrefDefault: "{baseurl}/en/explore/rent",
      canonical: "{baseurl}/en/explore/rent",
    },
    ar: {
      link: "{baseurl}/ar/explore/rent",
      title: "ابحث وصنف عقارات للإيجار في {countryNameArabic} | بيت",
      metaDescription:
        "استخدم البحث والفلاتر المتقدمة في بيت لتصفح العقارات للإيجار في {countryNameArabic}. أعلن عن عقارك للإيجار مجاناً اليوم",
      metaKeywords:
        "عقارات للإيجار في {countryNameArabic}, بحث عقارات للإيجار, شقق للإيجار, فلل للإيجار, مكاتب للإيجار, إعلان مجاني, بيت",
      h1: "ابحث وصنف عقارات للإيجار في {countryNameArabic}",
      h2: "أعلن عن عقارك للإيجار مجاناً مع بيت وابحث عن منزلك أو مكتبك المثالي",
      hrefEn: "{baseurl}/en/explore/rent",
      hrefAr: "{baseurl}/ar/explore/rent",
      hrefDefault: "{baseurl}/ar/explore/rent",
      canonical: "{baseurl}/ar/explore/rent",
    },
  },
  sale: {
    en: {
      link: "{baseurl}/en/explore/sale",
      title:
        "Search | Filter Properties for Sale in {countryNameEnglish} | Beyt",
      metaDescription:
        "Use Beyt’s powerful search and filters to browse properties for sale in {countryNameEnglish}. Advertise your property for sale free today!",
      metaKeywords:
        "properties for sale {countryNameEnglish}, buy property {countryNameEnglish}, sale listings {countryNameEnglish}, villas for sale, apartments for sale, free listing, Beyt",
      h1: "Search| Filter Properties for Sale in {countryNameEnglish}",
      h2: "Advertise Your Property for Sale Free on Beyt and Find Your Perfect Investment",
      hrefEn: "{baseurl}/en/explore/sale",
      hrefAr: "{baseurl}/ar/explore/sale",
      hrefDefault: "{baseurl}/en/explore/sale",
      canonical: "{baseurl}/en/explore/sale",
    },
    ar: {
      link: "{baseurl}/ar/explore/sale",
      title: "ابحث وصنف عقارات للبيع في {countryNameArabic} | بيت",
      metaDescription:
        "استخدم البحث والفلاتر المتقدمة في بيت لتصفح العقارات للبيع في {countryNameArabic}. أعلن عن عقارك للبيع مجاناً اليوم",
      metaKeywords:
        "عقارات للبيع في {countryNameArabic}, بحث عقارات للبيع, شقق للبيع, فلل للبيع, مكاتب للبيع, إعلان مجاني, بيت",
      h1: "ابحث وصنف عقارات للبيع في {countryNameArabic}",
      h2: "أعلن عن عقارك للبيع مجاناً مع بيت وابحث عن استثمارك المثالي",
      hrefEn: "{baseurl}/en/explore/sale",
      hrefAr: "{baseurl}/ar/explore/sale",
      hrefDefault: "{baseurl}/ar/explore/sale",
      canonical: "{baseurl}/ar/explore/sale",
    },
  },
  villa: {
    en: {
      link: "{baseurl}/en/explore/Villa",
      title: "Search & Filter Villas in {countryNameEnglish} | Beyt",
      metaDescription:
        "Use Beyt’s powerful search and filters to browse villas for sale or rent in {countryNameEnglish}. Advertise your villa free today!",
      metaKeywords:
        "villas for rent in {countryNameEnglish}, villas for sale in {countryNameEnglish}, {countryNameEnglish} villas, villa listings, free villa listing, Beyt",
      h1: "Search | Filter Villas in {countryNameEnglish}",
      h2: "Advertise Your Villa Free on Beyt and Find Your Dream Home with Advanced Filters",
      hrefEn: "{baseurl}/en/explore/Villa",
      hrefAr: "{baseurl}/ar/explore/Villa",
      hrefDefault: "{baseurl}/en/explore/Villa",
      canonical: "{baseurl}/en/explore/Villa",
    },
    ar: {
      link: "{baseurl}/ar/explore/Villa",
      title: "ابحث وصنف الفلل في {countryNameArabic} | بيت",
      metaDescription:
        "استخدم البحث والفلاتر المتقدمة في بيت لتصفح الفلل للبيع أو للإيجار في {countryNameArabic}. أعلن فيلتك مجاناً اليوم مع بيت",
      metaKeywords:
        "فلل للإيجار في {countryNameArabic}, فلل للبيع في {countryNameArabic}, سوق الفلل {countryNameArabic}, إعلان مجاني, بيت",
      h1: "ابحث وصنف الفلل في {countryNameArabic}",
      h2: "أعلن فيلتك مجاناً مع بيت وابحث عن فيلتك المثالية باستخدام الفلاتر المتقدمة",
      hrefEn: "{baseurl}/en/explore/Villa",
      hrefAr: "{baseurl}/ar/explore/Villa",
      hrefDefault: "{baseurl}/ar/explore/Villa",
      canonical: "{baseurl}/ar/explore/Villa",
    },
  },
  apartment: {
    en: {
      link: "{baseurl}/en/explore/Apartment",
      title: "Search & Filter Apartments in {countryNameEnglish} | Beyt",
      metaDescription:
        "Use Beyt’s powerful search and filters to browse apartments for sale or rent in {countryNameEnglish}. Advertise your apartment free today!",
      metaKeywords:
        "apartments for rent in {countryNameEnglish}, apartments for sale in {countryNameEnglish}, {countryNameEnglish} apartments, apartment listings, free apartment listing, Beyt",
      h1: "Search | Filter Apartments in {countryNameEnglish}",
      h2: "Advertise Your Apartment Free on Beyt and Find Your Ideal Home with Advanced Filters",
      hrefEn: "{baseurl}/en/explore/Apartment",
      hrefAr: "{baseurl}/ar/explore/Apartment",
      hrefDefault: "{baseurl}/en/explore/Apartment",
      canonical: "{baseurl}/en/explore/Apartment",
    },
    ar: {
      link: "{baseurl}/ar/explore/Apartment",
      title: "ابحث وصنف الشقق في {countryNameArabic} | بيت",
      metaDescription:
        "استخدم البحث والفلاتر المتقدمة في بيت لتصفح الشقق للبيع أو للإيجار في {countryNameArabic}. أعلن شقتك مجاناً اليوم مع بيت",
      metaKeywords:
        "شقق للإيجار في {countryNameArabic}, شقق للبيع في {countryNameArabic}, سوق الشقق {countryNameArabic}, إعلان مجاني, بيت",
      h1: "ابحث وصنف الشقق في {countryNameArabic}",
      h2: "أعلن شقتك مجاناً مع بيت وابحث عن شقتك المثالية باستخدام الفلاتر المتقدمة",
      hrefEn: "{baseurl}/en/explore/Apartment",
      hrefAr: "{baseurl}/ar/explore/Apartment",
      hrefDefault: "{baseurl}/ar/explore/Apartment",
      canonical: "{baseurl}/ar/explore/Apartment",
    },
  },
  about: {
    en: {
      link: "{baseurl}/en/about/",
      title: "About Us – Beyt | {countryNameEnglish} Real Estate Marketplace",
      metaDescription:
        "Learn about Beyt, {countryNameEnglish}’s leading real estate marketplace connecting buyers, renters & sellers. Discover our mission, values & team.",
      metaKeywords:
        "Beyt, about us, real estate {countryNameEnglish}, property marketplace, company mission, property platform {countryNameEnglish}",
      h1: "About Beyt: {countryNameEnglish}’s Real Estate Marketplace",
      h2: "Connecting Buyers, Renters & Sellers with Trusted Property Solutions",
      hrefEn: "{baseurl}/en/about/",
      hrefAr: "{baseurl}/ar/about/",
      hrefDefault: "{baseurl}/en/about/",
      canonical: "{baseurl}/en/about/",
    },
    ar: {
      link: "{baseurl}/ar/about/",
      title: "من نحن – بيت | سوق العقارات في {countryNameArabic}",
      metaDescription:
        "تعرف على بيت، سوق العقارات الرائد في {countryNameArabic} الذي يربط المشترين والمستأجرين والبائعين. اكتشف مهمتنا وقيمنا وفريقنا",
      metaKeywords:
        "من نحن, بيت, سوق العقارات {countryNameArabic}, منصة العقارات, مهمتنا, فريق بيت",
      h1: "عن بيت: سوق العقارات في {countryNameArabic}",
      h2: "نربط المشترين والمستأجرين والبائعين بحلول عقارية موثوقة",
      hrefEn: "{baseurl}/en/about/",
      hrefAr: "{baseurl}/ar/about/",
      hrefDefault: "{baseurl}/ar/about/",
      canonical: "{baseurl}/ar/about/",
    },
  },
  privacy: {
    en: {
      link: "{baseurl}/en/privacy-policy/",
      title:
        "Privacy Policy – Beyt | {countryNameEnglish} Real Estate Marketplace",
      metaDescription:
        "Read Beyt’s Privacy Policy to learn how we collect, use, and protect your personal data on our {countryNameEnglish} real estate marketplace.",
      metaKeywords:
        "privacy policy, data protection, personal data, Beyt, {countryNameEnglish} real estate, user privacy, GDPR, data security",
      h1: "Privacy Policy",
      h2: "Your Data, Our Responsibility: How Beyt Protects Your Privacy",
      hrefEn: "{baseurl}/en/privacy-policy/",
      hrefAr: "{baseurl}/ar/privacy-policy/",
      hrefDefault: "{baseurl}/en/privacy-policy/",
      canonical: "{baseurl}/en/privacy-policy/",
    },
    ar: {
      link: "{baseurl}/ar/privacy-policy/",
      title: "سياسة الخصوصية – بيت | سوق العقارات في {countryNameArabic}",
      metaDescription:
        "اقرأ سياسة الخصوصية الخاصة ببيت لتتعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك الشخصية على سوق العقارات في {countryNameArabic}",
      metaKeywords:
        "سياسة الخصوصية, حماية البيانات, البيانات الشخصية, بيت, سوق العقارات {countryNameArabic}, خصوصية المستخدم, أمان البيانات, GDPR",
      h1: "سياسة الخصوصية",
      h2: "كيف تحمي بيت بياناتك الشخصية",
      hrefEn: "{baseurl}/en/privacy-policy/",
      hrefAr: "{baseurl}/ar/privacy-policy/",
      hrefDefault: "{baseurl}/ar/privacy-policy/",
      canonical: "{baseurl}/ar/privacy-policy/",
    },
  },
  terms: {
    en: {
      link: "{baseurl}/en/terms-and-conditions/",
      title:
        "Terms & Conditions – Beyt | {countryNameEnglish} Real Estate Marketplace",
      metaDescription:
        "Read Beyt’s Terms & Conditions to understand your rights, responsibilities and obligations when using {countryNameEnglish}’s leading real estate marketplace.",
      metaKeywords:
        "terms and conditions, user agreement, Beyt, {countryNameEnglish} real estate, marketplace rules, data usage, user obligations",
      h1: "Terms & Conditions",
      h2: "Your Agreement with Beyt for Using {countryNameEnglish}’s Real Estate Marketplace",
      hrefEn: "{baseurl}/en/terms-and-conditions/",
      hrefAr: "{baseurl}/ar/terms-and-conditions/",
      hrefDefault: "{baseurl}/en/terms-and-conditions/",
      canonical: "{baseurl}/en/terms-and-conditions/",
    },
    ar: {
      link: "{baseurl}/ar/terms-and-conditions/",
      title: "الشروط والأحكام – بيت | سوق العقارات في {countryNameArabic}",
      metaDescription:
        "اقرأ الشروط والأحكام الخاصة ببيت لفهم حقوقك والتزاماتك عند استخدام سوق العقارات الرائد في {countryNameArabic}",
      metaKeywords:
        "الشروط والأحكام, اتفاقية المستخدم, بيت, سوق العقارات {countryNameArabic}, قواعد الاستخدام, التزامات المستخدم",
      h1: "الشروط والأحكام",
      h2: "اتفاقك مع بيت لاستخدام سوق العقارات في {countryNameArabic}",
      hrefEn: "{baseurl}/en/terms-and-conditions/",
      hrefAr: "{baseurl}/ar/terms-and-conditions/",
      hrefDefault: "{baseurl}/ar/terms-and-conditions/",
      canonical: "{baseurl}/ar/terms-and-conditions/",
    },
  },
  contact: {
    en: {
      link: "{baseurl}/en/contact/",
      title: "Contact Us – Beyt | {countryNameEnglish} Real Estate Marketplace",
      metaDescription:
        "Get in touch with Beyt’s support team for inquiries about property listings, advertising, or general questions on {countryNameEnglish}’s leading real estate marketplace.",
      metaKeywords:
        "contact Beyt, customer support, real estate inquiries, {countryNameEnglish} property support, property marketplace contact",
      h1: "Contact Us",
      h2: "We’re Here to Help with Your Real Estate Questions and Feedback",
      hrefEn: "{baseurl}/en/contact/",
      hrefAr: "{baseurl}/ar/contact/",
      hrefDefault: "{baseurl}/en/contact/",
      canonical: "{baseurl}/en/contact/",
    },
    ar: {
      link: "{baseurl}/ar/contact/",
      title: "اتصل بنا – بيت | سوق العقارات في {countryNameArabic}",
      metaDescription:
        "تواصل مع فريق دعم بيت لأي استفسارات حول القوائم العقارية أو الإعلان أو الأسئلة العامة على سوق العقارات الرائد في {countryNameArabic}",
      metaKeywords:
        "اتصل ببيت, دعم العملاء, استفسارات عقارية, سوق العقارات {countryNameArabic}, تواصل",
      h1: "اتصل بنا",
      h2: "نحن هنا لمساعدتك في استفسارات العقارات والتعليقات",
      hrefEn: "{baseurl}/en/contact/",
      hrefAr: "{baseurl}/ar/contact/",
      hrefDefault: "{baseurl}/ar/contact/",
      canonical: "{baseurl}/ar/contact/",
    },
  },
};

export default seoData;
