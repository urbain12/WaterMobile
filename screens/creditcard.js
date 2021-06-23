import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    LogBox,
} from "react-native";

import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import axios from 'axios';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


const Creditcards = ({ route }) => {
    const [cname, setNames] = useState('')
    const [amount, setAmount] = useState('')
    const [msisdn, setPhonenumber] = useState('')
    const [Email, setEmail] = useState('')
    const [cnumber, setcnumber] = useState('07542121')
    const [details, setdetails] = useState('Water-Access-Rwanda')
    const [pmethod, setpmethod] = useState('cc')

    const handlenames = (val) => {
        setNames(val)
    }
    const handleamount = (val) => {
        setAmount(val)
    }
    const handlephone = (val) => {
        setPhonenumber(val)
    }
    const handlemail = (val) => {
        setEmail(val)
    }


    const handleSubmit = (e) => {
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

        postObj.append('msisdn', msisdn)
        postObj.append('amount', amount)
        postObj.append('cname', cname)
        postObj.append('email', Email)
        postObj.append('details', details)
        postObj.append('cnumber', cnumber)
        postObj.append('pmethod', pmethod)

        axios.post('https://kwetu.t3ch.rw:5070/api/web/index.php?r=v1/app/get-payment-url', postObj, options).then(res => {
            if (res.status === 200) {
                setNames('')
                setPhonenumber('')
                setAmount('')
                setcnumber('')
                setdetails('')
                setpmethod('')
                setEmail('')
                console.log('success')
                console.log(res.data)
                console.log(postObj)
                navigation.navigate('Credit',{ my_url: "igihe.com"})
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                alert('NOT SENT!')
            }
        })
        setTimeout(() => {
        }, 10000)

    };


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
                            placeholder="Names"
                            onChangeText={(val) => { handlenames(val) }}

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
                            maxLength={12}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                            
                            onChangeText={(val) => { handlephone(val) }} />

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
                            placeholder="email"
                            onChangeText={(val) => { handlemail(val) }} />

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
                            placeholder="Amount"
                            keyboardType="numeric"
                            onChangeText={(val) => { handleamount(val) }} />


                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginTop: 20 }}>

                    <TextButton
                        label="Pay"
                        onPress={(event) => {
                            handleSubmit(event)
                        }}
                        style={{ marginTop: 200 }}
                    />
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

export default Creditcards;
