import { useEffect, useContext } from 'react';
import IdleTimerManager from 'react-native-idle-timer';

import { PreferencesContext } from '../../Model/Preferences';

export function useIdleScreen() {
  const { state } = useContext(PreferencesContext);

  useEffect(
    /**
     * @function RandomScale~useEffect~setupIdleScreenPreferences
     * @description Turns the screen timer off or on, depending on what the user
     * has selected in preferences. If the user has no preference set, this will
     * default to false, not adjusting the screen timer settings.
     * @author Alexander Burdiss
     * @since 7/6/21
     * @version 1.0.0
     * @returns {Function} A function to reset this screen settings if the idle
     * timer was disabled when navigating here.
     */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.disableScreenSleep],
  );
}
