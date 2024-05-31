import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi  from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from '@/assets/locales/en/translation.json';
import translationAr from '@/assets/locales/ar/translation.json';

const resources = {
  en: {
    translation: translationEn,
  },
  ar: {
    translation: translationAr,
  },
};

export const supportedLngs = {
  en: 'English',
  ar: 'Arabic (العربية)',
};

i18n
  .use(HttpApi )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: Object.keys(supportedLngs),

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;