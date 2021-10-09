import React from 'react';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A swipeable row with a right action.
 * @author Alexander Burdiss
 * @since 11/7/2020
 * @version 2.0.0
 * 
 * @component
 * @example
 * ```jsx
<SwipeableRow styles={styles} delete={deleteElement} item={item}>
  {..}
</SwipeableRow>
```
 */
const SwipeableRow = ({ children, styles, deleteItem, item }) => {
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => deleteItem(item)}
        accessibilityRole="button"
        accessibilityLabel={translate('Delete')}
      >
        <Ionicons
          name="trash"
          size={20}
          style={styles.trashIcon}
          color={colors.white}
        />
      </RectButton>
    );
  };

  return (
    <Swipeable
      friction={2}
      leftThreshold={80}
      rightThreshold={41}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableRow;
