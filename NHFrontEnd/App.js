import React, { useState } from 'react';
import MainReminderScreen from './app/screens/MainReminderScreen';
import SetReminderScreen from './app/screens/SetReminderScreen';
import HomeScreen from './app/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/LoginScreen/LoginScreen';
import AcceptReminder from './app/screens/AcceptReminderScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded, setLoaded] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  return loggedIn ? (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="AcceptReminderScreen" component={AcceptReminder} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  :
  (
    <LoginScreen />
  )
}
