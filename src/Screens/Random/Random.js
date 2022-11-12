import React, { useContext, useEffect, useRef, useReducer } from 'react';
import { Alert, View, ScrollView, Pressable, Text } from 'react-native';
import Popover from 'react-native-popover-view';

import {
  RandomizeButton,
  LargeScaleDisplay,
  ScaleDisplay,
} from '../../Components';
import RandomSettings from './RandomSettings/RandomSettings';

import { colors, SCALE_TYPES, ARPEGGIO_TYPES } from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';

import { useIdleScreen, useDarkMode } from '../../utils';
import { getRandomReducer } from './utils/getRandomReducer';

/**
 * @namespace Random
 * @description The main screen of the app, with a basic randomizer with
 * scale selections
 */
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
      position: 'absolute',
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
      alignSelf: 'center',
      width: '100%',
      marginHorizontal: 10,
    },
  };

  const { state } = useContext(PreferencesContext);
  const randomReducer = getRandomReducer(state);
  const RANDOM_ACTIONS = randomReducer.actions;
  const [randomState, dispatchRandomState] = useReducer(
    randomReducer,
    randomReducer.initialState,
  );
  dispatchRandomState.actions = RANDOM_ACTIONS;

  const isScale = state?.randomType == PreferencesContext.randomTypes.SCALE;

  useEffect(
    function handleStateChange() {
      if (state) {
        dispatchRandomState({ type: RANDOM_ACTIONS.SWITCH_DOMAIN });
      }
    },
    [state, RANDOM_ACTIONS.SWITCH_DOMAIN],
  );

  useEffect(
    function handleAllScalesPracticed() {
      if (randomState.allScalesPracticed) {
        Alert.alert(
          isScale
            ? translate('All Scales Practiced')
            : translate('All Arpeggios Practiced'),
          '',
          [
            {
              onPress: () =>
                dispatchRandomState({ type: RANDOM_ACTIONS.RESET_NO_REPEAT }),
            },
          ],
        );
      }
    },
    [RANDOM_ACTIONS.RESET_NO_REPEAT, randomState.allScalesPracticed, isScale],
  );

  const selectionRef = useRef(null);

  function getNewScale() {
    if (randomState.scaleArray.length === 0) {
      Alert.alert(
        isScale
          ? translate('No Scale Selected')
          : translate('No Arpeggio Selected'),
        translate('Please select at least one category'),
      );
      return;
    }
    dispatchRandomState({ type: RANDOM_ACTIONS.GET_NEW_SCALE });
  }

  return state?.simpleRandom ? (
    <View>
      <Pressable onPress={getNewScale}>
        <LargeScaleDisplay>{randomState.currentScale}</LargeScaleDisplay>
      </Pressable>
      <Pressable
        ref={selectionRef}
        hitSlop={1}
        onPress={() =>
          dispatchRandomState({ type: RANDOM_ACTIONS.TOGGLE_SELECTION_POPOVER })
        }
        style={styles.selectionsButton}
      >
        <Text style={styles.selectionsText}>
          {isScale
            ? translate('Scale Selections')
            : translate('Arpeggio Selections')}
        </Text>
      </Pressable>
      <Popover
        popoverStyle={styles.popoverArrow}
        from={selectionRef}
        isVisible={randomState.showSelectionPopover}
        onRequestClose={() =>
          dispatchRandomState({ type: RANDOM_ACTIONS.TOGGLE_SELECTION_POPOVER })
        }
      >
        <ScrollView style={styles.popoverContainer}>
          <RandomSettings
            action={
              isScale
                ? RANDOM_ACTIONS.TOGGLE_SCALE
                : RANDOM_ACTIONS.TOGGLE_ARPEGGIO
            }
            types={isScale ? SCALE_TYPES : ARPEGGIO_TYPES}
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
              isScale
                ? RANDOM_ACTIONS.TOGGLE_SCALE
                : RANDOM_ACTIONS.TOGGLE_ARPEGGIO
            }
            types={isScale ? SCALE_TYPES : ARPEGGIO_TYPES}
            randomState={randomState}
            dispatchRandomState={dispatchRandomState}
          />
        </ScrollView>
      </View>
      <View style={styles.mainActionButton}>
        <RandomizeButton
          handler={getNewScale}
          accessibilityValue={{ text: randomState.currentScale }}
          accessibilityHint={translate('Randomizes a new scale')}
          accessible={true}
        />
      </View>
    </View>
  );
}
