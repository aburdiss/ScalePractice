import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from './src/utils';
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
 * @description The main tab navigation of the app.
 * Created 10/10/20
 * @copyright Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/25/22
 * @version 1.0.1
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
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        console.error(error);
      });
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

function getTabBarIcon(route) {
  function Icon({ color, size }) {
    let iconName;
    if (route.name === 'RandomStack') {
      iconName = 'cube';
    } else if (route.name === 'ResourcesStack') {
      iconName = 'book';
    } else if (route.name === 'AdvancedStack') {
      iconName = 'create';
    } else if (route.name === 'MoreStack') {
      iconName = 'ellipsis-horizontal-circle-sharp';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  }
  Icon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
  };
  return Icon;
}
