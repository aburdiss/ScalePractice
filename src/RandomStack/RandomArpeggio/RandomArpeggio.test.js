import 'react-native';
import React from 'react';
import RandomArpeggio from './RandomArpeggio';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('RandomArpeggio renders correctly', () => {
  render(
    <MockContext>
      <RandomArpeggio />
    </MockContext>,
  );
});
