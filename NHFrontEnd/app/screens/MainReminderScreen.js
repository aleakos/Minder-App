import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ReminderBadge from '../components/ReminderBadge';
import moment from 'moment';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';

export default function MainReminderScreen() {
  const day = 26;

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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pageTitleContainer}>
          <Icon name="left" type={'antdesign'} color={'white'} />
          <Text style={styles.pageTitle}>
            {moment(reminderDate).format('MMMM Do YYYY')}
          </Text>
          <Icon name="right" type={'antdesign'} color={'white'} />
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
        <View style={styles.goBackButtonContainer}>
          <Icon name="back" type={'antdesign'} color={colors.white} />
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </View>
      </View>
    </>
  );
}

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitleContainer: {
    backgroundColor: colors.primary,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 15,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 20,
    paddingHorizontal: 15,
  },
  goBackButtonContainer: {
    backgroundColor: colors.primary,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  goBackButtonText: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: colors.white,
  },
});
