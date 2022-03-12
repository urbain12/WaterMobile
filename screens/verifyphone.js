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
    ImageBackground,
    ActivityIndicator,
    Button
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
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo,SimpleLineIcons } from "@expo/vector-icons";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';


const verifyphone = ( props ) => {
    const [OTP, setOTP] = useState('')
    const [loading, setLoading] = useState(false)



    const handleSubmit = (e) => {
        setLoading(true)
        if (OTP.length > 4) {
            alert('Must be 6 digit');
        }
        else {
            e.preventDefault()
            // const postObj = JSON.stringify({
            //     'FirstName': FirstName,
            //     'LastName': LastName,
            //     'email': email,
            //     'IDnumber': IDnumber,
            //     'phone': Phonenumber,
            //     'Province': Province,
            //     'District': District,
            //     'Sector': Sector,
            //     'Cell': Cell,
            //     'Image': Image,
            //     'Language': Language,

            // })
            const postObj = new FormData();
            postObj.append('otp', OTP)
            postObj.append('phone', props.route.params.phone)
            console.log(postObj)

            // let my_token = localStorage.getItem('token');

            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "multipart/form-data",
                // Authorization: `Token ${my_token}`,
            };

            axios.post('http://admin.amazi.rw/verify_otp/', postObj).then((res) => {
                if(res.data.code==200){
                    alert('Verified')
                props.navigation.navigate('Register',{'phone':props.route.params.phone})
                }
                else{
                    alert('Not match')
                }
                
            }).catch(err => {
                console.log(err)
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
                        }}
                      >
                        <TouchableOpacity
                            style={{
                                width: 150,
                                height: 35,
                                marginRight: '10%',
                                marginTop: 2,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => props.navigation.navigate('checkPhone')}
                        >
                            <Text style={{marginLeft:5,marginTop: 12,color:"white",fontSize:16,fontWeight:"bold"}}> <SimpleLineIcons name="arrow-left" size={25} color="white" style={{marginRight:5}} />  Edit Phone </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Balance */}

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
                <View style={{
                   marginBottom: SIZES.padding,
                   padding: 20,
                   width: "95%",
                   backgroundColor: COLORS.white,
                   ...styles.shadow,
                   marginTop: 30,
                   marginLeft:10
                    
                }}>
                    <Text style={{marginLeft:5,marginBottom:10}}>We have sent Code to this number: {props.route.params.phone} </Text>
                    <View activeOpacity={1}>
                        <TextInput
                            style={{
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "90%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "left",
                                padding: 10,
                                flex: 1,
                                borderBottomWidth: 1
                            }}
                            multiline={false}
                            maxLength={6}
                            keyboardType="numeric"
                            placeholderTextColor="#666666"
                            placeholder="Enter Sent Code"
                            onChangeText={text => setOTP(text)}
                        />
                        <TouchableOpacity
                            onPress={(e) => {
                                handleSubmit(e)
                                // navigation.navigate('Register')
                            }}>

                            <View
                                style={{ backgroundColor: "#009cde", width: "100%", height: 50, alignItems: "center", borderRadius: 10, marginTop: 10 }}
                            >
                                {loading ? (
                                    <ActivityIndicator size='large' color='white' style={{ margin: 15 }} />
                                ) :
                                    (
                                        <Text style={{ color: "white", marginTop: "3%", fontSize: 20, fontWeight: "bold" }}>Verify</Text>
                                    )}
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>




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

export default verifyphone;
