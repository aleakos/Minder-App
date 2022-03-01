import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import ReminderBadge from '../components/ReminderBadge';
import moment from 'moment';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';
import CalendarModal from '../components/CalendarModal';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MainReminderScreen({navigation}) {
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

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log(notification)
        let reminderTime = moment(new Date()).format('h:mm a')
        let reminderContent = "asdf1"
        let icon="pill"
        let iconColor=colors.primary
        navigation.navigate("AcceptReminderScreen", {reminderTime, reminderContent, icon, iconColor});
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        let reminderTime = moment(new Date()).format('h:mm a')
        let reminderContent = "asdf2"
        let icon="pill"
        let iconColor=colors.primary
        navigation.navigate("AcceptReminderScreen", {reminderTime, reminderContent, icon, iconColor});

      });



    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


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
              navigation={navigation}
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
    backgroundColor: colors.white
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

async function registerForPushNotificationsAsync() {
  let token;
  // if (Constants.isDevice || Device.isDevice) {
  if (true) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}