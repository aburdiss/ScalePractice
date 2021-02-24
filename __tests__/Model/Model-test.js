import 'react-native';
import React from 'react';

import {
  scaleResourceData,
  arpeggioResourceData,
  getImagePath,
} from '../../src/Model/Model';

test.each(scaleResourceData)('all scale images exist', (item) => {
  expect(getImagePath(item.id)).not.toBe(null);
});

test.each(arpeggioResourceData)('all arpeggio images exist', (item) => {
  expect(getImagePath(item.id)).not.toBe(null);
});
