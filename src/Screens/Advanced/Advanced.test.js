import 'react-native';
import React from 'react';
import Advanced from './Advanced';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('Advanced renders correctly', () => {
  render(
    <MockContext>
      <Advanced />
    </MockContext>,
  );
});
