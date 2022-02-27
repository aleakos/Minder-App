import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper';

import RecurringDates from '../components/RecurringDates';
import DateTime from '../components/DateTime';

import colors from '../config/colors';

const ReminderContent = () => {
  return (
    <Provider>
      <DateTime />
      <RecurringDates />
    </Provider>
  );
};

export default ReminderContent;

const styles = StyleSheet.create({
  innerContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  datesContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-around',
  },
  content: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
});
