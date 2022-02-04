import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from 'react-native-dynamic';
import * as RNLocalize from 'react-native-localize';

import { setI18nConfig, translate } from './src/Translations/TranslationModel';
import { colors } from './src/Model/Model';
import { PreferencesProvider } from './src/Model/Preferences';

import RandomStack from './src/RandomStack/RandomStack';
import ResourcesStack from './src/ResourcesStack/ResourcesStack';
import AdvancedStack from './src/AdvancedStack/AdvancedStack';
import MoreStack from './src/MoreStack/MoreStack';

const Tab = createBottomTabNavigator();

setI18nConfig();
/**
 * @description The main tab navigation of the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.0.1
 *
 * @component
 * @example
 * <App />
 */
const App = () => {
  const DARKMODE = useDarkMode();

  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <PreferencesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Random') {
                iconName = 'md-cube';
              } else if (route.name === 'Resources') {
                iconName = 'md-book';
              } else if (route.name === 'Advanced') {
                iconName = 'md-create';
              } else if (route.name === 'More') {
                iconName = 'md-settings';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
            inactiveTintColor: colors.systemGray,
            style: {
              backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
              borderTopColor: DARKMODE
                ? colors.systemGray5Dark
                : colors.systemGray5Light,
            },
          }}
        >
          <Tab.Screen
            name="Random"
            component={RandomStack}
            options={{ title: translate('Random') }}
          />
          <Tab.Screen
            name="Resources"
            component={ResourcesStack}
            options={{ title: translate('Resources') }}
          />
          <Tab.Screen
            name="Advanced"
            component={AdvancedStack}
            options={{ title: translate('Advanced') }}
          />
          <Tab.Screen
            name="More"
            component={MoreStack}
            options={{ title: translate('Settings') }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PreferencesProvider>
  );
};

export default App;
