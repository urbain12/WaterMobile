import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  LogBox,
} from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons, AntDesign, EvilIcons, FontAwesome, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";

const Settings = ({ navigation }) => {
  const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
  const [customer, setCustomer] = useState({})
  const [category, setCategory] = useState('')
  const [subscriptions, setSubscriptions] = useState('')
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const modalHandler = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    async function setInfo() {
      const id = await AsyncStorage.getItem('user_id')

      axios.get(`http://wateraccess.t3ch.rw:8234/subscriptions_by_customer/${id}`).then((res) => {

        var subs = []
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          subs.push(res.data[i].Category.Title.toUpperCase())
          console.log(res.data[i].TotalBalance)
        }

        setSubscriptions(subs)
      }).catch(err => {
        console.log(err)
      })

    }

    setInfo()

  }, [])

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

  

  function renderAlert() {
    return <PriceAlert />;
  }


  function renderTransactionHistory() {
    return (
      <TransactionHistory
        customContainerStyle={{ ...styles.shadow }}
        history={transactionHistory}
      />
    );
  }
  const context = React.useContext(AuthContext)
  return (

    <>

    <View
        style={{
          width: "100%",
          height: 200,
        }}
        >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor:"#009cde",
            borderBottomLeftRadius:8,
            borderBottomRightRadius:8
          }}
        >
          {/* Header Bar */}


          {/* Balance */}


          {/* Trending */}
          <View
            style={{
              position: "absolute",
              bottom: "-30%",
            }}
          >
            <Text
              style={{
                marginLeft: SIZES.padding,
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
            </Text>
            <View
              style={{
                width: 120,
                height: 120,
                marginLeft: "-200%",
                marginRight: SIZES.radius,
                borderRadius: 60,
                backgroundColor: COLORS.white,
                marginBottom: 150,
                top:70,
                overflow: "hidden"
              }}
              onPress={() => navigation.navigate("CryptoDetail")}
            >
              <Image source={{ uri: customer.Image }} style={{ width: '100%', height: '100%' }} />
            </View>
          </View>
        </View>
      </View>

    <ScrollView style={{width:"97%"}} showsVerticalScrollIndicator={false}>

        <View style={{ marginTop: 10,marginLeft:2, }}>

          <View
            style={{
              marginLeft:8,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              ...styles.shadow
            }}
          >
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <View style={{ width: '60%' }}>
                <Text style={{ ...FONTS.h2, marginTop: 20, marginLeft: 10 }}>{JSON.stringify(customer) !== '{}' && customer.FirstName} {JSON.stringify(customer) !== '{}' && customer.LastName} </Text>
                <Text style={{ ...FONTS.h5, marginBottom: 10, marginLeft: 12, fontWeight: "bold", fontSize: 15 }}> {customer.Phone}</Text>
              </View>
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end', width: '40%' }}>
                <TouchableOpacity onPress={() => navigation.navigate("UpdateCustomer")}>
                  <Image resizeMode='contain' style={{ width: 30, height: 30, marginRight: 10 }} source={require('../assets/icons/editing.png')} />
                </TouchableOpacity>
              </TouchableOpacity>

            </View>

            <View style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10 }}>
              <View>
                <MaterialIcons name="email" size={25} />
              </View>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Email</Text>
                <Text style={{ color: '#707070' }}>{JSON.stringify(customer) !== '{}' && customer.user.email}</Text>
              </View>
            </View>
            <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f1f1f1",
                    width: "97%",
                    marginLeft: "20%",
                    marginTop: 5
                  }}>

            </View>
            <View style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10 }}>
              <View>
                <Entypo name="location" size={25} />
              </View>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Location</Text>
                <Text style={{ color: '#707070' }}>{customer.Province}, {customer.District}, {customer.Sector}, {customer.Cell}</Text>
              </View>
            </View>
            <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f1f1f1",
                    width: "97%",
                    marginLeft: "20%",
                    marginTop: 5
                  }}>

            </View>
            <TouchableOpacity style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10 }}
              onPress={() => navigation.navigate("Notifications")}
            >
              <View>
                <Entypo name="bell" size={25} color="black" />

              </View>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Notifications</Text>
                <Text style={{ color: '#707070' }}>View your recent notifications</Text>
              </View>
            </TouchableOpacity>
            <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f1f1f1",
                    width: "97%",
                    marginLeft: "20%",
                    marginTop: 5
                  }}>

            </View>
            <View style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10 }}>
              <View>
                <Image resizeMode='contain' style={{ width: 20, height: 20 }} source={require('../assets/icons/subscription.png')} />
              </View>
              <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => navigation.navigate('Home')}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Subscriptions</Text>
                <Text style={{ color: '#707070' }}>{subscriptions.length > 0 && subscriptions.join(', ')}</Text>
              </TouchableOpacity>

            </View>
            <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f1f1f1",
                    width: "97%",
                    marginLeft: "20%",
                    marginTop: 5
                  }}>

            </View>
            <TouchableOpacity style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10 }}

              onPress={() => navigation.navigate("changepassword")}
            >
              <View>
                <MaterialCommunityIcons name="form-textbox-password" size={25} color="black" />
              </View>
              <View style={{ marginLeft: "8%" }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Change password</Text>
                <Text style={{ color: '#707070' }}>Click here to change password</Text>
              </View>
            </TouchableOpacity>
            <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f1f1f1",
                    width: "97%",
                    marginLeft: "20%",
                    marginTop: 5
                  }}>

            </View>

            <TouchableOpacity style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10 }}

              onPress={() => navigation.navigate("query")}
            >
              <View>
                <MaterialCommunityIcons name="email-send" size={25} color="black" />
              </View>
              <View style={{ marginLeft: "8%" }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Contact Us</Text>
                <Text style={{ color: '#707070' }}>Please send any query</Text>
              </View>
            </TouchableOpacity>
            <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f1f1f1",
                    width: "97%",
                    marginLeft: "20%",
                    marginTop: 5
                  }}>

            <TouchableOpacity style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10, marginLeft: 10 }}
              onPress={() => context.signOut()}
            >
              <View>
              <AntDesign name="logout" size={25} color="black" />
              </View>
              <View style={{ marginLeft: "8%" }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sign out</Text>
                <Text style={{ color:"#707070" }}>Click to log out</Text>
              </View>
            </TouchableOpacity>





          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center',marginBottom:100 }}>
          <TouchableOpacity style={{ width: '90%', height: 50, borderBottomWidth: 0.2, borderBottomColor: '#707070' }} onPress={() => {
            setIsVisible(true);
          }}>
            <Text style={{ marginTop: 15, marginLeft: 20, fontSize: 18, fontWeight: "bold", color: "#707070" }}>User Agreement</Text>
          </TouchableOpacity>
          <View style={{ width: '90%', height: 50, borderBottomWidth: 0.2, borderBottomColor: '#707070' }}>
            <Text style={{ marginTop: 15, marginLeft: 20, fontSize: 18, fontWeight: "bold", color: "#707070" }}>Version: 1.0.0</Text>
          </View>






        </View>
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
                borderRadius: 20,

              }}

            >
              <ScrollView>




                <Text style={{ textAlign: "center", fontSize: 30, color: "black", marginTop: 30, paddingBottom: 30 }}>
                  User Agreement </Text>
                <View
                  style={{
                    alignContent: "center",
                    width: '100%',
                  }}
                >
                  <Text style={{ color: 'black', fontSize: 20, paddingHorizontal: 20 }}>

                    To ensure all taps provide safe water and encourage rain water harvesting, Amazi provides first flush diverter systems and point of entry filtration systems. With this solution, households, schools, clinics can save on their water bill in the rain season while reducing the amount of run-off water that would otherwise cause flooding. The systems come with a one-year warranty. Filters include in-line filters, table-top, portable and Aquatabs Chlorinators</Text>


                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
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
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Settings;
