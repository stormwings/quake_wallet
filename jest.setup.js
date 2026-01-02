// Jest setup file - runs after modules are loaded
// Testing library matchers are now built-in to @testing-library/react-native

// Mock AsyncStorage globally for Zustand stores with persistence
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));
