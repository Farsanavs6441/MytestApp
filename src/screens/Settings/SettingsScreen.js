import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { wp, hp, scale, verticalScale, moderateScale, SCREEN_HEIGHT } from '../../utils/dimensions';
import Colors from '../../theme,/colors';
import IconCard from '../../components/IconCard';

const ProfileScreen = () => {
  const [faceIdEnabled, setFaceIdEnabled] = React.useState(false);
  const [fingerprintEnabled, setFingerprintEnabled] = React.useState(false);

  return (
    <>
      <StatusBar backgroundColor="#E9EEFF" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#E9EEFF', '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.fullGradient}
        >
          {/* Gradient Header Section */}
          <View style={styles.gradientContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity style={styles.navButton}>
                  <Icon name="chevron-back" size={22} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
              </View>
              <TouchableOpacity style={styles.navButton}>
                <Icon name="chevron-forward" size={22} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Content */}
          <View style={{borderTopLeftRadius:25, borderTopRightRadius:25, flex:1, backgroundColor:'#FFFFFF', paddingTop:16}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{height:hp(2)}}></View>
              <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../../assets/images/profile.png')} // replace with your avatar image
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Sarah Joe</Text>

        {/* Details */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <IconCard iconName="email" />
            <View style={styles.infoTextWrapper}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>Sample@example.com</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <IconCard iconName="phone" />
            <View style={styles.infoTextWrapper}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>(988) 000-8888</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <IconCard iconName="calendar-today" />
            <View style={styles.infoTextWrapper}>
              <Text style={styles.label}>DOB</Text>
              <Text style={styles.value}>Sample@example.com</Text>
            </View>
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.securitySection}>
          <Text style={styles.securityTitle}>Security</Text>

          <View style={styles.switchRow}>
            <View style={styles.switchTextContainer}>
              <View style={styles.switchLabelRow}>
                <IconCard iconName="face-man" />
                <Text style={styles.switchLabel}>Face ID</Text>
              </View>
              <View style={styles.subtextContainer}>
                <Text style={styles.switchSubtext}>Use Face ID to unlock the app</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#ccc', true: Colors.primaryBlue }}
              thumbColor={faceIdEnabled ? Colors.white : '#f4f3f4'}
              onValueChange={setFaceIdEnabled}
              value={faceIdEnabled}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchTextContainer}>
              <View style={styles.switchLabelRow}>
                <IconCard iconName="fingerprint" />
                <Text style={styles.switchLabel}>Fingerprint</Text>
              </View>
              <View style={styles.subtextContainer}>
                <Text style={styles.switchSubtext}>Use Fingerprint to unlock the app</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#ccc', true: Colors.primaryBlue }}
              thumbColor={fingerprintEnabled ? Colors.white : '#f4f3f4'}
              onValueChange={setFingerprintEnabled}
              value={fingerprintEnabled}
            />
          </View>
        </View>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  fullGradient: {
    flex: 1,
  },
  gradientContainer: {
    height: SCREEN_HEIGHT * 0.15,
  },
  header: {
    marginTop: 10,
    marginHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 'auto',
  },
  profileCard: {
    backgroundColor: 'transparent',
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
  },
  avatarWrapper: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryBlue,
    borderRadius: 100,
    padding: scale(3),
  },
  avatar: {
    width: scale(90),
    height: scale(90),
    borderRadius: 100,
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: hp(1.5),
  },
  infoContainer: {
    marginTop: hp(3),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  infoTextWrapper: {
    marginLeft: wp(3),
  },
  label: {
    fontSize: moderateScale(16),
    color: '#222',
    fontWeight: '400',
  },
  value: {
    fontSize: moderateScale(13),
    color: '#AeAeb2',
  },
  securitySection: {
    marginTop: hp(3),
  },
  securityTitle: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#000',
    marginBottom: hp(1.5),
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  switchLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    marginLeft: wp(2),
    color: '#000',
  },
  switchTextContainer: {
    flex: 1,
  },
  subtextContainer: {
    marginLeft: wp(12),
  },
  switchSubtext: {
    fontSize: moderateScale(13),
    color: '#aeaeb2',
    fontWeight: '400',
  },
  bottomNav: {
    position: 'absolute',
    bottom: hp(1),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderRadius: scale(25),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  profileTab: {
    borderWidth: 2,
    borderColor: '#5A5AFA',
    borderRadius: 50,
    padding: 2,
  },
  navAvatar: {
    width: scale(28),
    height: scale(28),
    borderRadius: 50,
  },
});
