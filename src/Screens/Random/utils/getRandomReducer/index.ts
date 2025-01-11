import { translate } from '../../../../Translations/TranslationModel';
import { statisticsActions } from '../../../../Model/Statistics';
import { getAllScalesFromState } from '../getAllScalesFromState';
import { getAllArpeggiosFromState } from '../getAllArpeggiosFromState';
import { shuffle, random } from '../../../../utils';
import { SCALE_TYPES, ARPEGGIO_TYPES } from '../../../../Model/Model';
import {
  preferencesRandomTypes,
  PreferencesStateType,
} from '../../../../Model/Preferences';

export enum RANDOM_ACTIONS {
  SET_CURRENT_SCALE,
  TOGGLE_SCALE,
  TOGGLE_ARPEGGIO,
  SELECT_ALL_SCALES,
  SELECT_ALL_ARPEGGIOS,
  GET_NEW_SCALE,
  RESET_NO_REPEAT,
  TOGGLE_SELECTION_POPOVER,
  SWITCH_DOMAIN,
  SET_STATE_FROM_STORAGE,
}

export type RandomStateType = {
  currentScale: string;
  scaleArray: string[];
  scaleArrayIndex: number;
  showSelectionPopover: boolean;
  allScalesPracticed: boolean;
  scaleOptions: {
    [key: string]: boolean;
  };
  arpeggioOptions: {
    [key: string]: boolean;
  };
};

export const INITIAL_RANDOM_STATE: RandomStateType = Object.freeze({
  currentScale: translate('No Scale Selected'),
  scaleArray: getAllScalesFromState({ major: true }),
  scaleArrayIndex: 0,
  showSelectionPopover: false,
  allScalesPracticed: false,
  scaleOptions: {
    [SCALE_TYPES.major]: true,
    [SCALE_TYPES.naturalMinor]: false,
    [SCALE_TYPES.harmonicMinor]: false,
    [SCALE_TYPES.melodicMinor]: false,
    [SCALE_TYPES.majorModes]: false,
    [SCALE_TYPES.melodicMinorModes]: false,
    [SCALE_TYPES.blues]: false,
    [SCALE_TYPES.pentatonic]: false,
    [SCALE_TYPES.octatonic]: false,
    [SCALE_TYPES.wholeTone]: false,
  },
  arpeggioOptions: {
    [ARPEGGIO_TYPES.major]: true,
    [ARPEGGIO_TYPES.minor]: false,
    [ARPEGGIO_TYPES.augmented]: false,
    [ARPEGGIO_TYPES.diminished]: false,
    [ARPEGGIO_TYPES.dominantSeventh]: false,
    [ARPEGGIO_TYPES.majorSeventh]: false,
    [ARPEGGIO_TYPES.minorSeventh]: false,
    [ARPEGGIO_TYPES.minorMajorSeventh]: false,
    [ARPEGGIO_TYPES.augmentedSeventh]: false,
    [ARPEGGIO_TYPES.halfDiminishedSeventh]: false,
    [ARPEGGIO_TYPES.diminishedSeventh]: false,
  },
});

/**
 * @function getRandomReducer
 * @memberof Random
 * @description Gets a reducer to use with the state on the Random Screen of
 * the application
 * @param {Object} state The User Preferences State to determine which scales
 * build
 * @param {Function} dispatchStatistics A function to dispatch to the
 * statistics context that a new scale was practiced.
 * @returns {Function} A Reducer for the Random screen of the application
 *
 * @copyright Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/15/22
 * @version 1.1.0
 */
export function getRandomReducer(
  state: PreferencesStateType,
  dispatchStatistics: Function,
) {
  const isScale = state?.randomType === preferencesRandomTypes.SCALE;
  function randomReducer(
    currentState: RandomStateType,
    action: { type: RANDOM_ACTIONS; payload?: any },
  ) {
    switch (action.type) {
      case RANDOM_ACTIONS.SET_CURRENT_SCALE:
        return { ...currentState, currentScale: action.payload };
      case RANDOM_ACTIONS.TOGGLE_SCALE: {
        // TODO: Fix this
        // @ts-ignore
        if (SCALE_TYPES[action.payload] == undefined) {
          throw new Error(`Unknown Scale Type: ${action.payload}`);
        }
        const newScaleOptions = {
          ...currentState.scaleOptions,
          [action.payload]: !currentState.scaleOptions[action.payload],
        };
        const possibleScales = shuffle(getAllScalesFromState(newScaleOptions));
        return {
          ...currentState,
          currentScale: translate('No Scale Selected'),
          scaleArrayIndex: 0,
          scaleArray: possibleScales,
          scaleOptions: newScaleOptions,
        };
      }
      case RANDOM_ACTIONS.TOGGLE_ARPEGGIO: {
        // TODO: Fix this
        // @ts-ignore
        if (ARPEGGIO_TYPES[action.payload] == undefined) {
          throw new Error(`Unknown Arpeggio Type: ${action.payload}`);
        }
        const newArpeggioOptions = {
          ...currentState.arpeggioOptions,
          [action.payload]: !currentState.arpeggioOptions[action.payload],
        };
        const possibleArpeggios = shuffle(
          getAllArpeggiosFromState(newArpeggioOptions),
        );
        return {
          ...currentState,
          currentScale: translate('No Arpeggio Selected'),
          scaleArrayIndex: 0,
          scaleArray: possibleArpeggios,
          arpeggioOptions: newArpeggioOptions,
        };
      }
      case RANDOM_ACTIONS.SELECT_ALL_SCALES: {
        const allScales = { ...currentState.scaleOptions };
        let allScalesOn = true;
        for (const key in allScales) {
          if (
            Object.prototype.hasOwnProperty.call(allScales, key) &&
            !currentState.scaleOptions[key]
          ) {
            allScales[key] = true;
            allScalesOn = false;
          }
        }
        if (allScalesOn) {
          for (const key in allScales) {
            if (
              Object.prototype.hasOwnProperty.call(allScales, key) &&
              key !== SCALE_TYPES.major
            ) {
              allScales[key] = false;
            }
          }
          allScales[SCALE_TYPES.major] = true;
        }
        return { ...currentState, scaleOptions: allScales };
      }
      case RANDOM_ACTIONS.SELECT_ALL_ARPEGGIOS: {
        const allArpeggios = { ...currentState.arpeggioOptions };
        let allArpeggiosOn = true;
        for (const key in allArpeggios) {
          if (
            Object.prototype.hasOwnProperty.call(allArpeggios, key) &&
            !currentState.arpeggioOptions[key]
          ) {
            allArpeggios[key] = true;
            allArpeggiosOn = false;
          }
        }
        if (allArpeggiosOn) {
          for (const key in allArpeggios) {
            if (
              Object.prototype.hasOwnProperty.call(allArpeggios, key) &&
              key !== ARPEGGIO_TYPES.major
            ) {
              allArpeggios[key] = false;
            }
          }
          allArpeggios[ARPEGGIO_TYPES.major] = true;
        }
        return { ...currentState, arpeggioOptions: allArpeggios };
      }
      case RANDOM_ACTIONS.GET_NEW_SCALE:
        if (state.repeat) {
          let newScale;
          do {
            newScale =
              currentState.scaleArray[
                random(currentState.scaleArray.length - 1)
              ];
          } while (newScale == currentState.currentScale);
          dispatchStatistics({
            type: isScale
              ? statisticsActions.ADD_SCALE
              : statisticsActions.ADD_ARPEGGIO,
            payload: newScale,
          });
          return {
            ...currentState,
            currentScale: newScale
              ? newScale
              : isScale
              ? translate('No Scale Selected')
              : translate('No Arpeggio Selected'),
          };
        } else {
          // Do not repeat scales
          if (currentState.scaleArrayIndex >= currentState.scaleArray.length) {
            return {
              ...currentState,
              allScalesPracticed: true,
            };
          } else {
            dispatchStatistics({
              type: isScale
                ? statisticsActions.ADD_SCALE
                : statisticsActions.ADD_ARPEGGIO,
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
      case RANDOM_ACTIONS.RESET_NO_REPEAT: {
        // When the user has no repeat turned on, and reaches the end of the
        // list, there's a couple things we need to do.
        const newScaleArray = shuffle(currentState.scaleArray);
        return {
          ...currentState,
          scaleArray: newScaleArray,
          scaleArrayIndex: 1,
          currentScale: newScaleArray[0],
          allScalesPracticed: false,
        };
      }
      case RANDOM_ACTIONS.TOGGLE_SELECTION_POPOVER: {
        return {
          ...currentState,
          showSelectionPopover: !currentState.showSelectionPopover,
        };
      }
      case RANDOM_ACTIONS.SWITCH_DOMAIN: {
        const scaleArray = isScale
          ? getAllScalesFromState(currentState.scaleOptions)
          : getAllArpeggiosFromState(currentState.arpeggioOptions);
        const shuffledScales = shuffle(scaleArray);
        return {
          ...currentState,
          scaleArrayIndex: 0,
          scaleArray: shuffledScales,
          currentScale: isScale
            ? translate('No Scale Selected')
            : translate('No Arpeggio Selected'),
        };
      }
      case RANDOM_ACTIONS.SET_STATE_FROM_STORAGE: {
        return {
          ...currentState,
          ...action.payload,
        };
      }
      default:
        throw new Error(
          `getRandomReducer/index.js: Unknown Action: ${action.type}`,
        );
    }
  }

  randomReducer.actions = RANDOM_ACTIONS;
  randomReducer.initialState = INITIAL_RANDOM_STATE;
  return randomReducer;
}
