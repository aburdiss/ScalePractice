#!/bin/bash
# generateComponent.sh
# Author: Alexander Burdiss
# Since: 9/7/21
# Version: 1.0.0
# Description: Generates a React component and all the necessary files that go
# along with it.

path=$1
component=$2
date=`date +"%D"`

if [[ ! -d "src/$path" ]]; then
  echo
  echo "Directory src/$path Doesn't exist!"
  echo
  exit 1
elif [[ -d "src/$path/$component" ]]; then
  echo
  echo "Component src/$path/$component Already exists!"
  echo
  exit 1
fi

mkdir "src/$path/$component"

# Make JS File
echo "import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 * @namespace $component
 * @function $component
 * @author Alexander Burdiss
 * @since $date
 * @version 1.0.0
 * @component
 */
export default function $component() {
  return (
    <View style={styles.container}>
      <Text>$component Works!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});" > "src/$path/$component/$component.js"

# Make Jest test file
echo "import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import $component from './$component';

describe('renders $component', () => {
  test('renders base component', () => {
    render(<$component />);
  });
});" > "src/$path/$component/$component.test.js"

echo
echo "Component src/$path/$component Created Successfuly!"
echo
exit 0
