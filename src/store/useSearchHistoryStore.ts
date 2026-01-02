import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SearchHistoryState {
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 10;

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      addSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        const current = get().recentSearches;
        // Remove duplicate if exists
        const filtered = current.filter((q) => q !== trimmed);
        // Add to front, limit to MAX_HISTORY
        const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);
        set({ recentSearches: updated });
      },
      clearHistory: () => set({ recentSearches: [] }),
    }),
    {
      name: 'quake-search-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
