import 'react-native';
import React from 'react';
import ScaleDisplay from './ScaleDisplay';
import MockContext from '../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ScaleDisplay renders correctly', () => {
  render(
    <MockContext>
      <ScaleDisplay />
    </MockContext>,
  );
});
