import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDarkMode, getTabBarIcon } from './src/utils';
import * as RNLocalize from 'react-native-localize';

import { setI18nConfig, translate } from './src/Translations/TranslationModel';
import { colors } from './src/Model/Model';
import { PreferencesProvider } from './src/Model/Preferences';
import { StatisticseProvider } from './src/Model/Statistics';

import RandomStack from './src/Navigation/RandomStack';
import ResourcesStack from './src/Navigation/ResourcesStack';
import AdvancedStack from './src/Navigation/AdvancedStack';
import MoreStack from './src/Navigation/MoreStack';

const Tab = createBottomTabNavigator();

setI18nConfig();

/**
 * @function App
 * @description The main component for the App.
 * Created 10/10/20
 * @returns {JSX.Element} JSX render instructions.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 1.0.2
 *
 * @example
 * <App />
 */
export default function App() {
  const DARKMODE = useDarkMode();

  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  return (
    <StatisticseProvider>
      <PreferencesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: getTabBarIcon(route),
              tabBarActiveTintColor: DARKMODE
                ? colors.purpleDark
                : colors.purpleLight,
              tabBarInactiveTintColor: colors.systemGray,
              tabBarStyle: {
                backgroundColor: DARKMODE
                  ? colors.systemGray6Dark
                  : colors.white,
                borderTopColor: DARKMODE
                  ? colors.systemGray5Dark
                  : colors.systemGray5Light,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen
              name="RandomStack"
              component={RandomStack}
              options={{ title: translate('Random') }}
            />
            <Tab.Screen
              name="ResourcesStack"
              component={ResourcesStack}
              options={{ title: translate('Resources') }}
            />
            <Tab.Screen
              name="AdvancedStack"
              component={AdvancedStack}
              options={{ title: translate('Advanced') }}
            />
            <Tab.Screen
              name="MoreStack"
              component={MoreStack}
              options={{ title: translate('Settings') }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PreferencesProvider>
    </StatisticseProvider>
  );
}
