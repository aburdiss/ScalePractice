import 'react-native';
import React from 'react';
import HeaderButton from './HeaderButton';

import {fireEvent, render} from '@testing-library/react-native';

test('HeaderButton renders correctly', () => {
  const {queryByText} = render(
    <HeaderButton handler={jest.fn()}>Scales</HeaderButton>,
  );
  expect(queryByText(/Scales/)).toBeTruthy();
});

test('HeaderButton function calls correctly on press', () => {
  const buttonHandler = jest.fn();
  const {getByText} = render(
    <HeaderButton handler={buttonHandler}>Arpeggios</HeaderButton>,
  );
  expect(buttonHandler).not.toHaveBeenCalled();
  fireEvent.press(getByText(/Arpeggios/));
  expect(buttonHandler).toHaveBeenCalledTimes(1);
  fireEvent.press(getByText(/Arpeggios/));
  expect(buttonHandler).toHaveBeenCalledTimes(2);
});
