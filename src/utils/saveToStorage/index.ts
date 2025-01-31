import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../enums/storageKeys';

/**
 * @function saveToStorage
 * @description Stores Random reducer Data in Local Storage
 * Created 12/28/24 by Alexander Burdiss
 * @param {string} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/31/25
 * @version 1.0.0
 */
export async function saveToStorage(storageKey: STORAGE_KEYS, data: Object) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.log(e);
  }
}
