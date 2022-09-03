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
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
  TransactionHistory,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS, images } from "../constants";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Transaction = ({ navigation, props }) => {
  const [Message, setMessage] = useState('')
  const [customer, setCustomer] = useState({})
  const [service, setservice] = useState('')
  const [myID, setMyID] = useState('')
  const [loading, setloading] = useState('')



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
      'service': service,
      'phonenumber': customer.user.phone,
      'Province': customer.Province,
      'District': customer.District,
      'Sector': customer.Sector,
      'Cell': customer.Cell,
      'Language': customer.Language,

    })
    console.log(postObj)
    console.log

    // let my_token = localStorage.getItem('token');

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${my_token}`,
    };

    axios.post('http://admin.amazi.rw/Request/create/', postObj).then((res) => {
      console.log(res.status)
      alert('Your request is submitted')
      navigation.navigate('Home')
    }).catch(err => {
      console.log(err)
    })

    setTimeout(() => {
      setloading(false)
    }, 5000)



  }
  const renderHeader = () => {

    return (
      <View
        style={{
          width: "100%",
          height: 120,
          ...styles.shadow,
        }}
      >
        <ImageBackground
          source={images.banner_settings}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* Header Bar */}
          <View
            style={{
              marginTop: 20,
              width: "100%",
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                marginRight: '80%',
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.goBack()}
            >
              <SimpleLineIcons name="arrow-left" size={25} color="white" style={{ marginRight: 15 }} />

            </TouchableOpacity>
          </View>

          {/* Balance */}
          <View
            style={{
              paddingTop: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
              Send query
            </Text>
          </View>

          {/* Trending */}

        </ImageBackground>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView

    >
      <View
      >
        {renderHeader()}
      </View>
      <ScrollView>

        <View style={{
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
          <TouchableOpacity activeOpacity={1}>
            <Picker
              style={{
                width: '100%',
                alignSelf: 'center'
              }}
              selectedValue={service}
              onValueChange={(val) => { setservice(val) }}
            >
              <Picker.Item label="Select Service" value="" />
              <Picker.Item value="Maintenance" label="Maintenance" />
              <Picker.Item value="Claims" label="Claims" />
              <Picker.Item value="Query" label="query" />
            </Picker>




            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                alignSelf: 'center',
                height: 115,
                width: "100%",
                marginTop: 10,
                marginBottom: 10,
                textAlign: "center",
                padding: 10
              }}
              multiline={true}
              name="Names"
              placeholder="Message"
              onChangeText={text => setMessage(text)}
            />

            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={(e) => {
                handleSubmit(e)
              }}>

              <View
                style={{ backgroundColor: "#009cde", width: "100%", height: "30%", alignItems: "center", borderRadius: 10, justifyContent: "center" }}
              >
                {loading ? (
                  <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                ) :
                  (
                    <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Request</Text>
                  )}
              </View>


            </TouchableOpacity>

          </TouchableOpacity>
        </View>


      </ScrollView>


    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Transaction;
