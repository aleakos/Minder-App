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
  if (req.body.recurring === false) {
    let sql = 'INSERT INTO REMINDER VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
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
        req.body.type
      ])
    res.status(200).send({ msg: 'added new one-off reminder' })
  } else {
    let reqSql =
      'INSERT INTO RECURRINGREMINDER VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const results = await db
      .promise()
      .query(reqSql, [
        null,
        req.body.patientID,
        req.body.startDate,
        req.body.endDate,
        req.body.recurringDates.mondays,
        req.body.recurringDates.tuesdays,
        req.body.recurringDates.wednesdays,
        req.body.recurringDates.thursdays,
        req.body.recurringDates.fridays,
        req.body.recurringDates.saturdays,
        req.body.recurringDates.sundays
      ])
    let recurringID = 0
    let recIDSql = 'SELECT MAX((RecurringID))'

    res.status(200).send({ msg: 'added new recurring reminder' })
  }
})

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
