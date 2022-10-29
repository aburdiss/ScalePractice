import { getAdvancedReducer } from './index';
import { PreferencesContext } from '../../../../Model/Preferences';

const mockState = {
  randomType: PreferencesContext.randomTypes.SCALE,
  repeat: false,
};

describe('getAdvancedReducer functions correctly', () => {
  const advancedReducer = getAdvancedReducer(mockState);
  describe('All actions handled by reducer', () => {
    Object.keys(advancedReducer.actions).map((action) => {
      test(action, () => {
        advancedReducer(advancedReducer.initialState, {
          type: action,
          payload: 'major',
        });
      });
    });
  });
});
