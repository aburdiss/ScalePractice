/**
 * @function random
 * @description Returns a random number between the min and max
 * @param {number} min The minimum to find a random number between
 * @param {number} max The maximum to find a random number between
 * @returns {number} A random number between min and max
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 2.0.0
 * @example const randomIndex = random(0, array.length);
 */
export function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
