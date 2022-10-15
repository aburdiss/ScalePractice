import React, { useContext, useEffect, useReducer } from 'react';
import { Alert, View, Text, FlatList } from 'react-native';

import {
  AddToListButton,
  RandomizeButton,
  ResetButton,
  ScaleDisplay,
  ScalePickers,
  SwipeableRow,
} from '../../Components';

import {
  colors,
  allScaleNames,
  allNoteNames,
  allArpeggioNames,
} from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';

import { getIsSmallScreen, useIdleScreen, useDarkMode } from '../../utils';
import { getAdvancedReducer } from './utils/getAdvancedReducer';
/**
 * @description A view that allows the user to randomize between a list of
 * selected scales.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 2.1.0
 *
 * @example
 * <Advanced Scale />
 */
const AdvancedScale = () => {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = {
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
  };
  const { state } = useContext(PreferencesContext);

  const advancedReducer = getAdvancedReducer(state);
  const ADVANCED_ACTIONS = advancedReducer.actions;
  const [advancedState, dispatchAdvancedState] = useReducer(advancedReducer, {
    ...advancedReducer.initialState,
    isSmallScreen: getIsSmallScreen(),
  });

  const isScale = state?.advancedType == PreferencesContext.advancedTypes.SCALE;

  useEffect(
    function handleStateChange() {
      if (state) {
        dispatchAdvancedState({ type: ADVANCED_ACTIONS.SWITCH_DOMAIN });
      }
    },
    [state, ADVANCED_ACTIONS.SWITCH_DOMAIN],
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
  const generateScale = () => {
    if (isScale && advancedState.possibleScales.length === 0) {
      Alert.alert(
        translate('No Scale Selected'),
        translate('Please select at least one scale'),
      );
      return;
    }
    if (!isScale && advancedState.possibleArpeggios.length === 0) {
      Alert.alert(
        translate('No Arpeggio Selected'),
        translate('Please select at least one arpeggio'),
      );
      return;
    }
    dispatchAdvancedState({
      type: isScale
        ? ADVANCED_ACTIONS.GET_NEW_SCALE
        : ADVANCED_ACTIONS.GET_NEW_ARPEGGIO,
    });
  };

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
        setSelectedNote={(newNote) =>
          dispatchAdvancedState({
            type: ADVANCED_ACTIONS.SET_SELECTED_NOTE,
            payload: newNote,
          })
        }
        noteNames={allNoteNames}
        selectedScale={advancedState.selectedScale}
        setSelectedScale={(scaleName) =>
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
};

export default AdvancedScale;
