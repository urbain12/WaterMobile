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
    ImageBackground
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
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo } from "@expo/vector-icons";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Register = ({ navigation }) => {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [email, setemail] = useState('')
    const [IDnumber, setIDnumber] = useState('')
    const [Phonenumber, setphone] = useState('')
    const [Province, setProvince] = useState('')
    const [District, setDistrict] = useState('')
    const [Sector, setSector] = useState('')
    const [Cell, setCell] = useState('')
    const [Language, setLanguage] = useState('')


    const handleSubmit = (e) => {
        if (FirstName.length < 2) {
            alert('Please Enter first Name');
        }
        else if (LastName.length < 2) {
            alert('Please Enter Last Name');
        }
        else if (email.length < 2) {
            alert('Please Enter Email');
        }
        else if (IDnumber.length < 15) {
            alert('Please Enter IDnumber');
        }
        else if (Phonenumber.length < 10) {
            alert('Max length is 10 digit');
        }
        else if (Language.length < 1) {
            alert('Please Enter Language');
        }
        else {
            e.preventDefault()
            const postObj = JSON.stringify({
                'FirstName': FirstName,
                'LastName': LastName,
                'email': email,
                'IDnumber': IDnumber,
                'phone': Phonenumber,
                'Province': Province,
                'District': District,
                'Sector': Sector,
                'Cell': Cell,
                'Language': Language,

            })
            console.log(postObj)

            // let my_token = localStorage.getItem('token');

            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "application/json",
                // Authorization: `Token ${my_token}`,
            };

            axios.post('http://wateraccess.t3ch.rw:8234/register/', postObj).then((res) => {
                console.log(res.status)
                alert('Your are succesful register Please login with credentails sent on your phone number')
                navigation.navigate('Landing')
            }).catch(err => {
                console.log(err)
            })
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
                            paddingTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                            Registration Form
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
            <ScrollView>

                <View style={{
                    marginBottom: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow,
                    marginTop: 10
                }}>

                    <TouchableOpacity activeOpacity={1}>
                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            placeholder="FirstName"
                            onChangeText={text => setFirstName(text)}
                        />

                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            placeholder="LastName"
                            onChangeText={text => setLastName(text)}
                        />
                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            placeholder="Email"
                            onChangeText={text => setemail(text)}
                        />
                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            placeholder="IDnumber"
                            onChangeText={text => setIDnumber(text)}
                        />
                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            maxLength={10}
                            placeholder="phone"
                            onChangeText={text => setphone(text)}
                        />
                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            placeholder="Province"
                            onChangeText={text => setProvince(text)}
                        />
                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            placeholder="Sector"
                            onChangeText={text => setSector(text)}
                        />
                        <TextInput
                            style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                alignSelf: 'center',
                                height: 35,
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                padding: 10
                            }}
                            multiline={true}
                            placeholder="Cell"
                            onChangeText={text => setCell(text)}
                        />
                        <Picker
                            style={{
                                marginTop: 20,
                                width: '100%',
                                alignSelf: 'center'
                            }}
                            selectedValue={Language}
                            onValueChange={(val) => { setLanguage(val) }}
                        >
                            <Picker.Item label="Select preferably language" value="" />
                            <Picker.Item value="Kinyarwanda" label="Kinyarwanda" />
                            <Picker.Item value="English" label="English" />
                        </Picker>
                        <TextButton
                            label="Request"
                            onPress={(e) => { handleSubmit(e) }}

                        />

                    </TouchableOpacity>
                </View>


            </ScrollView>


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

export default Register;
