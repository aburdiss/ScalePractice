import { getRandomReducer } from './index';
import { PreferencesContext } from '../../../../Model/Preferences';

const mockState = {
  randomType: PreferencesContext.randomTypes.SCALE,
  repeat: false,
};

describe('getRandomReducer functions correctly', () => {
  const randomReducer = getRandomReducer(mockState, jest.fn());
  describe('All actions handled by reducer', () => {
    Object.keys(randomReducer.actions).map((action) => {
      test(action, () => {
        randomReducer(randomReducer.initialState, {
          type: action,
          payload: 'major',
        });
      });
    });
  });
});
