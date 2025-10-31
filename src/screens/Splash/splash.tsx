import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import ArrowIcon from '../../components/ArrowIcon';
import styles from './styles';
import { scale } from '../../utils/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';


type Props = {
  navigation: any;
};

export default function Splash({navigation}: Props) {
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require('../../assets/images/splash.png')} // replace with your illustration
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your Credit Score</Text>
        <Text style={styles.subtitle}>
          We provide you with the tools to monitor, understand, and improve your
          credit score.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.8}
      >
        {/* Outer blue ring */}
        <View style={styles.outerCircle}>
          {/* Middle white circle */}
          <View style={styles.middleCircle}>
            {/* Inner blue circle */}
            <View style={styles.innerCircle} >
           <Image
              source={require('../../assets/images/arrow.png')}
              style={{ width: scale(20), height: scale(20) }}
              resizeMode="contain"
            />
            
              </View>
            
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

