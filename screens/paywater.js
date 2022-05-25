import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS, images } from "../constants";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import axios from 'axios';


const Paywater = ({ route, navigation }) => {
  const [customer, setCustomer] = useState('')
  const [TokenNumber, setToken] = useState('')
  const [Amount, setAmount] = useState('') 
  const [paidAmount, setPaidAmount] = useState('')
  const [Phonenumber, setPhonenumber] = useState('')
  const [paymentcode, setpaymentcode] = useState('1010')
  const [paid, setpaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user_id, setUserId] = useState('')


  useEffect(() => {
    async function setInfo() {
      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://admin.amazi.rw/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
        setPhonenumber(res.data[0].user.phone)
        console.log(res.data[0].Meternumber.Meternumber)
      }).catch(error => {
        console.log(error.message)
      })

      axios.get(`http://admin.amazi.rw/get_category/${id}`).then((res) => {
        setPaidAmount(res.data.paidAmount)

      }).catch(err => {
        console.log(err)
      })

      // axios.get('http://44.196.8.236:3038/generatePurchase/?payment=1000.00&meternumber=19190189167').then((res) => {
      //   setToken(res.data)
      //   const onlytoken = res.data.slice(-24)
      //   // console.log(TokenNumber)
      //   console.log(onlytoken)
      // }).catch(error => {
      //   console.log(error.message)
      // })



      setUserId(id)

    }

    setInfo()

  }, [])


  const handleamount = (val) => {
    setAmount(val)
  }
  const handlephone = (val) => {
    setPhonenumber(val)
  }





  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    if (Amount < 1000) {
      alert("you not allowed to buy for amount less than 1000")
      navigation.navigate('inuma')

    }
    else {

      const options = {
        headers: {
          "Content-Type": "application/json",
          "app-type": "none",
          "app-version": "v1",
          "app-device": "Postman",
          "app-device-os": "Postman",
          "app-device-id": "0",
          "x-auth": "705d3a96-c5d7-11ea-87d0-0242ac130003"
        }
      };
      const postObj = new FormData();

      postObj.append('phone_number', Phonenumber)
      postObj.append('amount', Amount)
      postObj.append('payment_code', paymentcode)


      axios.post('http://app.amazi.rw/api/web/index.php?r=v1/app/send-transaction', postObj, options).then(res => {
        console.log('success')
        console.log(res.data)
        alert('Confirm with your phone and wait for approval')
        navigation.navigate('WaitingScreen')
        const setint = setInterval(() => {
          console.log('checking status')
          if (!paid) {
            console.log('not paid yet')
            const my_data = JSON.parse(res.data)
            console.log(my_data.transactionid)
            axios.get(`http://app.amazi.rw/api/web/index.php?r=v1/app/get-transaction-status&transactionID=${my_data.transactionid}`, options).then(res => {
              const my_data2 = JSON.parse(res.data)
              console.log(my_data2)
              console.log(my_data2[0].payment_status)
              if (my_data2[0].payment_status == "SUCCESSFUL") {

                const postObj = JSON.stringify({
                  'Meternumber': customer.Meternumber.Meternumber,
                  'Amount': my_data2[0].amount,
                  'Phone': customer.user.phone,
                  'trans_id':my_data.transactionid
                })
                console.log(postObj)
                axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
                axios.defaults.xsrfCookieName = "csrftoken";
                axios.defaults.headers = {
                  'Content-Type': 'application/json',
                  // Authorization: `Token ${my_token}`,
                };

                axios.post('http://admin.amazi.rw/pay_Water/', postObj).then((res) => {
                  console.log(res.status)
                  alert('Water paid successfully!!')
                  setpaid(true)
                  clearInterval(setint)
                  navigation.navigate('inuma')

                }).catch(error => {
                  console.log(error.message)
                })

              }

            })
          }

        }, 30000)






      })
      setTimeout(() => {
        setLoading(false)
      }, 5000)

    }

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
              paddingBottom: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
              Buy Water
            </Text>
          </View>

          {/* Trending */}

        </ImageBackground>
      </View>
    );
  }




  function renderTrade() {

    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <View>
          <TouchableOpacity activeOpacity={1}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            </View>
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                marginBottom: 20,
                textAlign: "center",
              }}
              name="Names"
              maxLength={12}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={Phonenumber}
              onChangeText={text => handlephone(text)}
            />

            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                marginBottom: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Fill the amount"
              keyboardType="numeric"
              onChangeText={text => handleamount(text)}
            />


          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginTop: 20 }}
          onPress={(e) => {
            handleSubmit(e)
          }}>

          <View
            style={{ backgroundColor: "#009cde", width: "100%", height: "50%", alignItems: "center", borderRadius: 10 }}
          >
            {loading ? (
              <ActivityIndicator size='large' color='white' style={{ margin: 15 }} />
            ) :
              (
                <Text style={{ color: "white", marginTop: 15, fontSize: 20, fontWeight: "bold" }}>Buy</Text>
              )}

          </View>


        </TouchableOpacity>
      </View>
    );
  }

  function renderTransactionHistory() { }

  return (
    <View style={{ flex: 1 }}>
      <View>
        {renderHeader()}
      </View>


      <ScrollView>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>

          {renderTrade()}
          {renderTransactionHistory()}
        </View>
      </ScrollView>
    </View>
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
export default Paywater;
