import 'react-native';
import React from 'react';
import Acknowledgements from './Acknowledgements';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('Acknowledgements renders correctly', () => {
  render(
    <MockContext>
      <Acknowledgements />
    </MockContext>,
  );
});
