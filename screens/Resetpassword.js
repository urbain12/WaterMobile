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


const Resetpassword = ({ navigation }) => {

    const [Phonenumber, setphone] = useState('')
    const [loading, setLoading] = useState(false)


;


    const handleSubmit = (e) => {
        setLoading(true)
        if (Phonenumber.length < 10) {
            alert('Max length is 10 digit');
        }
        else {
            e.preventDefault()
            const postObj = JSON.stringify({
                'phone': Phonenumber,
            })
            console.log(postObj)

            // let my_token = localStorage.getItem('token');

            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "application/json",
                // Authorization: `Token ${my_token}`,
            };

            axios.post('http://admin.amazi.rw/api/resetpassword/', postObj).then((res) => {
                console.log(res.status)
                alert('Your reset password sent on your phone number')
                navigation.navigate('Login')
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
                            onPress={() => navigation.navigate('Login')}
                        >
                            <SimpleLineIcons name="arrow-left" size={25} color="white" style={{marginRight:15}} />
                        </TouchableOpacity>
                    </View>

                    {/* Balance */}
                    <View
                        style={{
                            paddingTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                            Reset password
                        </Text>
                    </View>

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
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow,
                    
                    }}>

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
                                borderBottomWidth: 1,
                            }}
                            multiline={true}
                            placeholderTextColor="#666666"
                            keyboardType='numeric'
                            placeholder="Phone Number"
                            onChangeText={text => setphone(text)}
                        />

                        
                        <TouchableOpacity
                            onPress={(e) => {
                                handleSubmit(e)
                            }}
                            style={{
                                height:100
                            }}
                            >

                            <View
                                style={{ backgroundColor: "#009cde", width: "100%",height:"50%",  alignItems: "center", borderRadius: 10, marginTop: 10 }}
                            >
                                {loading ? (
                                    <ActivityIndicator size='large' color='white' style={{ margin: 15 }} />
                                ) :
                                    (
                                        <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Reset password</Text>
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

export default Resetpassword;
