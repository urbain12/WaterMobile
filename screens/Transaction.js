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

import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
  TransactionHistory,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import axios from 'axios';


const Transaction = ({ route }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState(null);
  const [Names, setNames] = useState('')
  const [IDnumber, setIDnumber] = useState('')
  const [Phonenumber, setPhonenumber] = useState('')
  const [Province, setProvince] = useState('')
  const [District, setDistrict] = useState('')
  const [Sector, setSector] = useState('')
  const [Cell, setCell] = useState('')




  const handleSubmit = (e) => {
    e.preventDefault()
    const postObj = JSON.stringify({
      'Names': Names,
      'Idnumber': IDnumber,
      'phonenumber': Phonenumber,
      'Province': Province,
      'District': District,
      'Sector': Sector,
      'Cell': Cell,

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
    }).catch(err => {
      console.log(err)
    })



  }

  React.useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrency(currency);
  });

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
        <CurrencyLabel currency={`${selectedCurrency?.currency} Service`} />

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
                textAlign: "center",
              }}
              name="Names"
              placeholder="Names"
              onChangeText={text => setNames(text)}
            />
            
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="ID number"
              onChangeText={text => setIDnumber(text)}
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Phone Number"
              onChangeText={text => setPhonenumber(text)}
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Province"
              onChangeText={text => setProvince(text)}
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="District"
              onChangeText={text => setDistrict(text)}
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Sector"
              onChangeText={text => setSector(text)}
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                marginBottom: 10,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Cell"
              onChangeText={text => setCell(text)}
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
