import 'react-native';
import React from 'react';
import Resources from './Resources';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('Resources renders correctly', () => {
  render(
    <MockContext>
      <Resources />
    </MockContext>,
  );
});
