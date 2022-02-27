import React, { useState, useEffect } from 'react';
import { View, Platform, Text, Pressable, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../config/colors';

const DateTime = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showTimeAndroid, setShowTimeAndroid] = useState(false);
  const [showStartDateAndroid, setShowStartDateAndroid] = useState(false);
  const [showEndDateAndroid, setShowEndDateAndroid] = useState(false);

  // new Date is hacky but fine for a hackathon
  const saveStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartDateAndroid(false);
  };

  const saveEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndDateAndroid(false);
  };

  const saveTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
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

  const startPickerList = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.iosContainer}>
          <List.Icon color={colors.primary} icon="calendar" />
          <Text
            style={{
              alignSelf: 'center',
            }}
          >
            Set Start Date
          </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={saveStartDate}
            minimumDate={new Date()}
          />
        </View>
      );
    } else {
      return (
        <View>
          <List.Item
            title="Set Start Date"
            left={() => <List.Icon color={colors.primary} icon="calendar" />}
            onPress={setShowStartDateAndroid}
            right={() => (
              <Text
                style={{
                  alignSelf: 'center',
                }}
              >
                {startDate.toDateString()}
              </Text>
            )}
          />
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
    <List.Section>
      <List.Subheader>Some title</List.Subheader>
      {startPickerList()}
      <List.Item
        title="Set End Date"
        left={() => <List.Icon color={colors.primary} icon="calendar" />}
        onPress={() => console.log('end')}
        right={() => (
          <Text
            style={{
              alignSelf: 'center',
            }}
          >
            {endDate.toDateString()}
          </Text>
        )}
      />
      <List.Item
        title="Set End Date"
        left={() => <List.Icon color={colors.primary} icon="clock" />}
        onPress={() => console.log('time')}
        right={() => (
          <Text
            style={{
              alignSelf: 'center',
            }}
          >
            {`${time.getHours()}:${time.getMinutes()}`}
          </Text>
        )}
      />
    </List.Section>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  iosContainer: {
    marginVertical: 25,
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

//           {/* <List.Item
//             title="Set Start Date"
//             left={() => <List.Icon color={colors.primary} icon="calendar" />}
//             right={() => (
//               <DateTimePicker
//                 testID="dateTimePicker"
//                 value={startDate}
//                 mode="date"
//                 is24Hour={true}
//                 display="default"
//                 onChange={saveStartDate}
//                 minimumDate={new Date()}
//               />
//             )}
//           /> */}
// //       style={{
// //         fontSize: 50,
// //         marginTop: Platform.OS === 'ios' ? '10%' : '15%',
// //       }}
// //     >
// //       Placeholder
// //     </Text>
// //     {startDatePicker()}
// //     <Text>{startDate.toDateString()}</Text>
// //     {endDatePicker()}
// //     <Text>{endDate.toDateString()}</Text>
// //     {timePicker()}
// //     <Text>{`${time.getHours()}:${time.getMinutes()}`}</Text>
// //   </View>
// // );
