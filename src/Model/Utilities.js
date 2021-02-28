import {Dimensions} from 'react-native';

/**
 * @function getIsSmallScreen
 * @description Checks whether the screen is small by checking it's longest
 * edge's width.
 * @author Alexander Burdiss
 * @since 1/28/21
 * @version 1.0.0
 * @returns {Boolean} A boolean of whether or not the screen is small.
 */
export function getIsSmallScreen() {
  const SMALL_SCREEN_HEIGHT = 675;
  return Dimensions.get('screen').height < SMALL_SCREEN_HEIGHT;
}
