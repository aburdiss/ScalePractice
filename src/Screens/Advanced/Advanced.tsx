import React, { useContext, useEffect, useReducer } from 'react';
import { Alert, View, Text, FlatList, StyleSheet } from 'react-native';

import AddToListButton from '../../Components/AddToListButton';
import RandomizeButton from '../../Components/RandomizeButton';
import ResetButton from '../../Components/ResetButton';
import ScaleDisplay from '../../Components/ScaleDisplay';
import ScalePickers from '../../Components/ScalePickers';
import SwipeableRow from '../../Components/SwipeableRow';

import {
  colors,
  allScaleNames,
  allNoteNames,
  allArpeggioNames,
} from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';

import { getIsSmallScreen, useIdleScreen, useDarkMode } from '../../utils';
import {
  getAdvancedReducer,
  ADVANCED_ACTIONS,
  INITIAL_ADVANCED_STATE,
} from './utils/getAdvancedReducer';
import { StatisticsDispatchContext } from '../../Model/Statistics';
import { STORAGE_KEYS } from '../../enums/storageKeys';
import { loadFromStorage } from '../../utils/loadFromStorage';
import { saveToStorage } from '../../utils/saveToStorage';
import { APP_DATA_TYPES } from '../../enums/appDataTypes';

/**
 * @namespace Advanced
 * The namespace for the Advance screen and all its sub components and methods
 */

/**
 * @function Advanced
 * @component
 * @memberof Advanced
 * @description A view that allows the user to randomize between a list of
 * selected scales.
 * Created by Alexander Burdiss 10/10/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/30/25
 * @version 3.2.0
 *
 * @example
 * <Advanced />
 */
export default function Advanced() {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    list: {
      flex: 1,
      borderTopColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,

      borderTopWidth: 1,
    },
    listItemContainer: {
      paddingLeft: 20,
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
    },
    listItemText: {
      paddingVertical: 15,
      color: DARKMODE ? colors.white : colors.black,
    },
    listItemTextContainer: {
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderBottomWidth: 1,
    },
    mainActionButton: {
      borderTopColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,

      borderTopWidth: 1,
    },
    rightAction: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: DARKMODE ? colors.redDark : colors.redLight,
      flex: 1,
      justifyContent: 'flex-end',
    },
    smallScreenButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderTopWidth: 1,
    },
    trashIcon: {
      paddingRight: 10,
    },
  });
  const { state } = useContext(PreferencesContext);
  const dispatchStatistics = useContext(StatisticsDispatchContext);

  const advancedReducer = getAdvancedReducer(state, dispatchStatistics);

  const [advancedState, dispatchAdvancedState] = useReducer(advancedReducer, {
    ...INITIAL_ADVANCED_STATE,
    isSmallScreen: getIsSmallScreen(),
  });

  const isScale = state?.advancedType == APP_DATA_TYPES.SCALE;

  useEffect(function loadSavedState() {
    loadFromStorage(STORAGE_KEYS.advanced).then((data) => {
      if (data !== null) {
        const dataToSet = {
          possibleScales: undefined,
          possibleArpeggios: undefined,
        };
        if (data.possibleScales) {
          dataToSet.possibleScales = data.possibleScales;
        }
        if (data.possibleArpeggios) {
          dataToSet.possibleArpeggios = data.possibleArpeggios;
        }

        // Set loaded data to global store
        dispatchAdvancedState({
          type: ADVANCED_ACTIONS.SET_STATE_FROM_STORAGE,
          payload: dataToSet,
        });
      }
    });
  }, []);

  useEffect(
    function saveUserSelections() {
      if (advancedState) {
        saveToStorage(STORAGE_KEYS.advanced, {
          possibleScales: advancedState.possibleScales,
          possibleArpeggios: advancedState.possibleArpeggios,
        });
      }
    },
    [
      advancedState,
      advancedState?.possibleScales,
      advancedState?.possibleArpeggios,
    ],
  );

  useEffect(
    function handleStateChange() {
      if (state) {
        dispatchAdvancedState({ type: ADVANCED_ACTIONS.SWITCH_DOMAIN });
      }
    },
    [state],
  );

  useEffect(function handleAllScalesPracticed() {
    if (advancedState.allScalesPracticed) {
      Alert.alert(
        isScale
          ? translate('All Scales Practiced')
          : translate('All Arpeggios Practiced'),
        '',
        [
          {
            onPress: () => {
              dispatchAdvancedState({ type: ADVANCED_ACTIONS.RESET_NO_REPEAT });
            },
          },
        ],
      );
    }
  });

  /**
   * @function AdvancedScale~addToScaleList
   * @description Adds the currently selected scale from the pickers to the
   * list of scales. Alerts the user if the scale is already in the list.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const addToScaleList = () => {
    let scaleAlreadyInList = false;
    const newScale = `${advancedState.selectedNote} ${advancedState.selectedScale}`;
    if (
      (isScale && advancedState.possibleScales.includes(newScale)) ||
      (!isScale && advancedState.possibleArpeggios.includes(newScale))
    ) {
      scaleAlreadyInList = true;
    }
    if (!scaleAlreadyInList) {
      dispatchAdvancedState({
        type: ADVANCED_ACTIONS.ADD_TO_LIST,
        payload: newScale,
      });
    } else {
      Alert.alert(
        isScale
          ? translate('Scale Already Selected')
          : translate('Arpeggio Already Selected'),
      );
    }
  };

  /**
   * @function AdvancedScale~generateScale
   * @description Generates a random scale from the user selected list of
   * scales.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  function generateScale(): null {
    if (isScale && advancedState.possibleScales.length === 0) {
      Alert.alert(
        translate('No Scale Selected'),
        translate('Please select at least one scale'),
      );
      return null;
    }
    if (!isScale && advancedState.possibleArpeggios.length === 0) {
      Alert.alert(
        translate('No Arpeggio Selected'),
        translate('Please select at least one arpeggio'),
      );
      return null;
    }
    dispatchAdvancedState({
      type: isScale
        ? ADVANCED_ACTIONS.GET_NEW_SCALE
        : ADVANCED_ACTIONS.GET_NEW_ARPEGGIO,
    });
    return null;
  }

  /**
   * @function AdvancedScale~removeAllScales
   * @description Removes all scales from the user created list of scales.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const removeAllScales = () => {
    dispatchAdvancedState({ type: ADVANCED_ACTIONS.RESET_LIST });
  };

  return (
    <View style={styles.container}>
      <ScaleDisplay>{advancedState.currentScale}</ScaleDisplay>
      <ScalePickers
        selectedNote={advancedState.selectedNote}
        setSelectedNote={(newNote: string) =>
          dispatchAdvancedState({
            type: ADVANCED_ACTIONS.SET_SELECTED_NOTE,
            payload: newNote,
          })
        }
        noteNames={allNoteNames}
        selectedScale={advancedState.selectedScale}
        setSelectedScale={(scaleName: string) =>
          dispatchAdvancedState({
            type: ADVANCED_ACTIONS.SET_SELECTED_SCALE,
            payload: scaleName,
          })
        }
        scaleNames={isScale ? allScaleNames : allArpeggioNames}
      />
      {!advancedState.isSmallScreen ? (
        <View style={styles.buttonContainer}>
          <ResetButton handler={removeAllScales} />
          <AddToListButton handler={addToScaleList} />
        </View>
      ) : null}
      <FlatList
        style={styles.list}
        data={
          isScale
            ? advancedState.possibleScales
            : advancedState.possibleArpeggios
        }
        renderItem={({ item }) => (
          <SwipeableRow
            styles={styles}
            deleteItem={() =>
              dispatchAdvancedState({
                type: ADVANCED_ACTIONS.REMOVE_FROM_LIST,
                payload: item,
              })
            }
            item={item}
          >
            <View style={styles.listItemContainer}>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            </View>
          </SwipeableRow>
        )}
        keyExtractor={(item) => item}
      />
      {advancedState.isSmallScreen ? (
        <View style={styles.smallScreenButtonContainer}>
          <ResetButton handler={removeAllScales} />
          <RandomizeButton
            handler={generateScale}
            accessibilityValue={{ text: `${advancedState.currentScale}` }}
          />
          <AddToListButton handler={addToScaleList} />
        </View>
      ) : (
        <View style={styles.mainActionButton}>
          <RandomizeButton
            handler={generateScale}
            accessibilityValue={{ text: `${advancedState.currentScale}` }}
          />
        </View>
      )}
    </View>
  );
}
