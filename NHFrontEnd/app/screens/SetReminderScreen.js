import React, { useState, useEffect } from 'react';
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

import RecurringDates from '../components/RecurringDates';
import DateTime from '../components/DateTime';
import colors from '../config/colors';
import icons from '../config/icons';

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

  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');

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

  const clearSate = () => {
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
  };

  const onToggleSwitch = () => setRecurring(!recurring);

  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  const handleSubmit = () => {
    if (title === '' || reminderContent === '') {
      setDialogTitle('Error');
      setDialogContent('Please fill in title and instructions');
      showDialog();
    } else {
      var data = JSON.stringify(reminderData);
      let myIP = IPV4;
      var config = {
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
          clearSate();
          setDialogTitle('Success!');
          setDialogContent('Reminder created successfully');
          showDialog();
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
          <Appbar.Content title="Create Reminder" />
        </Appbar.Header>
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

          <Portal>
            <Dialog visible={visibleDialog} onDismiss={hideDialog}>
              <Dialog.Title>{dialogTitle}</Dialog.Title>
              <Dialog.Content>
                <Avatar.Icon
                  size={50}
                  icon={dialogTitle === 'Error' ? icons.alert : icons.complete}
                  backgroundColor={
                    dialogTitle === 'Error' ? colors.caution : colors.accept
                  }
                />
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
  textHeader: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 60,
  },
});
