
import { useState, useEffect } from 'react';
import { Language, translations, TranslationKey } from '@/utils/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage or default to browser language
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    
    if (translations[browserLanguage]) {
      return browserLanguage;
    }
    
    return 'en'; // Default to English
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    t,
    changeLanguage,
    availableLanguages: Object.keys(translations) as Language[]
  };
};
