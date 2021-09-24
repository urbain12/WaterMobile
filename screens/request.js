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
} from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
  TransactionHistory,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo } from "@expo/vector-icons";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const request = ({ navigation }) => {
  const [Names, setNames] = useState('')
  const [Message, setMessage] = useState('')
  const [Phonenumber, setPhonenumber] = useState('')
  const [Province, setProvince] = useState('')
  const [District, setDistrict] = useState('')
  const [Sector, setSector] = useState('')
  const [customer, setCustomer] = useState({})
  const [Cell, setCell] = useState('')
  const [category, setCategory] = useState('')
  const [subscriptions, setSubscriptions] = useState('UHIRA')


  useEffect(() => {
    async function setInfo() {

      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
        console.log(res.data[0].Province)
      }).catch(err => {
        console.log(err)
      })
      axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
        setCategory(res.data.category)
      }).catch(err => {
        console.log(err)
      })

    }

    setInfo()

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const names = customer.FirstName + ' ' + customer.LastName
    const postObj = JSON.stringify({
      'Names': names,
      'Message': Message,
      'Subscriptions': subscriptions,
      'category':category,
      'phonenumber': customer.user.phone,
      'Province': customer.Province,
      'District': customer.District,
      'Sector': customer.Sector,
      'Cell': customer.Cell,
      'Language': customer.Language,

    })
    console.log(postObj)
    console.log(category)

    // let my_token = localStorage.getItem('token');

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${my_token}`,
    };
    axios.post('http://wateraccess.t3ch.rw:8234/subrequest/create/', postObj).then((res) => {
      console.log(res.status)
      alert('Your request is submitted')
      navigation.navigate('Home')
    }).catch(err => {
      console.log(err)
    })



  }


  function renderTrade() {

    return (
      <KeyboardAwareScrollView
        contentContaineStyle={{
          display: "flex",
          fleex: 1,
          justifyContent: "space-evenly0",
          alignItems: "center",
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <ScrollView>

          <View>
            <TouchableOpacity activeOpacity={1}>



              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Send Query</Text>
              </View>

              




              <TextInput
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 105,
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

            </TouchableOpacity>
          </View>

          <TextButton
            label="Request"
            onPress={(e) => { handleSubmit(e) }}
            style={{ marginTop: 100 }}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }


  return (
    <KeyboardAwareScrollView 
    
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            marginTop: 25,
            marginBottom: 20,
            marginRight: '80%',
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons
            name="arrow-back"
            size={40}
            color="black"
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View>
      <ScrollView>

          <View style={{marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,}}>
            <TouchableOpacity activeOpacity={1}>



              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Send Request</Text>
              </View>


              <TextInput
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf:'center',
                  height: 105,
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

              <TextButton
            label="Request"
            onPress={(e) => { handleSubmit(e) }}
           
          />

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

export default request;
