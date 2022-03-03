import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Switch, Button, Appbar } from 'react-native-paper';

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
  const [title, setTitle] = useState('');

  const [recurring, setRecurring] = React.useState(false);

  // TODO un hardcode reminderType and patientID

  let reminderData = {
    title: title,
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
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    time: `${time.getHours()}:${
      (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
    }`,
    patientID: 3,
    reminderType: 'medication',
  };

  const onToggleSwitch = () => setRecurring(!recurring);

  const handleSubmit = () => {
    console.log(reminderData);
  };

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <View style={styles.innerContainer}>
        <View style={styles.textBox}>
          <Text style={styles.textTitle}>Push Notification Message:</Text>
          <TextInput
            label="Message"
            mode="outlined"
            multiline={false}
            value={title}
            onChangeText={(e) => setTitle(e)}
          />
          <Text style={styles.textTitle}>Detailed Instructions:</Text>
          <TextInput
            label="Detailed Instructions"
            mode="outlined"
            multiline={true}
            value={reminderContent}
            onChangeText={(e) => setReminderContent(e)}
          />
          <View style={styles.checkContainer}>
            <Text style={styles.textTitle}>Recurring Event:</Text>
            <Switch value={recurring} onValueChange={onToggleSwitch} />
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
            <Text style={styles.textTitle}>Days Scheduled:</Text>
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
        <Button mode="contained" onPress={handleSubmit}>
          <Text style={styles.textButton}>Create Reminder</Text>
        </Button>
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
  },
  innerContainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  textBox: {
    marginHorizontal: 5,
  },
  textTitle: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 8,
  },
});
