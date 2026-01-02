import { act } from '@testing-library/react-native';

/**
 * Helper to reset Zustand store state in tests
 */
export function resetZustandStore<T>(useStore: any) {
  act(() => {
    useStore.setState(useStore.getState(), true);
  });
}

/**
 * Mock AsyncStorage factory for testing persisted stores
 */
export const createMockAsyncStorage = () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
});
