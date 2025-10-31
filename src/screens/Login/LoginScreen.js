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

      {/* Phone Number */}
      <Input
        label="Phone Number"
        placeholder="Enter Your Phone Number"
        required
        phoneInput
      />

      {/* First Name */}
      <Input
        label="First Name"
        placeholder="Enter Your First Name"
        required
      />

      {/* Last Name */}
      <Input
        label="Last Name"
        placeholder="Enter Your Last Name"
        required
      />

      {/* Email Address */}
      <Input
        label="Email Address"
        placeholder="Enter Your Email"
        required
        keyboardType="email-address"
      />

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
        onPress={() => navigation.navigate('MainTabs')}
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
    marginTop: 80,
   // marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  subtitle: {
    fontSize: 24,
    color: Colors.primaryBlue,
    linespacing: 28,
    //marginTop: 6,
    alignSelf: 'center',
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
});
