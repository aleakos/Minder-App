import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { Avatar } from 'react-native-paper';

import colors from '../config/colors';

const RecurringDates = ({
  mondays,
  tuesdays,
  wednesdays,
  thursdays,
  fridays,
  saturdays,
  sundays,
  setMondays,
  setTuesdays,
  setWednesdays,
  setThursdays,
  setFridays,
  setSaturdays,
  setSundays,
}) => {
  return (
    <View style={styles.datesContainer}>
      <Pressable onPress={() => setMondays(!mondays)}>
        <Avatar.Text
          size={45}
          label="M"
          backgroundColor={mondays ? colors.primary : 'grey'}
        />
      </Pressable>
      <Pressable onPress={() => setTuesdays(!tuesdays)}>
        <Avatar.Text
          size={45}
          label="Tu"
          backgroundColor={tuesdays ? colors.primary : 'grey'}
        />
      </Pressable>
      <Pressable onPress={() => setWednesdays(!wednesdays)}>
        <Avatar.Text
          size={45}
          label="W"
          backgroundColor={wednesdays ? colors.primary : 'grey'}
        />
      </Pressable>
      <Pressable onPress={() => setThursdays(!thursdays)}>
        <Avatar.Text
          size={45}
          label="Th"
          backgroundColor={thursdays ? colors.primary : 'grey'}
        />
      </Pressable>
      <Pressable onPress={() => setFridays(!fridays)}>
        <Avatar.Text
          size={45}
          label="F"
          backgroundColor={fridays ? colors.primary : 'grey'}
        />
      </Pressable>
      <Pressable onPress={() => setSaturdays(!saturdays)}>
        <Avatar.Text
          size={45}
          label="Sa"
          backgroundColor={saturdays ? colors.primary : 'grey'}
        />
      </Pressable>
      <Pressable onPress={() => setSundays(!sundays)}>
        <Avatar.Text
          size={45}
          label="Su"
          backgroundColor={sundays ? colors.primary : 'grey'}
        />
      </Pressable>
    </View>
  );
};

export default RecurringDates;

const styles = StyleSheet.create({
  datesContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
