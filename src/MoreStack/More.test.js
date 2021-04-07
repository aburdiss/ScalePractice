import 'react-native';
import React from 'react';
import More from './More';
import MockContext from '../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('More renders correctly', () => {
  render(
    <MockContext>
      <More />
    </MockContext>,
  );
});
