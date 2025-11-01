import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MessageCard = ({ image, title, description, time, statusColor }) => {
  return (
    <View style={styles.card}>
      {/* Left Side - Image */}
      <Image source={image} style={styles.image} />

      {/* Right Side - Text */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    marginVertical: 6,
    shadowColor: '#fff',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth:0.2,
    borderColor:'#d1d1d1',
    elevation: 2,
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  description: {
    fontSize: 13,
    color: '#707070',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 6,
    textAlign:"right"
  },
});

export default MessageCard;
