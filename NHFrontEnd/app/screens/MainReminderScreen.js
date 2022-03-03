import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { IPV4 } from '@env';

import colors from '../config/colors';
import icons from '../config/icons';

import ReminderBadge from '../components/ReminderBadge';
import CalendarModal from '../components/CalendarModal';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MainReminderScreen({ navigation }) {
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

  const [reminders, setReminders] = useState([]);
  const [reminderDate, setReminderDate] = useState(new Date());

  const decrementDate = () => {
    setReminderDate(moment(reminderDate).subtract(1, 'days').toDate());
  };

  const incrementDate = () => {
    setReminderDate(moment(reminderDate).add(1, 'days').toDate());
  };

  useEffect(() => {
    let queryDate = moment(reminderDate).format('YYYY-MM-DD');
    // let testDate = '2021-02-24'
    // console.log(queryDate)

    async function getReminders() {
      let myIP = IPV4;
      try {
        let res = await axios({
          url: `http://${myIP}/getReminder?date=${queryDate}&id=3`,
          method: 'get',
          headers: {},
        });

        setReminders(res.data);
      } catch (err) {
        console.error(err);
        setReminders([]);
      }
    }
    getReminders();
  }, [reminderDate]);

  useEffect(() => {
    console.log(reminders)
  }, [reminders]);

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

        // UNCOMMENT FOR PRODUCTION
        // let reminderTile = notification.request.content.title;
        // let reminderContent = notification.request.content.body;
        // let data = notification.request.content.data;

        // let reminderID = data.reminderID;
        // let reminderType = data.reminderType;
        // let reminderTime = data.reminderTime;
        // let reminderDate = data.reminderDate;
        // let icon = icons[reminderType];

        // UNCOMMENT FOR PRODUCTION
        let iconColor = colors.primary;

        //COMMENT OUT FOR PRODUCTION
        let reminderTime = moment(new Date()).format('h:mm a');
        let reminderContent = 'asdf1';
        let icon = 'pill';

        //COMMENT OUT FOR PRODUCTION

        navigation.navigate('AcceptReminderScreen', {
          reminderTime,
          reminderContent,
          icon,
          iconColor,
        });
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // UNCOMMENT FOR PRODUCTION

        // let reminderTile = response.notification.request.content.title;
        // let reminderContent = response.notification.request.content.body;
        // let data = response.notification.request.content.data;

        // let reminderID = data.reminderID;
        // let reminderType = data.reminderType;
        // let reminderTime = data.reminderTime;
        // let reminderDate = data.reminderDate;
        // let icon = icons[reminderType];

        // UNCOMMENT FOR PRODUCTION

        let iconColor = colors.primary;
        // COMMENT OUT FOR PRODUCTION
        let reminderTime = moment(new Date()).format('h:mm a');
        let reminderContent = 'asdf2';
        let icon = 'pill';

        // COMMENT OUT FOR PRODUCTION
        navigation.navigate('AcceptReminderScreen', {
          reminderTime,
          reminderContent,
          icon,
          iconColor,
        });
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

        {reminders.length === 0 && <Text>No reminders today :)</Text>}
        {reminders.length > 0 && (
          // <Text>{reminders[0]["ReminderTitle"]}</Text>
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.ReminderID}
            renderItem={({ item }) => (
              <ReminderBadge
                reminderContent={item.ReminderTitle}
                reminderStatus={item.status}
                dismissed={item.Dismissed}
                reminderDate={item.ReminderDate}
                reminderTime={item.TimeOfDay}
                reminderType={item.ReminderType}
                navigation={navigation}
              />
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
