import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import Random from '../Screens/Random';
import HeaderButton from '../Components/HeaderButton';
import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';
import {
  PreferencesContext,
  preferencesActions,
  preferencesRandomTypes,
} from '../Model/Preferences';

const Stack = createStackNavigator();

/**
 * @description The stack of screens for the Random Tab of the navigation.
 * Created 10/10/20
 * @copyright Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/25/22
 * @version 1.0.2
 *
 * @example
 * <Tab.Screen
 *   name="Random"
 *   component={RandomStack}
 *   options={{title: translate('Random')}}
 * />
 */
export default function RandomStack() {
  const DARKMODE = useDarkMode();

  const { state, dispatch } = useContext(PreferencesContext);

  const isScale = state?.randomType == preferencesRandomTypes.SCALE;

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
          headerRight: getHeaderRight(isScale, dispatch),
          title: isScale
            ? translate('Random Scale Practice')
            : translate('Random Arpeggio Practice'),
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
          ? preferencesRandomTypes.ARPEGGIO
          : preferencesRandomTypes.SCALE;
        dispatch({
          type: preferencesActions.SET_SETTING,
          payload: { randomType: newType },
        });
      }}
    >
      {isScale ? translate('Arpeggios') : translate('Scales')}
    </HeaderButton>
  );
}
