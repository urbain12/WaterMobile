import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  ActivityIndicator,
  LogBox,
  Animated,
  Alert
} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/Context";

export const AccountDeleted = ({navigation}) => {
    const [customer, setCustomer] = useState({})
    const restoreAlert = () =>
    Alert.alert(
      "Delete",
      "Are you sure you want to restore your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => restoreUser()}
      ]
    );

  const restoreUser = async () => {
    const id = await AsyncStorage.getItem('user_id')
    const obj = JSON.stringify({
      'email': customer.user.email,
      'deleted':false
    })
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
          axios.defaults.xsrfCookieName = "csrftoken";
          axios.defaults.headers = {
            'Content-Type': 'application/json',
            // Authorization: `Token ${my_token}`,
          };
    axios.put(`http://admin.amazi.rw/user_update/${id}/`,obj).then((res)=>{
      alert('Account restored successfully')
      context.signOut()
    })

  }

  useEffect(() => {
    async function setInfo() {
      const id = await AsyncStorage.getItem('user_id')

      axios.get(`http://admin.amazi.rw/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
      }).catch(err => {
        console.log(err)
      })

    }

    setInfo()

  }, [])
  const context = React.useContext(AuthContext)
  return (
    <View style={{ height: "100%", justifyContent: "center", alignItems: "center", alignContent: "center", alignSelf: "center", backgroundColor: "#fff", width: "100%" }}>
          <Text style={{ fontSize: 24, color: "black" }}>Your account was deleted.</Text>

          <TouchableOpacity style={styles.signIn} onPress={() => restoreAlert()}>
            <View style={{ backgroundColor: "red",paddingHorizontal:20, alignItems: "center",alignSelf:"center", borderRadius: 10 }}>
                {/* {data.loading ? (
                    <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                ) :
                ( */}
                    <Text style={{ color: "white",marginVertical:10, fontSize: 16, fontWeight: "bold" }}>Restore your account here!</Text>
                 {/* )} */}

            </View>
          </TouchableOpacity>
        </View>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  
    signIn: {
      width: '100%',
      marginTop:10,
      marginBottom:50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  });