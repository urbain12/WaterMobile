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
