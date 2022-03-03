// console.log(new Date('2022-02-27').getUTCDay());
const moment = require('moment');

// var start = moment('2016-09-01'), // Sept. 1st
//   end = moment('2016-11-02'), // Nov. 2nd
//   day = 1; // Sunday

// var result = [];
// var current = start.clone();

// while (current.day(7 + day).isBefore(end)) {
//   result.push(current.clone());
// }

// console.log(result.map((m) => m.format('LLLL')));

const generateSingleDate = (start, end, day) => {
  var result = [];
  var current = moment(start);

  while (current.day(7 + day).isBefore(end)) {
    result.push(current.clone());
  }

  //   return result.map((m) => m.format('LLLL'));
  return result;
};

const generateDates = (start, end, days) => {
  var result = [];
  for (let weekday of days) {
    generateSingleDate(start, end, weekday).forEach((date) => {
      result.push(date);
    });
  }
  return result;
};

console.log(
  generateDates('2022-02-01', '2022-02-25', [0, 1]).map((m) => m.format('LLLL'))
);
