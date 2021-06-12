import React from 'react';
import {View, ScrollView} from 'react-native';
import SwitchRow from '../../../Components/SwitchRow/SwitchRow';
import AllScalesButton from '../../../Components/AllScalesButton/AllScalesButton';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {colors} from '../../../Model/Model';
import {translate} from '../../../Translations/TranslationModel';

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
    <>
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
          accessibilityHint={translate('Toggles All Scales')}>
          {translate('All Scales')}
        </AllScalesButton>
      </View>
    </>
  );
}

const styles = {
  allScaleButton: {
    paddingHorizontal: 10,
  },
};
