import { useEffect, useContext } from 'react';
import IdleTimerManager from 'react-native-idle-timer';

import { PreferencesContext } from '../../Model/Preferences';

/**
 * @function useIdleScreen
 * @description Turns the screen timer off or on, depending on what the user
 * has selected in preferences. If the user has no preference set, this will
 * default to false, not adjusting the screen timer settings.
 * Created by Alexander Burdiss 7/6/21
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 1.0.1
 * @example
 * function Component() {
 *   useIdleScreen();
 *   return <View />;
 * }
 */
export function useIdleScreen() {
  const { state } = useContext(PreferencesContext);

  useEffect(
    function setupIdleScreenPreferences() {
      if (state?.disableScreenSleep) {
        IdleTimerManager.setIdleTimerDisabled(true);
      } else {
        IdleTimerManager.setIdleTimerDisabled(false);
      }

      return () => {
        IdleTimerManager.setIdleTimerDisabled(false);
      };
    },
    [state?.disableScreenSleep],
  );
}
