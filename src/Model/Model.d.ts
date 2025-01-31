import { APP_DATA_TYPES } from '../enums/appDataTypes';

export type PreferencesStateType = {
  repeat: boolean;
  simpleRandom: boolean;
  disableScreenSleep: boolean;
  randomType: APP_DATA_TYPES;
  resourcesType: APP_DATA_TYPES;
  advancedType: APP_DATA_TYPES;
};
