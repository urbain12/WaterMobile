import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  LogBox,
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { WebView } from 'react-native-webview';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
  const [customer, setCustomer] = useState({})
  const [image, setImage] = useState({})
  const [category, setCategory] = useState('')
  const [showAlert, setShowAlert] = useState('')
  const [showNotification, setShowNotification] = useState('')
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [balance, setBalance] = useState(0)

  const dismissAlert = () => {
    AsyncStorage.setItem('showAlert', 'false').then(data => {
      AsyncStorage.getItem('showAlert').then(da => { setShowAlert(da) })
    })

  }

  const dismissNotification = () => {
    AsyncStorage.setItem('showNotification', 'false').then(data => {
      AsyncStorage.getItem('showNotification').then(da => { setShowNotification(da) })
    })

  }

  const windowWidth = Dimensions.get('window').width

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    async function setInfo() {
      const show = await AsyncStorage.getItem('showAlert')
      const notification = await AsyncStorage.getItem('showNotification')
      console.log(show)
      setShowAlert(show)
      setShowNotification(notification)
      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
      }).catch(err => {
        console.log(err)
      })
      axios.get(`http://wateraccess.t3ch.rw:8234/backgroundlist/`).then((res) => {
        setImage(res.data[0])
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
      axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
        setBalance(res.data.balance)
      }).catch(err => {
        console.log(err)
      })

    }

    setInfo()

  }, []);

  function renderHeader() {

    const context = React.useContext(AuthContext)
    return (
      <View
        style={{
          width: "100%",
          height: 290,
          ...styles.shadow,
        }}
      >
        <ImageBackground
          source={images.bannerhome}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* Header Bar */}
          <View
            style={{
              marginTop: SIZES.padding * 2,
              width: "100%",
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
            }}
          >

          </View>

          {/* Balance */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {/* {customer.FirstName} {customer.LastName} */}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {/* {customer.Phone} */}
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {category}
            </Text>

          </View>

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
              Services
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: SIZES.base }}
              data={trending}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderAlert() {
    return (
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
        <Image
          resizeMode='contain'
          source={icons.notification_color}
          style={{
            width: 30,
            height: 30
          }}
        />

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3 }}>Notifications</Text>
          <Text stlye={{ color: "#707070" }}>See your notifications here!!!</Text>
        </View>
        <TouchableOpacity onPress={() => {
          dismissNotification();
          navigation.navigate('Home')
        }}

        >
          <AntDesign name="close" size={24} color="#01b0f1" />
        </TouchableOpacity>

      </View>
    )
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
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: '41%' }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Congratulations!!</Text>
            </View>
            <TouchableOpacity onPress={dismissAlert} style={{ marginBottom: 10 }}>
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

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

  function renderTransactionHistory() {
    return (
      <TransactionHistory
        customContainerStyle={{ ...styles.shadow }}
        history={transactionHistory}
      />
    );
  }

  return (
    <ScrollView>

      <View style={{ flex: 1, paddingBottom: 130 }}>

        <View style={{ zIndex: 0, position: 'absolute' }}>
          <Image resizeMode='cover' source={{ uri: image.Image }} style={{ height: 250, width: windowWidth }} />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: '8%',
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              marginRight: '80%',
              alignItems: "center",
              justifyContent: "center",
            }}
          // onPress={() => navigation.navigate('Shop')}
          >

          </TouchableOpacity>
        </View>




        <ScrollView horizontal snapToInterval={180} decelerationRate="fast" snapToAlignment={"center"} showsHorizontalScrollIndicator={false} >



          <View style={{ flexDirection: "row", marginTop: "20%" }}>



            <TouchableOpacity
              style={{
                width: 150,
                height:100,
                paddingVertical: 15,
                paddingHorizontal: 12,
                marginLeft: 6,
                marginRight: 4,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                marginTop:1,
                ...styles.shadow

              }}
              onPress={() => navigation.navigate("CryptoDetail")}
            >
              <View style={{ flexDirection: 'row' }}>

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
                    245 <Text style={{ fontSize: 10 }}>Happy Clients</Text>
                  </Text>
                </View>
              </View>


            </TouchableOpacity>


            <TouchableOpacity
              style={{
                width: 150,
                height:100,
                paddingVertical: 15,
                paddingHorizontal: 12,
                marginLeft: 6,
                marginRight: 4,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                marginTop:1,
                ...styles.shadow

              }}
              onPress={() => navigation.navigate("uhira")}
            >
              <View style={{ flexDirection: 'row' }}>

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
                    2,342 <Text style={{ fontSize: 10 }}>Happy Clients</Text>
                  </Text>
                </View>
              </View>


            </TouchableOpacity>


            <TouchableOpacity
              style={{
                width: 150,
                height:100,
                paddingVertical: 15,
                paddingHorizontal: 15,
                marginLeft: 6,
                marginRight: 4,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                marginBottom:8,
                ...styles.shadow

              }}
              onPress={() => navigation.navigate("inuma")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base }}>
                  <Image source={require("../assets/images/Inuma.png")}
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
                    3,142 <Text style={{ fontSize: 10 }}>Happy Clients</Text>
                  </Text>
                </View>
              </View>


            </TouchableOpacity>

          </View>

        </ScrollView>
        {balance > 0 ? (

        <TouchableOpacity
          style={{
            flexDirection: 'row',
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

          onPress={() => navigation.navigate('momo')}

        >


          <View style={{ flex: 1, marginLeft: SIZES.radius }}>


            <Text style={{ color: 'green', alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>Pay Subscriptions</Text>



          </View>


        </TouchableOpacity>
        ):(

          <>
          </>

        )}


        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          {showNotification == 'true' && renderAlert()}
        </TouchableOpacity>
        {showAlert == 'true' && renderNotice()}

        {/* {renderTransactionHistory()} */}
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

export default Home;
