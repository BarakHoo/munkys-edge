// ===== Portfolio interactivity: theme toggle, language toggle, footer year =====

// --- Splash intro (once per browser session; skipped for reduced motion) ---
(function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem('portfolio-splash-seen');

  if (prefersReduced || seen) {
    splash.classList.add('is-done');
    return;
  }

  sessionStorage.setItem('portfolio-splash-seen', '1');
  // Remove from the layout once the dissolve finishes so it can't trap focus.
  splash.addEventListener('animationend', (e) => {
    if (e.animationName === 'splash-out') splash.classList.add('is-done');
  });
  // Safety net in case the animationend event is missed.
  setTimeout(() => splash.classList.add('is-done'), 3000);
})();

// --- Footer year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Theme toggle (light/dark), persisted in localStorage ---
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme =
  localStorage.getItem('portfolio-theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// --- Language toggle (English / Hebrew) ---
// PLACEHOLDER translations — refine the Hebrew copy together once the bio/CV is final.
const translations = {
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Full Stack Developer',
    'hero.title': "Hi, I'm Barak Hoobesh.",
    'hero.lead':
      'A full stack developer based in Herzliya. I build complete web applications end to end — from database and API design to polished, responsive front-ends — and take on freelance work for businesses.',
    'hero.ctaProjects': 'View my work',
    'hero.ctaCv': 'Download CV',
    'about.title': 'About',
    'about.body':
      "I'm a full stack developer with a strong background in client care, service, and sales. After years of maximizing sales opportunities and solving problems for customers, I trained as a Full Stack Java developer and now build web applications end to end — from my own projects to freelance work for businesses.",
    'about.skillsTitle': 'Skills & technologies',
    'about.ai':
      'I work fluently with modern AI tools — using them daily to design, build, debug, and ship faster, and to accelerate learning new technologies.',
    'projects.title': 'Projects',
    'projects.fyuri.desc':
      'A full-stack e-commerce & custom-build platform for night-vision equipment. React + Vite front-end, ASP.NET Core (.NET 10) API, MySQL, admin panel with 2FA, 3D product builder, and email pipeline.',
    'projects.calc3d.desc':
      'A calculator for estimating 3D-printing costs — material, machine time, electricity, and profit margins.',
    'projects.face.desc':
      'Real-time in-browser face detection using the device camera and on-device machine-learning models.',
    'projects.gps.desc':
      'Set reminders that trigger based on your GPS location, using the browser Geolocation API.',
    'projects.shopping.desc':
      'A clean, simple shopping-list app for adding, checking off, and managing items on the go.',
    'projects.facemesh.desc':
      'Real-time facial-landmark mesh visualization rendered live from the camera feed.',
    'projects.crm.desc':
      'A full-stack CRM for sales teams — role-based access (agent / manager / admin), client assignment, activity tracking, approval workflows, audit logging, and bilingual EN/HE support.',
    'projects.coupon.desc':
      'A full-stack coupon-management platform — Spring Boot REST API with JWT auth and Swagger/OpenAPI docs, and a React + TypeScript SPA (MUI, Redux Toolkit), all containerized with Docker.',
    'projects.live': 'Live demo',
    'experience.title': 'Experience',
    'experience.freelance.role': 'Freelance Full Stack Developer',
    'experience.freelance.meta': 'Self-employed · Herzliya',
    'experience.freelance.desc':
      'I build and deliver web applications for businesses — designing the database and API, implementing the front-end, and deploying to production. My work ranges from full e-commerce and custom-build platforms to smaller focused tools, each built end to end.',
    'experience.wmo.role': 'Retention Manager',
    'experience.wmo.meta': 'WMO Marketing LTD, Herzliya · Jan 2022 – Present',
    'experience.wmo.desc':
      "Achieved the highest sales volume in the company for three consecutive months — 30% above the average sales manager. Maintained fluent English communication with clients abroad, maximized retention, and innovated the team's sales tactics and work methods.",
    'experience.modan.role': 'Frontal Sales Agent & Customer Service',
    'experience.modan.meta': 'Modan Publishers LTD, Herzliya · Oct 2014 – Dec 2021',
    'experience.modan.desc':
      'Maximized sales opportunities and provided immediate problem-solving for clients seeking assistance with electronic devices, while building lasting relationships with clients and colleagues.',
    'experience.eduTitle': 'Education',
    'experience.edu.role': 'Full Stack Java Training Course',
    'experience.edu.meta': 'John Bryce Training College · 2023 – 2024',
    'cv.title': 'CV',
    'cv.body': 'A summary of my experience and skills. Download the full CV below.',
    'cv.download': 'Download CV (PDF)',
    'contact.title': 'Contact',
    'contact.body': 'Get in touch:',
    'contact.location': 'Herzliya, Israel',
  },
  he: {
    'nav.about': 'אודות',
    'nav.projects': 'פרויקטים',
    'nav.experience': 'ניסיון',
    'nav.cv': 'קורות חיים',
    'nav.contact': 'צור קשר',
    'hero.eyebrow': 'מפתח פול-סטאק',
    'hero.title': 'היי, אני ברק הובש.',
    'hero.lead':
      'מפתח פוּל-סטאק מהרצליה. אני בונה אפליקציות ווב שלמות מהתחלה ועד הסוף — מתכנון בסיס הנתונים וה-API ועד ממשקים נקיים ומותאמים לכל מסך — וגם לוקח פרויקטים לעסקים.',
    'hero.ctaProjects': 'לצפייה בעבודות שלי',
    'hero.ctaCv': 'הורדת קורות חיים',
    'about.title': 'אודות',
    'about.body':
      'אני מפתח פוּל-סטאק עם רקע חזק בשירות לקוחות ומכירות. אחרי שנים של איתור הזדמנויות מכירה ופתרון בעיות ללקוחות, הוכשרתי כמפתח Full Stack Java והיום אני בונה אפליקציות ווב מהתחלה ועד הסוף — גם פרויקטים משלי וגם עבודות לעסקים.',
    'about.skillsTitle': 'כישורים וטכנולוגיות',
    'about.ai':
      'אני עובד בשוטף עם כלי בינה מלאכותית — משתמש בהם יום-יום כדי לתכנן, לפתח, לאתר תקלות ולהשק מהר יותר, וגם כדי ללמוד טכנולוגיות חדשות במהירות.',
    'projects.title': 'פרויקטים',
    'projects.fyuri.desc':
      'פלטפורמת מסחר אלקטרוני ובנייה מותאמת אישית לציוד ראיית לילה. פרונט-אנד ב-React + Vite, שרת ASP.NET Core (.NET 10), MySQL, פאנל ניהול עם אימות דו-שלבי, בונה מוצרים תלת-ממדי ומערכת דוא"ל.',
    'projects.calc3d.desc':
      'מחשבון להערכת עלויות הדפסת תלת-ממד — חומר, זמן מכונה, חשמל ומרווחי רווח.',
    'projects.face.desc':
      'זיהוי פנים בזמן אמת בדפדפן באמצעות מצלמת המכשיר ומודלי למידת מכונה מקומיים.',
    'projects.gps.desc':
      'הגדרת תזכורות שמופעלות לפי מיקום ה-GPS שלך, באמצעות ממשק המיקום של הדפדפן.',
    'projects.shopping.desc':
      'אפליקציית רשימת קניות נקייה ופשוטה להוספה, סימון וניהול פריטים בקלות.',
    'projects.facemesh.desc':
      'ויזואליזציה של רשת נקודות ציון בפנים בזמן אמת, המרונדרת חיה מהזנת המצלמה.',
    'projects.crm.desc':
      'מערכת CRM מלאה לצוותי מכירות — הרשאות לפי תפקיד (נציג / מנהל / אדמין), שיוך לקוחות, מעקב פעילות, תהליכי אישור, תיעוד פעולות ותמיכה דו-לשונית בעברית ובאנגלית.',
    'projects.coupon.desc':
      'פלטפורמה מלאה לניהול קופונים — שרת Spring Boot עם JWT ותיעוד Swagger, ואפליקציית React + TypeScript (MUI, Redux Toolkit), הכל ארוז ב-Docker.',
    'projects.live': 'הדגמה חיה',
    'experience.title': 'ניסיון',
    'experience.freelance.role': 'מפתח פול-סטאק עצמאי (פרילנס)',
    'experience.freelance.meta': 'עצמאי · הרצליה',
    'experience.freelance.desc':
      'אני בונה ומספק אפליקציות ווב לעסקים — תכנון בסיס הנתונים וה-API, בניית הצד הקדמי והעלאה לאוויר. העבודות נעות בין פלטפורמות מסחר ובנייה מותאמת אישית ועד כלים קטנים וממוקדים, כשכל אחד נבנה מהתחלה ועד הסוף.',
    'experience.wmo.role': 'מנהל שימור לקוחות',
    'experience.wmo.meta': 'WMO Marketing LTD, הרצליה · ינואר 2022 – היום',
    'experience.wmo.desc':
      'השגתי את היקף המכירות הגבוה בחברה שלושה חודשים ברציפות — 30% מעל ממוצע מנהלי המכירות. שמרתי על תקשורת שוטפת באנגלית עם לקוחות מחו"ל, מיקסמתי שימור לקוחות, וחידשתי את שיטות העבודה והמכירה של הצוות.',
    'experience.modan.role': 'נציג מכירות פרונטלי ושירות לקוחות',
    'experience.modan.meta': 'מודן הוצאה לאור בע"מ, הרצליה · אוקטובר 2014 – דצמבר 2021',
    'experience.modan.desc':
      'מיקסמתי הזדמנויות מכירה וסיפקתי פתרון בעיות מיידי ללקוחות שנזקקו לסיוע במכשירים אלקטרוניים, תוך בניית קשרים ארוכי טווח עם לקוחות ועמיתים.',
    'experience.eduTitle': 'השכלה',
    'experience.edu.role': 'קורס הכשרת Full Stack Java',
    'experience.edu.meta': 'מכללת ג\'ון ברייס · 2023 – 2024',
    'cv.title': 'קורות חיים',
    'cv.body': 'סיכום הניסיון והכישורים שלי. להורדת קורות החיים המלאים למטה.',
    'cv.download': 'הורדת קורות חיים (PDF)',
    'contact.title': 'צור קשר',
    'contact.body': 'ליצירת קשר:',
    'contact.location': 'הרצליה, ישראל',
  },
};

const langToggle = document.getElementById('lang-toggle');

function applyLanguage(lang) {
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
  langToggle.textContent = lang === 'he' ? 'עב / EN' : 'EN / עב';
  localStorage.setItem('portfolio-lang', lang);
}

applyLanguage(localStorage.getItem('portfolio-lang') || 'en');

langToggle.addEventListener('click', () => {
  applyLanguage(root.getAttribute('lang') === 'he' ? 'en' : 'he');
});
