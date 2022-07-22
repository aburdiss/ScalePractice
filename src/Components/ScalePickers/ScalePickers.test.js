import 'react-native';
import React from 'react';
import AndroidScalePickers from './ScalePickers.android';
import IosScalePickers from './ScalePickers.ios';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('AndroidScalePickers renders correctly', () => {
  render(
    <MockContext>
      <AndroidScalePickers />
    </MockContext>,
  );
});

test('IosScalePickers renders correctly', () => {
  render(
    <MockContext>
      <IosScalePickers />
    </MockContext>,
  );
});
