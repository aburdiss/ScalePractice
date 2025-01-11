import 'react-native';
import React from 'react';
import ScaleDetail from './ScaleDetail';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('ScaleDetail renders correctly', () => {
  render(
    <MockContext>
      <ScaleDetail
        route={{
          params: {
            name: '',
            id: 0,
            construction: '',
            solfege: '',
            numerals: '',
            description: '',
          },
        }}
      />
    </MockContext>,
  );
});
