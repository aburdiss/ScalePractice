import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';

import FlatListItem from '../../Components/ListItems/FlatListItem';
import {
  scaleResourceData,
  arpeggioResourceData,
  colors,
} from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { useIdleScreen, useDarkMode } from '../../utils';
import { APP_DATA_TYPES } from '../../enums/appDataTypes';

/**
 * @function Resources
 * @component
 * @description A view that allows the user to learn more about each scale in
 * the app.
 * Created By Alexander Burdiss 10/10/202
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 2.1.1
 *
 * @example
 * <Resources />
 */
export default function Resources() {
  useIdleScreen();

  const DARKMODE = useDarkMode();

  const { state } = useContext(PreferencesContext);
  const isScale = state.resourcesType == APP_DATA_TYPES.SCALE;

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
