import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from 'react-native-dynamic';

import ScaleResources from './ScaleResources/ScaleResources';
import ArpeggioResources from './ArpeggioResources/ArpeggioResources';
import ScaleDetail from './ScaleDetail/ScaleDetail';
import { HeaderButton } from '../Components';
import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the resources tab of the navigation.
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
  name="Resources"
  component={ResourcesStack}
  options={{title: translate('Resources')}}
/>
```
 */
const ResourcesStack = ({ navigation }) => {
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
        name="Scale Resources"
        component={ScaleResources}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Arpeggio Resources');
              }}
            >
              {translate('Arpeggios')}
            </HeaderButton>
          ),
          title: translate('Scale Resources'),
        }}
      />
      <Stack.Screen
        name="Arpeggio Resources"
        component={ArpeggioResources}
        options={{
          title: translate('Arpeggio Resources'),
        }}
      />
      <Stack.Screen
        name="Scale Detail"
        component={ScaleDetail}
        options={({ route }) => ({
          title: translate(route.params.name),
        })}
      />
    </Stack.Navigator>
  );
};

export default ResourcesStack;
