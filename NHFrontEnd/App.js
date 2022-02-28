import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReminderBadge from './app/components/ReminderBadge';
import AcceptReminder from './app/screens/AcceptReminderScreen';
import MainReminderScreen from './app/screens/MainReminderScreen';
import PreSetReminder from './app/components/PreSetReminder';
import SetReminderScreen from './app/screens/SetReminderScreen';
import HomeScreen from './app/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {




  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="MainReminderScreen"
          component={MainReminderScreen}
        />
        <Stack.Screen name="SetReminderScreen" component={SetReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  // if (Constants.isDevice || Device.isDevice) {
  if (true) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
