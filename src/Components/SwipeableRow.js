import React, {Component} from 'react';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

class SwipeableRow extends Component {
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        style={this.props.styles.rightAction}
        onPress={() => this.props.delete(this.props.item)}
        // TODO: Add Accessibility Label and translate
      >
        <Ionicons
          name="trash"
          size={20}
          style={this.props.styles.trashIcon}
          color={colors.white}
        />
      </RectButton>
    );
  };
  render() {
    const {children} = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={41}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

export default SwipeableRow;
