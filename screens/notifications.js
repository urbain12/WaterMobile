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
    ImageBackground,
    LogBox
} from "react-native";

import {
    HeaderBar,
    CurrencyLabel,
    TextButton,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS, images } from "../constants";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, AntDesign, EvilIcons, FontAwesome5, Entypo, SimpleLineIcons } from "@expo/vector-icons";



const Notification = ({ navigation }) => {
    const [informations, setinformation] = useState([])




    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')
            axios.get(`http://admin.amazi.rw/WaterBuyHistoryPayment/${id}`).then((res) => {
                setinformation(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })

        }

        setInfo()


    }, []);

    const format = (amount) => {
        return Number(amount)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    
      };


    return (

        <>

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
                            paddingBottom: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                            Water Buy Transaction
                        </Text>
                    </View>

                    {/* Trending */}

                </ImageBackground>
            </View>

            <ScrollView style={{ width: "97%" }} showsVerticalScrollIndicator={false}>

                <View style={{ marginTop: 10, marginLeft: 2, }}>



                {JSON.stringify(informations) !== 'null' && JSON.stringify(informations) !=='[]' ? (
                    informations.map(information => {
                    return(
                    <View
                        style={{
                            marginLeft: 10,
                            borderRadius: 8,
                            marginTop:20,
                            backgroundColor: COLORS.white,
                            ...styles.shadow
                        }}
                       >

                        <View style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10,height:80 }}>
                            <View>
                            <FontAwesome5 name="exchange-alt" size={20} color="#009cde" style={{marginTop:20}} />
                            </View>
                            <View style={{ marginLeft: 30,marginBottom:20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{information.Token}</Text>
                                <Text style={{ fontSize: 16,color: '#707070' }}>{JSON.stringify(format(information.Amount)).substring(1,JSON.stringify(format(information.Amount)).length-4)} Rwf</Text>
                                <Text style={{ fontSize: 16,color: '#707070' }}>{information.created_at.slice(0,10)}</Text>
                            </View>
                        </View>
                        


                    </View>
                    )
                    })
                    ) : (
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                          <Text>No Transaction yet...</Text>
                        </View>
                      )}

                </View>
            </ScrollView>
        </>


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

export default Notification;
