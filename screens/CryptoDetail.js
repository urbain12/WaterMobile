import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    LogBox,
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';



const CryptoDetail = ({ navigation }) => {
    const [balance, setBalance] = useState(0)
    const [subscriptions, setSubscriptions] = useState([])
    const [payments, setPayments] = useState([])
    const [isAmazi, setIsAmazi] = useState(false)
    useEffect(() => {
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')
            axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
                setBalance(res.data.balance)
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/subscriptions_by_customer/${id}`).then((res) => {
                var subs=[]
                console.log(res.data.length)
                for(var i=0;i<res.data.length;i++){
                    subs.push(res.data[i].Category.Title.toUpperCase())
                    console.log(res.data[i].TotalBalance)
                }
                if(subs.includes('AMAZI')){
                    setIsAmazi(true)
                    console.log('true')
                    const sub=res.data.find(subscr => subscr.Category.Title.toUpperCase()==='AMAZI')
                    console.log(sub.CustomerID)
                    axios.get(`http://wateraccess.t3ch.rw:8234/payments/${sub.id}`).then((res) => {
                        console.log('lkj')
                        setPayments(res.data)
                    }).catch(err => {
                        console.log(err)
                    })
                }
                setSubscriptions(subs)
            }).catch(err => {
                console.log(err)
            })

        }

        setInfo()

    }, [])
    const format = (amount) => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')

    };
    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
    const [customer, setCustomer] = useState({})
    const [category, setCategory] = useState('')
    const [days, setDays] = useState(0)
    const [days2, setDays2] = useState(0)
    const [transactionHistory, setTransactionHistory] = useState([]);

    const windowWidth = Dimensions.get('window').width

    const getInstalmentDays = (my_date) => {
        var sub_date = my_date
        var date = new Date(sub_date)
        var today = new Date()
        var year = new Date().getFullYear()
        var today_month = today.getMonth() + 1
        var day = today.getDate()
        var sub_day = date.getDate()
        if (day <= sub_day) {
            var end_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + sub_day).slice(-2))
            var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
            var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
            // console.log(diffDays)
            setDays2(diffDays)
        }
        else {
            var end_month = today_month + 1
            var end_date = new Date(year + '-' + ('0' + end_month).slice(-2) + '-' + ('0' + sub_day).slice(-2))
            var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
            var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
            // console.log(diffDays)
            setDays2(diffDays)

        }
    }

    const getFilterDays = (my_date) => {
        var sub_date = my_date
        var date = new Date(sub_date)
        var today = new Date()
        var year = new Date().getFullYear()
        var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        var paymentMonths = []
        var month = date.getMonth() + 1
        var today_month = today.getMonth() + 1
        var day = today.getDate()
        var sub_day = date.getDate()
        // console.log(parseInt((today-date)/(1000 * 60 * 60 * 24)))
        for (var i = 0; i < months.length; i++) {
            if (((months[i] - month) % 3) === 0) {
                paymentMonths.push(months[i])
            }
        }
        if (today_month >= paymentMonths[0] && today_month < paymentMonths[1]) {
            if (today_month === paymentMonths[0]) {
                if (day <= sub_day) {
                    var end_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                }
                else {
                    var end_date = new Date(year + '-' + ('0' + paymentMonths[1]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                    console.log('niho bigitangura')
                }
            }
            else {
                var end_date = new Date(year + '-' + ('0' + paymentMonths[1]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                // console.log(diffDays)
                setDays(diffDays)
                // console.log('first')
            }
            console.log('first')
        }

        else if (today_month >= paymentMonths[1] && today_month < paymentMonths[2]) {
            if (today_month === paymentMonths[1]) {
                if (day <= sub_day) {
                    var end_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                }
                else {
                    var end_date = new Date(year + '-' + ('0' + paymentMonths[2]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                    console.log('niho bigitangura')
                }
            }
            else {
                var end_date = new Date(year + '-' + ('0' + paymentMonths[2]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                // console.log(diffDays)
                setDays(diffDays)
                // console.log('second')
            }
            console.log('second')

        }

        else if (today_month >= paymentMonths[2] && today_month < paymentMonths[3]) {
            if (today_month === paymentMonths[2]) {
                if (day <= sub_day) {
                    var end_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                }
                else {
                    var end_date = new Date(year + '-' + ('0' + paymentMonths[3]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                    console.log('niho bigitangura')
                }
            }
            else {
                var end_date = new Date(year + '-' + ('0' + paymentMonths[3]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                // console.log(diffDays)
                setDays(diffDays)
                // console.log('third')
            }
            console.log('third')
        }
        else {
            if (today_month === paymentMonths[3]) {
                if (day <= sub_day) {
                    var end_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                }
                else {
                    var my_year = year + 1
                    var end_date = new Date(my_year + '-' + ('0' + paymentMonths[0]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                    var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                    var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                    // console.log(diffDays)
                    setDays(diffDays)
                    console.log('niho bigitangura')
                }
            }
            else {
                var my_year = year + 1
                var end_date = new Date(my_year + '-' + ('0' + paymentMonths[0]).slice(-2) + '-' + ('0' + sub_day).slice(-2))
                var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
                var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
                // console.log(diffDays)
                setDays(diffDays)
                // console.log('second')
            }
            console.log('ntanakimwe')
        }
        // console.log(paymentMonths)
    }

    React.useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')
            axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
                setCustomer(res.data[0])
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
                setCategory(res.data.category)
                getFilterDays(res.data.subscription_date.slice(0, 10))
                getInstalmentDays(res.data.subscription_date.slice(0, 10))
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/SubscriptionsPayment/${id}`).then((res) => {
                setTransactionHistory(res.data)
            }).catch(err => {
                console.log(err)
            })

        }

        setInfo()


    }, []);



    function renderNotice() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: "#01b0f1",
                    ...styles.shadow
                }}
            >
                <View style={{ width: '10%', marginRight: "2%" }}>
                    <Image
                        source={icons.clap}
                        resizeMode="contain"
                        style={{
                            width: 35,
                            height: 90,
                        }}
                    />

                </View>
                <View style={{ width: '90%', marginLeft: "2%" }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Congratulations!!</Text>
                    {category.toUpperCase() === 'AMAZI' ? (

                        <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18 }}>You are part of the 50 Amazi.rw product users, who have collected and used a total of 20,000L  safe water this Month!!!</Text>
                    ) : (
                        <View>
                            {category.toUpperCase() === 'UHIRA' ? (
                                <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18 }}>This month you saved 100,000 Rwf through the Usage of our UHIRA.RW system!
                                    Encourage your farmer friends to join our UHIRA.RW network!!</Text>
                            ) : (
                                <View>
                                    {category.toUpperCase() === 'INUMA' ? (
                                        <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18 }}>You reduced your carbon footprint by 30% by using INUMA(TM) this month.
                                            Our Goal is to help you achieve 0% carbon footprint through the usage of safe water delivered to you at home!!</Text>
                                    ) : (
                                        <Text></Text>
                                    )}
                                </View>
                            )}
                        </View>
                    )}
                </View>

            </View>
        )
    }




    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 130 }}>
                <View style={{ zIndex: 0, position: 'absolute' }}>
                    <Image resizeMode='cover' source={images.modalbanner} style={{ height: 250, width: windowWidth }} />
                </View>
                <View>
                    <View
                        style={{
                            marginTop: SIZES.padding * 1,
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
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={40}
                                color="white"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '2%',
                            marginLeft: 30
                        }}
                    >
                        {/* Currency */}
                        <View style={{ flex: 1, borderRightWidth: 2, borderRightColor: "white" }}>
                            <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>{days > 0 ? (
                                <Text>{days} Days</Text>
                            ) : (
                                <Text>change your filter</Text>
                            )} </Text>
                            <Text style={{ color: "white" }}>remaining to your next catridge replacement</Text>
                        </View>

                        {/* Amount */}
                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
                                {days2 > 0 ? (
                                    <Text>{days2} Days</Text>
                                ) : (
                                    <Text>Day of payment</Text>
                                )}
                            </Text>
                            <Text style={{ color: "white" }}>remaining to your next Installment</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "80%",
                            paddingVertical: SIZES.padding,
                            paddingHorizontal: SIZES.padding,
                            marginLeft: 40,
                            marginTop: 40,
                            marginRight: SIZES.radius,
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            marginBottom: 15,
                            ...styles.shadow

                        }}

                    >
                        <View style={{ flexDirection: 'row', justifyContent: "center" }}>

                            <View style={{ marginLeft: SIZES.base }}>
                                <Image source={require("../assets/images/Amazi.png")}
                                    style={{
                                        resizeMode: 'contain',
                                        width: "100%",
                                        height: 30,

                                    }}

                                />
                                <View style={{
                                    borderBottomWidth: 2,
                                    borderBottomColor: "#47315a",
                                    width: 50,
                                    marginLeft: 20,
                                    marginTop: 5
                                }}>

                                </View>

                                <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                                    245 <Text style={{ fontSize: 12.5 }}>Happy Clients</Text>
                                </Text>
                            </View>
                        </View>


                    </View>

                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.padding * 1,
                        marginHorizontal: SIZES.padding,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.radius,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius,
                        ...styles.shadow
                    }}
                >


                    <View style={{ flex: 1, marginLeft: SIZES.radius, justifyContent: "center", alignItems: "center" }}>
                        {balance == 0 ? (
                            <Text style={{ ...FONTS.h3, color: 'green' }}>Your instalment is fully paid</Text>
                        ) : (

                            <View>
                                <Text style={{ ...FONTS.h3, fontFamily: "bold" }}>Instalment balance </Text>
                                <Text style={{ color: 'green', textAlign: "center", fontSize: 30, fontFamily: "bold" }}>{JSON.stringify(format(balance)).substring(1, JSON.stringify(format(balance)).length - 4)} Rwf</Text>
                            </View>



                        )}
                    </View>


                </View>

                {renderNotice()}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        marginHorizontal: SIZES.padding,
                        width: '90%',
                        padding: 20,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        ...styles.shadow
                    }}
                >
                    <Text style={{ ...FONTS.h2 }}>Services</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // marginBottom: SIZES.radius
                        }}
                    >
                        {/* Currency */}
                        {category.toUpperCase() === 'AMAZI' ? (
                            <TouchableOpacity style={{ width: "30%" }}>

                                <View >
                                    <View style={{ marginLeft: '3%', backgroundColor: "#01B0F1", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>

                                        <Image
                                            source={icons.filter}
                                            resizeMode="contain"
                                            style={{
                                                width: 75,
                                                height: 120,

                                            }}
                                        />
                                    </View>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", paddingTop: 10 }}>Our systems</Text>
                                </View>
                            </TouchableOpacity>

                        ) : (
                            <TouchableOpacity style={{ width: "30%" }}
                            onPress={() => navigation.navigate('request')}
                            >
                                <View >
                                    <View style={{ marginLeft: '3%', backgroundColor: "#01B0F1", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>

                                        <FontAwesome
                                            name="send"
                                            size={60}
                                            color="white"
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text style={{ textAlign: "center", fontWeight: "bold", paddingTop: 10 }}>Request</Text>
                                </View>

                            </TouchableOpacity>
                        )}

                        {/* Amount */}
                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, width: '30%' }} onPress={() => navigation.navigate("Responses")}>

                            <View >
                                <View style={{ marginLeft: '2%', backgroundColor: "#01B0F1", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>

                                    <FontAwesome name="envelope-open-o" size={70} color="white" />
                                </View>
                                <Text style={{ textAlign: "center", fontWeight: "bold", paddingTop: 10 }}>Responses</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, width: '30%' }}
                            onPress={() => navigation.navigate("query")}

                        >


                            <View >
                                <View style={{ marginLeft: '2%', backgroundColor: "#01B0F1", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>

                                    <Image
                                        source={icons.support}
                                        resizeMode="contain"
                                        style={{
                                            width: 75,
                                            height: 120,
                                        }}
                                    />
                                </View>
                                <Text style={{ textAlign: "center", fontWeight: "bold", paddingTop: 10 }}>Support</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    


                </View>
                {isAmazi && payments.length>0? (
                       
                       <TransactionHistory
                           customContainerStyle={{ ...styles.shadow }}
                           history={payments}
                       />
   
                   ):(
                       <></>
                   )}
            </View>
        </ScrollView>
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

export default CryptoDetail;
