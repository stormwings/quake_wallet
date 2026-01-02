import { useSearchHistoryStore } from '@/src/store/useSearchHistoryStore';
import { act, renderHook } from '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

describe('useSearchHistoryStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store state
    const { result } = renderHook(() => useSearchHistoryStore());
    act(() => {
      result.current.clearHistory();
    });
  });

  it('should initialize with empty search history', () => {
    const { result } = renderHook(() => useSearchHistoryStore());
    expect(result.current.recentSearches).toEqual([]);
  });

  it('should add search to history', () => {
    const { result } = renderHook(() => useSearchHistoryStore());

    act(() => {
      result.current.addSearch('AAPL');
    });

    expect(result.current.recentSearches).toEqual(['AAPL']);
  });

  it('should not add empty searches', () => {
    const { result } = renderHook(() => useSearchHistoryStore());

    act(() => {
      result.current.addSearch('   ');
      result.current.addSearch('');
    });

    expect(result.current.recentSearches).toEqual([]);
  });

  it('should remove duplicates and move to front', () => {
    const { result } = renderHook(() => useSearchHistoryStore());

    act(() => {
      result.current.addSearch('AAPL');
      result.current.addSearch('GOOGL');
      result.current.addSearch('MSFT');
      result.current.addSearch('AAPL'); // Duplicate
    });

    expect(result.current.recentSearches).toEqual(['AAPL', 'MSFT', 'GOOGL']);
  });

  it('should limit history to 10 items', () => {
    const { result } = renderHook(() => useSearchHistoryStore());

    act(() => {
      for (let i = 1; i <= 15; i++) {
        result.current.addSearch(`SEARCH${i}`);
      }
    });

    expect(result.current.recentSearches).toHaveLength(10);
    expect(result.current.recentSearches[0]).toBe('SEARCH15');
    expect(result.current.recentSearches[9]).toBe('SEARCH6');
  });

  it('should clear history', () => {
    const { result } = renderHook(() => useSearchHistoryStore());

    act(() => {
      result.current.addSearch('AAPL');
      result.current.addSearch('GOOGL');
      result.current.clearHistory();
    });

    expect(result.current.recentSearches).toEqual([]);
  });
});
