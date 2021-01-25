import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const translationGetters = {
  en: () => require('./en.json'),
  zh: () => require('./zh.json'),
  fr: () => require('./fr.json'),
};

/**
 * @function translate
 * @description Takes a string, and returns the translated version of that
 * string, if it exists in the configuration file for the language provided.
 * @author Alexander Burdiss
 * @since 12/1/20
 * @version 1.0.1
 * @param {String} key The string to be translated
 * @returns {String} The input string translated into the language the device
 * is currently in.
 */
export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

/**
 * @function setI18nConfig
 * @description Finds the current language the device is in, updates the
 * language in state, and clears the translation cache. This should be called
 * once before the content in App.js loads.
 * @author Alexander Burdiss
 * @since 12/1/20
 * @version 1.0.1
 */
export const setI18nConfig = () => {
  const fallback = {languageTag: 'en'};
  const {languageTag} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  translate.cache.clear();

  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};
