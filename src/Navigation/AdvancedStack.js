import 'react-native-gesture-handler';
import React from 'react';
import {useDarkMode} from 'react-native-dynamic';
import {createStackNavigator} from '@react-navigation/stack';

import AdvancedScale from '../Advanced/AdvancedScale';
import AdvancedArpeggio from '../Advanced/AdvancedArpeggio';
import HeaderButton from '../Components/HeaderButton';
import {translate} from '../Translations/TranslationModel';
import {colors} from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the Advanced tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.0.1
 * @param {Object} props.navigation The navigation object provided by React
 * Navigation
 * 
 * @component
 * @example
 * ```jsx
<Tab.Screen
  name="Advanced"
  component={AdvancedStack}
  options={{title: translate('Advanced')}}
/>
```
 */
const AdvancedStack = ({navigation}) => {
  const DARKMODE = useDarkMode();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate('Back'),
      }}>
      <Stack.Screen
        name="Advanced Scale Practice"
        component={AdvancedScale}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Advanced Arpeggio Practice');
              }}>
              {translate('Arpeggios')}
            </HeaderButton>
          ),
          title: translate('Advanced Scale Practice'),
        }}
      />
      <Stack.Screen
        name="Advanced Arpeggio Practice"
        component={AdvancedArpeggio}
        options={{
          title: translate('Advanced Arpeggio Practice'),
        }}
      />
    </Stack.Navigator>
  );
};

export default AdvancedStack;
