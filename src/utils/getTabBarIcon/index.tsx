import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * @function getTabBarIcon
 * @description A function that gets the Tab Bar Icon from the passed in route
 * object.
 * @param {Object} route The route object to get the correct tab bar Icon from.
 * @returns {React.Component} A react component ready to be rendered.
 *
 * @copyright 2025 Alexander Burdiss
 * @since 2/1/25
 * @version 1.0.0
 * @example
 * function Component() {
 *   const Icon = getTabBarIcon(route);
 *   return (
 *     <View>
 *       <Icon color='black' size={20} />
 *     </View>
 *   )
 * }
 */
export function getTabBarIcon(route: { name: string }) {
  function Icon({ color, size }: { color: string; size: number }) {
    let iconName: string = '';
    if (route.name === 'RandomStack') {
      iconName = 'cube';
    } else if (route.name === 'ResourcesStack') {
      iconName = 'book';
    } else if (route.name === 'AdvancedStack') {
      iconName = 'create';
    } else if (route.name === 'MoreStack') {
      iconName = 'ellipsis-horizontal-circle-sharp';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  }
  Icon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
  };
  return Icon;
}
