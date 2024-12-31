import React, { useContext, useEffect, useRef, useReducer } from 'react';
import { Alert, View, ScrollView, Pressable, Text } from 'react-native';
import Popover from 'react-native-popover-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import { StatisticsDispatchContext } from '../../Model/Statistics';
import { STORAGE_KEYS } from '../../enums/storageKeys';

/**
 * @namespace Random
 * The Namespace for the Random Screen and all its sub components and methods
 */

/**
 * @function load
 * @memberof Random
 * @description Loads Random reducer data from local storage
 * @copyright 2024 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 12/28/24
 * @version 1.0.0
 * @param {string} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 */
async function load() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.random);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function save
 * @memberof Random
 * @description Stores Random reducer Data in Local Storage
 * @copyright 2024 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 12/28/24
 * @version 1.0.0
 * @param {string} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 */
async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEYS.random, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function Random
 * @memberof Random
 * @description A View that allows the user to randomize all of the scales in
 * a particular category.
 * Created 10/10/2020
 * @copyright 2024 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 12/28/24
 * @version 3.2.0
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
  const dispatchStatistics = useContext(StatisticsDispatchContext);
  const randomReducer = getRandomReducer(state, dispatchStatistics);
  const RANDOM_ACTIONS = randomReducer.actions;
  const [randomState, dispatchRandomState] = useReducer(
    randomReducer,
    randomReducer.initialState,
  );
  dispatchRandomState.actions = RANDOM_ACTIONS;

  const isScale = state?.randomType == PreferencesContext.randomTypes.SCALE;

  useEffect(
    function loadSavedState() {
      load().then((data) => {
        if (data !== null) {
          const dataToSet = {};
          if (data.scaleOptions) {
            dataToSet.scaleOptions = data.scaleOptions;
          }
          if (data.arpeggioOptions) {
            dataToSet.arpeggioOptions = data.arpeggioOptions;
          }

          // Set loaded data to global store
          dispatchRandomState({
            type: RANDOM_ACTIONS.SET_STATE_FROM_STORAGE,
            payload: dataToSet,
          });
        }
      });
    },
    [RANDOM_ACTIONS.SET_STATE_FROM_STORAGE],
  );

  useEffect(
    function saveUserSelections() {
      if (randomState) {
        save({
          scaleOptions: randomState.scaleOptions,
          arpeggioOptions: randomState.arpeggioOptions,
        });
      }
    },
    [randomState, randomState?.scaleOptions, randomState?.arpeggioOptions],
  );

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
        hitSlop={5}
        onPress={() => {
          dispatchRandomState({
            type: RANDOM_ACTIONS.TOGGLE_SELECTION_POPOVER,
          });
        }}
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
