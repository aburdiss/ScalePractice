import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import { NativeModules as RNNativeModules } from 'react-native';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('react-native-localize', () => {
  return {
    getLocales: jest.fn(),
    findBestAvailableLanguage: jest.fn(() => ({
      languageTag: 'en',
      isRTL: false,
    })),
    addEventListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    // you can add other functions mock here that you are using
  };
});

RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule = RNNativeModules.RNGestureHandlerModule || {
  State: { BEGAN: 'BEGAN', FAILED: 'FAILED', ACTIVE: 'ACTIVE', END: 'END' },
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
};
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false,
};

// Leave this at the bottom to run after all the imports.
jest.useFakeTimers();
