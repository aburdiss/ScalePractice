import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../enums/storageKeys';

/**
 * @namespace Preferences
 * @description The namespace for all logic related to global saved
 * preferences
 */

/**
 * @name RANDOM_TYPES
 * @memberof Preferences
 */
const RANDOM_TYPES = Object.freeze({
  SCALE: 'SCALE',
  ARPEGGIO: 'ARPEGGIO',
});

/**
 * @name ADVANCED_TYPES
 * @memberof Preferences
 */
const ADVANCED_TYPES = Object.freeze({
  SCALE: 'SCALE',
  ARPEGGIO: 'ARPEGGIO',
});

/**
 * @name RESOURCES_TYPES
 * @memberof Preferences
 */
const RESOURCES_TYPES = Object.freeze({
  SCALE: 'SCALE',
  ARPEGGIO: 'ARPEGGIO',
});

/**
 * @name INITIAL_PREFERENCES_STATE
 * @memberof Preferences
 */
const INITIAL_PREFERENCES_STATE = Object.freeze({
  repeat: true,
  simpleRandom: false,
  disableScreenSleep: false,
  randomType: RANDOM_TYPES.SCALE,
  resourcesType: RESOURCES_TYPES.SCALE,
  advancedType: ADVANCED_TYPES.SCALE,
});

/**
 * @name ACTIONS
 * @memberof Preferences
 */
const ACTIONS = Object.freeze({
  SET_ALL_PREFERENCES: 'SET_ALL_PREFERENCES',
  SET_SETTING: 'SET_SETTING',
  RESET_PREFERENCES: 'RESET_PREFERENCES',
});

/**
 * @function load
 * @memberof Preferences
 * @description Loads Data from Local Storage
 * Created 12/11/20
 * @copyright 2024 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 12/28/24
 * @version 1.0.3
 * @param {string} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 */
export async function load() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.preferences);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function save
 * @memberof Preferences
 * @description Stores Data in Local Storage
 * Created 12/11/20
 * @copyright 2024 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 12/28/24
 * @version 1.0.2
 * @param {string} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 */
export async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEYS.preferences, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

/**
 * @name PreferencesContext
 * @memberof Preferences
 */
const PreferencesContext = createContext();

PreferencesContext.advancedTypes = ADVANCED_TYPES;
PreferencesContext.randomTypes = RANDOM_TYPES;
PreferencesContext.resourcesTypes = RESOURCES_TYPES;
PreferencesContext.actions = ACTIONS;

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
const preferencesReducer = (state, action) => {
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
  save(newState);
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
const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer);

  useEffect(() => {
    load().then((data) => {
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

export { PreferencesContext, PreferencesProvider };
