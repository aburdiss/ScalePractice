import { useColorScheme } from 'react-native';

export function useDarkMode() {
  const colorTheme = useColorScheme();
  return colorTheme === 'dark';
}
