import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReminderBadge from './app/components/ReminderBadge';
import AcceptReminder from './app/screens/AcceptReminderScreen';
import MainReminderScreen from './app/screens/MainReminderScreen';
import PreSetReminder from './app/components/PreSetReminder';
import SetReminderScreen from './app/screens/SetReminderScreen';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        {/* <MainReminderScreen /> */}
        <SetReminderScreen />
      </SafeAreaProvider>
    </>
  );
}
