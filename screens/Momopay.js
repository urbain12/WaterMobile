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
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, images } from "../constants";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo } from "@expo/vector-icons";

import axios from 'axios';


const Momopay = ({ route, navigation }) => {
  const [customer, setCustomer] = useState('')
  const [Amount, setAmount] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const [Phonenumber, setPhonenumber] = useState('')
  const [paymentcode, setpaymentcode] = useState('1010')
  const [paid, setpaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [information, setinformation] = useState(false)
  const [user_id, setUserId] = useState('')


  useEffect(() => {
    async function setInfo() {
      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
        setPhonenumber(res.data[0].user.phone)
      }).catch(error => {
        console.log(error.message)
        console.log(customer)

      })
      axios.get(`http://wateraccess.t3ch.rw:8234/subscriptions_by_customer/${id}`).then((res) => {
        const sub = res.data.find(el => el.Category.Title.toUpperCase() === "AMAZI")
        setinformation(sub)
        const Monthly = Math.ceil(sub.System.total / 12)
        const month = JSON.stringify(Monthly)
        setAmount(month)
      }).catch(err => {
        console.log(err)
      })

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





  const handleSubmit =  (e) => {
    setLoading(true)
    e.preventDefault();

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


    axios.post('http://kwetu.t3ch.rw:5070/api/web/index.php?r=v1/app/send-transaction', postObj, options).then(res => {
      console.log('success')
      console.log(res.data)
      alert('Confirm with your phone and wait for approval')
      navigation.navigate('Home')
      const setint = setInterval(() => {
        console.log('checking status')
        if (!paid) {
          console.log('not paid yet')
          const my_data = JSON.parse(res.data)
          console.log(my_data.transactionid)
          axios.get(`http://kwetu.t3ch.rw:5070/api/web/index.php?r=v1/app/get-transaction-status&transactionID=${my_data.transactionid}`, options).then(res => {
            const my_data2 = JSON.parse(res.data)
            console.log(my_data2)
            console.log(my_data2[0].payment_status)
            if (my_data2[0].payment_status == "SUCCESSFUL") {


              const setPayment = async ()=>{
                const id =  await AsyncStorage.getItem('user_id')
              console.log(id)
        
        axios.get(`http://wateraccess.t3ch.rw:8234/subscriptions_by_customer/${id}`).then((res) => {
            
          const sub = res.data.find(el => el.Category.Title.toUpperCase() === "AMAZI")
          const postObj = JSON.stringify({
            'customerID': customer.id,
            'amount': my_data2[0].amount,
            'sub_id':sub.id
          })
          console.log(postObj)
          axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
          axios.defaults.xsrfCookieName = "csrftoken";
          axios.defaults.headers = {
            'Content-Type': 'application/json',
            // Authorization: `Token ${my_token}`,
          };

          axios.post('http://wateraccess.t3ch.rw:8234/pay_subscription/', postObj).then((res) => {
            console.log(res.status)
            alert('Subscription paid successfully!!')
            setpaid(true)
            clearInterval(setint)
            navigation.navigate('Home')


          }).catch(error => {
            console.log(error.message)
          })
          

        }).catch(err => {
            console.log(err)
        })
              }

              setPayment();
//======
              

            }

          })
        }

      }, 30000)






    })
    setTimeout(() => {
      setLoading(false)
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
              paddingBottom: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
              Pay Amazi Installment
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
              placeholder="Amount"
              keyboardType="numeric"
              value={Amount}
              onChangeText={text => handleamount(text)}
            />


          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginTop: 20 }}
          onPress={(e) => {
            handleSubmit(e)
          }}>

          <View
            style={{ backgroundColor: "#01B0F1", width: "100%", height: "50%", alignItems: "center", borderRadius: 10 }}
          >
            {loading ? (
              <ActivityIndicator size='large' color='white' style={{ margin: 15 }} />
            ) :
              (
                <Text style={{ color: "white", marginTop: "5%", fontSize: 20, fontWeight: "bold" }}>Pay</Text>
              )}

          </View>


        </TouchableOpacity>
      </View>
    );
  }

  function renderTransactionHistory() { }

  return (
    <View style={{flex:1}}>
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
export default Momopay;