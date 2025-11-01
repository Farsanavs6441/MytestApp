import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CountryFlag from 'react-native-country-flag';

// Common countries list with ISO codes and dial codes
const COUNTRIES = [
  { code: 'us', dialCode: '+1', name: 'United States' },
  { code: 'gb', dialCode: '+44', name: 'United Kingdom' },
  { code: 'ca', dialCode: '+1', name: 'Canada' },
  { code: 'au', dialCode: '+61', name: 'Australia' },
  { code: 'de', dialCode: '+49', name: 'Germany' },
  { code: 'fr', dialCode: '+33', name: 'France' },
  { code: 'it', dialCode: '+39', name: 'Italy' },
  { code: 'es', dialCode: '+34', name: 'Spain' },
  { code: 'nl', dialCode: '+31', name: 'Netherlands' },
  { code: 'be', dialCode: '+32', name: 'Belgium' },
  { code: 'ch', dialCode: '+41', name: 'Switzerland' },
  { code: 'at', dialCode: '+43', name: 'Austria' },
  { code: 'se', dialCode: '+46', name: 'Sweden' },
  { code: 'no', dialCode: '+47', name: 'Norway' },
  { code: 'dk', dialCode: '+45', name: 'Denmark' },
  { code: 'fi', dialCode: '+358', name: 'Finland' },
  { code: 'pl', dialCode: '+48', name: 'Poland' },
  { code: 'ie', dialCode: '+353', name: 'Ireland' },
  { code: 'pt', dialCode: '+351', name: 'Portugal' },
  { code: 'gr', dialCode: '+30', name: 'Greece' },
  { code: 'cz', dialCode: '+420', name: 'Czech Republic' },
  { code: 'hu', dialCode: '+36', name: 'Hungary' },
  { code: 'ro', dialCode: '+40', name: 'Romania' },
  { code: 'bg', dialCode: '+359', name: 'Bulgaria' },
  { code: 'hr', dialCode: '+385', name: 'Croatia' },
  { code: 'sk', dialCode: '+421', name: 'Slovakia' },
  { code: 'si', dialCode: '+386', name: 'Slovenia' },
  { code: 'ee', dialCode: '+372', name: 'Estonia' },
  { code: 'lv', dialCode: '+371', name: 'Latvia' },
  { code: 'lt', dialCode: '+370', name: 'Lithuania' },
  { code: 'lu', dialCode: '+352', name: 'Luxembourg' },
  { code: 'mt', dialCode: '+356', name: 'Malta' },
  { code: 'cy', dialCode: '+357', name: 'Cyprus' },
  { code: 'in', dialCode: '+91', name: 'India' },
  { code: 'cn', dialCode: '+86', name: 'China' },
  { code: 'jp', dialCode: '+81', name: 'Japan' },
  { code: 'kr', dialCode: '+82', name: 'South Korea' },
  { code: 'sg', dialCode: '+65', name: 'Singapore' },
  { code: 'my', dialCode: '+60', name: 'Malaysia' },
  { code: 'th', dialCode: '+66', name: 'Thailand' },
  { code: 'id', dialCode: '+62', name: 'Indonesia' },
  { code: 'ph', dialCode: '+63', name: 'Philippines' },
  { code: 'vn', dialCode: '+84', name: 'Vietnam' },
  { code: 'nz', dialCode: '+64', name: 'New Zealand' },
  { code: 'za', dialCode: '+27', name: 'South Africa' },
  { code: 'eg', dialCode: '+20', name: 'Egypt' },
  { code: 'ae', dialCode: '+971', name: 'United Arab Emirates' },
  { code: 'sa', dialCode: '+966', name: 'Saudi Arabia' },
  { code: 'il', dialCode: '+972', name: 'Israel' },
  { code: 'tr', dialCode: '+90', name: 'Turkey' },
  { code: 'ru', dialCode: '+7', name: 'Russia' },
  { code: 'br', dialCode: '+55', name: 'Brazil' },
  { code: 'mx', dialCode: '+52', name: 'Mexico' },
  { code: 'ar', dialCode: '+54', name: 'Argentina' },
  { code: 'cl', dialCode: '+56', name: 'Chile' },
  { code: 'co', dialCode: '+57', name: 'Colombia' },
  { code: 'pe', dialCode: '+51', name: 'Peru' },
];

const Input = ({
  label,
  placeholder,
  required = false,
  keyboardType = 'default',
  phoneInput = false,
  value,
  onChangeText,
  selectedCountry,
  onCountryChange,
  ...props
}) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [country, setCountry] = useState(
    selectedCountry || COUNTRIES.find(c => c.code === 'us') || COUNTRIES[0]
  );

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setShowCountryPicker(false);
    if (onCountryChange) {
      onCountryChange(selectedCountry);
    }
  };

  const currentCountry = selectedCountry || country;

  if (phoneInput) {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <View style={styles.phoneInputContainer}>
          <TouchableOpacity
            style={styles.flagContainer}
            onPress={() => setShowCountryPicker(true)}
            activeOpacity={0.7}
          >
            <CountryFlag isoCode={currentCountry.code} size={20} />
            <Text style={styles.dialCode}>{currentCountry.dialCode}</Text>
            <Icon name="chevron-down" size={16} color="#444" />
          </TouchableOpacity>
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

        {/* Country Picker Modal */}
        <Modal
          visible={showCountryPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCountryPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity
                  onPress={() => setShowCountryPicker(false)}
                  style={styles.closeButton}
                >
                  <Icon name="x" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={COUNTRIES}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.countryItem}
                    onPress={() => handleCountrySelect(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.countryItemLeft}>
                      <CountryFlag isoCode={item.code} size={24} />
                      <Text style={styles.countryName}>{item.name}</Text>
                    </View>
                    <Text style={styles.countryDialCode}>{item.dialCode}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
        </Modal>
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
    borderWidth: 0.5,
    borderColor: '#E4E6EB',
    borderRadius: 12,
    backgroundColor: '#ffff',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dialCode: {
    fontSize: 15,
    color: '#000',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 15,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  closeButton: {
    padding: 4,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
  },
  countryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    color: '#222',
  },
  countryDialCode: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginLeft: 20,
  },
});

