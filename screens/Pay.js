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
    ImageBackground
} from "react-native";
import {WebView} from 'react-native-webview'
import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import AsyncStorage from "@react-native-community/async-storage";
import { dummyData, COLORS, SIZES, FONTS,images } from "../constants";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons,Feather, Entypo } from "@expo/vector-icons";
import axios from 'axios';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


const Pay = ({ navigation,route }) => {
    const [cname, setNames] = useState('')
    const [amount, setAmount] = useState('')
    const [msisdn, setPhonenumber] = useState('')
    const [Email, setEmail] = useState('')
    const [customer, setCustomer] = useState({})


    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')
            axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
                setCustomer(res.data[0])
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
                setCategory(res.data.category)
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/SubscriptionsPayment/${id}`).then((res) => {
                setTransactionHistory(res.data)
            }).catch(err => {
                console.log(err)
            })

        }

        setInfo()

    }, []);


    const handleSubmit = () => {
        console.log('ok')
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
        }
        axios.post('https://kwetu.t3ch.rw:5070/api/web/index.php?r=v1/app/get-payment-url', options,).then(res => {
            const my_data = JSON.parse(res.data)
            Linking.openURL(my_data.url)
        }).catch(err => {
            console.log('there is an error')
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
                                marginBottom: 20,
                                textAlign: "center",
                            }}
                            name="Names"
                            maxLength={12}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                            value={JSON.stringify(customer) !== '{}' && customer.user.phone}
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
                                marginBottom: 20,
                                textAlign: "center",
                            }}
                            name="Names"
                            maxLength={12}
                            placeholder="email"
                            keyboardType="numeric"
                            onChangeText={text => setEmail(text)}
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
                            placeholder="Amount"
                            keyboardType="numeric"
                            onChangeText={text => setAmount(text)}
                        />


                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginTop: 20 }}>

                    <TextButton
                        label="Pay"
                        onPress={(e) => { handleSubmit(e) }}
                        style={{ marginTop: 200 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <>
        <ImageBackground
          source={images.modalbanner}
          resizeMode="cover"
          style={{
            height:70
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection:"row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                marginTop:25,
                marginBottom:20,
                marginRight:'80%',
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate('Home')}
            >
              <Ionicons
                name="arrow-back"
                size={40}
                color="white"
                resizeMode="contain"
              />
            </TouchableOpacity>
            
          </View>
        </ImageBackground>
        
        <WebView
        source={{ uri: route.params.my_url }}
      />
      </>
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

export default Pay;
