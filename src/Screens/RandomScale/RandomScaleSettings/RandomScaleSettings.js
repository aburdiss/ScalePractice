import React from 'react';
import { View } from 'react-native';
import { SwitchRow, AllScalesButton } from '../../../Components';
import { translate } from '../../../Translations/TranslationModel';

/**
 * @function RandomScaleSettings
 * @description Displays the settings for customizing a random scale selection
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.0.0
 * @param props The JSX props passed to this React component
 * @param {Function} props.toggleMajorSwitch
 * @param {boolean} props.majorSwitch
 * @param {Function} props.toggleNaturalMinorSwitch
 * @param {boolean} props.naturalMinorSwitch
 * @param {Function} props.toggleHarmonicMinorSwitch
 * @param {boolean} props.harmonicMinorSwitch
 * @param {Function} props.toggleMelodicMinorSwitch
 * @param {boolean} props.melodicMinorSwitch
 * @param {Function} props.toggleBluesSwitch
 * @param {boolean} props.bluesSwitch
 * @param {Function} props.togglePentatonicSwitch
 * @param {boolean} props.pentatonicSwitch
 * @param {Function} props.toggleOctatonicSwitch
 * @param {boolean} props.octatonicSwtich
 * @param {Function} props.toggleWholeToneSwitch
 * @param {boolean} props.wholeToneSwitch
 * @param {Function} props.selectAllScales
 */
export default function RandomScaleSettings({
  toggleMajorSwitch,
  majorSwitch,
  toggleNaturalMinorSwitch,
  naturalMinorSwitch,
  toggleHarmonicMinorSwitch,
  harmonicMinorSwitch,
  toggleMelodicMinorSwitch,
  melodicMinorSwitch,
  toggleMajorModesSwitch,
  majorModesSwitch,
  toggleMelodicMinorModesSwitch,
  melodicMinorModesSwitch,
  toggleBluesSwitch,
  bluesSwitch,
  togglePentatonicSwitch,
  pentatonicSwitch,
  toggleOctatonicSwitch,
  octatonicSwtich,
  toggleWholeToneSwitch,
  wholeToneSwitch,
  selectAllScales,
}) {
  return (
    <View style={styles.container}>
      <SwitchRow
        onValueChange={toggleMajorSwitch}
        value={majorSwitch}
        text={translate('Major')}
      />
      <SwitchRow
        onValueChange={toggleNaturalMinorSwitch}
        value={naturalMinorSwitch}
        text={translate('Natural Minor')}
      />
      <SwitchRow
        onValueChange={toggleHarmonicMinorSwitch}
        value={harmonicMinorSwitch}
        text={translate('Harmonic Minor')}
      />
      <SwitchRow
        onValueChange={toggleMelodicMinorSwitch}
        value={melodicMinorSwitch}
        text={translate('Melodic Minor')}
      />
      <SwitchRow
        onValueChange={toggleMajorModesSwitch}
        value={majorModesSwitch}
        text={translate('Major Modes')}
      />
      <SwitchRow
        onValueChange={toggleMelodicMinorModesSwitch}
        value={melodicMinorModesSwitch}
        text={translate('Melodic Minor Modes')}
      />
      <SwitchRow
        onValueChange={toggleBluesSwitch}
        value={bluesSwitch}
        text={translate('Blues')}
      />
      <SwitchRow
        onValueChange={togglePentatonicSwitch}
        value={pentatonicSwitch}
        text={translate('Pentatonic')}
      />
      <SwitchRow
        onValueChange={toggleOctatonicSwitch}
        value={octatonicSwtich}
        text={translate('Octatonic')}
      />
      <SwitchRow
        onValueChange={toggleWholeToneSwitch}
        value={wholeToneSwitch}
        text={translate('Whole Tone')}
      />
      <View style={styles.allScaleButton}>
        <AllScalesButton
          handler={selectAllScales}
          accessibilityHint={translate('Toggles All Scales')}
        >
          {translate('All Scales')}
        </AllScalesButton>
      </View>
    </View>
  );
}

const styles = {
  allScaleButton: {
    paddingHorizontal: 10,
  },
  container: {
    paddingTop: 10,
  },
};
