import 'react-native';
import React from 'react';
import ResetButton from './ResetButton';

import {fireEvent, render} from '@testing-library/react-native';

test('ResetButton renders correctly', () => {
  const {queryByText} = render(<ResetButton handler={jest.fn()} />);
  expect(queryByText(/Reset/)).toBeTruthy();
});

test('ResetButton Function calls correctly', () => {
  const buttonHandler = jest.fn();
  const {getByText} = render(<ResetButton handler={buttonHandler} />);
  expect(buttonHandler).not.toHaveBeenCalled();
  fireEvent.press(getByText(/Reset/));
  expect(buttonHandler).toHaveBeenCalledTimes(1);
  fireEvent.press(getByText(/Reset/));
  expect(buttonHandler).toHaveBeenCalledTimes(2);
});
