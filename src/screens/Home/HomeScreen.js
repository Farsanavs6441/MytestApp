import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ScrollView
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LineChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../theme,/colors';
import CreditScoreGauge from './CreditGaugeScore';


const AnimatedPath = Animated.createAnimatedComponent(Path);

const HomeScreen = () => {
  const [selectedScore, setSelectedScore] = useState(704);
  const [selectedLabel, setSelectedLabel] = useState('Apr');



  // Animated arc progress (0–1)
  const progress = useRef(new Animated.Value(0)).current;

  // Animate arc when score changes
  useEffect(() => {
    const ratio = (selectedScore - 400) / (850 - 400);
    Animated.timing(progress, {
      toValue: ratio,
      duration: 900,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [selectedScore]);

  const data = [
    { value: 720, label: 'Jan' }, // Drop
    { value: 240, label: 'Feb' },
    { value: 640, label: 'Mar' },
    { value: 370, label: 'Apr' },
    { value: 830, label: 'May' },
    { value: 620, label: 'Jun' },
    { value: 850, label: 'July' }, // Drop
    // { value: 450, label: 'Aug' },
    // { value: 640, label: 'Sep' },
    // { value: 370, label: 'Oct' },
    // { value: 820, label: 'Nov' },
    // { value: 720, label: 'Dec' },
  ];

  const handleSelect = (item) => {
    setSelectedScore(item.value);
    setSelectedLabel(item.label);
  };

  // Interpolated stroke dash offset for animation
  const circumference = Math.PI * 240; // approximate arc length
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Greeting Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, Sarah</Text>
          <Text style={styles.subtext}>Your credit in excellent shape!</Text>
        </View>
        <TouchableOpacity style={styles.bell}>
          <Icon name="notifications-outline" size={22} color="#000" style={{alignSelf: 'center'}} />
        </TouchableOpacity>
      </View>

      {/* Semicircle Gauge */}
      <View style={styles.card}>
      
          <CreditScoreGauge score={selectedScore} selectedLabel={selectedLabel} />
     
        {/* Range Section */}
        <View style={styles.rangeContainer}>
          <Text style={styles.rangeValue}>400</Text>
          <View style={styles.dateContainer}>
            <Icon name="calendar-outline" size={14} color="#888" />
            <Text style={styles.updateText}> update on 02 {selectedLabel || 'Oct'} 2024</Text>
          </View>
          <Text style={styles.rangeValue}>850</Text>
        </View>
      </View>

      {/* Feature Icons */}
      <View style={styles.featureRow}>
        {[
          { icon: 'card-outline', label: 'Pay \nMoney', color: '#ccdaffff' ,image:require('../../assets/images/wallet.png')},
          { icon: 'document-text-outline', label: 'Loan \nRequest', color: '#D9F5E5' ,image:require('../../assets/images/loan.png') },
          { icon: 'messages', label: 'Chat \nSupport', color: '#FFEBD4' ,image:require('../../assets/images/msgs.png') },
          { icon: 'bar-chart-outline', label: 'Finance \nHub', color: '#E6E0FF', image:require('../../assets/images/finance.png') },
        ].map((item, index) => (
          <View key={index} style={styles.featureItem}>
           
                <Image source={item.image} style={{width:40, height:40, alignSelf:'center'}} />
           
            <Text style={styles.featureText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={{height:20}} />
  <Text style={styles.chartTitle}>Credit Score History</Text>
  <View style={{height:10}} />
      {/* Credit Score History */}
      <View style={styles.chartCard}>
        {/* <Text style={styles.chartTitle}>Credit Score History</Text> */}
        <LineChart
        data={data}
        curved
        thickness={3}
        color={Colors.primaryBlue}
        hideDataPoints={false}
        dataPointsColor={Colors.primaryBlue}
        dataPointsRadius={4}
        startFillColor="transparent"
        endFillColor="transparent"
        //hideRules
        yAxisThickness={0}
        xAxisColor="transparent"
        xAxisLabelTextStyle={{ color: '#6666', fontSize: 11 }}
        initialSpacing={20}
        spacing={40}
        noOfSections={4}
        maxValue={850}
        minValue={650}
        xAxisLabelTexts={data.map(item => item.label)}
        yAxisLabelTexts={['650', '700', '750', '800', '850']}
        yAxisTextStyle={{ color: '#6666', fontSize: 11 }}
        backgroundColor="white"
        onPress={(item) => handleSelect(item)}
        rulesType="solid"
  rulesColor="#E0E0E0"
  rulesThickness={1}
      />
</View> 
      </ScrollView>
      
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#4F6CFF', '#3D5CFF']}
          style={styles.fabGradient}
        >
          <Icon name="add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F4FF', paddingTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop:20
  },
  greeting: { fontSize: 22, fontWeight: '700', color: '#000' },
  subtext: { color: '#6666', marginTop: 2 ,fontSize:16,fontWeight:'400'},
  bell: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal:14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
//   gaugeContainer: { alignItems: 'center', justifyContent: 'center' },
  scoreContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  statusText: { color: '#888', fontSize: 14 },
  score: { fontSize: 38, fontWeight: '700', color: '#000' },
  changeText: { color: 'green', fontWeight: '600', marginTop: 4 },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  rangeValue: { color: 'black', fontWeight: '400', fontSize:14 },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  updateText: { color: '#999', fontSize: 12 },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 14,
  },
  featureItem: { alignItems: 'center' },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: { fontSize: 12, color: '#555', marginTop: 6 ,alignSelf:'center', textAlign:'center'},
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal:16,
    marginHorizontal:16,
    //margin: 16,
   //padding: 12,
   // position: 'relative',
  },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#000',marginStart:20 },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
