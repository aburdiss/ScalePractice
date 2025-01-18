import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';

import { FlatListItem } from '../../Components';
import {
  scaleResourceData,
  arpeggioResourceData,
  colors,
} from '../../Model/Model';
import {
  PreferencesContext,
  preferencesResourceTypes,
} from '../../Model/Preferences';
import { useIdleScreen, useDarkMode } from '../../utils';

/**
 * @description A view that allows the user to learn more about each scale in
 * the app.
 * Created By Alexander Burdiss 10/10/202
 * @author Alexander Burdiss
 * @since 10/15/22
 * @version 2.1.0
 *
 * @example
 * <Resources />
 */
export default function Resources() {
  useIdleScreen();

  const DARKMODE = useDarkMode();

  const { state } = useContext(PreferencesContext);
  const isScale = state.resourcesType == preferencesResourceTypes.SCALE;

  return (
    <View>
      <FlatList
        data={isScale ? scaleResourceData : arpeggioResourceData}
        initialNumToRender={15}
        renderItem={({ item }) => <FlatListItem data={item} />}
        keyExtractor={(item) => item.id.toString()}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: '100%',
          backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
        }}
      />
    </View>
  );
}
