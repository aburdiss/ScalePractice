import { translate } from '../../../../Translations/TranslationModel';

/**
 * @function formatStatisticsDataForList
 * @description Formats the data from the style it is saved in the phone
 * to a style that can be displayed on the Statistics Section List.
 * @param {Object} data One of the statistics data, either Scales or values.
 * @returns {Object[]} An array of data to pass to a section list section.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/4/23
 * @version 1.0.0
 * @example
 * formatStatisticsDataForList(statistics.scales)
 */
export function formatStatisticsDataForList(data: { [key: string]: number }) {
  if (Object.keys(data).length === 0) {
    return [{ id: '0', value: translate('Nothing Practiced Yet!') }];
  }

  return Object.keys(data).map((item) => {
    const value = data[item];
    return {
      id: item,
      value: item + ': ' + value,
    };
  });
}
