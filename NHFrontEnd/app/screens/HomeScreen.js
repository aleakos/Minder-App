import * as React from "react";
import {StyleSheet, View} from "react-native";
import { Button } from "react-native-elements";
import colors from '../config/colors';



export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={()=>{
            console.log("hello")}}
          title="Learn More"
          buttonStyle={styles.button}
          containerStyle={{ margin: 5 }}
        />
        <Button
          onPress={()=>{
            console.log("hello")}}
          title="Learn More"
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
