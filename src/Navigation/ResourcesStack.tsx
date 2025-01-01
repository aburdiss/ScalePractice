import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import ScaleResources from '../Screens/Resources/Resources';
import ScaleDetail from '../Screens/ScaleDetail/ScaleDetail';
import { HeaderButton } from '../Components';
import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';
import { PreferencesContext } from '../Model/Preferences';

export type ResourcesStackParamList = {
  'Scale Resources': undefined;
  'Scale Detail': { name: string } | undefined;
};

const Stack = createStackNavigator<ResourcesStackParamList>();

/**
 * @description The stack of screens for the resources tab of the navigation.
 * Created 10/10/20
 * @copyright Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/25/22
 * @version 1.0.2
 *
 * @example
 * <Tab.Screen
 *   name="Resources"
 *   component={ResourcesStack}
 *   options={{title: translate('Resources')}}
 * />
 */
export default function ResourcesStack() {
  const DARKMODE = useDarkMode();

  const { state, dispatch } = useContext(PreferencesContext);
  const isScale =
    state?.resourcesType == PreferencesContext.resourcesTypes.SCALE;
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
          headerRight: getHeaderRight(isScale, dispatch),
          title: isScale
            ? translate('Scale Resources')
            : translate('Arpeggio Resources'),
        }}
      />
      <Stack.Screen
        name="Scale Detail"
        component={ScaleDetail}
        options={({ route }) => ({
          title: translate(route.params?.name),
        })}
      />
    </Stack.Navigator>
  );
}

function getHeaderRight(isScale: boolean, dispatch: Function) {
  return () => (
    <HeaderButton
      handler={() => {
        const newType = isScale
          ? PreferencesContext.resourcesTypes.ARPEGGIO
          : PreferencesContext.resourcesTypes.SCALE;
        dispatch({
          type: PreferencesContext.actions.SET_SETTING,
          payload: { resourcesType: newType },
        });
      }}
    >
      {isScale ? translate('Arpeggios') : translate('Scales')}
    </HeaderButton>
  );
}
