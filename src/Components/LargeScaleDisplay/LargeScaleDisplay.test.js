import 'react-native';
import React from 'react';
import LargeScaleDisplay from './LargeScaleDisplay';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('LargeScaleDisplay renders correctly', () => {
  render(
    <MockContext>
      <LargeScaleDisplay />
    </MockContext>,
  );
});
