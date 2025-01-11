import 'react-native';
import React from 'react';
import TextListItem from './TextListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('TextListItem renders correctly', () => {
  render(
    <MockContext>
      <TextListItem item={{ value: '' }} />
    </MockContext>,
  );
});
