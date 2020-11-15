import React from 'react';
import { View, Text, FlatList } from 'react-native';

import  ListItem  from '../Components/ListItem';

import { scaleResourceData } from '../Model';


/**
 * @description A view that allows the user to learn more about each scale in
 * the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const ScaleResources = () => {
  return (
    <View>
      <FlatList
        data={scaleResourceData}
        initialNumToRender={15}
        renderItem={({item}) => <ListItem data={item} />}
        keyExtractor={item => item.id.toString()}
        />
    </View>
  );
};

export default ScaleResources;
