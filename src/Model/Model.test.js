import 'react-native';
import React from 'react';

// const fetch = require('node-fetch');
import fetch from 'node-fetch';
// import fetch from 'node-fetch';

import { scaleResourceData, arpeggioResourceData, getImagePath } from './Model';
import { RESOURCES, ABOUT } from './MoreModel';

test.each(scaleResourceData)('all scale images exist', (item) => {
  expect(getImagePath(item.id)).not.toBe(null);
});

test.each(arpeggioResourceData)('all arpeggio images exist', (item) => {
  expect(getImagePath(item.id)).not.toBe(null);
});

describe('links', () => {
  RESOURCES.map(async (resource) => {
    test('resources links', async () => {
      if (resource.type == 'link') {
        const resp = await fetch(resource.link);
        expect(resp.status).toEqual(200);
      }
    });
  });

  ABOUT.map(async (about) => {
    test('about links', async () => {
      if (about.type == 'link' && !about.link.startsWith('mailto')) {
        const resp = await fetch(about.link);
        expect(resp.status).toEqual(200);
      }
    });
  });
});
