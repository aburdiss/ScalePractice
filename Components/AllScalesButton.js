import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';


/**
 * @description A gray button that is meant to trigger all switches on a page. 
 * Basic styles are already applied.
 * @author Alexander Burdiss
 * @since 10/12/20
 */
const AllScalesButton = ({ children, handler }) => {
  return (
    <Pressable
      android_ripple={{color: 'gray'}}
      onPress={ handler }
      style={ styles.button }
    >
      <Text
        style={ styles.text }
      >
        { children }
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});

export default AllScalesButton;