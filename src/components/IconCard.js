import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../theme,/colors';

const IconCard = ({
  iconName = 'email-outline',
  iconColor = Colors.primaryBlue,
  backgroundColor = '#E8F0FE',
  size = 20,
  containerSize = 40,
  borderRadius = 20,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          width: containerSize,
          height: containerSize,
          borderRadius,
        },
      ]}
    >
      <Icon name={iconName} size={size} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconCard;
