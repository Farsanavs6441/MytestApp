import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, Platform, Text } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
// Messages tab shows the NotificationsScreen.js content (which has messages)
import MessagesScreen from '../screens/Notifications/NotificationsScreen';
// Separate Notifications screen for Notifications tab  
import NotificationsTabScreen from '../screens/Notifications/NotificationsScreen.tsx';
import SearchScreen from '../screens/Search/SearchScreen';
import ProfileScreen from '../screens/Settings/SettingsScreen';
import Colors from '../theme,/colors.ts';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryBlue,
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 25 : 8,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => focused ? <Text style={{fontSize: 12, fontWeight: '500', color: Colors.primaryBlue}}>Home</Text> : null,
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: ({ focused }) => focused ? <Text style={{fontSize: 12, fontWeight: '500', color: Colors.primaryBlue}}>Messages</Text> : null,
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsTabScreen}
        options={{
          tabBarLabel: ({ focused }) => focused ? <Text style={{fontSize: 12, fontWeight: '500', color: Colors.primaryBlue}}>Notifications</Text> : null,
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'notifications' : 'pie-chart-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: ({ focused }) => focused ? <Text style={{fontSize: 12, fontWeight: '500', color: Colors.primaryBlue}}>Search</Text> : null,
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'wallet' : 'wallet-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => focused ? <Text style={{fontSize: 12, fontWeight: '500', color: Colors.primaryBlue}}>Profile</Text> : null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/profile.png')}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                borderWidth: focused ? 2 : 0,
                borderColor: Colors.primaryBlue,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

