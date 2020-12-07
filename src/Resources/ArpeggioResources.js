import React from 'react';
import {View, FlatList} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import ListItem from '../Components/ListItem';

import {arpeggioResourceData, colors} from '../Model/Model';

/**
 * @description A view that allows the user to learn about all of the arpeggios
 * in the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const ArpeggioResources = () => {
  const DARKMODE = useDarkMode();

  return (
    <View>
      <FlatList
        data={arpeggioResourceData}
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

export default ArpeggioResources;
