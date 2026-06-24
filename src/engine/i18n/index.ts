import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import engineEn from './locales/en.json';
import adventureEn from '@adventures/the-lost-line/locales/en.json';

void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: { ...engineEn, ...adventureEn },
    },
  },
});

export default i18n;
