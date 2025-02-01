import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SwitchRow from '../../../../Components/SwitchRow';
import AllScalesButton from '../../../../Components/AllScalesButton';
import { translate } from '../../../../Translations/TranslationModel';
import { getTranslationKeyFromStateKey } from '../../utils/getTranslationKeyFromStateKey';
import type { RandomStateType } from '../../Random.d';
import { RANDOM_ACTIONS } from '../../enums/randomActions';

/**
 * @function RandomSettings
 * @memberof Random
 * @component
 * @description Displays the settings for customizing a random scale selection
 * Created 10/7/2022
 * @param {Object} props JSX props passed to this React component
 * @param {RANDOM_ACTIONS} props.action The action that this settings panel
 * should use.
 * @param {Object} props.types The different settings to be available to change
 * @param {RandomStateType} props.randomState The state that currently exists
 * for this settings panel.
 * @param {Function} props.dispatchRandomState A reducer dispatch function to
 * update the state stored in props.randomState
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/30/25
 * @version 1.0.1
 * @param props The JSX props passed to this React component
 */
export default function RandomSettings({
  action,
  types,
  randomState,
  dispatchRandomState,
}: {
  action: RANDOM_ACTIONS;
  types: Object;
  randomState: RandomStateType;
  dispatchRandomState: Function;
}) {
  const isScale = action === RANDOM_ACTIONS.TOGGLE_SCALE;

  return (
    <View style={styles.container}>
      {Object.keys(types).map((type) => {
        return (
          <SwitchRow
            key={type}
            onValueChange={() =>
              dispatchRandomState({
                type: action,
                payload: type,
              })
            }
            value={
              isScale
                ? randomState.scaleOptions[type]
                : randomState.arpeggioOptions[type]
            }
            text={translate(getTranslationKeyFromStateKey(type, isScale))}
          />
        );
      })}
      <View style={styles.allScaleButton}>
        <AllScalesButton
          handler={() =>
            dispatchRandomState({
              type:
                action == RANDOM_ACTIONS.TOGGLE_SCALE
                  ? RANDOM_ACTIONS.SELECT_ALL_SCALES
                  : RANDOM_ACTIONS.SELECT_ALL_ARPEGGIOS,
            })
          }
          accessibilityHint={
            action == RANDOM_ACTIONS.TOGGLE_SCALE
              ? translate('Toggles All Scales')
              : translate('Toggles All Arpeggios')
          }
        >
          {action == RANDOM_ACTIONS.TOGGLE_SCALE
            ? translate('All Scales')
            : translate('All Arpeggios')}
        </AllScalesButton>
      </View>
    </View>
  );
}

RandomSettings.propTypes = {
  action: PropTypes.string,
  types: PropTypes.object,
  randomState: PropTypes.object,
  dispatchRandomState: PropTypes.func,
};

const styles = {
  allScaleButton: {
    paddingHorizontal: 10,
  },
  container: {
    paddingTop: 10,
  },
};
