import React from 'react';
import {View, FlatList} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import ListItem from '../Components/ListItem';

import {scaleResourceData, colors} from '../Model/Model';

/**
 * @description A view that allows the user to learn more about each scale in
 * the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const ScaleResources = () => {
  const DARKMODE = useDarkMode();

  return (
    <View>
      <FlatList
        data={scaleResourceData}
        initialNumToRender={15}
        renderItem={({item}) => <ListItem data={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={{
          height: '100%',
          backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
        }}
      />
    </View>
  );
};

export default ScaleResources;
