import { getRandomReducer, INITIAL_RANDOM_STATE } from './index';
import { RANDOM_ACTIONS } from '../../enums/randomActions';
import { APP_DATA_TYPES } from '../../../../enums/appDataTypes';

const mockState = {
  randomType: APP_DATA_TYPES.SCALE,
  repeat: false,
  simpleRandom: false,
  disableScreenSleep: false,
  resourcesType: APP_DATA_TYPES.SCALE,
  advancedType: APP_DATA_TYPES.SCALE,
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
