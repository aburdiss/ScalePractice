import 'react-native';
import React from 'react';
import SwitchRow from './SwitchRow';
import MockContext from '../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('SwitchRow renders correctly', () => {
  render(
    <MockContext>
      <SwitchRow />
    </MockContext>,
  );
});
