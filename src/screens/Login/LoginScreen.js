import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // for fingerprint icon
import GradientButton from '../../components/GradientButotn';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/Input';
import Colors from '../../theme,/colors';

const LoginScreen = ({ navigation }) => {
  const [isBiometric, setIsBiometric] = React.useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = React.useState(false);
  const [formData, setFormData] = React.useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Ally in Debt</Text>
      </View>
<View style={{height:40}} />
      {/* Phone Number */}
      <Input
        label="Phone Number"
        placeholder="Enter Your Phone Number"
        required
        phoneInput
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
        error={errors.phoneNumber}
      />
      {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

      {/* First Name */}
      <Input
        label="First Name"
        placeholder="Enter Your First Name"
        required
        value={formData.firstName}
        onChangeText={(text) => setFormData({...formData, firstName: text})}
        error={errors.firstName}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      {/* Last Name */}
      <Input
        label="Last Name"
        placeholder="Enter Your Last Name"
        required
        value={formData.lastName}
        onChangeText={(text) => setFormData({...formData, lastName: text})}
        error={errors.lastName}
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      {/* Email Address */}
      <Input
        label="Email Address"
        placeholder="Enter Your Email"
        required
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
        error={errors.email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Biometric */}
      <TouchableOpacity
        style={styles.biometricRow}
        onPress={() => setIsBiometric(!isBiometric)}
        activeOpacity={0.8}
      >
        <Icons name="fingerprint" size={20} color={Colors.primaryBlue} />
        <Text style={styles.biometricText}>Use Biometric Login</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <GradientButton
        title="Log In"
        onPress={handleLogin}
      />

<View style={{height:16}} />
      {/* <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}
      onPress={() =>  navigation.navigate('MainTabs')}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity> */}

      {/* Keep Me Logged In */}
      <View style={styles.keepLoggedInRow}>
        <Text style={styles.keepText}>Keep me logged in</Text>
        <Switch
          value={keepLoggedIn}
          onValueChange={setKeepLoggedIn}
          trackColor={{ false: '#ddd', true: '#4F5FA7' }}
          thumbColor="#fff"
        />
      </View>
<View style={{height:25}} />
      {/* Sign Up */}
      <View style={styles.signUpRow}>
        <Text style={styles.noAccountText}>Don’t have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
   // marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    
  },

  subtitle: {
    fontSize: 24,
    color: Colors.primaryBlue,
    lineHeight: 28,
   // marginTop: 6,
  },
  biometricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    marginBottom: 24,
  },
  biometricText: {
    fontSize: 15,
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#4F5FA7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  keepLoggedInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   // marginBottom: 50,
  },
  keepText: {
    fontSize: 13,
    color: 'grey',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  noAccountText: {
    fontSize: 15,
    color: '#666',
  },
  signUpText: {
    fontSize: 15,
    color: '#4F5FA7',
    fontWeight: '600',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});
