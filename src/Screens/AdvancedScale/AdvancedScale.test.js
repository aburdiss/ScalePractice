import 'react-native';
import React from 'react';
import AdvancedScale from './AdvancedScale';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('AdvancedScale renders correctly', () => {
  render(
    <MockContext>
      <AdvancedScale />
    </MockContext>,
  );
});
