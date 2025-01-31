import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STORAGE_KEYS } from '../enums/storageKeys';
import { loadFromStorage } from '../utils/loadFromStorage';
import { saveToStorage } from '../utils/saveToStorage';
import type { PreferencesStateType } from './Model.d';
import { APP_DATA_TYPES } from '../enums/appDataTypes';

/**
 * @namespace Preferences
 * @description The namespace for all logic related to global saved
 * preferences
 */

/**
 * @name INITIAL_PREFERENCES_STATE
 * @memberof Preferences
 */
const INITIAL_PREFERENCES_STATE: PreferencesStateType = Object.freeze({
  repeat: true,
  simpleRandom: false,
  disableScreenSleep: false,
  randomType: APP_DATA_TYPES.SCALE,
  resourcesType: APP_DATA_TYPES.SCALE,
  advancedType: APP_DATA_TYPES.SCALE,
});

/**
 * @name ACTIONS
 * @memberof Preferences
 */
enum ACTIONS {
  SET_ALL_PREFERENCES,
  SET_SETTING,
  RESET_PREFERENCES,
}

/**
 * @name PreferencesContext
 * @memberof Preferences
 */
const PreferencesContext = createContext<{
  state: PreferencesStateType;
  dispatch: React.Dispatch<{ payload: Object; type: ACTIONS }>;
}>({ state: INITIAL_PREFERENCES_STATE, dispatch: function () {} });

/**
 * @function preferencesReducer
 * @memberof Preferences
 * @description A reducer that handles updating the state stored in context,
 * and updates the same state in local storage on the device.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.0
 * @param {*} state
 * @param {*} action
 */
const preferencesReducer = (
  state: object,
  action: { payload: any; type: ACTIONS },
) => {
  let newState;
  switch (action.type) {
    case ACTIONS.SET_ALL_PREFERENCES:
      newState = { ...state, ...action.payload };
      break;
    case ACTIONS.SET_SETTING:
      newState = { ...state, ...action.payload };
      break;
    case ACTIONS.RESET_PREFERENCES:
      newState = INITIAL_PREFERENCES_STATE;
      break;
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
  saveToStorage(STORAGE_KEYS.preferences, newState);
  return newState;
};

/**
 * @function PreferencesProvider
 * @memberof Preferences
 * @description Provides the user preferences throughout the app.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.0
 * @param {Object} props The JSX props passed to this React component
 * @param {*} props.children React children to render inside this Provider
 * @returns {JSX.Element} JSX render instructions
 *
 * @example
 *   <PreferencesProvider>
 *     {..}
 *   </PreferencesProvider>
 */
const PreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    preferencesReducer,
    INITIAL_PREFERENCES_STATE,
  );

  useEffect(() => {
    loadFromStorage(STORAGE_KEYS.preferences).then((data) => {
      if (data !== null) {
        // Handle when the data doesn't have newer keys (after updating from
        // older version)
        if (!data.randomType) {
          data.randomType = INITIAL_PREFERENCES_STATE.randomType;
        }
        if (!data.advancedType) {
          data.advancedType = INITIAL_PREFERENCES_STATE.advancedType;
        }

        // Set loaded data to global store
        dispatch({ type: ACTIONS.SET_ALL_PREFERENCES, payload: data });
      } else {
        dispatch({
          type: ACTIONS.SET_ALL_PREFERENCES,
          payload: INITIAL_PREFERENCES_STATE,
        });
      }
    });
  }, []);

  return (
    <PreferencesContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  );
};

PreferencesProvider.propTypes = {
  children: PropTypes.node,
};

export {
  PreferencesContext,
  PreferencesProvider,
  ACTIONS as preferencesActions,
};
