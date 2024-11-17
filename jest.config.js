module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    '<rootDir>/jest/setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@react-native|react-native|react-native-popover-view|react-native-linear-gradient|react-native-animatable|react-native-scalable-image|react-native-modal|react-native-iphone-x-helper|react-native-reanimated|react-native-vector-icons|react-native-screens|react-native-splash-screen|react-navigation-tabs|@?react-navigation|react-native-gesture-handler|@react-native-community/segmented-control|react-native-picker-select|@react-native-picker/picker)/)',
  ],
};
