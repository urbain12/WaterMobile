import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import axios from 'axios';
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';



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
                                <Text style={{ color: "white", marginTop: "5%", fontSize: 20, fontWeight: "bold" }}>Change</Text>
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

    export default Changepassword;
