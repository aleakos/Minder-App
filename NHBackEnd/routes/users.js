var express = require('express')
var router = express.Router()
const db = require('../data/index')
let mysql = require('mysql')
let bodyparser = require('body-parser')
let app = express()
app.use(bodyparser.json())

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  res.status(200);
});

router.post('/login', async function (req, res, next) {
  //console.log(req.body)
  let sql = 'SELECT * FROM APPUSER WHERE Username = ?'
  const results = await db.promise().query(sql, [req.body.username])
  console.log(results[0][0]);

  // response values
  let resNum, status, user, message;
  // check to see if user exists
  if(results[0].length < 0){
    resNum = 404;
    status = "DENIED"
    message = "User not found";
    user = null;
  }
  else if(results[0][0].PWord != req.password){
    resNum = 404;
    status = "DENIED"
    message = "Password incorrect";
    user = null;
  }
  else {
    resNum = 200;
    status = "APPROVED"
    message = "Welcome";

    let patientSQL = 'SELECT * FROM DEPENDENT WHERE PatientID = ?'
    const patientResults = await db.promise().query(sql, [results[0][0].UID])
    console.log(patientResults);
  }

  res.status(resNum).send({ status, user, message })
})

module.exports = router;
