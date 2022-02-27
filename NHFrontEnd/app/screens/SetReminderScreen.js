import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';

import RecurringDates from '../components/RecurringDates';
import DateTime from '../components/DateTime';

import colors from '../config/colors';

const ReminderContent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [mondays, setMondays] = useState(false);
  const [tuesdays, setTuesdays] = useState(false);
  const [wednesdays, setWednesdays] = useState(false);
  const [thursdays, setThursdays] = useState(false);
  const [fridays, setFridays] = useState(false);
  const [saturdays, setSaturdays] = useState(false);
  const [sundays, setSundays] = useState(false);

  const [reminderContent, setReminderContent] = useState('');

  const [recurring, setRecurring] = React.useState(false);

  let reminderData = {
    recurring: recurring,
    description: reminderContent,
    recurringDates: {
      mondays: mondays,
      tuesdays: tuesdays,
      wednesdays: wednesdays,
      thursdays: thursdays,
      fridays: fridays,
      saturdays: saturdays,
      sundays: sundays,
    },
    startDate: startDate.toDateString(),
    endDate: endDate.toDateString(),
    time: `${time.getHours()}:${
      (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
    }`,
  };

  useEffect(() => {
    console.log(reminderData);
  }, [
    startDate,
    endDate,
    time,
    mondays,
    tuesdays,
    wednesdays,
    thursdays,
    fridays,
    saturdays,
    sundays,
    reminderContent,
    recurring,
  ]);

  return (
    <View style={styles.innerContainer}>
      <Text style={styles.textHeader}>Create Reminder:</Text>
      <View style={styles.textBox}>
        <Text style={styles.textTitle}>Reminder Content:</Text>
        <TextInput
          label="Reminder Content here..."
          mode="outlined"
          multiline={true}
          value={reminderContent}
          onChangeText={(e) => setReminderContent(e)}
        />
        <View style={styles.checkContainer}>
          <Text style={styles.textTitle}>Recurring Event:</Text>
          <Checkbox
            status={recurring ? 'checked' : 'unchecked'}
            onPress={() => {
              setRecurring(!recurring);
            }}
          />
        </View>
        <Text style={styles.textTitle}>Set Schedule:</Text>
        <DateTime
          recurring={recurring}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          time={time}
          setTime={setTime}
        />
        {recurring ? (
          <Text style={styles.textTitle}>Recurring Days:</Text>
        ) : null}
        {recurring ? (
          <RecurringDates
            mondays={mondays}
            tuesdays={tuesdays}
            wednesdays={wednesdays}
            thursdays={thursdays}
            fridays={fridays}
            saturdays={saturdays}
            sundays={sundays}
            setMondays={setMondays}
            setTuesdays={setTuesdays}
            setWednesdays={setWednesdays}
            setThursdays={setThursdays}
            setFridays={setFridays}
            setSaturdays={setSaturdays}
            setSundays={setSundays}
          />
        ) : null}
      </View>
    </View>
  );
};

export default ReminderContent;

const styles = StyleSheet.create({
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  innerContainer: {
    marginTop: 50,
    marginVertical: 10,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  textBox: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  textHeader: {
    fontSize: 40,
    marginBottom: 5,
    textAlign: 'center',
  },
});
