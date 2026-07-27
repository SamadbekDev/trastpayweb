import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      welcome: 'Добро пожаловать в Трастбанк',
    },
  },
  uz: {
    translation: {
      welcome: 'Trastbankga xush kelibsiz',
    },
  },
  en: {
    translation: {
      welcome: 'Welcome to Trastbank',
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
