import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

const translationGetters: { [key: string]: Function } = {
  en: () => require('./en.json'),
  zh: () => require('./zh.json'),
  fr: () => require('./fr.json'),
  ja: () => require('./ja.json'),
  ko: () => require('./ko.json'),
  es: () => require('./es.json'),
};

const translationMemo: { [key: string]: string } = {};

/**
 * @function translate
 * @description Takes a string, and returns the translated version of that
 * string, if it exists in the configuration file for the language provided.
 * @author Alexander Burdiss
 * @since 1/18/25
 * @version 2.0.0
 * @param {string} key The string to be translated
 * @returns {string} The input string translated into the language the device
 * is currently in.
 */
export function translate(key?: string): string {
  if (!key) {
    return '';
  }
  const savedTranslation = translationMemo[key];
  if (savedTranslation) {
    return savedTranslation;
  }
  const translation = i18n.t(key);
  translationMemo[key] = translation;
  return translation;
}

/**
 * @function setI18nConfig
 * @description Finds the current language the device is in, updates the
 * language in state, and clears the translation cache. This should be called
 * once before the content in App.js loads.
 * @returns {Promise}
 * @author Alexander Burdiss
 * @since 12/1/20
 * @version 1.0.1
 */
export const setI18nConfig = () => {
  const fallback = { languageTag: 'en' };
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // Clear out memoized translations
  for (var variableKey in translationMemo) {
    if (Object.prototype.hasOwnProperty.call(translationMemo, variableKey)) {
      delete translationMemo[variableKey];
    }
  }

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
