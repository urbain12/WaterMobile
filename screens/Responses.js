import React, { useEffect, useState } from "react";
import {
  Text,
  StatusBar,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  LogBox
}
  from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'



const Responses = (props) => {
  const [responses, setResponses] = useState([])

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    async function setInfo() {
      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://admin.amazi.rw/requestbyid/${id}`).then((res) => {
        setResponses(res.data)
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })

    }

    setInfo()


  }, []);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='#4263ec' barStyle="light-content" />
      <ImageBackground source={images.banner_settings} style={{ margin: 0, flexDirection: 'row' }}>

        <View style={{
          width: '20%',
          alignItems: 'center',
          marginTop: '10%',
          marginBottom: '10%'
        }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <SimpleLineIcons name="arrow-left" size={25} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </View>

        <View style={{
          width: '60%',
          alignItems: 'center',
          marginTop: '10%',
          marginBottom: '10%'
        }}>
          <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>Responses</Text>
        </View>

        <View style={{
          width: '20%',
          alignItems: 'center',
          marginTop: '10%',
          marginBottom: '10%'
        }}>
        </View>

      </ImageBackground>

      <ScrollView style={{ backgroundColor: "#f4f6fc", }}>


        {JSON.stringify(responses) !== 'null' && JSON.stringify(responses) !== '[]' ? (
          responses.map(response => {
            return (
              <View>
                <View style={styles.container}>
                  <Text style={{ color: "black", marginRight: 15, marginBottom: 5 }}>Me</Text>
                  <View style={styles.gradient}>
                    <Text style={styles.text}>{response.Message} </Text>
                  </View>
                </View>

                <View style={styles.container2}>
                  <View>
                    <Text style={{ color: "black", marginLeft: 10, marginBottom: 5, fontSize: 10 }}>Water Access</Text>
                    <View style={styles.gradient2} >
                      <Text style={styles.text}>{response.reply}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Response yet...</Text>
          </View>
        )}

      </ScrollView>
    </View>
  )
}

export default Responses;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignSelf: 'flex-end'
  },
  duration: {
    color: '#b6b6b6',
    fontSize: 11,
    marginTop: 5,
    marginHorizontal: 10,
    alignSelf: 'flex-end'
  },
  gradient: {
    maxWidth: 220,
    backgroundColor: '#3f423f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  gradient2: {
    maxWidth: 220,
    backgroundColor: '#009cde',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  text: {
    color: '#fff',
  },
  duration2: {
    color: '#b6b6b6',
    fontSize: 11,
    marginHorizontal: 10,
    marginTop: 5,
  },
  container2: {
    flexDirection: 'row',
    marginTop: 5,
    width: 250
  },
  message2: {
    fontSize: 13,
    marginHorizontal: 15,
  }
})



