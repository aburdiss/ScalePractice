import { useColorScheme } from 'react-native';

/**
 * @function useDarkMode
 * @description A React Hook used to determine if the device is in dark mode
 * or not
 * Created 10/25/22 by Alexander Burdiss
 * @returns {boolean} Whether or not the device is in Dark Mode
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 1.0.1
 */
export function useDarkMode(): boolean {
  const colorTheme = useColorScheme();
  return colorTheme === 'dark';
}
