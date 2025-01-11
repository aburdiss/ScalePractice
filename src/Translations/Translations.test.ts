import englishTranslations from './en.json';
import frenchTranslations from './fr.json';
import spanishTranslations from './es.json';
import chineseTranslations from './zh.json';
import japaneseTranslations from './ja.json';
import koreanTranslations from './ko.json';

let englishTranslationList = Object.keys(englishTranslations);

test.each(englishTranslationList)('french translations all exist', (item) => {
  expect(frenchTranslations).toHaveProperty(item);
});

test.each(englishTranslationList)('spanish translations all exist', (item) => {
  expect(spanishTranslations).toHaveProperty(item);
});

test.each(englishTranslationList)('chinese translations all exist', (item) => {
  expect(chineseTranslations).toHaveProperty(item);
});

test.each(englishTranslationList)('korean translations all exist', (item) => {
  expect(koreanTranslations).toHaveProperty(item);
});

test.each(englishTranslationList)('japanese translations all exist', (item) => {
  expect(japaneseTranslations).toHaveProperty(item);
});
