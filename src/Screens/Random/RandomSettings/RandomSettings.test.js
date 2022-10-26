import 'react-native';
import React from 'react';
import RandomSettings from './RandomSettings';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('RandomSettings renders correctly', () => {
  render(
    <MockContext>
      <RandomSettings />
    </MockContext>,
  );
});
