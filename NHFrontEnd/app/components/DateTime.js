import React, { useState, useEffect } from 'react';
import { View, Platform, Text } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

const DateTime = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showTimeAndroid, setShowTimeAndroid] = useState(false);
  const [showStartDateAndroid, setShowStartDateAndroid] = useState(false);
  const [showEndDateAndroid, setShowEndDateAndroid] = useState(false);

  // new Date is hacky but fine for a hackathon
  const saveStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setStartDate(currentDate);
    setShowStartDateAndroid(false);
  };

  const saveEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setEndDate(currentDate);
    setShowEndDateAndroid(false);
  };

  const saveTime = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setTime(currentTime);
    setShowTimeAndroid(false);
  };

  const showStartDatePicker = () => {
    setShowStartDateAndroid(true);
  };

  const showEndDatePicker = () => {
    setShowEndDateAndroid(true);
  };

  const showTimepicker = () => {
    setShowTimeAndroid(true);
  };

  const startDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView>
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={saveStartDate}
            minimumDate={new Date()}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <Button onPress={showStartDatePicker}>Start Date</Button>
          {showStartDateAndroid && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={saveStartDate}
              minimumDate={new Date()}
            />
          )}
        </View>
      );
    }
  };

  const endDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView>
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={saveEndDate}
            minimumDate={startDate}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <Button onPress={showEndDatePicker}>End Date</Button>

          {showEndDateAndroid && (
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={saveEndDate}
              minimumDate={startDate}
            />
          )}
        </View>
      );
    }
  };

  const timePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView>
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={saveTime}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <Button onPress={showTimepicker}>Reminder Time</Button>
          {showTimeAndroid && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={saveTime}
            />
          )}
        </View>
      );
    }
  };

  //TODO format
  return (
    <View>
      <Text
        style={{
          fontSize: 50,
          marginTop: Platform.OS === 'ios' ? '10%' : '15%',
        }}
      >
        Placeholder
      </Text>
      {startDatePicker()}
      <Text>{startDate.toDateString()}</Text>
      {endDatePicker()}
      <Text>{endDate.toDateString()}</Text>
      {timePicker()}
      <Text>{`${time.getHours()}:${time.getMinutes()}`}</Text>
    </View>
  );
};

export default DateTime;
