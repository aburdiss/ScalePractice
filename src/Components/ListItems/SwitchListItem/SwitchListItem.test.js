import 'react-native';
import React from 'react';
import SwitchListItem from './SwitchListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('SwitchListItem renders correctly', () => {
  render(
    <MockContext>
      <SwitchListItem />
    </MockContext>,
  );
});
