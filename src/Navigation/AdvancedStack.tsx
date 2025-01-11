import React, { useContext } from 'react';
import { useDarkMode } from '../utils';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import AdvancedScale from '../Screens/Advanced/Advanced';

import { HeaderButton } from '../Components';
import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';
import {
  PreferencesContext,
  preferencesAdvancedTypes,
  preferencesActions,
} from '../Model/Preferences';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the Advanced tab of the navigation.
 * Created 10/10/20 by Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/25/22
 * @version 1.1.1
 *
 * @example
 * <Tab.Screen
 *   name="Advanced"
 *   component={AdvancedStack}
 *   options={{title: translate('Advanced')}}
 * />
 */
export default function AdvancedStack() {
  const DARKMODE = useDarkMode();

  const { state, dispatch } = useContext(PreferencesContext);

  const isScale = state?.advancedType == preferencesAdvancedTypes.SCALE;

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
          headerRight: getHeaderRight(isScale, dispatch),
          title: isScale
            ? translate('Advanced Scale Practice')
            : translate('Advanced Arpeggio Practice'),
        }}
      />
    </Stack.Navigator>
  );
}

function getHeaderRight(isScale: boolean, dispatch: Function) {
  return () => (
    <HeaderButton
      handler={() => {
        const newType = isScale
          ? preferencesAdvancedTypes.ARPEGGIO
          : preferencesAdvancedTypes.SCALE;
        dispatch({
          type: preferencesActions.SET_SETTING,
          payload: { advancedType: newType },
        });
      }}
    >
      {isScale ? translate('Arpeggios') : translate('Scales')}
    </HeaderButton>
  );
}
