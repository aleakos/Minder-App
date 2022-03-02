import cron from 'node-cron';
import fetch from 'node-fetch';
import moment from 'moment';

const EXPO_CODE = 'ExponentPushToken[LeeHIYOY4XXC6yOa5e4lx6]'; // alex
// const EXPO_CODE = 'ExponentPushToken[mgjDOXKcDE3hvd5cGhZMc7]'; // Jared

// cron.schedule('* * * * * *', function () {
//   console.log('running a task every second');
//   sendPushNotification().then(() => {
//     console.log('notification sent');
//   });
// });

async function sendPushNotification() {
  const message = {
    to: EXPO_CODE,
    sound: 'default',
    title: 'Reminder Tile',
    body: 'Reminder Body here...',
    data: {
      reminderID: '123456789',
      reminderType: 'diet',
      reminderTime: moment(new Date()).format('h:mm a').toString(), // replace with actual time in db
      reminderDate: '2020-01-01',
    },
  };

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  console.log(res);
}

sendPushNotification();
