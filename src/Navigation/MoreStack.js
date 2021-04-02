import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDarkMode} from 'react-native-dynamic';

import More from '../More/More';
import Licenses from '../More/Licenses';
import {translate} from '../Translations/TranslationModel';
import {colors} from '../Model/Model';
import Acknowledgements from '../More/Acknowledgements';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the More tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.0.1
 * 
 * @component
 * @example
 * ```jsx
<Tab.Screen
  name="More"
  component={MoreStack}
  options={{title: translate('More')}}
/>
```
 */
const MoreStack = () => {
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
    </Stack.Navigator>
  );
};

export default MoreStack;
