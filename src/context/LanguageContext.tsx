import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav_home": "Home",
    "nav_about": "About",
    "nav_projects": "Projects ▾",
    "nav_sectors": "Sectors",
    "nav_gallery": "Gallery",
    "nav_news": "News",
    "nav_contact": "Contact",
    "hero_subtitle": "SINCE 1955 — BUILDING THE FUTURE",
    "hero_title": "Engineering Tomorrow's Infrastructure Today",
    "hero_desc": "One of the largest international construction companies, delivering excellence across the Middle East and Africa.",
    "home_legacy_title": "Our Legacy of Excellence",
    "home_legacy_desc": "With over 70 years of experience, we have shaped the skyline of cities across the Middle East and Africa.",
    "btn_explore": "Our Projects",
    "btn_story": "Contact Us",
    "about_page_title": "About Arab Contractors",
    "about_page_subtitle": "Seven Decades of Engineering Excellence",
    "about_history_subtitle": "OUR STORY",
    "about_history_title": "History & Heritage",
    "about_history_p1": "The Arab Contractors (Osman Ahmed Osman & Co.) is one of the leading construction companies in the Middle East and Africa. Our roots extend back more than half a century, founded in 1955 by the visionary engineer Osman Ahmed Osman. The company has played a pivotal role in the development of Egypt's infrastructure and has expanded its footprint to over 30 countries.",
    "about_history_p2": "From the construction of the Aswan High Dam in the 1960s to the world's widest cable-stayed bridge (Rod El Farag Axis) in 2019, our history is a testament to our ability to tackle the most complex engineering challenges. We take pride in our heritage while continuously innovating for the future.",
    "about_mission_title": "Our Mission",
    "about_mission_desc": "To provide high-quality construction and engineering services by applying the latest international standards in quality, safety, and environmental protection. We aim to achieve sustainable development and create value for our clients and communities.",
    "about_vision_title": "Our Vision",
    "about_vision_desc": "To be a global leader in the construction industry, recognized for our excellence, innovation, and commitment to building a better future. We strive to be the partner of choice for complex infrastructure projects worldwide.",
    "about_values_title": "Our Values",
    "about_values_desc": "Integrity, Quality, Safety, Innovation, and Sustainability. These core values guide our decisions, define our culture, and ensure the long-term success of our projects and partnerships.",
    "about_leadership_subtitle": "LEADERSHIP",
    "about_leadership_title": "Board of Directors",
    "about_leader_1_name": "Eng. Ahmed El Assar",
    "about_leader_1_role": "Chairman",
    "about_leader_2_name": "Eng. Sayed El Wazir",
    "about_leader_2_role": "Vice Chairman",
    "about_leader_3_name": "Eng. Ahmed El Adalany",
    "about_leader_3_role": "Vice Chairman",
    "about_leader_4_name": "Eng. Heba Abul Ela",
    "about_leader_4_role": "Vice Chairman",
    "about_leader_5_name": "Eng. Hassan Moustafa",
    "about_leader_5_role": "Vice Chairman",
    "about_leader_6_name": "Eng. Osama Moustafa",
    "about_leader_6_role": "Board Member",
    "about_leader_7_name": "Eng. Ibrahim Mabrouk",
    "about_leader_7_role": "Board Member",
    "about_leader_8_name": "Eng. Tarek Khedr",
    "about_leader_8_role": "Board Member",
    "projects_page_title": "Our Projects",
    "projects_page_subtitle": "Engineering landmarks that shape the future",
    "projects_filter_all": "All Projects",
    "projects_filter_infrastructure": "Infrastructure",
    "projects_filter_buildings": "Buildings",
    "projects_filter_energy": "Energy & Power",
    "projects_filter_water": "Water & Marine",
    "projects_search_placeholder": "Search by project name or location...",
    "sectors_page_title": "Our Sectors",
    "sectors_page_subtitle": "Specialized expertise across every field of construction",
    "news_page_title": "News & Media",
    "news_page_subtitle": "Stay updated with our latest achievements, contracts, and corporate milestones",
    "gallery_page_title": "Visual Gallery",
    "gallery_page_subtitle": "Capturing our engineering milestones through the lens",
    "footer_rights": "Arab Contractors. All rights reserved.",
    "footer_privacy": "Privacy Policy",
    "footer_terms": "Terms of Service",
    "footer_quick_links": "Quick Links",
    "footer_contact": "Contact",
    "footer_follow": "Follow Us",
    "footer_address": "34 Adly Street - Cairo, Egypt",
    "footer_desc": "One of the largest and oldest construction companies in the Middle East and Africa, with roots extending back more than half a century.",
    "menu": "MENU"
  },
  ar: {
    "nav_home": "الرئيسية",
    "nav_about": "من نحن",
    "nav_projects": "المشاريع ▾",
    "nav_sectors": "القطاعات",
    "nav_gallery": "المعرض",
    "nav_news": "الأخبار",
    "nav_contact": "اتصل بنا",
    "hero_subtitle": "منذ عام 1955 — نبني المستقبل",
    "hero_title": "هندسة البنية التحتية للغد، اليوم",
    "hero_desc": "واحدة من أكبر شركات المقاولات الدولية، تقدم التميز في جميع أنحاء الشرق الأوسط وأفريقيا.",
    "home_legacy_title": "إرث من التميز",
    "home_legacy_desc": "مع أكثر من 70 عامًا من الخبرة، قمنا بتشكيل أفق المدن في جميع أنحاء الشرق الأوسط وأفريقيا.",
    "btn_explore": "مشاريعنا",
    "btn_story": "اتصل بنا",
    "about_page_title": "عن المقاولون العرب",
    "about_page_subtitle": "سبعة عقود من التميز الهندسي",
    "about_history_subtitle": "قصتنا",
    "about_history_title": "التاريخ والتراث",
    "about_history_p1": "شركة المقاولون العرب (عثمان أحمد عثمان وشركاه) هي إحدى شركات المقاولات الرائدة في الشرق الأوسط وأفريقيا. تمتد جذورنا لأكثر من نصف قرن، حيث تأسست عام 1955 على يد المهندس صاحب الرؤية عثمان أحمد عثمان.",
    "about_history_p2": "من بناء السد العالي بأسوان إلى أعرض كوبري ملجم في العالم، تاريخنا هو شهادة على قدرتنا على مواجهة التحديات الهندسية الأكثر تعقيدًا.",
    "about_mission_title": "مهمتنا",
    "about_mission_desc": "تقديم خدمات بناء عالية الجودة من خلال تطبيق أحدث المعايير الدولية في الجودة والسلامة لتحقيق أهداف التنمية المستدامة.",
    "about_vision_title": "رؤيتنا",
    "about_vision_desc": "أن نكون رائدًا عالميًا في صناعة البناء، والمساهمة في تطوير البنية التحتية برؤية مبتكرة تلبي الاحتياجات المستقبلية.",
    "about_values_title": "قيمنا",
    "about_values_desc": "النزاهة والجودة والسلامة والاستدامة هي ركائز عملياتنا وأساس نجاحنا.",
    "about_leadership_subtitle": "القيادة",
    "about_leadership_title": "مجلس الإدارة",
    "about_leader_1_name": "م. أحمد العصار",
    "about_leader_1_role": "رئيس مجلس الإدارة",
    "about_leader_2_name": "م. سيد الوزير",
    "about_leader_2_role": "نائب رئيس مجلس الإدارة",
    "about_leader_3_name": "م. أحمد العدلاني",
    "about_leader_3_role": "نائب رئيس مجلس الإدارة",
    "about_leader_4_name": "م. هبة أبو العلا",
    "about_leader_4_role": "نائب رئيس مجلس الإدارة",
    "about_leader_5_name": "م. حسن مصطفى",
    "about_leader_5_role": "نائب رئيس مجلس الإدارة",
    "about_leader_6_name": "م. أسامة مصطفى",
    "about_leader_6_role": "عضو مجلس الإدارة",
    "about_leader_7_name": "م. إبراهيم مبروك",
    "about_leader_7_role": "عضو مجلس الإدارة",
    "about_leader_8_name": "م. طارق خضر",
    "about_leader_8_role": "عضو مجلس الإدارة",
    "projects_page_title": "مشاريعنا",
    "projects_page_subtitle": "معالم تحدد هندسة اليوم",
    "projects_filter_all": "الكل",
    "projects_filter_infrastructure": "البنية التحتية",
    "projects_filter_buildings": "المباني",
    "projects_filter_energy": "الطاقة",
    "projects_search_placeholder": "ابحث في المشاريع...",
    "sectors_page_title": "قطاعاتنا",
    "sectors_page_subtitle": "خبرة متخصصة في كل مجال من مجالات البناء",
    "news_page_title": "الأخبار والإعلام",
    "news_page_subtitle": "ابق على اطلاع بأحدث إنجازاتنا وإعلاناتنا",
    "gallery_page_title": "المعرض البصري",
    "gallery_page_subtitle": "توثيق إنجازاتنا الهندسية من خلال العدسة",
    "footer_rights": "المقاولون العرب. جميع الحقوق محفوظة.",
    "footer_privacy": "سياسة الخصوصية",
    "footer_terms": "شروط الخدمة",
    "footer_quick_links": "روابط سريعة",
    "footer_contact": "اتصل بنا",
    "footer_follow": "تابعنا",
    "footer_address": "34 شارع عدلي - القاهرة، مصر",
    "footer_desc": "واحدة من أكبر وأقدم شركات المقاولات في الشرق الأوسط وأفريقيا، بجذور تمتد لأكثر من نصف قرن.",
    "menu": "القائمة"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
