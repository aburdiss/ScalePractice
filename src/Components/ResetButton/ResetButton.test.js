import 'react-native';
import React from 'react';
import ResetButton from './ResetButton';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ResetButton renders correctly', () => {
  render(
    <MockContext>
      <ResetButton />
    </MockContext>,
  );
});
