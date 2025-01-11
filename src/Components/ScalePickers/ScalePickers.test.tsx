import 'react-native';
import React from 'react';
import AndroidScalePickers from './ScalePickers.android';
import IosScalePickers from './ScalePickers.ios';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('AndroidScalePickers renders correctly', () => {
  render(
    <MockContext>
      <AndroidScalePickers
        selectedNote=""
        setSelectedNote={jest.fn()}
        noteNames={[]}
        selectedScale=""
        setSelectedScale={jest.fn()}
        scaleNames={[]}
      />
    </MockContext>,
  );
});

test('IosScalePickers renders correctly', () => {
  render(
    <MockContext>
      <IosScalePickers
        selectedNote=""
        setSelectedNote={jest.fn()}
        noteNames={[]}
        selectedScale=""
        setSelectedScale={jest.fn()}
        scaleNames={[]}
      />
    </MockContext>,
  );
});
