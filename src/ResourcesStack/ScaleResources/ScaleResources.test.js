import 'react-native';
import React from 'react';
import ScaleResources from './ScaleResources';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('ScaleResources renders correctly', () => {
  render(
    <MockContext>
      <ScaleResources />
    </MockContext>,
  );
});
