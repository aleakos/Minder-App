import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ReminderBadge from './app/components/ReminderBadge';
import AcceptReminder from './app/screens/AcceptReminderScreen';
import MainReminderScreen from "./app/screens/MainReminderScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <MainReminderScreen/>
      </SafeAreaProvider>
    </>
  );
}
