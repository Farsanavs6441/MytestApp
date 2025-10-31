import { StyleSheet, Platform } from 'react-native';
import { wp, hp, moderateScale } from '../../utils/dimensions';
import Colors from '../../theme,/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(60),
  //  paddingHorizontal: moderateScale(20),
  },
  image: {
    height: hp(66),
    width: wp(100),
  },
  textContainer: {
    alignItems: 'flex-start',
    paddingStart: moderateScale(10),
    marginTop: -moderateScale(10),
  },
  title: {
    fontSize: moderateScale(36),
    fontFamily: Platform.select({ ios: 'SFProDisplay-ThinItalic', android: 'SFPRODISPLAYTHINITALIC' }),
    fontWeight: '400',
    color: '#111',
    marginBottom: moderateScale(10),
    paddingStart: moderateScale(15),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: Platform.select({ ios: 'SFProDisplay-ThinItalic', android: 'SFPRODISPLAYTHINITALIC' }),
    color: '#000',
    textAlign: 'left',
    lineHeight: moderateScale(22),
     paddingStart: moderateScale(15),
     marginBottom: moderateScale(100),
  },
  nextButton: {
    position: 'absolute',
    bottom: moderateScale(48),
    right: moderateScale(30),
  },
  outerCircle: {
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(37.5),
    borderWidth: moderateScale(3),
    borderColor: Colors.primaryBlue, // outer blue outline
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: moderateScale(68),
    height: moderateScale(68),
    borderRadius: moderateScale(34),
    backgroundColor: '#fff', // white middle circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: Colors.primaryBlue,
    alignItems:'center',
    justifyContent: 'center',
 // solid blue inner circle
  },
  arrow: {
    width: moderateScale(20),
    height: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;


