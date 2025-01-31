/**
 * @name RandomStateType
 * @type
 * @memberof Random
 * @description The Type information for the Object stored in the Random Screen
 * Reducer.
 * Created 1/31/25 by Alexander Burdiss
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/31/25
 * @version 1.0.0
 */
export type RandomStateType = {
  currentScale: string;
  scaleArray: string[];
  scaleArrayIndex: number;
  showSelectionPopover: boolean;
  allScalesPracticed: boolean;
  scaleOptions: {
    [key: string]: boolean;
  };
  arpeggioOptions: {
    [key: string]: boolean;
  };
};
