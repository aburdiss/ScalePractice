import 'react-native';
import React from 'react';
import AllScalesButton from './AllScalesButton';
import MockContext from '../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('AllScalesButton renders correctly', () => {
  render(
    <MockContext>
      <AllScalesButton />
    </MockContext>,
  );
});
