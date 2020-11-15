import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListItem = ({ data }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{color: 'purple'}}
      onPress={() => {
        navigation.navigate("Scale Detail", data);
      }}
      style={styles.button}
    >
      <Text style={styles.text}>{ data.name }</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  text: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    paddingVertical: 15,
  },
})

export default ListItem;
