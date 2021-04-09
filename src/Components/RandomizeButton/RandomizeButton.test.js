import 'react-native';
import React from 'react';
import RandomizeButton from './RandomizeButton';

import {fireEvent, render} from '@testing-library/react-native';

test('RandomizeButton renders correctly', () => {
  const {queryByText} = render(<RandomizeButton handler={jest.fn()} />);
  expect(queryByText(/Randomize/)).toBeTruthy();
});

test('RandomizeButton Function calls correctly', () => {
  const buttonHandler = jest.fn();
  const {getByText} = render(<RandomizeButton handler={buttonHandler} />);
  expect(buttonHandler).not.toHaveBeenCalled();
  fireEvent.press(getByText(/Randomize/));
  expect(buttonHandler).toHaveBeenCalledTimes(1);
  fireEvent.press(getByText(/Randomize/));
  expect(buttonHandler).toHaveBeenCalledTimes(2);
});
