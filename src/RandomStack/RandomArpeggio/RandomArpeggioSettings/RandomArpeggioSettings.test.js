import 'react-native';
import React from 'react';
import RandomArpeggioSettings from './RandomArpeggioSettings';
import MockContext from '../../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('RandomArpeggioSettings renders correctly', () => {
  render(
    <MockContext>
      <RandomArpeggioSettings />
    </MockContext>,
  );
});
