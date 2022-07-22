import React from 'react';
import { View, FlatList } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { FlatListItem } from '../../Components';
import { arpeggioResourceData, colors } from '../../Model/Model';
import { useIdleScreen } from '../../utils';

/**
 * @description A view that allows the user to learn about all of the arpeggios
 * in the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.0.1
 *
 * @component
 * @example
 * ```jsx
 * <ArpeggioResources />
 * ```
 */
const ArpeggioResources = () => {
  useIdleScreen();

  const DARKMODE = useDarkMode();

  return (
    <View>
      <FlatList
        data={arpeggioResourceData}
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
};

export default ArpeggioResources;
