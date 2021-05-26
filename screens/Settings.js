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
import { MaterialIcons, MaterialCommunityIcons, AntDesign, EvilIcons, FontAwesome, Entypo} from "@expo/vector-icons";
import {AuthContext} from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';

const Settings = ({ navigation }) => {
  const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
  const [customer,setCustomer]=useState({})
  const [category,setCategory]=useState('')
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
            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
              water access
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    const context=React.useContext(AuthContext)
    return (
      <View
        style={{
          width: "100%",
          height: 200,
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
            </Text>
            <View
        style={{
          width: 120,
          height: 120,
          marginLeft: "-600%",
          marginRight: SIZES.radius,
          borderRadius: 60,
          backgroundColor: COLORS.white,
          marginBottom:20,overflow:"hidden"
        }}
        onPress={() => navigation.navigate("CryptoDetail")}
      >
        <Image source={images.tool} style={{width:'100%',height:'100%'}}/>
      </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

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

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 130 }}>
        {renderHeader()}
        
        <View style={{marginTop:20}}>

        <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
            >   
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'60%'}}>
                        <Text style={{ ...FONTS.h2 ,marginTop:20,marginLeft:20}}>Eden Benimana</Text>
                        <Text style={{ ...FONTS.h5 ,marginBottom:10,marginLeft:20}}>+250788888884</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'flex-end',width:'40%'}}>
                        <MaterialCommunityIcons name="pencil-minus" size={24} color="black" />
                        </View>
                    </View>
                    
                    <View style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}>
                        <View>
                            <MaterialIcons name="email" size={30}/>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Email</Text>
                            <Text style={{color:'#707070'}}>eden.benimana@gmail.com</Text>
                        </View>
                    </View>
                    <View style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}>
                        <View>
                            <Entypo name="location" size={30}/>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Location</Text>
                            <Text style={{color:'#707070'}}>KK 696 st-kigali,Rwanda</Text>
                        </View>
                    </View>
                    <View style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}>
                        <View>
                            <Entypo name="wallet" size={30}/>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Wallet</Text>
                            <Text style={{color:'#707070'}}>MTN mobile money and master card</Text>
                        </View>
                    </View>
                    <View style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}>
                        <View>
                            <MaterialIcons name="subscriptions" size={30}/>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Subscriptions</Text>
                            <Text style={{color:'#707070'}}>Your subscriptions details</Text>
                        </View>
                    </View>
                
                
            </View>
        </View>

        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'90%',height:50,borderBottomWidth:0.2,borderBottomColor:'#707070'}}>
                <Text style={{marginTop:15,marginLeft:20,fontSize:18,fontWeight:"bold"}}>User Agreement</Text>
            </View>
            <View style={{width:'90%',height:50,borderBottomWidth:0.2,borderBottomColor:'#707070'}}>
                <Text style={{marginTop:15,marginLeft:20,fontSize:18,fontWeight:"bold"}}>Sign Out</Text>
            </View>
            <View style={{width:'90%',height:50,borderBottomWidth:0.2,borderBottomColor:'#707070'}}>
                <Text style={{marginTop:15,marginLeft:20,fontSize:18,fontWeight:"bold"}}>Version: 0.1</Text>
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

export default Settings;
