import 'react-native';
import React from 'react';
import ArpeggioResources from './ArpeggioResources';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ArpeggioResources renders correctly', () => {
  render(
    <MockContext>
      <ArpeggioResources />
    </MockContext>,
  );
});
