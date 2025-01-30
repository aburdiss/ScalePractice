import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SwitchRow from '../../../Components/SwitchRow';
import AllScalesButton from '../../../Components/AllScalesButton';
import { translate } from '../../../Translations/TranslationModel';
import { getTranslationKeyFromStateKey } from '../utils/getTranslationKeyFromStateKey';
import { RANDOM_ACTIONS, RandomStateType } from '../utils/getRandomReducer';

/**
 * @function RandomSettings
 * @description Displays the settings for customizing a random scale selection
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.0.0
 * @param props The JSX props passed to this React component
 */
export default function RandomSettings({
  action,
  types,
  randomState,
  dispatchRandomState,
}: {
  action: RANDOM_ACTIONS | number;
  types: Object;
  randomState: RandomStateType;
  dispatchRandomState: Function;
}) {
  const isScale = action == RANDOM_ACTIONS.TOGGLE_SCALE;

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
  action: PropTypes.number,
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
