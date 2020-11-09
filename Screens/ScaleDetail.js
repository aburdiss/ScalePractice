import React from 'react';
import { View, Text } from 'react-native';

const ScaleDetail = ({ route }) => {
  return (
    <View>
      <Text>{route.params.construction}</Text>
      <Text>{route.params.description}</Text>
    </View>
  );
};

export default ScaleDetail;
