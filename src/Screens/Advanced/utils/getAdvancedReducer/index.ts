import { random, shuffle } from '../../../../utils';
import { PreferencesStateType } from '../../../../Model/Model.d';
import { translate } from '../../../../Translations/TranslationModel';
import { statisticsActions } from '../../../../Model/Statistics';
import { APP_DATA_TYPES } from '../../../../enums/appDataTypes';

enum ADVANCED_ACTIONS {
  SET_CURRENT_SCALE = 'SET_CURRENT_SCALE',
  ADD_TO_LIST = 'ADD_TO_LIST',
  REMOVE_FROM_LIST = 'REMOVE_FROM_LIST',
  GET_NEW_SCALE = 'GET_NEW_SCALE',
  GET_NEW_ARPEGGIO = 'GET_NEW_ARPEGGIO',
  SET_SELECTED_NOTE = 'SET_SELECTED_NOTE',
  SET_SELECTED_SCALE = 'SET_SELECTED_SCALE',
  RESET_NO_REPEAT = 'RESET_NO_REPEAT',
  RESET_LIST = 'RESET_LIST',
  SWITCH_DOMAIN = 'SWITCH_DOMAIN',
  SET_IS_SMALL_SCREEN = 'SET_IS_SMALL_SCREEN',
  SET_STATE_FROM_STORAGE = 'SET_STATE_FROM_STORAGE',
}

type AdvancedStateType = {
  advancedType?: APP_DATA_TYPES;
  repeat?: boolean;
  currentScale: string;
  selectedNote: string;
  selectedScale: string;
  allScalesPracticed: boolean;
  scaleArrayIndex: number;
  arpeggioArrayIndex: number;
  possibleScales: string[];
  possibleArpeggios: string[];
  scaleArray: string[];
  arpeggioArray: string[];
  isSmallScreen: boolean;
};

const INITIAL_ADVANCED_STATE: AdvancedStateType = Object.freeze({
  currentScale: translate('No Scale Selected'),
  selectedNote: 'C',
  selectedScale: translate('Major'),
  allScalesPracticed: false,
  scaleArrayIndex: 0,
  arpeggioArrayIndex: 0,
  possibleScales: [],
  possibleArpeggios: [],
  scaleArray: [],
  arpeggioArray: [],
  isSmallScreen: false,
});

/**
 * @function getAdvancedReducer
 * @memberof Advanced
 * @description This function takes in the Preferences state and a function to
 * dispatch to the global statistics, and returns a reducer function to use in
 * the Advanced Screen.
 * Created October 15, 2022
 * @param {PreferencesStateType} state The current app state stored in the
 * Preferences Reducer
 * @param {Function} dispatchStatistics A function that is used to dispatch a
 * call to the statistics screen, to keep track of how many scales have been
 * practiced.
 * @returns {Reducer<AdvancedStateType, Object>} The reducer function to use in
 * the React State for this component
 *
 * @copyright 2025 Alexander Burdiss
 * @since 1/30/25
 * @version 2.0.0
 * @example const advancedReducer = getAdvancedReducer(state, dispatch);
 */
function getAdvancedReducer(
  state: PreferencesStateType,
  dispatchStatistics: Function,
) {
  const isScale = state?.advancedType === APP_DATA_TYPES.SCALE;

  return function advancedReducer(
    currentState: AdvancedStateType,
    action: { type: ADVANCED_ACTIONS; payload?: any },
  ) {
    switch (action.type) {
      case ADVANCED_ACTIONS.SET_CURRENT_SCALE:
        return { ...currentState, currentScale: action.payload };
      case ADVANCED_ACTIONS.ADD_TO_LIST:
        if (isScale) {
          return {
            ...currentState,
            scaleArrayIndex: 0,
            currentScale: translate('No Scale Selected'),
            scaleArray: shuffle([...currentState.scaleArray, action.payload]),
            possibleScales: [...currentState.possibleScales, action.payload],
          };
        } else {
          return {
            ...currentState,
            arpeggioArrayIndex: 0,
            currentScale: translate('No Arpeggio Selected'),
            arpeggioArray: shuffle([
              ...currentState.arpeggioArray,
              action.payload,
            ]),
            possibleArpeggios: [
              ...currentState.possibleArpeggios,
              action.payload,
            ],
          };
        }
      case ADVANCED_ACTIONS.REMOVE_FROM_LIST: {
        const toKeep = (item: string) => item !== action.payload;
        if (isScale) {
          return {
            ...currentState,
            scaleArrayIndex: 0,
            currentScale: translate('No Scale Selected'),
            scaleArray: currentState.scaleArray.filter(toKeep),
            possibleScales: currentState.possibleScales.filter(toKeep),
          };
        } else {
          return {
            ...currentState,
            arpeggioArrayIndex: 0,
            currentScale: translate('No Arpeggio Selected'),
            arpeggioArray: currentState.arpeggioArray.filter(toKeep),
            possibleArpeggios: currentState.possibleArpeggios.filter(toKeep),
          };
        }
      }
      case ADVANCED_ACTIONS.GET_NEW_SCALE: {
        if (state.repeat) {
          let newScale =
            currentState.possibleScales[
              random(0, currentState.possibleScales.length)
            ];
          if (currentState.possibleScales.length > 1) {
            do {
              newScale =
                currentState.possibleScales[
                  random(0, currentState.possibleScales.length)
                ];
            } while (newScale === currentState.currentScale);
          }
          dispatchStatistics({
            type: statisticsActions.ADD_SCALE,
            payload: newScale,
          });
          return {
            ...currentState,
            currentScale: newScale ?? translate('No Scale Selected'),
          };
        } else {
          // Don't repeat scales
          if (currentState.scaleArrayIndex >= currentState.scaleArray.length) {
            return { ...currentState, allScalesPracticed: true };
          } else {
            dispatchStatistics({
              type: statisticsActions.ADD_SCALE,
              payload: currentState.scaleArray[currentState.scaleArrayIndex],
            });
            return {
              ...currentState,
              currentScale:
                currentState.scaleArray[currentState.scaleArrayIndex],
              scaleArrayIndex: currentState.scaleArrayIndex + 1,
            };
          }
        }
      }
      case ADVANCED_ACTIONS.GET_NEW_ARPEGGIO: {
        if (state.repeat) {
          let newScale =
            currentState.possibleArpeggios[
              random(0, currentState.possibleArpeggios.length)
            ];
          if (currentState.possibleArpeggios.length > 1) {
            do {
              newScale =
                currentState.possibleArpeggios[
                  random(0, currentState.possibleArpeggios.length)
                ];
            } while (newScale === currentState.currentScale);
          }
          dispatchStatistics({
            type: statisticsActions.ADD_ARPEGGIO,
            payload: newScale,
          });
          return {
            ...currentState,
            currentScale: newScale ?? translate('No Arpeggio Selected'),
          };
        } else {
          // Don't repeat scales
          if (
            currentState.arpeggioArrayIndex >= currentState.arpeggioArray.length
          ) {
            return { ...currentState, allScalesPracticed: true };
          } else {
            dispatchStatistics({
              type: statisticsActions.ADD_ARPEGGIO,
              payload:
                currentState.arpeggioArray[currentState.arpeggioArrayIndex],
            });
            return {
              ...currentState,
              currentScale:
                currentState.arpeggioArray[currentState.arpeggioArrayIndex],
              arpeggioArrayIndex: currentState.arpeggioArrayIndex + 1,
            };
          }
        }
      }
      case ADVANCED_ACTIONS.RESET_NO_REPEAT:
        if (isScale) {
          const newScaleArray = shuffle(currentState.scaleArray);
          return {
            ...currentState,
            scaleArrayIndex: 0,
            allScalesPracticed: false,
            scaleArray: newScaleArray,
            currentScale: newScaleArray[0],
          };
        } else {
          const newArpeggioArray = shuffle(currentState.arpeggioArray);
          return {
            ...currentState,
            arpeggioArrayIndex: 0,
            allScalesPracticed: false,
            arpeggioArray: newArpeggioArray,
            currentScale: newArpeggioArray[0],
          };
        }
      case ADVANCED_ACTIONS.SET_SELECTED_SCALE:
        return {
          ...currentState,
          selectedScale: action.payload,
        };
      case ADVANCED_ACTIONS.SET_SELECTED_NOTE:
        return {
          ...currentState,
          selectedNote: action.payload,
        };
      case ADVANCED_ACTIONS.RESET_LIST:
        if (isScale) {
          return {
            ...currentState,
            currentScale: translate('No Scale Selected'),
            scaleArray: [],
            possibleScales: [],
          };
        } else {
          return {
            ...currentState,
            currentScale: translate('No Arpeggio Selected'),
            arpeggioArray: [],
            possibleArpeggios: [],
          };
        }
      case ADVANCED_ACTIONS.SWITCH_DOMAIN:
        return {
          ...currentState,
          scaleArrayIndex: 0,
          currentScale: isScale
            ? translate('No Scale Selected')
            : translate('No Arpeggio Selected'),
        };
      case ADVANCED_ACTIONS.SET_IS_SMALL_SCREEN:
        return {
          ...currentState,
          isSmallScreen: action.payload,
        };
      case ADVANCED_ACTIONS.SET_STATE_FROM_STORAGE: {
        return {
          ...currentState,
          ...action.payload,
        };
      }
      default:
        throw new Error(
          `getAdvancedReducer/index.js Unknown Action: ${action.type}`,
        );
    }
  };
}

export { ADVANCED_ACTIONS, INITIAL_ADVANCED_STATE, getAdvancedReducer };
