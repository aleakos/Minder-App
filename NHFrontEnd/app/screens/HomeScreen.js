import * as React from "react";
import {StyleSheet, View} from "react-native";
import { Button } from "react-native-elements";
import colors from '../config/colors';



export default function HomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('MainReminderScreen')}
          title="Main Reminders Screen"
          buttonStyle={styles.button}
          containerStyle={{ margin: 5 }}
        />
        <Button
          onPress={() => navigation.navigate('SetReminderScreen')}
          title="Create New Reminder"
          buttonStyle={styles.button}
          containerStyle={{ margin: 5 }}
        />
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  button:{
    width:150,
    backgroundColor: colors.primary
  }
})
