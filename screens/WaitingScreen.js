import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    ActivityIndicator,
    Button
} from "react-native";

const WaitingScreen = () => {
  return (
    <View
      style={styles.container}>
        <ActivityIndicator size='large' color='white' style={{ marginTop: 10,marginBottom: 10,height:80,width:80 }} />
      <Text style={styles.Texties}>Please do not lock screen or switch </Text>
      <Text style={{alignItems:"center",fontSize:20,color:"#fff"}}>to other apps</Text>
    </View>
  )
}
export default WaitingScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"#00b4e3"
    },
    Texties:{
      fontSize:20,
      color:"#fff",
      marginHorizontal:30,
    }
});
