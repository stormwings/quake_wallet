import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Locale, setLocale as setI18nLocale } from '../i18n/t';

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'es',
      setLocale: (newLocale) => {
        set({ locale: newLocale });
        setI18nLocale(newLocale);
      },
      toggleLocale: () => {
        const currentLocale = get().locale;
        const newLocale: Locale = currentLocale === 'es' ? 'en' : 'es';
        get().setLocale(newLocale);
      },
    }),
    {
      name: 'quake-locale-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          setI18nLocale(state.locale);
        }
      },
    }
  )
);
