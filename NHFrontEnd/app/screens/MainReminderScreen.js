import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ReminderBadge from '../components/ReminderBadge';
import moment from 'moment';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';
import CalendarModal from '../components/CalendarModal';

export default function MainReminderScreen() {
  const day = 26;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const [reminders, setReminders] = useState([
    {
      id: 1,
      content: 'Take Advil',
      status: 'complete',
      time: new Date(2022, 2, day, 7, 0, 0),
      type: 'medication',
    },
    {
      id: 2,
      content: 'Apply Rub A5-35 to knee',
      status: 'missed',
      time: new Date(2022, 2, day, 7, 0, 0),
      type: 'medication',
    },
    {
      id: 3,
      content: 'Do phyiso exercises',
      status: 'pending',
      time: new Date(2022, 2, day, 12, 0, 0),
      type: 'exercise',
    },
    {
      id: 4,
      content: 'Dr. Noiles Appointment',
      status: 'pending',
      time: new Date(2022, 2, day, 12, 0, 0),
      type: 'appointment',
    },
    {
      id: 5,
      content: 'Take melatonin',
      status: 'pending',
      time: new Date(2022, 2, day, 20, 0, 0),
      type: 'medication',
    },
  ]);
  const [reminderDate, setReminderDate] = useState(new Date());

  const decrementDate = () => {
    setReminderDate(moment(reminderDate).subtract(1, 'days').toDate());
  };

  const incrementDate = () => {
    setReminderDate(moment(reminderDate).add(1, 'days').toDate());
  };

  useEffect(() => {
    console.log('Date changed to :' + reminderDate);
  }, [reminderDate]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pageTitleContainer}>
          <Icon
            name="left"
            type={'antdesign'}
            color={'white'}
            onPress={decrementDate}
          />
          <Text style={styles.pageTitle}>
            {moment(reminderDate).format('MMMM Do YYYY')}
          </Text>
          <Icon
            name="right"
            type={'antdesign'}
            color={'white'}
            onPress={incrementDate}
          />
          <CalendarModal
            style={styles.calendarModalButton}
            reminderDate={reminderDate}
            setReminderDate={setReminderDate}
          />
        </View>

        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReminderBadge
              reminderContent={item.content}
              reminderStatus={item.status}
              reminderTime={item.time}
              reminderType={item.type}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitleContainer: {
    backgroundColor: colors.primary,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 20,
    paddingHorizontal: 15,
  },
});
