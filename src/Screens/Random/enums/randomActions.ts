/**
 * @enum {string}
 * @name RANDOM_ACTIONS
 * @memberof Random
 * @description An enum of the different actions available to take in the
 * Random Reducer.
 * Created 1/31/25 by Alexander Burdiss
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/31/25
 * @version 1.0.0
 */
export enum RANDOM_ACTIONS {
  SET_CURRENT_SCALE = 'SET_CURRENT_SCALE',
  TOGGLE_SCALE = 'TOGGLE_SCALE',
  TOGGLE_ARPEGGIO = 'TOGGLE_ARPEGGIO',
  SELECT_ALL_SCALES = 'SELECT_ALL_SCALES',
  SELECT_ALL_ARPEGGIOS = 'SELECT_ALL_ARPEGGIOS',
  GET_NEW_SCALE = 'GET_NEW_SCALE',
  RESET_NO_REPEAT = 'RESET_NO_REPEAT',
  TOGGLE_SELECTION_POPOVER = 'TOGGLE_SELECTION_POPOVER',
  SWITCH_DOMAIN = 'SWITCH_DOMAIN',
  SET_STATE_FROM_STORAGE = 'SET_STATE_FROM_STORAGE',
}
