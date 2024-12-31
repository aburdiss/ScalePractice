import 'react-native';
import React from 'react';
import AddToListButton from './AddToListButton';

import { fireEvent, render } from '@testing-library/react-native';

test('AddToListButton renders correctly', () => {
  const { queryByText } = render(<AddToListButton handler={jest.fn()} />);
  expect(queryByText(/Add/)).toBeTruthy();
});

test('AddToListButton handles click correctly', () => {
  const buttonHandler = jest.fn();
  const { getByText } = render(<AddToListButton handler={buttonHandler} />);
  expect(buttonHandler).not.toHaveBeenCalled();
  fireEvent.press(getByText(/Add/));
  expect(buttonHandler).toHaveBeenCalledTimes(1);
  fireEvent.press(getByText(/Add/));
  expect(buttonHandler).toHaveBeenCalledTimes(2);
});
