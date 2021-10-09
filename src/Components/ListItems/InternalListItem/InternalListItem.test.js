import 'react-native';
import React from 'react';
import InternalListItem from './InternalListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('InternalListItem renders correctly', () => {
  render(
    <MockContext>
      <InternalListItem />
    </MockContext>,
  );
});
