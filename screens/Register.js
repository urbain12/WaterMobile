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
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo } from "@expo/vector-icons";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';


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
    const [Image, setImage] = useState(null)
    const [Language, setLanguage] = useState('')
    const [loading, setLoading] = useState(false)


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage({image: result.uri});
        }
    };


    const handleSubmit = (e) => {
        setLoading(true)
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
                'Image': Image,
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
                    padding: 10,
                    width: "100%",
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
                            placeholder="FirstName"
                            onChangeText={text => setFirstName(text)}
                        />

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
                            placeholder="LastName"
                            onChangeText={text => setLastName(text)}
                        />
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
                            multiline={true}
                            placeholderTextColor="#666666"
                            placeholder="Email"
                            onChangeText={text => setemail(text)}
                        />
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
                            multiline={true}
                            placeholderTextColor="#666666"
                            placeholder="IDnumber"
                            onChangeText={text => setIDnumber(text)}
                        />
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
                            multiline={true}
                            maxLength={10}
                            placeholderTextColor="#666666"
                            placeholder="phone"
                            onChangeText={text => setphone(text)}
                        />
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
                            multiline={true}
                            placeholderTextColor="#666666"
                            placeholder="Province"
                            onChangeText={text => setProvince(text)}
                        />
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
                            multiline={true}
                            placeholder="Sector"
                            placeholderTextColor="#666666"
                            onChangeText={text => setSector(text)}
                        />
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
                            multiline={true}
                            placeholder="Cell"
                            placeholderTextColor="#666666"
                            onChangeText={text => setCell(text)}
                        />
                        <Picker
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                padding: 10,
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

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Button title="Pick an profile" onPress={pickImage} />
                            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
                        </View>
                        <TouchableOpacity
                            onPress={(e) => {
                                handleSubmit(e)
                            }}>

                            <View
                                style={{ backgroundColor: "#01B0F1", width: "100%", height: "25%", alignItems: "center", borderRadius: 10, marginTop: 10 }}
                            >
                                {loading ? (
                                    <ActivityIndicator size='large' color='white' style={{ margin: 15 }} />
                                ) :
                                    (
                                        <Text style={{ color: "white", marginTop: "3%", fontSize: 20, fontWeight: "bold" }}>Register</Text>
                                    )}

                            </View>


                        </TouchableOpacity>

                    </View>
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
