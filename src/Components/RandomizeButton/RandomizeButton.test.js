import 'react-native';
import React from 'react';
import RandomizeButton from './RandomizeButton';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('RandomizeButton renders correctly', () => {
  render(
    <MockContext>
      <RandomizeButton />
    </MockContext>,
  );
});
