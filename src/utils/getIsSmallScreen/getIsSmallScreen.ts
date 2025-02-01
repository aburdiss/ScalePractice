import { Dimensions } from 'react-native';

/**
 * @function getIsSmallScreen
 * @description Checks whether the screen is small by checking it's longest
 * edge's width.
 * Created 1/28/21 by Alexander Burdiss
 * @returns {boolean} A boolean of whether or not the screen is small.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 1.0.1
 */
export function getIsSmallScreen(): boolean {
  const SMALL_SCREEN_HEIGHT = 675;
  return Dimensions.get('screen').height < SMALL_SCREEN_HEIGHT;
}
