import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import axios from 'axios';


const Paywater = ({ route, navigation }) => {
  const [customer, setCustomer] = useState('')
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
      axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
      }).catch(error => {
        console.log(error.message)
      })

      axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
        setPaidAmount(res.data.paidAmount)

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


      axios.post('http://kwetu.t3ch.rw:5070/api/web/index.php?r=v1/app/send-transaction', postObj, options).then(res => {
        console.log('success')
        console.log(res.data)
        alert('Confirm with your phone and wait for approval')
        navigation.navigate('inuma')
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

                const postObj = JSON.stringify({
                  'Meternumber': customer.Meternumber.id,
                  'Amount': my_data2[0].amount,
                })
                console.log(postObj)
                axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
                axios.defaults.xsrfCookieName = "csrftoken";
                axios.defaults.headers = {
                  'Content-Type': 'application/json',
                  // Authorization: `Token ${my_token}`,
                };

                axios.post('http://wateraccess.t3ch.rw:8234/pay_Water/', postObj).then((res) => {
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
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pay Water</Text>
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
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar right={false} />

      <ScrollView>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          {renderTrade()}
          {renderTransactionHistory()}
        </View>
      </ScrollView>
    </SafeAreaView>
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