import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';
import MainReminderScreen from "./MainReminderScreen";
import SetReminderScreen from "./SetReminderScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator 
      initialRouteName="ViewReminders"
      screenOptions={{
        tabBarStyle: {height: 80},
        tabBarActiveTintColor: '#000000',
      }}
      >
      <Tab.Screen 
          name="ViewReminders" 
          component={MainReminderScreen} 
          options={{ 
              headerShown: false, 
              tabBarIcon: () => (
                <Icon name="time-outline" type={'ionicon'} size={48}/>
              ),
              tabBarShowLabel: false
          }}
      />
      <Tab.Screen 
          name="CreateReminders" 
          component={SetReminderScreen} 
          options={{ 
              headerShown: false, 
              tabBarIcon: () => (
                <Icon name="add-circle-outline" type={'ionicon'} size={48}/>
              ),
              tabBarShowLabel: false
          }}
      />
    </Tab.Navigator>
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

{/* <>
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
</> */}