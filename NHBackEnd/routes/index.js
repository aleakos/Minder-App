var express = require('express')
var router = express.Router()
const db = require('../data/index')
let mysql = require('mysql')
let bodyparser = require('body-parser')
let app = express()
app.use(bodyparser.json())

// router.get('/', async function (req, res, next) {
//   const results = await db.promise().query('SELECT * FROM APPUSER')
//   res.status(200).json(results[0])
// })

/* GET all reminders for specific date */
router.get('/date', async function (req, res, next) {
  let { date } = req.query
  // date = new Date(date)
  let sql = 'SELECT * FROM REMINDER WHERE ReminderDate = ?'
  const results = await db.promise().query(sql, [date])
  res.status(200).json(results[0])
})

/* GET all reminders for a particular patient */
router.get('/id', async function (req, res, next) {
  let { id } = req.query
  let sql = 'SELECT * FROM REMINDER WHERE PatientID = ' + mysql.escape(id)
  const results = await db.promise().query(sql)
  console.log(results[0])
  res.status(200).json(results[0])
})

// /* CREATE new one-off reminder */
// router.post('/newReminder', async function (req, res, next) {
//   let {
//     ReminderID,
//     PatientID,
//     ReminderTitle,
//     ReminderContent,
//     ReminderDate,
//     TimeOfDay,
//     Dismissed,
//     ReminderCount,
//     RecurringID,
//     Deleted,
//     ReminderType
//   } = req.body
//   let sql = 'INSERT INTO REMINDER VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
//   const results = await db
//     .promise()
//     .query(sql, [
//       ReminderID,
//       PatientID,
//       ReminderTitle,
//       ReminderContent,
//       ReminderDate,
//       TimeOfDay,
//       Dismissed,
//       ReminderCount,
//       RecurringID,
//       Deleted,
//       ReminderType
//     ])

//   res.status(200).send({ msg: 'added new reminder' })
// })

/* CREATE new one-off reminder */
router.post('/newReminder', async function (req, res, next) {
  console.log(req.body)
  let sql = 'INSERT INTO REMINDER VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const results = await db
    .promise()
    .query(sql, [
      req.body.ReminderID,
      req.body.PatientID,
      req.body.ReminderTitle,
      req.body.ReminderContent,
      req.body.ReminderDate,
      req.body.TimeOfDay,
      req.body.Dismissed,
      req.body.ReminderCount,
      req.body.RecurringID,
      req.body.Deleted,
      req.body.ReminderType
    ])

  res.status(200).send({ msg: 'added new reminder' })
})

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
