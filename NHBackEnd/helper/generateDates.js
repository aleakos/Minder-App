const moment = require('moment');
const db = require('../data/index');

const generateSingleDate = (start, end, day) => {
  var result = [];
  var current = moment(start);

  while (current.day(7 + day).isBefore(end)) {
    result.push(current.clone());
  }

  return result;
};

// where sunday is 0 and saturday is 6
const generateDates = (start, end, days) => {
  var result = [];
  for (let weekday of days) {
    generateSingleDate(start, end, weekday).forEach((date) => {
      result.push(date);
    });
  }
  return result;
};

const insertRecurringReminder = async () => {
  let sql = `INSERT INTO RECURRINGREMINDER
  (PatientID, StartDate, EndDate, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) 
  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const results = await db
    .promise()
    .query(sql, [
      3,
      '2020-02-27',
      '2020-02-27',
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

  console.log(results);
};

const something = async () => {
  let recIDSql = 'SELECT MAX((RecurringID)) FROM RECURRINGREMINDER';
  const recIDResults = await db.promise().query(recIDSql);
  console.log(recIDResults[0]);

  let sql = 'INSERT INTO REMINDER VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const results = await db
    .promise()
    .query(sql, [
      null,
      req.body.patientID,
      req.body.title,
      req.body.description,
      req.body.startDate,
      req.body.time,
      0,
      0,
      null,
      0,
      req.body.type,
    ]);
  res.status(200).send({ msg: 'added new one-off reminder' });
};

module.exports = generateDates;
// console.log(generateDates('2022-03-23', '2022-04-23', [0, 3, 4]))

// insertRecurringReminder();
console.log(
  generateDates('2022-01-27', '2022-02-27', [0, 1]).map((m) =>
    m.format('YYYY-MM-DD')
  )
);

// something();

thing = {
  description: 'f',
  endDate: 'Wed Mar 02 2022',
  recurring: false,
  recurringDates: {
    fridays: true,
    mondays: false,
    saturdays: false,
    sundays: false,
    thursdays: false,
    tuesdays: true,
    wednesdays: false,
  },
  startDate: 'Mon Feb 28 2022',
  time: '6:22',
  title: 'fd',
};

// console.log(new Date(thing.startDate).format('YYYY-MM-DD'));

console.log(new Date().toISOString());
