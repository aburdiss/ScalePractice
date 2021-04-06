import 'react-native';
import React from 'react';
import HeaderButton from './HeaderButton';
import MockContext from '../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('HeaderButton renders correctly', () => {
  render(
    <MockContext>
      <HeaderButton />
    </MockContext>,
  );
});
