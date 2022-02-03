import { capitalize } from './capitalize';

test('utility is a function', () => {
  expect(typeof capitalize).toEqual('function');
});

describe('capitalize works correctly', () => {
  test('capitalizes first letter of string', () => {
    const input = 'hello, world';
    const output = capitalize(input);
    const expected = 'Hello, world';
    expect(output).toEqual(expected);
  });

  test('leaves capitalization if already capitalized', () => {
    const input = 'Hello, world';
    const output = capitalize(input);
    expect(output).toEqual(input);
  });
});
