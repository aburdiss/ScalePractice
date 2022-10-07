import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from "react";
import { View, ScrollView, Pressable, Text } from "react-native";
import Popover from "react-native-popover-view";

import {
  RandomizeButton,
  LargeScaleDisplay,
  ScaleDisplay,
} from "../../Components";
import RandomSettings from "./RandomSettings/RandomSettings";

import { colors, SCALE_TYPES, ARPEGGIO_TYPES } from "../../Model/Model";
import { PreferencesContext } from "../../Model/Preferences";
import { translate } from "../../Translations/TranslationModel";

import { useIdleScreen, useDarkMode } from "../../utils";
import { getAllScalesFromState } from "./utils/getAllScalesFromState";
import { getRandomReducer } from "./utils/getRandomReducer";

/**
 * @function Random
 * @description A View that allows the user to randomize all of the scales in
 * a particular category.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 3.1.0
 *
 * @example
 * <Random />
 */
export default function Random() {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = {
    container: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    mainActionButton: {
      borderColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
      borderTopWidth: 1,
    },
    popoverArrow: {
      backgroundColor: DARKMODE
        ? colors.systemGray6Dark
        : colors.systemGray6Light,
    },
    popoverContainer: {
      width: 300,
      backgroundColor: DARKMODE
        ? colors.systemGray6Dark
        : colors.systemGray6Light,
    },
    scaleDisplay: {
      borderBottomWidth: 1,
      borderColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
    },
    selectionsButton: {
      position: "absolute",
      bottom: 5,
      right: 5,
      height: 25,
      zIndex: 2,
    },
    selectionsText: {
      color: DARKMODE ? colors.white : colors.black,
    },
    switchesContainer: {
      flex: 1,
      alignSelf: "center",
      width: "100%",
      marginHorizontal: 10,
    },
  };

  const { state } = useContext(PreferencesContext);

  const INITIAL_RANDOM_STATE = {
    currentScale:
      state?.randomType == PreferencesContext.randomTypes.SCALE
        ? translate("No Scale Selected")
        : translate("No Arpeggio Selected"),
    scaleArray: getAllScalesFromState({ major: true }),
    scaleArrayIndex: 0,
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
  };
  const randomReducer = getRandomReducer(_dispatchRandomState, state);
  const RANDOM_ACTIONS = randomReducer.actions;
  const [randomState, dispatchRandomState] = useReducer(
    randomReducer,
    INITIAL_RANDOM_STATE
  );
  dispatchRandomState.actions = RANDOM_ACTIONS;

  function _dispatchRandomState(...args) {
    return dispatchRandomState(...args);
  }

  useEffect(
    function handleStateChange() {
      dispatchRandomState({
        type: RANDOM_ACTIONS.SET_CURRENT_SCALE,
        payload:
          state?.randomType == PreferencesContext.randomTypes.SCALE
            ? translate("No Scale Selected")
            : translate("No Arpeggio Selected"),
      });
    },
    [state]
  );

  // Old Stuff
  const selectionRef = useRef(null);
  const [showSelectionPopover, setShowSelectionPopover] = useState(false);

  return state?.simpleRandom ? (
    <View>
      <Pressable
        onPress={() =>
          dispatchRandomState({ type: RANDOM_ACTIONS.GET_NEW_SCALE })
        }
      >
        <LargeScaleDisplay>{randomState.currentScale}</LargeScaleDisplay>
      </Pressable>
      <Pressable
        ref={selectionRef}
        hitSlop={1}
        onPress={() => setShowSelectionPopover(true)}
        style={styles.selectionsButton}
      >
        <Text style={styles.selectionsText}>
          {translate("Scale Selections")}
        </Text>
      </Pressable>
      <Popover
        arrowStyle={styles.popoverArrow}
        from={selectionRef}
        isVisible={showSelectionPopover}
        onRequestClose={() => setShowSelectionPopover(false)}
      >
        <ScrollView style={styles.popoverContainer}>
          <RandomSettings
            action={
              state?.randomType == PreferencesContext.randomTypes.SCALE
                ? RANDOM_ACTIONS.TOGGLE_SCALE
                : RANDOM_ACTIONS.TOGGLE_ARPEGGIO
            }
            types={
              state?.randomType == PreferencesContext.randomTypes.SCALE
                ? SCALE_TYPES
                : ARPEGGIO_TYPES
            }
            randomState={randomState}
            dispatchRandomState={dispatchRandomState}
          />
        </ScrollView>
      </Popover>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.scaleDisplay}>
        <ScaleDisplay>{randomState.currentScale}</ScaleDisplay>
      </View>
      <View style={styles.switchesContainer}>
        <ScrollView>
          <RandomSettings
            action={
              state?.randomType == PreferencesContext.randomTypes.SCALE
                ? RANDOM_ACTIONS.TOGGLE_SCALE
                : RANDOM_ACTIONS.TOGGLE_ARPEGGIO
            }
            types={
              state?.randomType == PreferencesContext.randomTypes.SCALE
                ? SCALE_TYPES
                : ARPEGGIO_TYPES
            }
            randomState={randomState}
            dispatchRandomState={dispatchRandomState}
          />
        </ScrollView>
      </View>
      <View style={styles.mainActionButton}>
        <RandomizeButton
          handler={() =>
            dispatchRandomState({ type: RANDOM_ACTIONS.GET_NEW_SCALE })
          }
          accessibilityValue={{ text: randomState.currentScale }}
          accessibilityHint={translate("Randomizes a new scale")}
          accessible={true}
        />
      </View>
    </View>
  );
}
