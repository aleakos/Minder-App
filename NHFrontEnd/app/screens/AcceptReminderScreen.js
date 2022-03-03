import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import colors from '../config/colors';
import axios from "axios";
import { IPV4 } from '@env';

const AcceptReminder = ({navigation, route, user}) => {

  const {time, reminderContent, icon, iconColor, id} = route.params;

  const handleAccept = () => {
    async function acceptReminder(reminderId) {
      let myIP = IPV4;
      // let userID = user.UID;
      try {
        let res = await axios({
          url: `http://${myIP}/accept?PatientID=3&ReminderID=${reminderId}`,
          method: 'put',
          headers: {},
        });
        navigation.navigate("Home")
      } catch (err) {
        console.error(err);
      }
    }
    acceptReminder(id);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View>
        <Text style={styles.reminderText}>{reminderContent}</Text>
      </View>
      <Avatar.Icon
          icon={icon}
          backgroundColor={iconColor}
          style={styles.iconCircle}
          size={144}
        />
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={handleAccept}
      >
        <Text style={styles.acceptText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.acceptText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: 10,
  },
  reminderText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  acceptText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  acceptButton: {
    height: 120,
    width: '75%',
    backgroundColor: colors.accept,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
  },
  acceptPressed: {
    height: 120,
    width: '75%',
    backgroundColor: colors.acceptPressed,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});

export default AcceptReminder;
