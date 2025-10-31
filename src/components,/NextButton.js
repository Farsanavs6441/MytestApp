import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NextButton = ({ onPress }) => {
  return (
 <TouchableOpacity
      style={styles.nextButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Outer blue ring */}
      <View style={styles.outerCircle}>
        {/* Middle white circle */}
        <View style={styles.middleCircle}>
          {/* Inner blue circle */}
          <View style={styles.innerCircle} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NextButton;

const styles = StyleSheet.create({
nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
 outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#007AFF', // outer blue outline
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff', // white middle circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF', // solid blue inner circle
  },
});
