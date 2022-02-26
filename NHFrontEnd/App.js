import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ReminderBadge from './app/components/ReminderBadge';
import AcceptReminder from './app/screens/AcceptReminderScreen';

export default function App() {
  return (
    <>
      {/* <AcceptReminder /> */}
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="complete"
        reminderTime="7:00AM"
        reminderType="medication"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="rejected"
        reminderTime="7:20AM"
        reminderType="medication"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="pending"
        reminderTime="8:00AM"
        reminderType="exercise"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="pending"
        reminderTime="10:00AM"
        reminderType="appointment"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
