import React from 'react';
import { View } from 'react-native';
import { AllScalesButton, SwitchRow } from '../../../Components';
import { translate } from '../../../Translations/TranslationModel';

/**
 * @function RandomArpeggioSettings
 * @description Displays the settings for customizing a random arpeggio in the
 * app.
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.0.0
 * @param props The JSX props passed to this React component
 * @param {Function} props.toggleMajorSwitch
 * @param {boolean} props.majorSwitch
 * @param {Function} props.toggleMinorSwitch
 * @param {boolean} props.minorSwitch
 * @param {Function} props.toggleAugmentedSwitch
 * @param {boolean} props.augmentedSwitch
 * @param {Function} props.toggleDiminishedSwitch
 * @param {boolean} props.diminishedSwitch
 * @param {Function} props.toggleDominantSeventhSwitch
 * @param {boolean} props.dominantSeventhSwitch
 * @param {Function} props.toggleMajorSeventhSwitch
 * @param {boolean} props.majorSeventhSwitch
 * @param {Function} props.toggleMinorSeventhSwitch
 * @param {boolean} props.minorSeventhSwitch
 * @param {Function} props.toggleMinorMajorSeventhSwitch
 * @param {boolean} props.minorMajorSeventhSwitch
 * @param {Function} props.toggleAugmentedSeventhSwitch
 * @param {boolean} props.augmentedSeventhSwitch
 * @param {Function} props.toggleHalfDiminishedSeventhSwitch
 * @param {boolean} props.halfDiminishedSeventhSwitch
 * @param {Function} props.toggleDiminishedSeventhSwitch
 * @param {boolean} props.diminishedSeventhSwitch
 * @param {Function} props.selectAllArpeggios
 */
export default function RandomArpeggioSettings({
  toggleMajorSwitch,
  majorSwitch,
  toggleMinorSwitch,
  minorSwitch,
  toggleAugmentedSwitch,
  augmentedSwitch,
  toggleDiminishedSwitch,
  diminishedSwitch,
  toggleDominantSeventhSwitch,
  dominantSeventhSwitch,
  toggleMajorSeventhSwitch,
  majorSeventhSwitch,
  toggleMinorSeventhSwitch,
  minorSeventhSwitch,
  toggleMinorMajorSeventhSwitch,
  minorMajorSeventhSwitch,
  toggleAugmentedSeventhSwitch,
  augmentedSeventhSwitch,
  toggleHalfDiminishedSeventhSwitch,
  halfDiminishedSeventhSwitch,
  toggleDiminishedSeventhSwitch,
  diminishedSeventhSwitch,
  selectAllArpeggios,
}) {
  return (
    <View>
      <SwitchRow
        onValueChange={toggleMajorSwitch}
        value={majorSwitch}
        text={translate('Major')}
      />
      <SwitchRow
        onValueChange={toggleMinorSwitch}
        value={minorSwitch}
        text={translate('Minor')}
      />
      <SwitchRow
        onValueChange={toggleAugmentedSwitch}
        value={augmentedSwitch}
        text={translate('Augmented')}
      />
      <SwitchRow
        onValueChange={toggleDiminishedSwitch}
        value={diminishedSwitch}
        text={translate('Diminished')}
      />
      <SwitchRow
        onValueChange={toggleDominantSeventhSwitch}
        value={dominantSeventhSwitch}
        text={translate('Dominant Seventh')}
      />
      <SwitchRow
        onValueChange={toggleMajorSeventhSwitch}
        value={majorSeventhSwitch}
        text={translate('Major Seventh')}
      />
      <SwitchRow
        onValueChange={toggleMinorSeventhSwitch}
        value={minorSeventhSwitch}
        text={translate('Minor Seventh')}
      />
      <SwitchRow
        onValueChange={toggleMinorMajorSeventhSwitch}
        value={minorMajorSeventhSwitch}
        text={translate('Minor Major Seventh')}
      />
      <SwitchRow
        onValueChange={toggleAugmentedSeventhSwitch}
        value={augmentedSeventhSwitch}
        text={translate('Augmented Minor Seventh')}
      />
      <SwitchRow
        onValueChange={toggleHalfDiminishedSeventhSwitch}
        value={halfDiminishedSeventhSwitch}
        text={translate('Half Diminished Seventh')}
      />
      <SwitchRow
        onValueChange={toggleDiminishedSeventhSwitch}
        value={diminishedSeventhSwitch}
        text={translate('Diminished Seventh')}
      />
      <View style={styles.allScaleButton}>
        <AllScalesButton
          handler={selectAllArpeggios}
          accessibilityHint={translate('Toggles All Arpeggios')}
        >
          {translate('All Arpeggios')}
        </AllScalesButton>
      </View>
    </View>
  );
}

const styles = {
  allScaleButton: {
    paddingHorizontal: 10,
  },
};
