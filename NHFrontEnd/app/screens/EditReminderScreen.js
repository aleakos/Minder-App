import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  TextInput,
  Switch,
  Button,
  Appbar,
  Dialog,
  Portal,
  Paragraph,
  Provider,
  Avatar,
} from 'react-native-paper';
import axios from 'axios';
import { IPV4 } from '@env';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';

import RecurringDates from '../components/RecurringDates';
import DateTime from '../components/DateTime';
import colors from '../config/colors';

const EditReminderContent = ({ navigation, route }) => {
  const { id, user } = route.params;
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
  const [reminderType, setReminderType] = useState('other');
  const [patientID, setPatientID] = useState(null);

  const [recurring, setRecurring] = React.useState(false);

  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');

  // set all info from reminder in db
  useEffect(() => {
    async function getReminder() {
      try {
        let res = await axios({
          url: `http://${IPV4}/getReminderData?id=${id}`,
          method: 'get',
          headers: {},
        });

        let hours = res.data.TimeOfDay.split(':')[0];
        let minutes = res.data.TimeOfDay.split(':')[1];
        let timeOfDay = new Date(new Date().setHours(hours, minutes, 0, 0));
        console.log('timeOfDay:', timeOfDay);

        setStartDate(new Date(res.data.StartDate));
        setEndDate(new Date(res.data.EndDate));
        setTime(timeOfDay);
        setReminderContent(res.data.ReminderContent);
        setTitle(res.data.Title);
        setReminderType(res.data.ReminderType);
        setPatientID(res.data.PatientID);
        res.data.RecurringID ? setRecurring(true) : setRecurring(false);
        res.data.Monday ? setMondays(true) : setMondays(false);
        res.data.Tuesday ? setTuesdays(true) : setTuesdays(false);
        res.data.Wednesday ? setWednesdays(true) : setWednesdays(false);
        res.data.Thursday ? setThursdays(true) : setThursdays(false);
        res.data.Friday ? setFridays(true) : setFridays(false);
        res.data.Saturday ? setSaturdays(true) : setSaturdays(false);
        res.data.Sunday ? setSundays(true) : setSundays(false);
      } catch (err) {
        console.log(err);
      }
    }
    getReminder();
  }, []);

  let reminderData = {
    title: reminderContent,
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
    patientID: patientID,
    reminderType: reminderType,
  };

  let reminderTypeOptions = [
    {
      value: 'medication',
      label: 'Medication',
    },
    {
      value: 'appointment',
      label: 'Appointment',
    },
    {
      value: 'exercise',
      label: 'Exercise',
    },
    {
      value: 'diet',
      label: 'Diet',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const clearState = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setTime(new Date());
    setMondays(false);
    setTuesdays(false);
    setWednesdays(false);
    setThursdays(false);
    setFridays(false);
    setSaturdays(false);
    setSundays(false);
    setReminderContent('');
    setTitle('');
    setRecurring(false);
  };

  const onToggleSwitch = () => setRecurring(!recurring);

  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  const handleSubmit = () => {
    if (title === '' || reminderContent === '') {
      setDialogTitle('Error');
      setDialogContent('Please fill in message to patient');
      showDialog();
    } else if (
      recurring &&
      mondays === false &&
      tuesdays === false &&
      wednesdays === false &&
      thursdays === false &&
      fridays === false &&
      saturdays === false &&
      sundays === false
    ) {
      setDialogTitle('Error');
      setDialogContent('Please select at least one day for recurring events');
      showDialog();
    } else {
      let data = JSON.stringify(reminderData);
      let myIP = IPV4;
      let config = {
        method: 'post',
        url: `http://${myIP}/newReminder`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          clearState();
          setDialogTitle('Success!');
          setDialogContent('Reminder created edited');
          showDialog();
          navigation.navigate('Home');
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(reminderData);
    }
  };

  return (
    <Provider>
      <ScrollView style={{ backgroundColor: colors.white, flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
          <Appbar.Content title="Edit Reminder" />
        </Appbar.Header>
        <View style={styles.innerContainer}>
          <View style={styles.textBox}>
            <Text style={styles.textTitle}>Message To Patient:</Text>
            <TextInput
              label="Message"
              mode="outlined"
              multiline={false}
              value={reminderContent}
              onChangeText={(e) => {
                setReminderContent(e);
                setTitle(e);
              }}
            />
            <Dropdown
              label="Reminder Type"
              data={reminderTypeOptions}
              onChangeText={(e) => setReminderType(e)}
              value={reminderType}
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
            <Text style={styles.textButton}>Update Reminder</Text>
          </Button>

          <Portal>
            <Dialog visible={visibleDialog} onDismiss={hideDialog}>
              <Dialog.Title>{dialogTitle}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{dialogContent}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default EditReminderContent;

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
