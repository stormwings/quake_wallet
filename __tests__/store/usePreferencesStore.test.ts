import { usePreferencesStore } from '@/src/store/usePreferencesStore';
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

describe('usePreferencesStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with quantity input mode', () => {
    const { result } = renderHook(() => usePreferencesStore());
    expect(result.current.orderInputMode).toBe('quantity');
  });

  it('should set input mode to amount', () => {
    const { result } = renderHook(() => usePreferencesStore());

    act(() => {
      result.current.setOrderInputMode('amount');
    });

    expect(result.current.orderInputMode).toBe('amount');
  });

  it('should toggle between input modes', () => {
    const { result } = renderHook(() => usePreferencesStore());

    act(() => {
      result.current.setOrderInputMode('amount');
    });

    expect(result.current.orderInputMode).toBe('amount');

    act(() => {
      result.current.setOrderInputMode('quantity');
    });

    expect(result.current.orderInputMode).toBe('quantity');
  });
});
