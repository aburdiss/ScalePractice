import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image'
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic'

import { colors } from '../Model';

const { width } = Dimensions.get("window");



const ScaleDetail = ({ route }) => {
  const styles = useDynamicValue(dynamicStyles);

  let path;
  switch(route.params.id) {
    case 0:
      path = require('../../img/scales/0.png');
      break;
    case 1:
      path = require('../../img/scales/1.png');
      break;
    case 2:
      path = require('../../img/scales/2.png');
      break;
    case 3:
      path = require('../../img/scales/3.png');
      break;
    case 4:
      path = require('../../img/scales/4.png');
      break;
    case 5:
      path = require('../../img/scales/5.png');
      break;
    case 6:
      path = require('../../img/scales/6.png');
      break;
    case 7:
      path = require('../../img/scales/7.png');
      break;
    case 8:
      path = require('../../img/scales/8.png');
      break;
    case 9:
      path = require('../../img/scales/9.png');
      break;
    case 10:
      path = require('../../img/scales/10.png');
      break;
    case 11:
      path = require('../../img/scales/11.png');
      break;
    case 12:
      path = require('../../img/scales/12.png');
      break;
    case 13:
      path = require('../../img/scales/13.png');
      break;
    case 14:
      path = require('../../img/scales/14.png');
      break;
    case 15:
      path = require('../../img/scales/15.png');
      break;
    case 16:
      path = require('../../img/scales/16.png');
      break;
    case 17:
      path = require('../../img/scales/17.png');
      break;
    case 18:
      path = require('../../img/scales/18.png');
      break;
    case 19:
      path = require('../../img/scales/19.png');
      break;
    case 20:
      path = require('../../img/scales/20.png');
      break;
    case 21:
      path = require('../../img/scales/21.png');
      break;
    case 22:
      path = require('../../img/scales/22.png');
      break;
    case 23:
      path = require('../../img/scales/23.png');
      break;

    case 24:
      path = require('../../img/arpeggios/24.png');
      break;
    case 25:
      path = require('../../img/arpeggios/25.png');
      break;
    case 26:
      path = require('../../img/arpeggios/26.png');
      break;
    case 27:
      path = require('../../img/arpeggios/27.png');
      break;
    case 28:
      path = require('../../img/arpeggios/28.png');
      break;
    case 29:
      path = require('../../img/arpeggios/29.png');
      break;
    case 30:
      path = require('../../img/arpeggios/30.png');
      break;
    case 31:
      path = require('../../img/arpeggios/31.png');
      break;
    case 32:
      path = require('../../img/arpeggios/32.png');
      break;
    case 33:
      path = require('../../img/arpeggios/33.png');
      break;
    case 34:
      path = require('../../img/arpeggios/34.png');
      break;
    default:
      path = null;
  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={path}
          width={width}
          />
      </View>
      <Text style={styles.construction}>{route.params.construction}</Text>
      <Text style={styles.description}>{route.params.description}</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  construction: {
    textAlign: 'center',
    padding: 10,
    color: new DynamicValue(colors.black, colors.white),
  },
  description: {
    paddingTop: 10,
    paddingHorizontal: 20,
    color: new DynamicValue(colors.black, colors.white),
  },
  image: {
    resizeMode: 'contain',
    //maxWidth: width,
    flex: 1,
  },
  imageContainer: {
    //width: width,
    //overflow: 'hidden',
    //alignItems: 'center',
    //backgroundColor: 'orange',
    //position: 'relative',
    //margin: 5,
  },
  viewContainer: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default ScaleDetail;
