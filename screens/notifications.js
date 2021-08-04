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
import { MaterialIcons, MaterialCommunityIcons, AntDesign, EvilIcons, FontAwesome, Entypo } from "@expo/vector-icons";



const Notifications = ({ navigation }) => {
    const [oldpassword, setoldpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setloading] = useState('')





    const handleSubmit = (e) => {
        if (newpassword !== confirmpassword) {
            alert('Your passwords have to match!')
        }
        else {
            setloading(true)
            e.preventDefault()
            const postObj = JSON.stringify({
                'old_password': oldpassword,
                'new_password': newpassword,


            })
            console.log(postObj)

            // let my_token = localStorage.getItem('token');

            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "application/json",
                // Authorization: `Token ${my_token}`,
            };

            axios.post('http://wateraccess.t3ch.rw:8234/api/change-password/', postObj).then((res) => {
                console.log(res.status)
                alert('Your request is submitted')
                navigation.navigate('Settings')
            }).catch(err => {
                console.log(err)
            })

            setTimeout(() => {
                setloading(false)
            }, 500)
        }


    }


    function renderTrade(message,date) {

        return (
            <View>


                <View
                    style={{
                        marginTop: SIZES.padding,
                        marginHorizontal: SIZES.padding,
                        padding: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        ...styles.shadow,
                        flexDirection: "row"
                    }}

                >
                    <View style={{width:"15%"}}>
                    <AntDesign name="infocirlceo" size={40} color="#35b9e6" style={{marginLeft:-10}} />          
                     </View>
                    <View style={{ width:"75%",}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{date}</Text>
                        <Text style={{ color: '#707070' }}>{message}</Text>
                    </View>
                    <TouchableOpacity style={{width:"10%",alignItems:"center",justifyContent:"center"}}>
                        <AntDesign name="close" size={30} color="red" />
                    </TouchableOpacity>


                </View>


                



            </View>



        );
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar right={false} />

            <ScrollView>
                <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
                    {renderTrade("It is time to change your filters","25/07/2021")}
                    {renderTrade("Subscription paid successfully","02/08/2021")}
                    {renderTrade("Order completed!!","03/08/2021")}
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

export default Notifications;
