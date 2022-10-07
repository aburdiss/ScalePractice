import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RANDOM_TYPES = {
  SCALE: "SCALE",
  ARPEGGIO: "ARPEGGIO",
};

const ADVANCED_TYPES = {
  SCALE: "SCALE",
  ARPEGGIO: "ARPEGGIO",
};

const INITIAL_PREFERENCES_STATE = {
  repeat: true,
  simpleRandom: false,
  disableScreenSleep: false,
  randomType: RANDOM_TYPES.SCALE,
  advancedType: ADVANCED_TYPES.SCALE,
};

const ACTIONS = {
  SET_ALL_PREFERENCES: "SET_ALL_PREFERENCES",
  SET_SETTING: "SET_SETTING",
  RESET_PREFERENCES: "RESET_PREFERENCES",
};

/**
 * @function load
 * @description Loads Data from Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0.2
 * @param {string} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 */
export async function load() {
  try {
    const jsonValue = await AsyncStorage.getItem("preferences");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function save
 * @description Stores Data in Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0.1
 * @param {string} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 */
export async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("preferences", jsonValue);
  } catch (e) {
    console.log(e);
  }
}

const PreferencesContext = createContext();

PreferencesContext.advancedTypes = ADVANCED_TYPES;
PreferencesContext.randomTypes = RANDOM_TYPES;
PreferencesContext.actions = ACTIONS;

/**
 * @function preferencesReducer
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
 * @description Provides the user preferences throughout the app.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.0
 * @param {*} props
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

export { PreferencesContext, PreferencesProvider };
