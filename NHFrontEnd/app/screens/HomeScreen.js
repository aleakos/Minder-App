import React, { useState } from 'react';
import {StyleSheet, View, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';
import MainReminderScreen from "./MainReminderScreen";
import SetReminderScreen from "./SetReminderScreen";
import LogoutScreen from "./LogoutScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation, logout, user }) {

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
          children={() => <MainReminderScreen user={user} navigation={navigation}/>} 
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
          children={() => <SetReminderScreen user={user} navigation={navigation}/>} 
          options={{ 
              headerShown: false, 
              tabBarIcon: () => (
                <Icon name="add-circle-outline" type={'ionicon'} size={48}/>
              ),
              tabBarShowLabel: false
          }}
      />
      <Tab.Screen 
          name="Logout" 
          children={() => <LogoutScreen logout={logout} navigation={navigation}/>} 
          options={{ 
              headerShown: false, 
              tabBarIcon: () => (
                <Icon name="log-out-outline" type={'ionicon'} size={48}/>
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