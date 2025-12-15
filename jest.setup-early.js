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

// Mock @expo/vector-icons to avoid async icon loading warnings
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const createIconSet = () => {
    return (props) => React.createElement(Text, props, props.name || 'Icon');
  };

  return {
    Ionicons: createIconSet(),
    MaterialIcons: createIconSet(),
    MaterialCommunityIcons: createIconSet(),
    FontAwesome: createIconSet(),
    FontAwesome5: createIconSet(),
  };
});
