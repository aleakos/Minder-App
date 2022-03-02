import mysql2 from 'mysql2/promise';

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'albessie',
  database: 'NursingHackathon',
  dateStrings: true,
});

export default db;
