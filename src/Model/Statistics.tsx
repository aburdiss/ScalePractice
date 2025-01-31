import React, { useEffect, createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { saveToStorage } from '../utils/saveToStorage';
import { STORAGE_KEYS } from '../enums/storageKeys';
import { loadFromStorage } from '../utils/loadFromStorage';

export type StatisticsStateType = {
  scales: { [key: string]: number };
  arpeggios: { [key: string]: number };
};

const INITIAL_STATISTICS_STATE: StatisticsStateType = {
  scales: {},
  arpeggios: {},
};

const StatisticsContext = createContext<StatisticsStateType>(
  INITIAL_STATISTICS_STATE,
);

const StatisticsDispatchContext = createContext<React.Dispatch<any>>(
  function () {},
);

enum ACTIONS {
  ADD_SCALE,
  ADD_ARPEGGIO,
  RESET,
  SET_DATA,
}

function statisticsReducer(
  state: StatisticsStateType,
  action: { type: ACTIONS; payload: any },
) {
  const tempState = { ...state };
  switch (action.type) {
    case ACTIONS.ADD_SCALE:
      if (!tempState.scales[action.payload]) {
        tempState.scales[action.payload] = 0;
      }
      tempState.scales[action.payload]++;
      saveToStorage(STORAGE_KEYS.statistics, tempState);
      return tempState;
    case ACTIONS.ADD_ARPEGGIO:
      if (!tempState.arpeggios[action.payload]) {
        tempState.arpeggios[action.payload] = 0;
      }
      tempState.arpeggios[action.payload]++;
      saveToStorage(STORAGE_KEYS.statistics, tempState);
      return tempState;
    case ACTIONS.RESET:
      saveToStorage(STORAGE_KEYS.statistics, INITIAL_STATISTICS_STATE);
      return INITIAL_STATISTICS_STATE;
    case ACTIONS.SET_DATA:
      return action.payload;
    default:
      throw new Error(`Unknown Statistics Action: ${action.type}`);
  }
}

function StatisticseProvider({ children }: { children: React.ReactNode }) {
  const [statistics, dispatch] = useReducer(
    statisticsReducer,
    INITIAL_STATISTICS_STATE,
  );

  useEffect(() => {
    loadFromStorage(STORAGE_KEYS.statistics).then((data) => {
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

StatisticseProvider.propTypes = {
  children: PropTypes.node,
};

export {
  StatisticsContext,
  StatisticsDispatchContext,
  StatisticseProvider,
  ACTIONS as statisticsActions,
};
