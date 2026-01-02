import { setLocale as setI18nLocale } from '@/src/i18n/t';
import { useLocaleStore } from '@/src/store/useLocaleStore';
import { act, renderHook } from '@testing-library/react-native';

jest.mock('@/src/i18n/t', () => ({
  setLocale: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

describe('useLocaleStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store to initial state
    const { result } = renderHook(() => useLocaleStore());
    act(() => {
      result.current.setLocale('es');
    });
  });

  it('should initialize with Spanish locale', () => {
    const { result } = renderHook(() => useLocaleStore());
    expect(result.current.locale).toBe('es');
  });

  it('should set locale and update i18n', () => {
    const { result } = renderHook(() => useLocaleStore());

    act(() => {
      result.current.setLocale('en');
    });

    expect(result.current.locale).toBe('en');
    expect(setI18nLocale).toHaveBeenCalledWith('en');
  });

  it('should toggle between locales', () => {
    const { result } = renderHook(() => useLocaleStore());

    act(() => {
      result.current.toggleLocale();
    });

    expect(result.current.locale).toBe('en');

    act(() => {
      result.current.toggleLocale();
    });

    expect(result.current.locale).toBe('es');
  });
});
