// Jest early setup file - runs before modules are loaded

// Mock global expo registry to avoid import.meta issues
global.__ExpoImportMetaRegistry = {
  register: () => {},
  get: () => undefined,
};

// Mock structuredClone if not available
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
