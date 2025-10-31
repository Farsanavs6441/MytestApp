import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CountryFlag from 'react-native-country-flag';

const Input = ({
  label,
  placeholder,
  required = false,
  keyboardType = 'default',
  phoneInput = false,
  value,
  onChangeText,
  ...props
}) => {
  if (phoneInput) {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <View style={styles.phoneInputContainer}>
          <View style={styles.flagContainer}>
            <CountryFlag isoCode="us" size={20} />
            <Icon name="chevron-down" size={16} color="#444" />
          </View>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#999"
            style={styles.phoneInput}
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChangeText}
            {...props}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222',
    marginBottom: 6,
  },
  required: {
    color: 'red',
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: '#E4E6EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
    color: '#000',
    backgroundColor: '#ffff',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E6EB',
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000',
  },
});

