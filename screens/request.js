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
  ImageBackground
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
import { dummyData, COLORS, SIZES, FONTS, images } from "../constants";
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
  


  useEffect(() => {
    async function setInfo() {

      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
        console.log(res.data[0].Province)
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
    axios.post('http://wateraccess.t3ch.rw:8234/subrequest/create/', postObj).then((res) => {
      console.log(res.status)
      alert('Your request is submitted')
      navigation.navigate('Home')
    }).catch(err => {
      console.log(err)
    })



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
                        onPress={() => navigation.goBack()}                    >
                        <Ionicons
                            name="arrow-back"
                            size={40}
                            color="white"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* Balance */}
                <View
                    style={{
                        paddingTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                    Request a technician
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

          <View style={{marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,}}>
            <TouchableOpacity activeOpacity={1}>
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
