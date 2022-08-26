import 'react-native';
import React from 'react';
import RandomScale from './RandomScale';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('RandomScale renders correctly', () => {
  render(
    <MockContext>
      <RandomScale />
    </MockContext>,
  );
});
