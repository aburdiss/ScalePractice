import React from 'react';
import { View, FlatList } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import ListItem from '../../Components/ListItem/ListItem';
import { scaleResourceData, colors } from '../../Model/Model';
import { useIdleScreen } from '../../utils/useIdleScreen/useIdleScreen';

/**
 * @description A view that allows the user to learn more about each scale in
 * the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.1.0
 *
 * @component
 * @example
 * ```jsx
<ScaleResources />
```
 */
const ScaleResources = () => {
  useIdleScreen();

  const DARKMODE = useDarkMode();

  return (
    <View>
      <FlatList
        data={scaleResourceData}
        initialNumToRender={15}
        renderItem={({ item }) => <ListItem data={item} />}
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

export default ScaleResources;
