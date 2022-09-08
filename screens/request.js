import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  StatusBar,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  LogBox,
  ActivityIndicator,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  RefreshControl
}
  from "react-native";
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import { dummyData, COLORS, SIZES, FONTS, images } from "../constants";
import { EvilIcons, Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const request = ({ navigation }) => {
  const [loading, setloading] = useState('')
  const [Message, setMessage] = useState('')
  const [customer, setCustomer] = useState({})
  const [responses, setResponses] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [myID, setMyID] = useState('')



  useEffect(() => {
    async function setInfo() {

      const id = await AsyncStorage.getItem('user_id')
      setMyID(id)
      axios.get(`http://admin.amazi.rw/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
        console.log(res.data[0].Province)
      }).catch(err => {
        console.log(err)
      })

    }

    setInfo()

  }, [])


  const handleSubmit = (e) => {
    setloading(true)
    e.preventDefault()
    const names = customer.FirstName + ' ' + customer.LastName
    const postObj = JSON.stringify({
      'user': myID,
      'Names': names,
      'Message': Message,
      'phonenumber': customer.user.phone,
      'Province': customer.Province,
      'District': customer.District,
      'Sector': customer.Sector,
      'Cell': customer.Cell,
      'Language': customer.Language,

    })
    console.log(postObj)

    // let my_token = localStorage.getItem('token');

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${my_token}`,
    };
    axios.post('http://admin.amazi.rw/subrequest/create/', postObj).then((res) => {
      console.log(res.status)
      alert('Your request is submitted')
      navigation.navigate('request')
    }).catch(err => {
      console.log(err)
    })

    setTimeout(() => {
      setloading(false)
    }, 5000)



  }


  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    async function setInfo2() {
      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://admin.amazi.rw/technicianreqbyid/${id}`).then((res) => {
        setResponses(res.data)
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })

    }

    setInterval(() => {
      setInfo2()
    }, 500)


  }, []);

  return (

    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor='#0A2133' barStyle="light-content" />
      <View
        style={{
          width: "100%",
          height: 120,
          ...styles.shadow,
        }}
      >
        <ImageBackground source={images.banner_settings} resizeMode="cover" style={{ flexDirection: 'row', flex: 1, alignItems: "center", }}>

          <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: '25%', alignItems: 'center', justifyContent: 'center', marginTop: '8%' }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', marginTop: '8%', flexDirection: 'row' }}>


            <Text style={{ color: 'white', fontSize: 18 }}>Technician Response</Text>
          </View>
        </ImageBackground>
      </View>



      <ScrollView style={{ backgroundColor: "#f4f6fc" }}>
        {JSON.stringify(responses) !== 'null' && JSON.stringify(responses) !== '[]' ? (
          responses.map(response => {
            return (
              <>
                <View style={styles.container} >
                  <Text style={{ color: "grey", marginRight: 15, marginBottom: 5, alignSelf: 'flex-end', fontSize: 12 }}>{response.send_at}</Text>
                  <View style={styles.gradient}>
                    <Text style={styles.text}>{response.Message}</Text>
                  </View>
                </View>
                <View style={styles.container2}>
                  <Text style={{ color: "grey", marginLeft: 15, marginBottom: 5, alignSelf: 'flex-start', fontSize: 12 }}>{response.send_at}</Text>
                  <View>
                    <View style={styles.gradient2} >
                      {response.techname !== null ? (
                        <>
                        <Text style={styles.text2}>{response.reply}</Text>
                        <Text style={{color: '#000',textAlign: "left",borderBottomWidth:1,borderBottomColor:"red"}}>Technician Details</Text>
                        <Text style={styles.text2}>{response.techname}</Text>
                        <Text style={styles.text2}>{response.techphone}</Text>
                        <Text style={styles.text2}>{response.techdate}</Text>
                        </>
                      ):(
                      <Text style={styles.text2}>{response.reply}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </>
            )
          })
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Response yet...</Text>
          </View>
        )}
      </ScrollView>
      <View>
        <TouchableOpacity onPress={() => { setIsVisible(true) }} style={{ width: '90%', alignSelf: 'center', justifyContent: 'center', marginVertical: 20, borderWidth: 1, borderColor: '#fff', backgroundColor: "#00b4e3", height: 50, flexDirection: "row", alignItems: "center", borderRadius: 20 }}>
          <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }}>Request Technician</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isVisible}
        transparent={true}
        animationType={'slide'}
        hasBackdrop={true}
        backdropColor={"#000"}
        backdropOpacity={0.80}
      >


        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <>
              <KeyboardAvoidingView behavior="position">
                <View style={{ width: '90%', backgroundColor: '#e8e8f5', borderRadius: 20 }}>
                  <View style={{ backgroundColor: "#f5f6fb", width: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginLeft: 0, height: 60, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>Send Query to technician!</Text>
                  </View>
                  <View style={{ marginTop: 10, paddingHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                      numberOfLines={5}
                      value={Message}
                      multiline={true}
                      placeholder="Explain your query!"
                      placeholderTextColor="#7d7d7d"
                      style={{ borderRadius: 10, width: '90%', height: 100, margin: 20, padding: 20, color: "black", backgroundColor: "#f5f6fb" }}
                      onChangeText={(val) => { setMessage(val) }} />
                  </View>


                  <View style={{ flexDirection: "row", borderTopColor: 'grey', borderTopWidth: 0.6, marginTop: 20, backgroundColor: "#f5f6fb", borderBottomRightRadius: 20, borderBottomLeftRadius: 20, }}>
                    {/* Cancel */}
                    <View style={{ width: "50%" }}>
                      <TouchableOpacity onPress={() => { setIsVisible(!isVisible) }}>
                        <View style={{ height: 50, width: 100, width: '100%', alignItems: 'center', justifyContent: 'center', borderRightColor: 'grey', borderRightWidth: 0.5 }}>

                          <Text style={{ color: '#5c5c5c', fontSize: 20 }}>Cancel</Text>

                        </View>
                      </TouchableOpacity>


                    </View>
                    {/* submit */}
                    <View style={{ width: "50%" }}>
                      <TouchableOpacity onPress={(e) => { handleSubmit(e); setIsVisible(!isVisible) }}>
                        <View style={{ height: 50, width: 100, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                          {loading ? (
                            <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                          ) :
                            (
                              <Text style={{ color: '#5c5c5c', fontSize: 20 }}>submit</Text>
                            )}
                        </View>
                      </TouchableOpacity>


                    </View>


                  </View>
                </View>
              </KeyboardAvoidingView>
            </>
          </View>
        </TouchableWithoutFeedback>




      </Modal>
    </View>
  );
}

export default request;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignSelf: 'flex-end'
  },
  shadow: {
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  duration: {
    color: '#b6b6b6',
    fontSize: 11,
    marginTop: 5,
    marginHorizontal: 10,
    alignSelf: 'flex-end'
  },
  gradient: {
    maxWidth: '60%',
    backgroundColor: '#64d1ce',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  gradient2: {
    maxWidth: '60%',
    backgroundColor: '#dee2e6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: '#fff',
  },
  text2: {
    color: '#000',
    textAlign: "left"
  },
  duration2: {
    color: '#b6b6b6',
    fontSize: 11,
    marginHorizontal: 10,
    marginTop: 5,
  },
  container2: {
    marginVertical: 10,
  },
  message2: {
    fontSize: 13,
  },
  Formcontainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#05375a',
    paddingBottom: 2,
    marginHorizontal: 20,
    width: 280,
  },
  icon: {
    marginTop: 20,
    marginBottom: 20,
    color: '#05375a',

  },

  inner: {
    flex: 1,
    justifyContent: "space-around"
  },

  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
})