import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../enums/storageKeys';

/**
 * @function loadFromStorage
 * @description Loads data based on passed in key from local storage
 * Created 12/28/24 by Alexander Burdiss
 * @param {string} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/31/25
 * @version 2.0.0
 */
export async function loadFromStorage(storageKey: STORAGE_KEYS) {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}
