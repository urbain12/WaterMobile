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
    LogBox,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import axios from 'axios';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


const Creditcards = ({ navigation }) => {
    const [cname, setNames] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [msisdn, setPhonenumber] = useState('')
    const [Email, setEmail] = useState('')
    const [customer, setCustomer] = useState('')
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

        postObj.append('msisdn', customer.user.phone)
        postObj.append('amount', amount)
        postObj.append('cname', customer.FirstName + ' ' + customer.LastName)
        postObj.append('email', customer.user.email)
        postObj.append('details', details)
        postObj.append('cnumber', cnumber)
        postObj.append('pmethod', pmethod)

        axios.post('http://war.t3ch.rw:8231/wa-api/api/web/index.php?r=v1/app/get-payment-url', postObj, options).then(res => {
            // if (res.status === 200) {
            const my_data = JSON.parse(res.data)

            setAmount('')

            console.log('success')
            console.log(res.data)
            console.log(my_data.url)
            console.log(postObj)
            if (my_data.success == 1) {
                navigation.navigate('Pay', { my_url: my_data.url })
            }
            else {
                alert('Amount required')
            }
            // }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                alert('NOT SENT!')
            }
        })
        setTimeout(() => {
            setLoading(false)
        }, 5000)

    };

    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')
            axios.get(`http://admin.amazi.rw/getcustomerbyid/${id}`).then((res) => {
                setCustomer(res.data[0])
            }).catch(err => {
                console.log(err)
            })
        }

        setInfo()

    }, []);


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

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 30 }}>Pay Your Subscsription</Text>
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
                            placeholder="Amount"
                            keyboardType="numeric"
                            onChangeText={(val) => { handleamount(val) }} />


                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginTop: 20 }}
                    onPress={(event) => {
                        handleSubmit(event)
                    }}>

                    <View
                        style={{ backgroundColor: "#009cde", width: "100%", height: "50%", alignItems: "center", borderRadius: 10 }}
                    >
                        {loading ? (
                            <ActivityIndicator size='large' color='white' style={{marginTop:10}}/>
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
                    {customer===''?(
                        <></>
                    ):(
                        <>
                        {renderTrade()}
                        </>
                    )}
                    
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
