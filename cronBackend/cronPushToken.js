import cron from 'node-cron';
import fetch from 'node-fetch';

const EXPO_CODE = 'ExponentPushToken[LeeHIYOY4XXC6yOa5e4lx6]'; // alex
// const EXPO_CODE = 'ExponentPushToken[mgjDOXKcDE3hvd5cGhZMc7]'; // Jared

cron.schedule('* * * * * *', function () {
  console.log('running a task every second');
  sendPushNotification().then(() => {
    console.log('notification sent');
  });
});

async function sendPushNotification() {
  const message = {
    to: EXPO_CODE,
    sound: 'default',
    title: 'Sent Via Cron Job',
    body: 'And here is the body!',

    data: { someData: 'goes here' },
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
