import React, { useEffect, createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatisticsContext = createContext();
const StatisticsDispatchContext = createContext();

const ACTIONS = {
  ADD_SCALE: 'ADD_SCALE',
  ADD_ARPEGGIO: 'ADD_ARPEGGIO',
  RESET: 'RESET',
  SET_DATA: 'SET_DATA',
};

const INITIAL_STATISTICS_STATE = {
  scales: {},
  arpeggios: {},
};

/**
 * @function load
 * @description Loads Data from Local Storage
 * @author Alexander Burdiss
 * @since 9/4/23
 * @version 1.0.2
 * @param {string} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 */
export async function load() {
  try {
    const jsonValue = await AsyncStorage.getItem('statistics');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function save
 * @description Stores Data in Local Storage
 * @author Alexander Burdiss
 * @since 9/4/23
 * @version 1.0.1
 * @param {string} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 */
export async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('statistics', jsonValue);
  } catch (e) {
    console.log(e);
  }
}

function statisticsReducer(state, action) {
  const tempState = { ...state };
  switch (action.type) {
    case ACTIONS.ADD_SCALE:
      if (!tempState.scales[action.payload]) {
        tempState.scales[action.payload] = 0;
      }
      tempState.scales[action.payload]++;
      save(tempState);
      return tempState;
    case ACTIONS.ADD_ARPEGGIO:
      if (!tempState.arpeggios[action.payload]) {
        tempState.arpeggios[action.payload] = 0;
      }
      tempState.arpeggios[action.payload]++;
      save(tempState);
      return tempState;
    case ACTIONS.RESET:
      save(INITIAL_STATISTICS_STATE);
      return INITIAL_STATISTICS_STATE;
    case ACTIONS.SET_DATA:
      return action.payload;
    default:
      throw new Error(`Unknown Statistics Action: ${action.type}`);
  }
}

function StatisticseProvider({ children }) {
  const [statistics, dispatch] = useReducer(
    statisticsReducer,
    INITIAL_STATISTICS_STATE,
  );

  useEffect(() => {
    load().then((data) => {
      if (data !== null) {
        // Set loaded data to global store
        dispatch({ type: ACTIONS.SET_DATA, payload: data });
      } else {
        dispatch({
          type: ACTIONS.SET_DATA,
          payload: INITIAL_STATISTICS_STATE,
        });
      }
    });
  }, []);

  return (
    <StatisticsDispatchContext.Provider value={dispatch}>
      <StatisticsContext.Provider value={statistics}>
        {children}
      </StatisticsContext.Provider>
    </StatisticsDispatchContext.Provider>
  );
}

StatisticsDispatchContext.actions = ACTIONS;

export { StatisticsContext, StatisticsDispatchContext, StatisticseProvider };
