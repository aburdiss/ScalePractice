import 'react-native';
import React from 'react';
import FlatListItem from './FlatListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('FlatListItem renders correctly', () => {
  render(
    <MockContext>
      <FlatListItem />
    </MockContext>,
  );
});
