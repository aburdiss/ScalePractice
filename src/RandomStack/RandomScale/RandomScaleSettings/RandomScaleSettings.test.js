import 'react-native';
import React from 'react';
import RandomScaleSettings from './RandomScaleSettings';
import MockContext from '../../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('RandomScaleSettings renders correctly', () => {
  render(
    <MockContext>
      <RandomScaleSettings />
    </MockContext>,
  );
});
