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
import { dummyData, COLORS, SIZES, FONTS,images } from "../constants";
import axios from 'axios';
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo } from "@expo/vector-icons";



const Changepassword = ({ navigation }) => {
    const [user_id,setUserId]=useState('')
    const [oldpassword, setoldpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setloading] = useState('')


    useEffect(()=>{
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')
            
            setUserId(id)
      
          }
      
          setInfo()
        
    },[])


        const handleSubmit = (e) => {
            if(newpassword!==confirmpassword){
                alert('Your passwords have to match!')
            }
           else{setloading(true)
            e.preventDefault()
            const postObj = JSON.stringify({
                'user_id':user_id,
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

            axios.put('http://wateraccess.t3ch.rw:8234/api/change-password/', postObj).then((res) => {
                console.log(res.status)
                alert('Your request is submitted')
                navigation.navigate('Settings')
            }).catch(error => {
                console.log(error.message)
            })
            
            setTimeout(() => {
                setloading(false)
            }, 500)}


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
                                placeholder="Old password"
                                onChangeText={text => setoldpassword(text)}
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
                                placeholder="New password"
                                onChangeText={text => setnewpassword(text)}
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
                                placeholder="confirm password"
                                onChangeText={text => setconfirmpassword(text)}
                            />


                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ marginTop: 20 }}
                    onPress={(event) => {
                        handleSubmit(event)
                    }}>

                    <View
                        style={{ backgroundColor: "#01B0F1", width: "100%", height: "40%", alignItems: "center", borderRadius: 10 }}
                    >
                        {loading ? (
                            <ActivityIndicator size='large' color='white' style={{marginTop:10}} />
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
            <View style={{flex:1}}>
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
    });

    export default Changepassword;
