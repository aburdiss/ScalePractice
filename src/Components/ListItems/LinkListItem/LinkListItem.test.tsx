import 'react-native';
import React from 'react';
import LinkListItem from './LinkListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('LinkListItem renders correctly', () => {
  render(
    <MockContext>
      <LinkListItem item={{ link: '', value: '' }} />
    </MockContext>,
  );
});
