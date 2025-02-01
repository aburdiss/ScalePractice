import { random } from '../random/random';

/**
 * @function shuffle
 * @description Shuffles an array of anything passed in.
 * Created February 3, 2022 by Alexander Burdiss to replace underscore
 * dependency
 * @param {any[]} input An array of anything (and any length)
 * @returns {any[]} The same array, but shuffled.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/2025
 * @version 1.1.0
 */
export function shuffle(input: any[]) {
  const array = [...input];
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = random(0, i + 1);

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
