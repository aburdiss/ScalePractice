import {
  getRandomReducer,
  INITIAL_RANDOM_STATE,
  RANDOM_ACTIONS,
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

describe('getRandomReducer functions correctly', () => {
  const randomReducer = getRandomReducer(mockState, jest.fn());
  describe('All actions handled by reducer', () => {
    (Object.keys(RANDOM_ACTIONS) as Array<RANDOM_ACTIONS>).map((action) => {
      test(String(action), () => {
        randomReducer(INITIAL_RANDOM_STATE, {
          type: action,
          payload: 'major',
        });
      });
    });
  });
});
