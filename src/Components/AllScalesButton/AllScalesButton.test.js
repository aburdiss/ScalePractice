import 'react-native';
import React from 'react';
import AllScalesButton from './AllScalesButton';

import {fireEvent, render} from '@testing-library/react-native';

test('AllScalesButton renders correctly', () => {
  const {queryByText} = render(
    <AllScalesButton handler={jest.fn()}>Hello, World!</AllScalesButton>,
  );
  expect(queryByText(/Hello, World!/)).toBeTruthy();
});

test('AllScalesButton calls function correctly', () => {
  const buttonHandler = jest.fn();
  const {getByText} = render(
    <AllScalesButton handler={buttonHandler}>Press Me</AllScalesButton>,
  );
  expect(buttonHandler).not.toHaveBeenCalled();
  fireEvent.press(getByText(/Press Me/));
  expect(buttonHandler).toHaveBeenCalledTimes(1);
  fireEvent.press(getByText(/Press Me/));
  expect(buttonHandler).toHaveBeenCalledTimes(2);
});
