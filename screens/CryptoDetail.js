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
    ActivityIndicator,
    TouchableWithoutFeedback,
    StatusBar
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";





const CryptoDetail = ({ navigation }) => {
    const [balance, setBalance] = useState(0)
    const [information, setinformation] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [payments, setPayments] = useState([])
    const [isAmazi, setIsAmazi] = useState(false)
    useEffect(() => {
        async function setInfo() {
            const id = await AsyncStorage.getItem('user_id')

            axios.get(`http://admin.amazi.rw/subscriptions_by_customer/${id}`).then((res) => {
                const sub = res.data.find(el => el.Category.Title.toUpperCase() === "AMAZI")
                setinformation(sub)

                if (sub.From != null) {
                    getFilterDays(sub.From.slice(0, 10))
                    getInstalmentDays(sub.From.slice(0, 10))
                }
                else if (sub.From == null) {
                    setDays2('nulll')
                    setDays('nulll')
                }
                var subs = []
                console.log(sub.From)
                for (var i = 0; i < res.data.length; i++) {
                    subs.push(res.data[i].Category.Title.toUpperCase())
                    console.log(res.data[i].TotalBalance)
                }
                if (subs.includes('AMAZI')) {
                    setIsAmazi(true)
                    console.log('true')
                    const sub = res.data.find(subscr => subscr.Category.Title.toUpperCase() === 'AMAZI')
                    console.log(sub.CustomerID)
                    axios.get(`http://admin.amazi.rw/payments/${sub.id}`).then((res) => {
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

    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const modalHandler = () => {
        setIsVisible(!isVisible);
    };
    const modalHandler2 = () => {
        setIsVisible2(!isVisible2);
    };


    const totalam = information.System != undefined && information.System.total - parseInt(information.Downpayment)
    const Monthly = totalam / information.InstallmentPeriod
    const OverdueAmount = Monthly * information.get_overdue_months
    const subbalance = totalam
    const formatednum = Math.ceil(Monthly)
    console.log('Overdue amount :  ',OverdueAmount)
    const format = (amount) => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')

    };
    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
    const [customer, setCustomer] = useState({})
    const [category, setCategory] = useState('')
    const [days, setDays] = useState('null')
    const [days2, setDays2] = useState('null')
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
            console.log('jhgh:' + diffDays)
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
            axios.get(`http://admin.amazi.rw/getcustomerbyid/${id}`).then((res) => {
                setCustomer(res.data[0])
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://admin.amazi.rw/SubscriptionsPayment/${id}`).then((res) => {
                setTransactionHistory(res.data)
            }).catch(err => {
                console.log(err)
            })

        }

        setInfo()


    }, []);







    return (


        <>
            {days == 'null' && days2 == 'null' ? (

                <View style={{ height: "100%", justifyContent: "center", alignItems: "center", alignContent: "center", alignSelf: "center", backgroundColor: "#009cde", width: "100%" }}>

                    <ActivityIndicator size='large' color='white' />
                    <Text style={{ fontSize: 30, color: "white" }}>Please wait</Text>
                </View>





            ) : (
                <>

                    <View style={{ height: "100%", backgroundColor: "#f2f2f2" }}>

                        <View
                            style={{

                                width: "100%",
                                backgroundColor: "#009cde",
                                flexDirection: "row"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: "15%",
                                    height: 45,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: "10%",
                                }}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <SimpleLineIcons name="arrow-left" size={20} color="white" />

                            </TouchableOpacity>
                            <View style={{
                                width: "85%",
                                height: 45,
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "10%",
                                marginLeft: "14%"


                            }}>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold" }}>
                                    Rain Water is Safe water
                                </Text>
                            </View>

                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1, paddingBottom: 20 }}>
                                <View style={{ zIndex: 0, position: 'absolute' }}>
                                    <View style={{ height: 180, width: windowWidth, backgroundColor: "#009cde", borderBottomLeftRadius:8,borderBottomRightRadius:8, borderBottomLeftRadius:8,borderBottomRightRadius:8, }} />
                                </View>
                                <View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: '5%',
                                            marginLeft: 40
                                        }}
                                    >

                                        {information.complete == true ? (
                                            <>

                                                <View style={{ width: "45%", borderRightWidth: 2, borderRightColor: "white", }}>
                                                    {days > 0 ? (
                                                        <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
                                                            <Text style={{ fontSize: 18, color: "white", fontWeight: "900" }}>{days} Days </Text>
                                                        </Text>
                                                    ) : (
                                                        <Text style={{ fontSize: 18, color: "white", fontWeight: "900" }}>90 Days</Text>
                                                    )}
                                                    <Text style={{ color: "white" }}>Remaining to your filter replacement</Text>
                                                </View>

                                                <View style={{ marginLeft: 20, width: "40%" }}>
                                                    <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>

                                                        {days2 > 0 ? (
                                                            <>
                                                                {JSON.stringify(information) !== '{}' && (
                                                                    <>
                                                                        {information.get_overdue_months > 0 ? (
                                                                            <Text style={{ color: 'red' }}>{(31 - days2) + ((information.get_overdue_months - 1) * 30)} Days</Text>
                                                                        ) : (

                                                                            <Text style={{ fontSize: 18, color: "white", fontWeight: "900" }}>{days2} Days</Text>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <Text style={{ fontSize: 18, color: "white", fontWeight: "900" }}>30 days</Text>
                                                        )}
                                                    </Text>
                                                    {information.get_overdue_months == 0 && <Text style={{ color: "white" }}>Remaining to your next Installment</Text>}
                                                    {information.get_overdue_months > 0 && (
                                                        <>
                                                            <Text style={{ color: "white" }}>overdue to pay installment</Text>
                                                            <Text style={{ color: "white" }}>Pay now to avoid fees</Text>
                                                        </>
                                                    )}
                                                </View>
                                            </>

                                        ) : (

                                            <View style={{ alignItems: "center", alignContent: "center", justifyContent: "center" }}>

                                                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold", marginTop: 20, textAlign: "center" }}>Our team is subscribing you, check back in 24 hours</Text>
                                            </View>





                                        )}

                                        {/* Currency */}
                                    </View>




                                    <View
                                        style={{
                                            width: "85%",
                                            paddingTop: 20,
                                            paddingHorizontal: SIZES.padding,
                                            marginLeft: 20,
                                            marginTop: 70,
                                            marginRight: SIZES.radius,
                                            borderRadius: 8,
                                            backgroundColor: COLORS.white,
                                            marginBottom: 10,
                                            width: "90%",


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


                                                <Text style={{ color: 'white', ...FONTS.body3 }}>
                                                    Rain Water is Safe water
                                                </Text>
                                            </View>
                                        </View>


                                    </View>


                                    {subbalance > 0 && information.complete == true ? (

                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginLeft: 20,
                                                marginTop: SIZES.padding * 1,
                                                paddingVertical: SIZES.padding,
                                                paddingHorizontal: SIZES.radius,
                                                backgroundColor: COLORS.white,
                                                borderRadius: SIZES.radius,
                                                width: "90%",
                                                ...styles.shadow
                                            }}

                                            onPress={() => navigation.navigate('momo')}

                                        >


                                            <View style={{ flex: 1, marginLeft: SIZES.radius }}>


                                                <Text style={{ color: '#009cde', alignSelf: "center", fontSize: 18, fontWeight: "bold" }}>Pay Subscriptions</Text>



                                            </View>


                                        </TouchableOpacity>
                                    ) : (

                                        <>
                                        </>

                                    )}

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
                                        ...styles.shadow,
                                        width: '90%',
                                        marginLeft: 20,

                                    }}
                                >

                                    {information.complete == true ? (

                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>


                                            <View style={{ flexDirection: "row", }}>
                                                <View style={{ width: "45%", alignItems: "flex-start" }}>
                                                    <Text style={{ fontSize: 12, color: '#1B1C1E', fontWeight: "bold" }}>Installment balance </Text>
                                                    <Text style={{ marginTop: 3, color: '#009cde', fontSize: 18, fontWeight: "bold", textAlign: "left" }}>{JSON.stringify(format(information.TotalBalance)).substring(1, JSON.stringify(format(information.System.total)).length - 3)} Rwf</Text>
                                                </View>

                                                <View style={{ width: "45%", alignItems: "flex-start" }}>
                                                    <Text style={{ fontSize: 12, color: '#1B1C1E', fontWeight: "bold", marginLeft: "20%" }}>Monthly payment </Text>
                                                    <Text style={{ marginTop: 3, color: '#009cde', fontSize: 18, fontWeight: "bold", marginLeft: "20%" }}>{JSON.stringify(format(formatednum)).substring(1, JSON.stringify(format(formatednum)).length - 4)} Rwf</Text>
                                                </View>
                                            </View>


                                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                <View style={{ width: "45%", alignItems: "flex-start" }}>
                                                    <Text style={{ fontSize: 12, color: '#1B1C1E', fontWeight: "bold" }}>Overdue Month </Text>
                                                    <Text style={{ marginTop: 3, color: '#009cde', fontSize: 18, fontWeight: "bold" }}>{information.get_overdue_months}</Text>
                                                </View>

                                                <View style={{ width: "45%", alignItems: "flex-start" }}>
                                                    <Text style={{ fontSize: 12, color: '#1B1C1E', fontWeight: "bold", marginLeft: "20%" }}>Overdue Amount </Text>
                                                    <Text style={{ marginTop: 3, color: '#009cde', fontSize: 18, fontWeight: "bold", marginLeft: "20%" }}>{Math.ceil(OverdueAmount)} Rwf</Text>
                                                </View>

                                            </View>


                                        </View>
                                    ) : (

                                        <View style={{ flex: 1, marginLeft: SIZES.radius, justifyContent: "center", alignItems: "center", width: '90%', }}>


                                            <View>
                                                <Text style={{ fontSize: 18, fontWeight: "bold", color: '#009cde' }}>Descriptions </Text>
                                                <Text style={{ color: '#707070', fontSize: 18, marginTop: 10 }}>To ensure all taps provide safe water and encourage rain water harvesting, Amazi provides first flush diverter systems and point of entry filtration systems. With this solution, households, schools, clinics can save on their water bill in the rain season while reducing the amount of run-off water that would otherwise cause flooding. The systems come with a one-year warranty. Filters include in-line filters, table-top, portable and Aquatabs Chlorinators</Text>
                                            </View>

                                        </View>




                                    )}







                                </View>

                                <View
                                    style={{
                                        marginTop: 20,
                                        marginHorizontal: SIZES.padding,
                                        width: '90%',
                                        padding: 20,
                                        borderRadius: SIZES.radius,
                                        backgroundColor: COLORS.white,
                                        ...styles.shadow,
                                        marginLeft: 20,


                                    }}
                                >
                                    <Text style={{ ...FONTS.h2, marginLeft: 10, }}>Services</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 10,
                                            alignItems: "center",
                                            alignContent: "center",
                                            justifyContent: "center"

                                            // marginBottom: SIZES.radius
                                        }}
                                    >
                                        {/* Currency */}
                                        {category.toUpperCase() === 'AMAZI' ? (
                                            <TouchableOpacity style={{ width: "30%" }}>

                                                <View >
                                                    <View style={{ marginLeft: '3%', backgroundColor: "#009cde", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>

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
                                            <TouchableOpacity style={{ width: "30%", marginLeft: 10, }}
                                                onPress={() => navigation.navigate('request')}
                                            >
                                                <View >
                                                    <View style={{ marginLeft: '3%', backgroundColor: "#009cde", width: '80%', height: 90, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>

                                                        <FontAwesome
                                                            name="send"
                                                            size={24}
                                                            color="white"
                                                            resizeMode="contain"
                                                        />
                                                    </View>
                                                    <Text style={{ textAlign: "left", fontWeight: "bold", paddingTop: 10, marginLeft: 9.5 }}>Request</Text>
                                                </View>

                                            </TouchableOpacity>
                                        )}

                                        {/* Amount */}
                                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, width: '30%' }} onPress={() => navigation.navigate("Responses")}>

                                            <View >
                                                <View style={{ marginLeft: '3%', backgroundColor: "#009cde", width: '80%', height: 90, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>

                                                    <FontAwesome name="envelope-open-o" size={24} color="white" />
                                                </View>
                                                <Text style={{ textAlign: "left", fontWeight: "bold", paddingTop: 10, marginLeft: '4%' }}>Responses</Text>
                                            </View>
                                        </TouchableOpacity>


                                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, width: '30%' }}
                                            onPress={() => navigation.navigate("query")}

                                        >


                                            <View >
                                                <View style={{ marginLeft: '3%', backgroundColor: "#009cde", width: '80%', height: 90, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>

                                                    <Image
                                                        source={icons.support}
                                                        resizeMode="contain"
                                                        style={{
                                                            width: 24,
                                                            height: 120,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={{ textAlign: "left", fontWeight: "bold", paddingTop: 10, marginLeft: "9%" }}>Support</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>




                                </View>

                                {isAmazi ? (
                                    <>

                                        <TransactionHistory
                                            customContainerStyle={{ ...styles.shadow }}
                                            history={payments}
                                            information={information}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </ScrollView>
                        <View style={{ backgroundColor: "white", height: 80, flexDirection: "row" }}>



                            <TouchableOpacity style={{ marginLeft: "10%", marginTop: 23, width: "33%" }}
                                onPress={() => navigation.navigate('Home')}
                            >

                                <Entypo name="home" size={30} color="#707070" />


                                <Text style={{ color: "#707070", fontSize: 12, marginTop: 5 }}>HOME</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    top: -18,
                                    width: "33%",
                                    marginLeft: "-10%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    ...styles.shadow,
                                }}
                                onPress={() => {
                                    setIsVisible(true);
                                }}

                            >
                                <View

                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 35,
                                        backgroundColor: '#009cde',
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Image
                                        source={icons.transaction}
                                        resizeMode="contain"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            tintColor: COLORS.white,
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: 10, width: "80%", alignItems: "center", justifyContent: "center" }}>

                                    <Text
                                        style={{
                                            color: '#707070', fontFamily: "Roboto-Regular", fontSize: 12, lineHeight: 22
                                        }}
                                    >
                                        QUICK ACCESS
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ marginLeft: "10%", marginTop: 23, width: "33%" }} onPress={() => navigation.navigate("Settings")}>

                                <Ionicons name="settings-sharp" size={30} color="#707070" />


                                <Text style={{ color: "#707070", fontSize: 12, marginLeft: -10 }}>SETTINGS</Text>
                            </TouchableOpacity>

                            <Modal
                animationType="slide"
                visible={isVisible}
                style={{ backgroundColor: "#000000AA", margin: 0 }}
              >

                <TouchableOpacity
                  onPress={modalHandler}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >

                  <TouchableWithoutFeedback>


                    <View
                      style={{
                        height: "36%",
                        width: "95%",
                        backgroundColor: "#fff",
                        borderRadius: 40,

                      }}

                    >
                      <View  style={{ width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden',backgroundColor:"#707070" }}>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

                          <Text style={{ textAlign: "left", fontSize: 24, color: "white", marginTop: 30, paddingBottom: 30,marginLeft:'7%',fontWeight:"bold" }}>
                            Quick Access </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              width: '100%',
                              marginLeft:'5%'
                            }}
                          >

                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '28%' }}

                              onPress={() => { navigation.navigate("Shop"); setIsVisible(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '92%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <FontAwesome
                                  name="shopping-bag"
                                  size={28}
                                  color="#009cde"
                                  resizeMode="contain"
                                />
                              </View>
                              <Text style={{ color:"white",textAlign: "left",  paddingTop: 10,marginLeft:'25%',fontSize:18 }}>Shop</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '28%' }}

                              onPress={() => {
                                setIsVisible2(true); setIsVisible(false);
                              }}
                            >
                              <View style={{ backgroundColor: "white", width: '92%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <Image
                                  source={icons.waterpipe}
                                  resizeMode="contain"
                                  style={{
                                    width: 28,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "left",  paddingTop: 10,marginLeft:'-4%', color: "white",fontSize:18 }}>Maintenance</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '28%' }}

                              onPress={() => { navigation.navigate("query"); setIsVisible(false); }}
                            >
                              <View style={{ backgroundColor: "white", width: '92%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <Image
                                  source={icons.watersupport}
                                  resizeMode="contain"
                                  style={{
                                    width: 28,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "left",  paddingTop: 10,marginLeft:"15%", color: "white",fontSize:18 }}>Support</Text>
                            </TouchableOpacity>

                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>


              {/* modal 2 */}
              <Modal
                animationType="slide"
                visible={isVisible2}
                style={{ backgroundColor: "#000000AA", margin: 0 }}
              >

                <TouchableOpacity
                  onPress={modalHandler2}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >

                  <TouchableWithoutFeedback>


                    <View
                      style={{
                        height: "37%",
                        width: "95%",
                        backgroundColor: "#fff",
                        borderRadius: 40,

                      }}

                    >
                      <View  style={{ width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden',backgroundColor:"#707070" }}>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

                          <Text style={{ textAlign: "center", fontSize: 24, color: "white", marginTop: 30, paddingBottom: 30 }}>
                            Choose Maintenance type </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignContent: "center",
                              width: '100%',
                              alignItems:"center",
                              marginLeft:"4%"
                            }}
                          >

                            <TouchableOpacity style={{ alignItems: "center", marginLeft: '4%', width: '45%' }}

                              onPress={() => { navigation.navigate("request"); setIsVisible2(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '80%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <AntDesign name="tool" size={30} color="#009cde" />
                              </View>
                              <Text style={{ textAlign: "left", fontWeight: "bold", paddingTop: 10,marginLeft:2, color: "white" }}>Request Technician</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '45%' }}

                              onPress={() => { navigation.navigate("Catridgeshop"); setIsVisible2(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '80%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <Image
                                  source={icons.waterpipe}
                                  resizeMode="contain"
                                  style={{
                                    width: 30,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "left", fontWeight: "bold", paddingTop: 10,marginLeft:'12%', color: "white" }}>Catridge shop</Text>
                            </TouchableOpacity>
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>

                        </View>
                    </View>
                </>
            )}
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
        shadowColor: "#707070",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 5,
    },
});

export default CryptoDetail;
