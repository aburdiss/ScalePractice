import React from "react";
import { View } from "react-native";
import { SwitchRow, AllScalesButton } from "../../../Components";
import { translate } from "../../../Translations/TranslationModel";
import { getTranslationKeyFromStateKey } from "../../../utils/getTranslationKeyFromStateKey";

/**
 * @function RandomSettings
 * @description Displays the settings for customizing a random scale selection
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.0.0
 * @param props The JSX props passed to this React component
 */
export default function RandomSettings({
  action,
  types,
  randomState,
  dispatchRandomState,
}) {
  const isScale = action == dispatchRandomState.actions.TOGGLE_SCALE;

  return (
    <View style={styles.container}>
      {Object.keys(types).map((type) => {
        return (
          <SwitchRow
            key={type}
            onValueChange={() =>
              dispatchRandomState({
                type: action,
                payload: type,
              })
            }
            value={
              isScale
                ? randomState.scaleOptions[type]
                : randomState.arpeggioOptions[type]
            }
            text={translate(getTranslationKeyFromStateKey(type, isScale))}
          />
        );
      })}
      <View style={styles.allScaleButton}>
        <AllScalesButton
          handler={() =>
            dispatchRandomState({
              type:
                action == dispatchRandomState.actions.TOGGLE_SCALE
                  ? dispatchRandomState.actions.SELECT_ALL_SCALES
                  : dispatchRandomState.actions.SELECT_ALL_ARPEGGIOS,
            })
          }
          accessibilityHint={
            action == dispatchRandomState.actions.TOGGLE_SCALE
              ? translate("Toggles All Scales")
              : translate("Toggles All Arpeggios")
          }
        >
          {action == dispatchRandomState.actions.TOGGLE_SCALE
            ? translate("All Scales")
            : translate("All Arpeggios")}
        </AllScalesButton>
      </View>
    </View>
  );
}

const styles = {
  allScaleButton: {
    paddingHorizontal: 10,
  },
  container: {
    paddingTop: 10,
  },
};
