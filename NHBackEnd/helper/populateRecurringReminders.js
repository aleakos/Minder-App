var express = require('express')
var router = express.Router()
const db = require('../data/index')
let mysql = require('mysql')
let bodyparser = require('body-parser')
let app = express()
app.use(bodyparser.json())
let generateDates = require('../helper/generateDates')
let populateDaysArray = require('../helper/populateDaysArrays')

//helper function to insert recurring reminder into recurringReminder Table in DB
async function insertRecurringReminder (reminder) {
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
}

//helper function to insert single reminder into DB
async function insertMultiReminder (reminder, date, recurringID) {
  console.log('CALLING INSERT MUILTI REMIDER')
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
      date,
      reminder.time,
      recurringID,
      reminder.reminderType
    ])
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
