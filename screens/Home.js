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
  LogBox,
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';

const Home = ({ navigation }) => {
  const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
  const [customer, setCustomer] = useState({})
  const [category, setCategory] = useState('')
  const [transactionHistory, setTransactionHistory] = useState([]);



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

  function renderHeader() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={{
          width: 180,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginRight: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
        onPress={() => navigation.navigate("CryptoDetail", { currency: item })}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginLeft: SIZES.base }}>

            <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
            <View style={{ marginLeft: 10, borderBottomWidth: 2, width: 40, borderBottomColor: "black" }}>
            </View>

            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
              {item.code} <Text style={{ fontSize: 12.5 }}>Happy Clients</Text>
            </Text>

          </View>
        </View>
      </TouchableOpacity>
    );
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
    return <PriceAlert />;
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
        <View style={{ width: '10%' }}>
          <Image
            source={icons.clap}
            resizeMode="contain"
            style={{
              width: 30,
              height: 90,
            }}
          />

        </View>
        <View style={{ width: '90%' }}>
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
        {renderHeader()}
        {renderAlert()}
        {renderNotice()}
        {renderTransactionHistory()}
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
