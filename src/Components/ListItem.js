import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../Model/Model';
import { translate } from '../Translations/TranslationModel';


/**
 * @description Used as a render item in the ScaleDescription scroll view.
 * @author Alexander Burdiss
 * @since 11/15/20
 */
const ListItem = ({ data }) => {
  const navigation = useNavigation();
  const DARKMODE = useDarkMode();

  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.purpleDark : colors.purpleLight
      }}
      onPress={() => {
        navigation.navigate("Scale Detail", data);
      }}
      style={{
        paddingLeft: 20,
        backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
      }}
    >
      <View 
        style={{
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: DARKMODE ? colors.white : colors.black,
          }}
        >
          { translate(data.name) }
        </Text>
      </View>
    </Pressable>
  );
};

export default ListItem;
