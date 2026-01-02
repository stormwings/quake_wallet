import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type InputMode = 'quantity' | 'amount';

interface PreferencesState {
  orderInputMode: InputMode;
  setOrderInputMode: (mode: InputMode) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      orderInputMode: 'quantity',
      setOrderInputMode: (mode) => set({ orderInputMode: mode }),
    }),
    {
      name: 'quake-preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
