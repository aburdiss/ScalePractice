import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @function load
 * @description Loads Data from Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0.2
 * @param {String} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 */
export async function load() {
  try {
    const jsonValue = await AsyncStorage.getItem('preferences');
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
 * @param {String} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 */
export async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('preferences', jsonValue);
  } catch (e) {
    console.log(e);
  }
}

const PreferencesContext = createContext();

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
    case 'SET_ALL_PREFERENCES':
      newState = { ...state, ...action.payload };
      break;
    case 'SET_SETTING':
      newState = { ...state, ...action.payload };
      break;
    case 'RESET_PREFERENCES':
      newState = initialPreferencesState;
      break;
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
  save(newState);
  return newState;
};

const initialPreferencesState = {
  repeat: true,
  simpleRandom: false,
  disableScreenSleep: false,
};

/**
 * @description Provides the user preferences throughout the app.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.0
 * @param {*} props
 *
 * @component
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
        dispatch({ type: 'SET_ALL_PREFERENCES', payload: data });
      } else {
        dispatch({
          type: 'SET_ALL_PREFERENCES',
          payload: initialPreferencesState,
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
