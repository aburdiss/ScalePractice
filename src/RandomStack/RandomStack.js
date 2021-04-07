import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDarkMode} from 'react-native-dynamic';

import RandomScale from './RandomScale/RandomScale';
import RandomArpeggio from './RandomArpeggio/RandomArpeggio';
import HeaderButton from '../Components/HeaderButton/HeaderButton';
import {translate} from '../Translations/TranslationModel';
import {colors} from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the Random Tab of the navigation.
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
  name="Random"
  component={RandomStack}
  options={{title: translate('Random')}}
/>
```
 */
const RandomStack = ({navigation}) => {
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
        name="Random Scale Practice"
        component={RandomScale}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Random Arpeggio Practice');
              }}>
              {translate('Arpeggios')}
            </HeaderButton>
          ),
          title: translate('Random Scale Practice'),
        }}
      />
      <Stack.Screen
        name="Random Arpeggio Practice"
        component={RandomArpeggio}
        options={{
          title: translate('Random Arpeggio Practice'),
        }}
      />
    </Stack.Navigator>
  );
};

export default RandomStack;
