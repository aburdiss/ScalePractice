import 'react-native';
import React from 'react';
import LicensesListItem from './LicensesListItem';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('LicensesListItem renders correctly', () => {
  render(
    <MockContext>
      <LicensesListItem />
    </MockContext>,
  );
});
