import React, { useContext } from 'react';
import { useDarkMode } from '../utils';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import AdvancedScale from '../Screens/Advanced/Advanced';

import { HeaderButton } from '../Components';
import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';
import { PreferencesContext } from '../Model/Preferences';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the Advanced tab of the navigation.
 * Created 10/10/20 by Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/15/22
 * @version 1.1.0
 * @param {Object} props JSX props passed to this React Component
 * @param {Object} props.navigation The navigation object provided by React
 * Navigation
 *
 * @example
 * <Tab.Screen
 *   name="Advanced"
 *   component={AdvancedStack}
 *   options={{title: translate('Advanced')}}
 * />
 */
const AdvancedStack = ({ navigation }) => {
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
        name="Advanced Scale Practice"
        component={AdvancedScale}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                const newType =
                  state?.advancedType == PreferencesContext.advancedTypes.SCALE
                    ? PreferencesContext.advancedTypes.ARPEGGIO
                    : PreferencesContext.advancedTypes.SCALE;
                dispatch({
                  type: PreferencesContext.actions.SET_SETTING,
                  payload: { advancedType: newType },
                });
              }}
            >
              {state?.advancedType == PreferencesContext.advancedTypes.SCALE
                ? translate('Arpeggios')
                : translate('Scales')}
            </HeaderButton>
          ),
          title:
            state?.advancedType == PreferencesContext.advancedTypes.SCALE
              ? translate('Advanced Scale Practice')
              : translate('Advanced Arpeggio Practice'),
        }}
      />
    </Stack.Navigator>
  );
};

export default AdvancedStack;
