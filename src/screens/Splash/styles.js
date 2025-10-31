import { StyleSheet } from 'react-native';
import { wp, hp, moderateScale } from '../../utils/dimensions';

const styles = StyleSheet.create({
  container: {
   // flex: 1,
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
  },
  title: {
    fontSize: moderateScale(36),
    fontWeight: '400',
    color: '#111',
    marginBottom: moderateScale(8),
    paddingStart: moderateScale(15),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#000',
    textAlign: 'left',
    lineHeight: moderateScale(22),
     paddingStart: moderateScale(15),
  },
  nextButton: {
    position: 'absolute',
    bottom: -moderateScale(20),
    right: moderateScale(20),
  },
  outerCircle: {
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(37.5),
    borderWidth: moderateScale(3),
    borderColor: '#007AFF', // outer blue outline
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
    backgroundColor: '#007AFF',
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


