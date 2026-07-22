import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    fallbackLng: "en",
    lng: "en",
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
  });

const LANG_LOADERS: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  fr: () => import("./locales/fr.json"),
  ar: () => import("./locales/ar.json"),
};

const loadLang = async (lang: string) => {
  if (!i18n.hasResourceBundle(lang, "translation")) {
    const mod = await LANG_LOADERS[lang]();
    i18n.addResourceBundle(lang, "translation", mod.default);
  }
};

setTimeout(() => {
  loadLang("fr");
  loadLang("ar");
}, 0);

export const RTL_LANGS = ["ar"];

export function isRTL(lang: string) {
  return RTL_LANGS.includes(lang);
}

export default i18n;
