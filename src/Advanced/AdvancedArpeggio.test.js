import 'react-native';
import React from 'react';
import AdvancedArpeggio from './AdvancedArpeggio';
import MockContext from '../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('AdvancedArpeggio renders correctly', () => {
  render(
    <MockContext>
      <AdvancedArpeggio />
    </MockContext>,
  );
});
