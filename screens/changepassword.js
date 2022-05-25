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
    ImageBackground
} from "react-native";

import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS, images } from "../constants";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from '@expo/vector-icons/Entypo';
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";



const Changepassword = ({ navigation }) => {
    const [user_id, setUserId] = useState('')
    const [oldpassword, setoldpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setloading] = useState('')
    const [securetext, setsecuretext] = useState(true)
    const [securetext1, setsecuretext1] = useState(true)
    const [securetext2, setsecuretext2] = useState(true)

    const updateSecureTextEntry = () => {
        setsecuretext(!securetext)
    }
    const updateSecureTextEntry1 = () => {
        setsecuretext1(!securetext1)
    }
    const updateSecureTextEntry2 = () => {
        setsecuretext2(!securetext2)
    }


    useEffect(() => {
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')

            setUserId(id)

        }

        setInfo()

    }, [])


    const handleSubmit = (e) => {
        if (newpassword !== confirmpassword) {
            alert('Your passwords have to match!')
        }
        else {
            setloading(true)
            e.preventDefault()
            const postObj = JSON.stringify({
                'user_id': user_id,
                'old_password': oldpassword,
                'new_password': newpassword,


            })
            console.log(postObj)

            // let my_token = localStorage.getItem('token');

            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                // Authorization: `Token ${my_token}`,
            };

            axios.put('http://admin.amazi.rw/api/change-password/', postObj).then((res) => {
                console.log(res.status)
                alert('Your request is submitted')
                navigation.navigate('Settings')
            }).catch(error => {
                console.log(error.message)
            })

            setTimeout(() => {
                setloading(false)
            }, 500)
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
                            onPress={() => navigation.goBack()}
                        >
                            <SimpleLineIcons name="arrow-left" size={25} color="white" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Balance */}
                    <View
                        style={{
                            paddingTop: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                            Change Password
                        </Text>
                    </View>

                    {/* Trending */}

                </ImageBackground>
            </View>
        );
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

                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter old password"
                                placeholderTextColor="#666666"
                                secureTextEntry={securetext ? true : false}
                                style={[styles.textInput, {
                                    color:"black", marginLeft: 10
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => setoldpassword(val)}
                            />
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}>
                                {securetext ?

                                    <Icon
                                        name="eye-with-line"
                                        color="grey"
                                        size={20}
                                        style={{marginTop:20,marginBottom:20}}
                                    />
                                    :
                                    <Icon
                                        name="eye"
                                        color="black"
                                        size={20}
                                        style={{marginTop:20,marginBottom:20}}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter new Password"
                                placeholderTextColor="#666666"
                                secureTextEntry={securetext1 ? true : false}
                                style={[styles.textInput, {
                                    color:"black", marginLeft: 10
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => setnewpassword(val)}
                            />
                            <TouchableOpacity
                                onPress={updateSecureTextEntry1}>
                                {securetext1 ?

                                    <Icon
                                        name="eye-with-line"
                                        color="grey"
                                        size={20}
                                        style={{marginTop:20,marginBottom:20}}
                                    />
                                    :
                                    <Icon
                                        name="eye"
                                        color="black"
                                        size={20}
                                        style={{marginTop:20,marginBottom:20}}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Confirm new Password"
                                placeholderTextColor="#666666"
                                secureTextEntry={securetext2 ? true : false}
                                style={[styles.textInput, {
                                    color:"black", marginLeft: 10
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => setconfirmpassword(val)}
                            />
                            <TouchableOpacity
                                onPress={updateSecureTextEntry2}>
                                {securetext2 ?

                                    <Icon
                                        name="eye-with-line"
                                        color="grey"
                                        size={20}
                                        style={{marginTop:20,marginBottom:20}}
                                    />
                                    :
                                    <Icon
                                        name="eye"
                                        color="black"
                                        size={20}
                                        style={{marginTop:20,marginBottom:20}}
                                    />
                                }
                            </TouchableOpacity>
                        </View>


                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ marginTop: 20 }}
                    onPress={(event) => {
                        handleSubmit(event)
                    }}>

                    <View
                        style={{ backgroundColor: "#009cde", width: "100%", height: "40%", alignItems: "center", borderRadius: 10 }}
                    >
                        {loading ? (
                            <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                        ) :
                            (
                                <Text style={{ color: "white", marginTop: 15, fontSize: 20, fontWeight: "bold" }}>Change</Text>
                            )}

                    </View>


                </TouchableOpacity>
            </View>
        );
    }

    function renderTransactionHistory() { }

    return (
        <View style={{ flex: 1 }}>
            <View>
                {renderHeader()}
            </View>


            <ScrollView>
                <View style={{ flex: 1, paddingBottom: SIZES.padding }}>

                    {renderTrade()}
                    {renderTransactionHistory()}
                </View>
            </ScrollView>
        </View>
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
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 0.3,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 5,
        color: '#05375a',
    },
});

export default Changepassword;
