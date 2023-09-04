import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import More from '../Screens/More/More';
import Licenses from '../Screens/Licenses/Licenses';
import Acknowledgements from '../Screens/Acknowledgements/Acknowledgements';
import Help from '../Screens/Help/Help';
import Statistics from '../Screens/Statistics/Statistics';

import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the More tab of the navigation.
 * Created 10/10/20
 * @copyright Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/4/23
 * @version 1.0.3
 *
 * @example
 * <Tab.Screen
 *   name="More"
 *   component={MoreStack}
 *   options={{title: translate('More')}}
 * />
 */
export default function MoreStack() {
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
      }}
    >
      <Stack.Screen
        name="More"
        component={More}
        options={{
          title: translate('Settings'),
        }}
      />
      <Stack.Screen
        name="Licenses"
        component={Licenses}
        options={{
          title: translate('Licenses'),
        }}
      />
      <Stack.Screen
        name="Acknowledgements"
        component={Acknowledgements}
        options={{
          title: translate('Acknowledgements'),
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          title: translate('How to use this app'),
        }}
      />
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{
          title: translate('Statistics'),
        }}
      />
    </Stack.Navigator>
  );
}
