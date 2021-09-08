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
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
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
        <Image source={require('../assets/user.png')} style={{width:'100%',height:'100%'}}/>
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
  const context=React.useContext(AuthContext)
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
                        <Text style={{ ...FONTS.h2 ,marginTop:20,marginLeft:10}}> {customer.FirstName} {customer.LastName} </Text>
                        <Text style={{ ...FONTS.h5 ,marginBottom:10,marginLeft:12,fontWeight:"bold",fontSize:15}}> {customer.Phone}</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end',width:'40%'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("changepassword")}>
                        <Image resizeMode='contain' style={{width:30,height:30,marginRight:10}} source={require('../assets/icons/editing.png')}/>
                        </TouchableOpacity>
                        </TouchableOpacity>

                    </View>
                    
                    <View style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}>
                        <View>
                            <MaterialIcons name="email" size={30}/>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Email</Text>
                            <Text style={{color:'#707070'}}>{JSON.stringify(customer)!=='{}' && customer.user.email}</Text>
                        </View>
                    </View>
                    <View style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}>
                        <View>
                            <Entypo name="location" size={30}/>
                        </View>
                        <View style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Location</Text>
                            <Text style={{color:'#707070'}}>{customer.Province},{customer.District},{customer.Sector},{customer.Cell}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}
                    onPress={() => navigation.navigate("Notifications")}
                    >
                        <View>
                            <Image 
                            source={icons.notification_color}
                            resizeMode="contain"
                            style={{
                              width:30 ,
                              height: 30
                            }}
                            
                            />

                        </View>
                        <View style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Notifications</Text>
                            <Text style={{color:'#707070'}}>View your recent notifications</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}>
                        <View>
                            <Image resizeMode='contain' style={{width:30,height:30}} source={require('../assets/icons/subscription.png')}/>
                        </View>
                        {category.toUpperCase() === 'AMAZI'  ? (
                          <TouchableOpacity onPress={() => navigation.navigate("CryptoDetail")} style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Subscriptions</Text>
                            <Text style={{color:'#707070'}}>{category}</Text>
                        </TouchableOpacity>
                        ):(
                          <>
                          {category.toUpperCase() === 'INUMA' ?  (
                          <TouchableOpacity onPress={() => navigation.navigate("inuma")} style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Subscriptions</Text>
                            <Text style={{color:'#707070'}}>{category}</Text>
                        </TouchableOpacity>
                        ):(<>
                          {category.toUpperCase() === 'UHIRA' ?  (
                          <TouchableOpacity onPress={() => navigation.navigate("uhira")} style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Subscriptions</Text>
                            <Text style={{color:'#707070'}}>{category}</Text>
                        </TouchableOpacity>
                        ):(
                          <TouchableOpacity style={{marginLeft:30}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Subscriptions</Text>
                            <Text style={{color:'#707070'}}>{category}</Text>
                        </TouchableOpacity>
                        )}
                        </>)}
                        </>
                        )}
                        
                    </View>
                    <TouchableOpacity style={{height:60,borderTopColor:'#707070',borderTopWidth:0.2,flexDirection:'row',padding:10}}

                    onPress={() => navigation.navigate("query")}
                    >
                        <View>
                            <Image resizeMode='contain' style={{width:50,height:50}} source={require('../assets/icons/query.png')}/>
                        </View>
                        <View style={{marginLeft:8}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Contact Us</Text>
                            <Text style={{color:'#707070'}}>Please send any query</Text>
                        </View>
                    </TouchableOpacity>
                
                
            </View>
        </View>

        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'90%',height:50,borderBottomWidth:0.2,borderBottomColor:'#707070'}}>
                <Text style={{marginTop:15,marginLeft:20,fontSize:18,fontWeight:"bold"}}>User Agreement</Text>
            </View>
            <TouchableOpacity onPress={()=> context.signOut()} style={{width:'90%',height:50,borderBottomWidth:0.2,borderBottomColor:'#707070'}}>
                <Text style={{marginTop:15,marginLeft:20,fontSize:18,fontWeight:"bold"}}>Sign Out</Text>
            </TouchableOpacity>
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
