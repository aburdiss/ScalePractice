import 'react-native';
import React from 'react';
import LicensesList from './LicensesList';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('LicensesList renders correctly', () => {
  render(
    <MockContext>
      <LicensesList />
    </MockContext>,
  );
});
