import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Button,
    Text,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { MaterialIcons,Ionicons, MaterialCommunityIcons, AntDesign, EvilIcons, FontAwesome, Entypo} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS,images } from "../constants";
import axios from 'axios';
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


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
    const [Image, setImage] = useState('')
    const [loading, setloading] = useState(false)


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            name:"image.jpg",
            type:"image/jpg",
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


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
                setImage(res.data[0].Image)
                
            }).catch(err => {
                console.log(err)
            })
      
          }
      
          setInfo()
        
    },[])


        const handleSubmit = (e) => {
            
            setloading(true)
            e.preventDefault()
            const postObj = new FormData();
            postObj.append('Image', { type: 'image/jpg', uri: Image, name: 'my_image.jpg' })
            postObj.append('FirstName', FirstName)
            postObj.append('LastName', LastName)
            postObj.append('IDnumber', IDnumber)
            postObj.append('Province', Province)
            postObj.append('District', District)
            postObj.append('Cell', Cell)
            postObj.append('Sector', Sector)
            postObj.append('Language', Language)
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

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Button title="Pick a profile" onPress={pickImage} />
                        </View>

                        <TouchableOpacity activeOpacity={1}>
                  <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
                    <ImageBackground
                      source={{
                        uri: Image,
                      }}
                      style={{ height: 150, width: 150, borderColor: 'black',borderWidth: 0.3 }}
                      imageStyle={{ borderRadius: 15 }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>

                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>

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
                 <ImageBackground source={images.banner_settings} style={{margin:0,flexDirection:'row'}}>

<View style={{
    width:'20%',
    alignItems:'center',
    marginTop:'10%',
    marginBottom:'10%'
}}>
<TouchableOpacity onPress={() => navigation.goBack()}>
<Ionicons name="ios-arrow-back" size={40} color="white" />
</TouchableOpacity>
</View>

<View style={{
    width:'60%',
    alignItems:'center',
    marginTop:'10%',
    marginBottom:'10%'
}}>
  <Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20,marginTop:10}}>Update your information </Text>
</View>

<View style={{
    width:'20%',
    alignItems:'center',
    marginTop:'10%',
    marginBottom:'10%'
}}>
</View>

</ImageBackground>

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
