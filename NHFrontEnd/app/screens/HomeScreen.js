import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import ReminderBadge from '../components/ReminderBadge';

export default function Home() {
  return (
    <ScrollView>
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="complete"
        reminderTime="7:00AM"
        reminderType="medication"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="missed"
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
        reminderType="other"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="pending"
        reminderTime="10:00AM"
        reminderType="diet"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="pending"
        reminderTime="10:00AM"
        reminderType="alert"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="pending"
        reminderTime="10:00AM"
        reminderType="appointment"
      />
      <ReminderBadge
        reminderContent="hello"
        reminderStatus="pending"
        reminderTime="10:00AM"
        reminderType="appointment"
      />
    </ScrollView>
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
