"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations, defaultLang } from "../i18n/translations";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLang);

  // Load persisted language on mount
  useEffect(() => {
    const saved = localStorage.getItem("sg-lang");
    if (saved === "vi" || saved === "en") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "vi" : "en";
    setLang(next);
    localStorage.setItem("sg-lang", next);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
