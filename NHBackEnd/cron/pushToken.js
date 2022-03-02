const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const moment = require('moment');

const EXPO_CODE = 'ExponentPushToken[LeeHIYOY4XXC6yOa5e4lx6]'; // alex

async function sendPushNotification(someObject) {
  console.log('sendPushNotification', someObject);
  //   const message = {
  //     to: EXPO_CODE,
  //     sound: 'default',
  //     title: 'Reminder Tile',
  //     body: 'Reminder Body here...',
  //     data: {
  //       reminderID: '123456789',
  //       reminderType: 'diet',
  //       reminderTime: moment(new Date()).format('h:mm a').toString(), // replace with actual time in db
  //       reminderDate: '2020-01-01',
  //     },
  //   };

  //   const res = await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  //   console.log(res);
}

module.exports = sendPushNotification;

sendPushNotification(null);
