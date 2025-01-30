import {
  getAdvancedReducer,
  ADVANCED_ACTIONS,
  INITIAL_ADVANCED_STATE,
} from './index';
import {
  preferencesAdvancedTypes,
  preferencesRandomTypes,
  preferencesResourceTypes,
} from '../../../../Model/Preferences';

const mockState = {
  randomType: preferencesRandomTypes.SCALE,
  repeat: false,
  simpleRandom: false,
  disableScreenSleep: false,
  resourcesType: preferencesResourceTypes.SCALE,
  advancedType: preferencesAdvancedTypes.SCALE,
};

describe('getAdvancedReducer functions correctly', () => {
  const advancedReducer = getAdvancedReducer(mockState, jest.fn());
  describe('All actions handled by reducer', () => {
    (Object.keys(ADVANCED_ACTIONS) as Array<ADVANCED_ACTIONS>).map((action) => {
      test(action, () => {
        advancedReducer(INITIAL_ADVANCED_STATE, {
          type: action,
          payload: 'major',
        });
      });
    });
  });
});
