import 'react-native';
import React from 'react';
import RandomSettings from './RandomSettings';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';
import {
  INITIAL_RANDOM_STATE,
  RANDOM_ACTIONS,
} from '../utils/getRandomReducer';

test('RandomSettings renders correctly', () => {
  render(
    <MockContext>
      <RandomSettings
        action={RANDOM_ACTIONS.GET_NEW_SCALE}
        types={{}}
        randomState={INITIAL_RANDOM_STATE}
        dispatchRandomState={jest.fn()}
      />
    </MockContext>,
  );
});
