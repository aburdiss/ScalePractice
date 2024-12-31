import { useColorScheme } from 'react-native';

export function useDarkMode(): boolean {
  const colorTheme = useColorScheme();
  return colorTheme === 'dark';
}
