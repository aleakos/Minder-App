const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const cron = require('node-cron');
const moment = require('moment');

const sendPushNotification = require('./pushToken');
const getRemindersForPatient = require('./reminders');

// const EXPO_CODE = 'ExponentPushToken[mgjDOXKcDE3hvd5cGhZMc7]'; // Jared

cron.schedule('* * * * * *', function () {
  console.log('running a task every second');
  getRemindersForPatient().then(() => {
    console.log('getRemindersForPatient ran');
  });
  //   console.log('done');
  //   sendPushNotification().then(() => {
  //     console.log('notification sent');
  //   });
});
