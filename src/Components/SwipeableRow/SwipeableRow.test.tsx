import 'react-native';
import React from 'react';
import SwipeableRow from './SwipeableRow';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('SwipeableRow renders correctly', () => {
  render(
    <MockContext>
      <SwipeableRow
        styles={{ rightAction: {}, trashIcon: {} }}
        deleteItem={jest.fn()}
        item={{}}
      />
    </MockContext>,
  );
});
