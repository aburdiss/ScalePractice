import 'react-native';
import React from 'react';
import {
  TextListItem,
  LinkListItem,
  InternalListItem,
  SwitchListItem,
} from './MoreListItems';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('TextListItem renders correctly', () => {
  render(
    <MockContext>
      <TextListItem />
    </MockContext>,
  );
});

test('LinkListItem renders correctly', () => {
  render(
    <MockContext>
      <LinkListItem />
    </MockContext>,
  );
});

test('InternalListItem renders correctly', () => {
  render(
    <MockContext>
      <InternalListItem />
    </MockContext>,
  );
});

test('SwitchListItem renders correctly', () => {
  render(
    <MockContext>
      <SwitchListItem />
    </MockContext>,
  );
});
