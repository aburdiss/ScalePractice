import 'react-native';
import React from 'react';
import Random from './Random';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('Random renders correctly', () => {
  render(
    <MockContext>
      <Random />
    </MockContext>,
  );
});
