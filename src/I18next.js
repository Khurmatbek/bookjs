import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {lang}  from "./Lang/lang"
i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: localStorage.getItem("lang") || 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation:
                { ...lang.en }
        },
        uz: {
            translation:
                { ...lang.uz }
        },
        ru: {
            translation:
                { ...lang.ru }
        }
    }
});
export default i18n;