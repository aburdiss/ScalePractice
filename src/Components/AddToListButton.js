import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const AddToListButton = ({ handler }) => {
  return (
    <View>
      <Pressable
        android_ripple={{color: 'green'}}
        style={styles.button}
        onPress={handler}
      >
        <Text style={styles.text}>Add to List</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderColor: 'green',
    borderWidth: 1,
    margin: 10,
    padding: 14,
  },
  text: {
    textAlign: 'center',
    color: 'green',
  },
});

export default AddToListButton;
