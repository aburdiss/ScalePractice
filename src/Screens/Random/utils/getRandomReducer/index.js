import { Alert } from "react-native";
import { translate } from "../../../../Translations/TranslationModel";
import { getAllScalesFromState } from "../getAllScalesFromState";
import { getAllArpeggiosFromState } from "../getAllArpeggiosFromState";
import { shuffle, random } from "../../../../utils";
import { SCALE_TYPES, ARPEGGIO_TYPES } from "../../../../Model/Model";
import { PreferencesContext } from "../../../../Model/Preferences";

const RANDOM_ACTIONS = {
  SET_CURRENT_SCALE: "SET_CURRENT_SCALE",
  TOGGLE_SCALE: "TOGGLE_SCALE",
  TOGGLE_ARPEGGIO: "TOGGLE_ARPEGGIO",
  SELECT_ALL_SCALES: "SELECT_ALL_SCALES",
  SELECT_ALL_ARPEGGIOS: "SELECT_ALL_ARPEGGIOS",
  GET_NEW_SCALE: "GET_NEW_SCALE",
  RESET_NO_REPEAT: "RESET_NO_REPEAT",
  TOGGLE_SELECTION_POPOVER: "TOGGLE_SELECTION_POPOVER",
  SWITCH_DOMAIN: "SWITCH_DOMAIN",
};

export function getRandomReducer(dispatchRandomState, state) {
  const isScale = state.randomType === PreferencesContext.randomTypes.SCALE;
  function randomReducer(currentState, action) {
    switch (action.type) {
      case RANDOM_ACTIONS.SET_CURRENT_SCALE:
        return { ...currentState, currentScale: action.payload };
      case RANDOM_ACTIONS.TOGGLE_SCALE:
        if (SCALE_TYPES[action.payload] == undefined) {
          throw new Error(`Unknown Scale Type: ${action.payload}`);
        }
        const newScaleOptions = {
          ...currentState.scaleOptions,
          [action.payload]: !currentState.scaleOptions[action.payload],
        };
        const possibleScales = getAllScalesFromState(newScaleOptions);
        return {
          ...currentState,
          currentScale: translate("No Scale Selected"),
          scaleArrayIndex: 0,
          scaleArray: possibleScales,
          scaleOptions: newScaleOptions,
        };

      case RANDOM_ACTIONS.TOGGLE_ARPEGGIO:
        if (ARPEGGIO_TYPES[action.payload] == undefined) {
          throw new Error(`Unknown Arpeggio Type: ${action.payload}`);
        }
        const newArpeggioOptions = {
          ...currentState.arpeggioOptions,
          [action.payload]: !currentState.arpeggioOptions[action.payload],
        };
        const possibleArpeggios = getAllArpeggiosFromState(newArpeggioOptions);
        return {
          ...currentState,
          currentScale: translate("No Arpeggio Selected"),
          scaleArrayIndex: 0,
          scaleArray: possibleArpeggios,
          arpeggioOptions: newArpeggioOptions,
        };
      case RANDOM_ACTIONS.SELECT_ALL_SCALES:
        const allScales = { ...currentState.scaleOptions };
        let allScalesOn = true;
        for (const key in allScales) {
          if (
            allScales.hasOwnProperty(key) &&
            !currentState.scaleOptions[key]
          ) {
            allScales[key] = true;
            allScalesOn = false;
          }
        }
        if (allScalesOn) {
          for (const key in allScales) {
            if (allScales.hasOwnProperty(key) && key !== SCALE_TYPES.major) {
              allScales[key] = false;
            }
          }
          allScales[SCALE_TYPES.major] = true;
        }
        return { ...currentState, scaleOptions: allScales };
      case RANDOM_ACTIONS.SELECT_ALL_ARPEGGIOS:
        const allArpeggios = { ...currentState.arpeggioOptions };
        let allArpeggiosOn = true;
        for (const key in allArpeggios) {
          if (
            allArpeggios.hasOwnProperty(key) &&
            !currentState.arpeggioOptions[key]
          ) {
            allArpeggios[key] = true;
            allArpeggiosOn = false;
          }
        }
        if (allArpeggiosOn) {
          for (const key in allArpeggios) {
            if (
              allArpeggios.hasOwnProperty(key) &&
              key !== ARPEGGIO_TYPES.major
            ) {
              allArpeggios[key] = false;
            }
          }
          allArpeggios[ARPEGGIO_TYPES.major] = true;
        }
        return { ...currentState, arpeggioOptions: allArpeggios };
      case RANDOM_ACTIONS.GET_NEW_SCALE:
        if (state.repeat) {
          // Ensuring that the new scale is at least different from the old one
          if (currentState.scaleArray.length === 0) {
            Alert.alert(
              translate("No Scale Selected"),
              translate("Please select at least one category")
            );
          } else {
            let newScale;
            do {
              newScale =
                currentState.scaleArray[
                  random(currentState.scaleArray.length - 1)
                ];
            } while (newScale == currentState.currentScale);
            return {
              ...currentState,
              currentScale: newScale
                ? newScale
                : translate("No Scale Selected"),
            };
          }
        } else {
          // Do not repeat scales
          if (currentState.scaleArrayIndex >= currentState.scaleArray.length) {
            Alert.alert("All scaled practiced!", "", [
              {
                onPress: () => {
                  dispatchRandomState({ type: RANDOM_ACTIONS.RESET_NO_REPEAT });
                },
              },
            ]);
            return currentState;
          } else {
            return {
              ...currentState,
              currentScale:
                currentState.scaleArray[currentState.scaleArrayIndex],
              scaleArrayIndex: currentState.scaleArrayIndex + 1,
            };
          }
        }
      case RANDOM_ACTIONS.RESET_NO_REPEAT:
        // When the user has no repeat turned on, and reaches the end of the
        // list, there's a couple things we need to do.
        const newScaleArray = shuffle(currentState.scaleArray);
        return {
          ...currentState,
          scaleArray: newScaleArray,
          scaleArrayIndex: 1,
          currentScale: newScaleArray[0],
        };
      case RANDOM_ACTIONS.TOGGLE_SELECTION_POPOVER:
        return {
          ...currentState,
          showSelectionPopover: !currentState.showSelectionPopover,
        };
      case RANDOM_ACTIONS.SWITCH_DOMAIN:
        const scaleArray = isScale
          ? getAllScalesFromState(currentState.scaleOptions)
          : getAllArpeggiosFromState(currentState.arpeggioOptions);
        return {
          ...currentState,
          scaleArrayIndex: 0,
          scaleArray,
          currentScale: isScale
            ? translate("No Scale Selected")
            : translate("No Arpeggio Selected"),
        };
      default:
        throw new Error(`Unknown Action: ${action.type}`);
    }
  }

  randomReducer.actions = RANDOM_ACTIONS;
  return randomReducer;
}
