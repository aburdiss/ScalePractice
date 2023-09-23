import React from 'react';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function SwipeableRow
 * @component
 * @description A swipeable row with a right action.
 * Created 11/7/2020
 * @param {Object} props JSX props passed to this React component
 * @param {*} props.children The children to render in this row
 * @param {Object} props.styles additional styles to add to this component
 * @param {Function} props.deleteItem A function to call to delete this item
 * @param {Object} props.item The item data
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 2.0.0
 *
 * @example
 * <SwipeableRow styles={styles} delete={deleteElement} item={item}>
 *   {..}
 * </SwipeableRow>
 */
const SwipeableRow = ({ children, styles, deleteItem, item }) => {
  const renderRightActions = (progress, dragX) => {
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
