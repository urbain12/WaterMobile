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
    TouchableWithoutFeedback
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";




const CryptoDetail = ({ navigation, }) => {
    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
    const [customer, setCustomer] = useState({})
    const [information, setinformation] = useState({})
    const [category, setCategory] = useState('')
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [balance, setBalance] = useState(0)
    const [days2, setDays2] = useState(0)
    const [isAmazi, setIsAmazi] = useState(false)
    const [payments, setPayments] = useState([])
    const [isVisible, setIsVisible] = useState(false);

    const modalHandler = () => {
        setIsVisible(!isVisible);
    };

    const windowWidth = Dimensions.get('window').width
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
            axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
                setCategory(res.data.category)
                getFilterDays(res.data.subscription_date.slice(0, 10))
                getInstalmentDays(res.data.subscription_date.slice(0, 10))
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://wateraccess.t3ch.rw:8234/subscriptions_by_customer/${id}`).then((res) => {
                const sub = res.data.find(el => el.Category.Title.toUpperCase() === "UHIRA")
                setinformation(sub)
                getInstalmentDays(sub.From.slice(0, 10))
                var subs = []
                var subs = []
                console.log(res.data.length)
                for (var i = 0; i < res.data.length; i++) {
                    subs.push(res.data[i].Category.Title.toUpperCase())
                    console.log(res.data[i].TotalBalance)
                }
                if (subs.includes('UHIRA')) {
                    setIsAmazi(true)
                    console.log('true')
                    const sub = res.data.find(subscr => subscr.Category.Title.toUpperCase() === 'UHIRA')
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

    const OverdueAmount = information.get_total_amount / 12 * information.get_overdue_months
    const Monthly = information.get_total_amount / 12
    const subbalance = information.get_total_amount

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
                <View style={{ width: '92%', marginLeft: "2%" }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Congratulations!!</Text>
                    <View>

                        <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18 }}>This month you saved 100,000 Rwf through the Usage of our UHIRA.RW system!
                            Encourage your farmer friends to join our UHIRA.RW network!!</Text>



                    </View>

                </View>

            </View>
        )
    }




    return (
        <View style={{ height: "100%" }}>
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
                            <View>
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
                        <View
                            style={{
                                width: "85%",
                                paddingVertical: SIZES.padding,
                                paddingHorizontal: SIZES.padding,
                                marginLeft: 25,
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
                                    <Image source={require("../assets/images/Uhira.png")}
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
                                        2,342  <Text style={{ fontSize: 12.5 }}>Happy Clients</Text>
                                    </Text>
                                </View>
                            </View>


                        </View>



                    </View>
                    {subbalance > 0 ? (

                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: "8%",
                                marginTop: SIZES.padding * 1,
                                paddingVertical: SIZES.padding,
                                paddingHorizontal: SIZES.radius,
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.radius,
                                width: "85%",
                                ...styles.shadow
                            }}

                            onPress={() => navigation.navigate('Payuhira')}

                        >


                            <View style={{ flex: 1, marginLeft: SIZES.radius }}>


                                <Text style={{ color: '#01B0F1', alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>Pay Subscriptions</Text>



                            </View>


                        </TouchableOpacity>
                    ) : (

                        <>
                        </>

                    )}



                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginHorizontal: SIZES.padding,
                            paddingVertical: SIZES.padding,
                            paddingHorizontal: SIZES.radius,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            ...styles.shadow
                        }}
                    >

                        {information.complete == true ? (

                            <View style={{ flex: 1, marginLeft: SIZES.radius, justifyContent: "center", alignItems: "center" }}>


                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ marginRight: "8%" }}>
                                        <Text style={{ ...FONTS.h3, color: '#1B1C1E', fontWeight: "bold" }}>Installment balance </Text>
                                        <Text style={{ color: '#01B0F1', fontSize: 25, }}>{JSON.stringify(format(information.TotalBalance)).substring(1, JSON.stringify(format(information.TotalBalance)).length - 4)} Rwf</Text>
                                    </View>

                                    <View>
                                        <Text style={{ ...FONTS.h3, color: '#1B1C1E', fontWeight: "bold" }}>Monthly payment </Text>
                                        <Text style={{ color: '#01B0F1', fontSize: 25, }}>{Math.ceil(Monthly)} Rwf</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                    <View style={{ marginRight: "18%" }}>
                                        <Text style={{ ...FONTS.h3, color: '#1B1C1E', fontWeight: "bold" }}>Overdue Month </Text>
                                        <Text style={{ color: '#01B0F1', fontSize: 30, }}>{information.get_overdue_months}</Text>
                                    </View>

                                    <View>
                                        <Text style={{ ...FONTS.h3, color: '#1B1C1E', fontWeight: "bold" }}>Overdue Amount </Text>
                                        <Text style={{ color: '#01B0F1', fontSize: 30, }}>{Math.ceil(OverdueAmount)}</Text>
                                    </View>

                                </View>


                            </View>
                        ) : (

                            <View style={{ flex: 1, marginLeft: SIZES.radius, justifyContent: "center", alignItems: "center" }}>


                                <View>
                                    <Text style={{ ...FONTS.h3, fontWeight: "bold", color: '#01B0F1' }}>Descriptions </Text>
                                    <Text style={{ color: '#707070', fontSize: 20, }}>Targeted at farmers and off-grid businesses, uhira includes a borehole, a solar pump, a pipeline, elevated storage system and an optional cattle trough or tap system from the tank.</Text>
                                    <Text style={{ color: '#707070', fontSize: 20, marginTop: 5 }}>Our systems allow for reliable access to safe water anywhere, even when living far from surface water. Our team accompanies you from survey to maintenance. </Text>
                                </View>

                            </View>




                        )}



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
                            {category.toUpperCase() === 'UHIRA' ? (
                                <TouchableOpacity style={{ width: "30%" }}

                                >

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

                    {isAmazi ? (

                        <TransactionHistory
                            customContainerStyle={{ ...styles.shadow }}
                            history={payments}
                        />

                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>



            <View style={{ backgroundColor: "white", height: 100, flexDirection: "row" }}>



                <TouchableOpacity style={{ marginLeft: "10%", marginTop: 23, width: "33%" }}
                    onPress={() => navigation.navigate('Home')}
                >

                    <Entypo name="home" size={30} color="black" />


                    <Text style={{ color: "black", fontSize: 12, marginTop: 5 }}>HOME</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        top: -30,
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
                            backgroundColor: '#01B0F1',
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
                </TouchableOpacity>


                <TouchableOpacity style={{ marginLeft: "10%", marginTop: 23, width: "33%" }} onPress={() => navigation.navigate("Settings")}>

                    <Ionicons name="settings-sharp" size={30} color="black" />


                    <Text style={{ color: "black", fontSize: 12, marginLeft: -10 }}>SETTINGS</Text>
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
                                    height: "45%",
                                    width: "95%",
                                    backgroundColor: "#fff",
                                    borderRadius: 40,

                                }}

                            >
                                <ImageBackground source={images.modalbanner} style={{ width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden' }}>


                                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

                                        <Text style={{ textAlign: "center", fontSize: 30, color: "white", marginTop: 30, paddingBottom: 30 }}>
                                            Quick Access </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignContent: "center",
                                                width: '100%'
                                            }}
                                        >

                                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '30%' }}

                                                onPress={() => { navigation.navigate("Shop"); setIsVisible(false); }}

                                            >
                                                <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                                    <FontAwesome
                                                        name="shopping-bag"
                                                        size={80}
                                                        color="#01B0F1"
                                                        resizeMode="contain"
                                                    />
                                                </View>
                                                <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Shop</Text>
                                            </TouchableOpacity>


                                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '30%' }}

                                                onPress={() => { navigation.navigate("Catridgeshop"); setIsVisible(false); }}

                                            >
                                                <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                                    <Image
                                                        source={icons.waterpipe}
                                                        resizeMode="contain"
                                                        style={{
                                                            width: 90,
                                                            height: 120,
                                                            marginLeft: 2,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Maintenance</Text>
                                            </TouchableOpacity>


                                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '30%' }}

                                                onPress={() => { navigation.navigate("query"); setIsVisible(false); }}
                                            >
                                                <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                                    <Image
                                                        source={icons.watersupport}
                                                        resizeMode="contain"
                                                        style={{
                                                            width: 90,
                                                            height: 120,
                                                            marginLeft: 2,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Support</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </ScrollView>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>

            </View>





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

export default CryptoDetail;
