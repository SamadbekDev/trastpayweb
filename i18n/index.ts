import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('app_lang');
    if (saved && ['ru', 'uz', 'en'].includes(saved)) {
      return saved;
    }
  }
  return 'ru';
};

const resources = {
  ru: { translation: { welcome: 'Добро пожаловать в Трастбанк' } },
  uz: { translation: { welcome: 'Trastbankga xush kelibsiz' } },
  en: { translation: { welcome: 'Welcome to Trastbank' } },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_lang', lng.split('-')[0].toLowerCase());
    }
  });
}

export default i18n;
