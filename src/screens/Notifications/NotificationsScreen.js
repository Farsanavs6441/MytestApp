import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../../components/MessageCard';
import { SCREEN_HEIGHT, SCREEN_WIDTH, hp } from '../../utils/dimensions';
import GradientButton from '../../components/GradientButotn';

const messages = [
  // Today - 3 items
  {
    id: '1',
    title: 'Premium Credit Solutions',
    description: 'Payment confirmed! Your receipt will arrive in your email shortly.',
    time: '2hr ago',
    date: 'Today',
    dateKey: 'today',
    image: require('../../assets/images/msg1.png'),
    statusColor: '#4CAF50',
  },
  {
    id: '2',
    title: 'Standard Payment Services',
    description: `We got your request. It's under review and you'll be notified once approved.`,
    time: '5hr ago',
    date: 'Today',
    dateKey: 'today',
    image: require('../../assets/images/msg1.png'),
    statusColor: '#FFA726',
  },
  {
    id: '3',
    title: 'Basic Financial Support',
    description: 'Payment recorded successfully. A confirmation email and SMS are on the way.',
    time: '8hr ago',
    date: 'Today',
    dateKey: 'today',
    image: require('../../assets/images/msg1.png'),
    statusColor: '#9E9E9E',
  },
  // Yesterday - 2 items
  {
    id: '4',
    title: 'Nova Finance Group',
    description: `Your payment went through! We've sent a confirmation message.`,
    time: '10:30 AM',
    date: 'Yesterday',
    dateKey: 'yesterday',
    image: require('../../assets/images/msg1.png'),
    statusColor: '#4CAF50',
  },
  {
    id: '5',
    title: 'Elite Banking Services',
    description: 'Your account has been updated with new transaction details.',
    time: '3:45 PM',
    date: 'Yesterday',
    dateKey: 'yesterday',
    image: require('../../assets/images/msg1.png'),
    statusColor: '#4CAF50',
  },
  // Previous date - 2 items
  {
    id: '6',
    title: 'Credit Union Alliance',
    description: 'Monthly statement is now available for review.',
    time: '9:15 AM',
    date: '12/10/2024',
    dateKey: '2024-12-10',
    image: require('../../assets/images/msg1.png'),
    statusColor: '#FFA726',
  },
  {
    id: '7',
    title: 'Financial Advisory Team',
    description: 'Reminder: Your payment is due in 3 days.',
    time: '2:20 PM',
    date: '12/10/2024',
    dateKey: '2024-12-10',
    image: require('../../assets/images/msg1.png'),
    statusColor: '#9E9E9E',
  },
];

const MessagesScreen = () => {
  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    if (!message || !message.dateKey) {
      return acc;
    }
    const dateKey = message.dateKey;
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: message.date || 'Unknown',
        messages: [],
      };
    }
    acc[dateKey].messages.push(message);
    return acc;
  }, {});

  // Convert to array format for FlatList
  const sections = Object.keys(groupedMessages).map((dateKey) => {
    const group = groupedMessages[dateKey];
    return {
      dateKey,
      date: group?.date || 'Unknown',
      data: group?.messages || [],
    };
  });

  const renderDateHeader = (date) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  const renderSection = ({ item }) => {
    if (!item || !item.date || !item.data) {
      return null;
    }
    return (
      <View>
        {renderDateHeader(item.date)}
        {item.data.map((message) => (
          <MessageCard key={message.id} {...message} />
        ))}
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#E9EEFF" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
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
              <Text style={styles.headerTitle}>Messages</Text>
            </View>
            <TouchableOpacity style={styles.navButton}>
              <Icon name="chevron-forward" size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Search Bar - Outside gradient */}
       
        <View style={{borderTopLeftRadius:25, borderTopRightRadius:25, flex:1, backgroundColor:'#FFFFFF', paddingTop:16,}}>
          <View style={{height:hp(2)}}></View>
           <View style={styles.searchBar}>
          <TextInput
            placeholder="Search your messages"
            placeholderTextColor="#aaa"
            style={styles.searchInput}
          />
          <Icon name="search" size={18} color="#aaa" />
        </View>
        
          {/* Message List */}
          <FlatList
            data={sections}
            keyExtractor={(item, index) => item?.dateKey || `section-${index}`}
            renderItem={renderSection}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
          />
        </View>
        {/* Fixed Button Above Bottom Tabs */}
        <View style={styles.fixedButtonContainer}>
          <GradientButton
            title="Start a new chat"
            onPress={() => console.log('New chat started')}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E9EEFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  fullGradient: {
    flex: 1,
  },
  gradientContainer: {
    height: SCREEN_HEIGHT * 0.15, // 1/5th of screen height
  //  paddingHorizontal: 16,
   // paddingTop: 10,
    //paddingBottom: 20,
    //borderBottomLeftRadius: 25,
   // borderBottomRightRadius: 25,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: hp(1.5),
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    marginBottom: hp(1),
    marginHorizontal: SCREEN_WIDTH * 0.075,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  newChatButton: {
    backgroundColor: '#3D5AFE',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  newChatText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E0E0E0',
  },
  dateHeader: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginTop: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  //  textTransform: 'uppercase',
  },
  fixedButtonContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    zIndex: 10,
  },
});

export default MessagesScreen;
