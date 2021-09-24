import React, { useState } from "react";
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

const CryptoDetail = ({ navigation, }) => {
    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
    const [customer, setCustomer] = useState({})
    const [information, setinformation] = useState({})
    const [category, setCategory] = useState('')
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [balance, setBalance] = useState(0)
    const [days2, setDays2] = useState(0)

    const windowWidth = Dimensions.get('window').width
    const subbalance = information.get_total_amount


    const format = (amount) => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')

    };

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
                setBalance(res.data.balance)
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/SubscriptionsPayment/${id}`).then((res) => {
                setTransactionHistory(res.data)
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
                setCategory(res.data.category)
                getInstalmentDays(res.data.subscription_date.slice(0, 10))
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/subscriptions_by_customer/${id}`).then((res) => {
                const sub = res.data.find(el => el.Category.Title.toUpperCase() === "INUMA")
                setinformation(sub)
            }).catch(err => {
                console.log(err)
            })

        }

        setInfo()

    }, []);

    const OverdueAmount = information.get_total_amount / 12 * information.get_overdue_months
    const Monthly = information.get_total_amount / 12

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
            console.log(diffDays)
            setDays2(diffDays)
        }
        else {
            var end_month = today_month + 1
            var end_date = new Date(year + '-' + ('0' + end_month).slice(-2) + '-' + ('0' + sub_day).slice(-2))
            var start_date = new Date(year + '-' + ('0' + today_month).slice(-2) + '-' + ('0' + day).slice(-2))
            var diffDays = parseInt((end_date - start_date) / (1000 * 60 * 60 * 24))
            console.log(diffDays)
            setDays2(diffDays)

        }
    }



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



                    <View>

                        <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18 }}>You reduced your carbon footprint by 30% by using INUMA(TM) this month.
                            Our Goal is to help you achieve 0% carbon footprint through the usage of safe water delivered to you at home!!</Text>

                    </View>



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
                            justifyContent: 'center',
                            marginTop: '2%',
                            marginLeft: 30
                        }}
                    >


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


                    


                </View>
                {subbalance > 0 ? (

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: "8%",
                            marginTop: 130,
                            paddingVertical: SIZES.padding,
                            paddingHorizontal: SIZES.radius,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            width: "85%",
                            ...styles.shadow
                        }}

                        onPress={() => navigation.navigate('momo')}

                    >


                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>


                            <Text style={{ color: 'green', alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>Pay Subscriptions</Text>



                        </View>


                    </TouchableOpacity>
                ) : (

                    <>
                    </>

                )}

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 40,
                        marginTop: 10,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.radius,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius,
                        width: "80%",
                        ...styles.shadow
                    }}

                    onPress={() => navigation.navigate('paywater')}

                >


                    <View style={{ flex: 1, marginLeft: SIZES.radius }}>


                        <Text style={{ color: 'green', alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>Pay water</Text>



                    </View>


                </TouchableOpacity>
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


                        <View>
                            <Text style={{ ...FONTS.h3, fontFamily: "bold" }}>Instalment balance </Text>
                            <Text style={{ color: 'green', textAlign: "center", fontSize: 30, fontFamily: "bold" }}>{JSON.stringify(format(information.TotalBalance)).substring(1, JSON.stringify(format(information.TotalBalance)).length - 4)} Rwf</Text>
                        </View>



                        <View>
                            <Text style={{ ...FONTS.h3, fontFamily: "bold" }}>Monthly payment </Text>
                            <Text style={{ color: 'green', textAlign: "center", fontSize: 30, fontFamily: "bold" }}>{Math.ceil(Monthly)}</Text>
                        </View>

                        <View>
                            <Text style={{ ...FONTS.h3, fontFamily: "bold" }}>Overdue Month </Text>
                            <Text style={{ color: 'green', textAlign: "center", fontSize: 30, fontFamily: "bold" }}>{information.get_overdue_months}</Text>
                        </View>

                        <View>
                            <Text style={{ ...FONTS.h3, fontFamily: "bold" }}>Overdue Amount </Text>
                            <Text style={{ color: 'green', textAlign: "center", fontSize: 30, fontFamily: "bold" }}>{Math.ceil(OverdueAmount)}</Text>
                        </View>

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
                            marginBottom: SIZES.radius
                        }}
                    >
                        {/* Currency */}
                        {category.toUpperCase() === 'INUMA' ? (
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
