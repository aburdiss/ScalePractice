import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import Random from '../Screens/Random';
import { HeaderButton } from '../Components';
import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';
import { PreferencesContext } from '../Model/Preferences';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the Random Tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.0.1
 * @param {Object} props JSX Props passed to this React Component
 * @param {Object} props.navigation The navigation object provided by React
 * Navigation
 *
 * @example
 * <Tab.Screen
 *   name="Random"
 *   component={RandomStack}
 *   options={{title: translate('Random')}}
 * />
 */
const RandomStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();

  const { state, dispatch } = useContext(PreferencesContext);

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
        name="Random Scale Practice"
        component={Random}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                const newType =
                  state?.randomType == PreferencesContext.randomTypes.SCALE
                    ? PreferencesContext.randomTypes.ARPEGGIO
                    : PreferencesContext.randomTypes.SCALE;
                dispatch({
                  type: PreferencesContext.actions.SET_SETTING,
                  payload: { randomType: newType },
                });
              }}
            >
              {state?.randomType == PreferencesContext.randomTypes.SCALE
                ? translate('Arpeggios')
                : translate('Scales')}
            </HeaderButton>
          ),
          title:
            state?.randomType == PreferencesContext.randomTypes.SCALE
              ? translate('Random Scale Practice')
              : translate('Random Arpeggio Practice'),
        }}
      />
    </Stack.Navigator>
  );
};

export default RandomStack;
