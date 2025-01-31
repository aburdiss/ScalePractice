import React, { useContext } from 'react';
import { useDarkMode } from '../utils';
import { createStackNavigator } from '@react-navigation/stack';

import AdvancedScale from '../Screens/Advanced/Advanced';

import HeaderButton from '../Components/HeaderButton';

import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';
import { PreferencesContext, preferencesActions } from '../Model/Preferences';
import { APP_DATA_TYPES } from '../enums/appDataTypes';

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

  const isScale = state?.advancedType == APP_DATA_TYPES.SCALE;

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
          ? APP_DATA_TYPES.ARPEGGIO
          : APP_DATA_TYPES.SCALE;
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
