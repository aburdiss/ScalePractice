import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const RandomizeButton = ({ handler }) => {
  return (
    <Pressable
      android_ripple={{color: 'purple'}}
      onPress={ handler }
      style={ styles.button }
    >
      <Text
        style={ styles.text }
      >
        Randomize
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderColor: 'purple',
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: 'purple',
    fontSize: 24,
  },
});

export default RandomizeButton;