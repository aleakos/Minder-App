var express = require('express')
var router = express.Router()
const db = require('../data/index')
let mysql = require('mysql')
let bodyparser = require('body-parser')
let app = express()
app.use(bodyparser.json())

/* GET all reminders for specific date */
router.get('/getReminder', async function (req, res, next) {
  let { date, id } = req.query
  let sql = 'SELECT * FROM REMINDER WHERE ReminderDate = ? AND PatientID = ?'
  const results = await db.promise().query(sql, [date, id])
  res.status(200).json(results[0])
})

/* CREATE new one-off reminder */
router.post('/newReminder', async function (req, res, next) {
  let reminder = await generateReminder(req)

  if (reminder.recurring === false) {
    let sql = `
      INSERT INTO REMINDER (
      PatientID, 
      ReminderTitle,
      ReminderContent,
      ReminderDate,
      TimeOfDay,
      RecurringID,
      ReminderType
      )
    VALUES(?, ?, ?, ?, ?, ?, ?)`

    const results = await db
      .promise()
      .query(sql, [
        reminder.patientID,
        reminder.title,
        reminder.description,
        reminder.startDate,
        reminder.time,
        null,
        reminder.reminderType
      ])
    res.status(200).send({ msg: 'added new one-off reminder' })
  } else {
    let reqSql = `
        INSERT INTO RECURRINGREMINDER(
        PatientID, 
        StartDate, 
        EndDate, 
        Monday, 
        Tuesday, 
        Wednesday, 
        Thursday, 
        Friday, 
        Saturday, 
        Sunday) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const results = await db
      .promise()
      .query(reqSql, [
        reminder.patientID,
        reminder.startDate,
        reminder.endDate,
        reminder.recurringDates.mondays,
        reminder.recurringDates.tuesdays,
        reminder.recurringDates.wednesdays,
        reminder.recurringDates.thursdays,
        reminder.recurringDates.fridays,
        reminder.recurringDates.saturdays,
        reminder.recurringDates.sundays
      ])
    let recIDSql = 'SELECT MAX((RecurringID)) FROM RECURRINGREMINDER'
    const recIDResults = await db.promise().query(recIDSql)

    res.status(200).send({ msg: 'added new recurring reminder' })
  }
})

async function insertSingleReminder (reminder) {
  let sql = `
      INSERT INTO REMINDER (
      PatientID, 
      ReminderTitle,
      ReminderContent,
      ReminderDate,
      TimeOfDay,
      RecurringID,
      ReminderType
      )
    VALUES(?, ?, ?, ?, ?, ?, ?)`

  const results = await db
    .promise()
    .query(sql, [
      reminder.patientID,
      reminder.title,
      reminder.description,
      reminder.startDate,
      reminder.time,
      null,
      reminder.reminderType
    ])
  res.status(200).send({ msg: 'added new one-off reminder' })
}

async function insertMultiReminder (reminder) {
  let sql = `
      INSERT INTO REMINDER (
      PatientID, 
      ReminderTitle,
      ReminderContent,
      ReminderDate,
      TimeOfDay,
      RecurringID,
      ReminderType
      )
    VALUES(?, ?, ?, ?, ?, ?, ?)`

  const results = await db
    .promise()
    .query(sql, [
      reminder.patientID,
      reminder.title,
      reminder.description,
      reminder.startDate,
      reminder.time,
      null,
      reminder.reminderType
    ])
  res.status(200).send({ msg: 'added new one-off reminder' })
}

const generateReminder = async req => {
  return {
    reminderID: null,
    description: req.body.description,
    endDate: req.body.endDate,
    patientID: req.body.patientID,
    recurring: req.body.recurring,
    recurringDates: {
      fridays: req.body.recurringDates.fridays,
      mondays: req.body.recurringDates.mondays,
      saturdays: req.body.recurringDates.saturdays,
      sundays: req.body.recurringDates.sundays,
      thursdays: req.body.recurringDates.thursdays,
      tuesdays: req.body.recurringDates.tuesdays,
      wednesdays: req.body.recurringDates.wednesdays
    },
    reminderType: req.body.reminderType,
    startDate: req.body.startDate,
    time: req.body.time,
    title: req.body.title
  }
}

// /* CREATE new recurring reminder*/
// router.post('/newRecurringReminder', async function (req, res, next) {
//   let {
//     RecurringID,
//     PatientID,
//     StartDate,
//     EndDate,
//     Monday,
//     Tuesday,
//     Wednesday,
//     Thursday,
//     Friday,
//     Saturday,
//     Sunday
//   } = req.body
//   console.log(new Date(StartDate).getUTCDay())
//   let sql =
//     'INSERT INTO RECURRINGREMINDER VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
//   const results = await db
//     .promise()
//     .query(sql, [
//       RecurringID,
//       PatientID,
//       StartDate,
//       EndDate,
//       Monday,
//       Tuesday,
//       Wednesday,
//       Thursday,
//       Friday,
//       Saturday,
//       Sunday
//     ])

//   res.status(200).send({ msg: 'added new recurring reminder' })
// })

// {
//   "description": "f",
//   "endDate": "Wed Mar 02 2022",
//   "recurring": false,
//   "recurringDates": Object {
//     "fridays": true,
//     "mondays": false,
//     "saturdays": false,
//     "sundays": false,
//     "thursdays": false,
//     "tuesdays": true,
//     "wednesdays": false,
//   },
//   "startDate": "Mon Feb 28 2022",
//   "time": "6:22",
//   "title": "fd",
// }

/* ACCEPT a particular reminder */
router.put('/accept', async function (req, res, next) {
  let { PatientID, ReminderID } = req.query
  let sql =
    'UPDATE REMINDER SET Dismissed = 1 WHERE PatientID = ? AND ReminderID = ?'
  const results = await db.promise().query(sql, [PatientID, ReminderID])
  console.log(results[0])
  res.status(200).json(results[0])
})

module.exports = router
