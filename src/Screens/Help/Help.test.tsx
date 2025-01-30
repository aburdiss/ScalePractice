import 'react-native';
import React from 'react';
import Help from './Help';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('Help renders correctly', () => {
  render(
    <MockContext>
      <Help />
    </MockContext>,
  );
});
