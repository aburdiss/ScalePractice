import { APP_DATA_TYPES } from '../../../../enums/appDataTypes';
import {
  getAdvancedReducer,
  ADVANCED_ACTIONS,
  INITIAL_ADVANCED_STATE,
} from './index';

const mockState = {
  randomType: APP_DATA_TYPES.SCALE,
  repeat: false,
  simpleRandom: false,
  disableScreenSleep: false,
  resourcesType: APP_DATA_TYPES.SCALE,
  advancedType: APP_DATA_TYPES.SCALE,
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
