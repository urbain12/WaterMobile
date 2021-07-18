import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
  TransactionHistory,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Transaction = ({ navigation }) => {
  const [Names, setNames] = useState('')
  const [Message, setMessage] = useState('')
  const [Phonenumber, setPhonenumber] = useState('')
  const [Province, setProvince] = useState('')
  const [District, setDistrict] = useState('')
  const [Sector, setSector] = useState('')
  const [customer, setCustomer] = useState({})
  const [Cell, setCell] = useState('')
  const [service, setservice] = useState('')


  useEffect(()=>{
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
    
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const names=customer.FirstName+' '+customer.LastName
    const postObj = JSON.stringify({
      'Names': names,
      'Message': Message,
      'service': service,
      'phonenumber': customer.user.phone,
      'Province': customer.Province,
      'District': customer.District,
      'Sector': customer.Sector,
      'Cell': customer.Cell,

    })
    console.log(postObj)

    // let my_token = localStorage.getItem('token');

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${my_token}`,
    };

    axios.post('http://wateraccess.t3ch.rw:8234/Request/create/', postObj).then((res) => {
      console.log(res.status)
      alert('Your request is submitted')
      navigation.navigate('Home')
    }).catch(err => {
      console.log(err)
    })



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
            
              <Picker
              style={{
                marginTop:-50
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
                height:105,
                width: "100%",
                marginTop: 10,
                marginBottom: 10,
                textAlign: "center",
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
      </View>
    );
  }

  function renderTransactionHistory() {}

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

export default Transaction;
