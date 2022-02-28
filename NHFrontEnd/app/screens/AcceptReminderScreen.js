import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import colors from '../config/colors';

const AcceptReminder = ({navigation}) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    // send a response to the server
    console.log('Pressed in');
  };
  const handlePressOut = () => {
    setPressed(false);
    console.log('Pressed out');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.timeText}>7:00 AM</Text>
      </View>
      <View>
        <Text style={styles.reminderText}>Take AM Medications</Text>
      </View>
      <Image
        resizeMode="contain"
        style={{
          height: 250,
          width: '50%',
        }}
        source={require('../assets/bottle.png')}
      />
      <Pressable
        style={pressed ? styles.acceptPressed : styles.acceptButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.acceptText}>Accept</Text>
      </Pressable>
      <Pressable
        style={styles.acceptButton}
        onPressIn={() => navigation.navigate("Home")}
      >
        <Text style={styles.acceptText}>Back</Text>
      </Pressable>
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
});

export default AcceptReminder;
