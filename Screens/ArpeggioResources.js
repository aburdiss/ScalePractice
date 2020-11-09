import React from 'react';
import { View, Text, FlatList } from 'react-native';

import  ListItem  from '../Components/ListItem';

import { arpeggioResourceData } from './Model';


/**
 * @description A view that allows the user to learn about all of the arpeggios
 * in the app. 
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const ArpeggioResources = () => {
  return (
    <View>
      <FlatList
        data={arpeggioResourceData}
        renderItem={({item}) => <ListItem data={item} />}
        keyExtractor={item => item.id.toString()}
        />
    </View>
  );
};

export default ArpeggioResources;


