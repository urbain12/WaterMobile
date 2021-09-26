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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";
import axios from 'axios';
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';



const UpdateCustomer = ({ navigation }) => {
    const [user_id,setUserId]=useState('')
    const [FirstName, setFirstName] = useState('')
    const [customer, setCustomer] = useState({})
    const [LastName, setLastName] = useState('')
    const [IDnumber, setIDnumber] = useState('')
    const [Province, setProvince] = useState('')
    const [District, setDistrict] = useState('')
    const [Cell, setCell] = useState('')
    const [Sector, setSector] = useState('')
    const [Language, setLanguage] = useState('')
    const [loading, setloading] = useState(false)


    useEffect(()=>{
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')
            setUserId(id)
            axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
                setCustomer(res.data[0])
                setFirstName(res.data[0].FirstName)
                setLastName(res.data[0].LastName)
                setIDnumber(res.data[0].IDnumber)
                setProvince(res.data[0].Province)
                setDistrict(res.data[0].District)
                setCell(res.data[0].Cell)
                setSector(res.data[0].Sector)
                setLanguage(res.data[0].Language)
            }).catch(err => {
                console.log(err)
            })
      
          }
      
          setInfo()
        
    },[])


        const handleSubmit = (e) => {
            
            setloading(true)
            e.preventDefault()
            const postObj = JSON.stringify({
                "FirstName":FirstName,
                "LastName":LastName,
                "IDnumber":IDnumber,
                "Province":Province,
                "District":District,
                "Cell":Cell,
                "Sector":Sector,
                "Language":Language,
            })
            console.log(postObj)

            // let my_token = localStorage.getItem('token');

            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                // Authorization: `Token ${my_token}`,
            };

            axios.put(`http://wateraccess.t3ch.rw:8234/UpdateCustomer/${customer.id}/`, postObj).then((res) => {
                console.log(res.status)
                alert('Submitted successfully!!')
                navigation.push('Home')
            }).catch(error => {
                console.log(error.message)
            })
            
            setTimeout(() => {
                setloading(false)
            }, 500)


        }


        function renderTrade() {

            return (
                <View
                    style={{
                        marginTop: SIZES.padding,
                        marginBottom:40,
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
                                placeholder="FirstName"
                                value={FirstName}
                                onChangeText={text => setFirstName(text)}
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
                                placeholder="LastName"
                                value={LastName}
                                onChangeText={text => setLastName(text)}
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
                                placeholder="IDnumber"
                                value={IDnumber}
                                onChangeText={text => setIDnumber(text)}
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
                                placeholder="Province"
                                value={Province}
                                onChangeText={text => setProvince(text)}
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
                                placeholder="District"
                                value={District}
                                onChangeText={text => setDistrict(text)}
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
                                placeholder="Cell"
                                value={Cell}
                                onChangeText={text => setCell(text)}
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
                                placeholder="Sector"
                                value={Sector}
                                onChangeText={text => setSector(text)}
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
                                placeholder="Language"
                                value={Language}
                                onChangeText={text => setLanguage(text)}
                            />


                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ marginTop: 20 }}
                    onPress={(event) => {
                        handleSubmit(event)
                    }}>

                    <View
                        style={{ backgroundColor: "#01B0F1", width: "100%", height: "30%", alignItems: "center", borderRadius: 10 }}
                    >
                        {loading ? (
                            <ActivityIndicator size='large' color='white' style={{marginTop:10}} />
                        ) :
                            (
                                <Text style={{ color: "white", marginTop: "5%", fontSize: 20, fontWeight: "bold" }}>Submit</Text>
                            )}

                    </View>


                </TouchableOpacity>
                </View>
            );
        }

        function renderTransactionHistory() { }

        return (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <HeaderBar right={false} />

                <ScrollView>
                    <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
                        {renderTrade()}
                        {renderTransactionHistory()}
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

    export default UpdateCustomer;
