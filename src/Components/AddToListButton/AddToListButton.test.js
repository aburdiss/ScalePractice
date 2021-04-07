import 'react-native';
import React from 'react';
import AddToListButton from './AddToListButton';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('AddToListButton renders correctly', () => {
  render(
    <MockContext>
      <AddToListButton />
    </MockContext>,
  );
});
