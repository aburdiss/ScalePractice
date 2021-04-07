import 'react-native';
import React from 'react';
import ListItem from './ListItem';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ListItem renders correctly', () => {
  render(
    <MockContext>
      <ListItem />
    </MockContext>,
  );
});
