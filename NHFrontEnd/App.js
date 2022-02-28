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

const Stack = createNativeStackNavigator();

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
