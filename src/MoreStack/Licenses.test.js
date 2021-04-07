import 'react-native';
import React from 'react';
import Licenses from './Licenses';
import MockContext from '../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('Licenses renders correctly', () => {
  render(
    <MockContext>
      <Licenses />
    </MockContext>,
  );
});
