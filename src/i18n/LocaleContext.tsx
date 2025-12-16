import React, { createContext, useContext, useState, useCallback } from 'react';
import { Locale, setLocale as setI18nLocale } from './t';

interface LocaleContextValue {
  locale: Locale;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({ children, initialLocale = 'es' }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setI18nLocale(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    const newLocale: Locale = locale === 'es' ? 'en' : 'es';
    setLocale(newLocale);
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
