import db from '../data/connection';

const getReminders = async () => {
  let sql = `
    SELECT * FROM REMINDER
    WHERE STR_TO_DATE(CONCAT(ReminderDate, ' ', TimeOfDay), '%Y-%m-%d %H:%i:%s') < NOW()
    AND Deleted = FALSE
    AND ReminderCount = 0;`;
  const results = await db.promise().query(sql);
  return results[0];
};

const incrementReminderCount = async (id) => {
  let sql = `
    UPDATE REMINDER
    SET ReminderCount = ReminderCount + 1
    WHERE ReminderId = ?;`;
  const results = await db.promise().query(sql, [id]);
  console.log(results[0]);
};

async function getRemindersForPatient() {
  result = await getReminders();
  //   console.log(result);
  for (let i = 0; i < result.length; i++) {
    await incrementReminderCount(result[i].ReminderID);
  }
}

getRemindersForPatient();
// incrementReminderCount(1);
