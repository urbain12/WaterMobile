import React, { useState,useEffect } from "react";
import {inject, observer} from 'mobx-react';
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
  ActivityIndicator,
  LogBox,
  Animated,
  Alert
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons,Feather } from "@expo/vector-icons";
import {AuthContext} from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import ProductCard from "../components/ProductCard";
import { connect } from "react-redux";
import { retrieveProducts } from "../redux/shopping/shopping-actions";
import { loadCurrentItem } from "../redux/shopping/shopping-actions";



const Home =({navigation})=> {
  const [subscriptions, setSubscriptions] = useState([])
  const [isAmazi, setIsAmazi] = useState(false)
  const [isInuma, setIsInuma] = useState(false)
  const [isUhira, setIsUhira] = useState(false)
  const [customer, setCustomer] = useState({})
  useEffect( async () =>{
    const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
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
                }
                if(subs.includes('INUMA')){
                  setIsInuma(true)
              }
              if(subs.includes('UHIRA')){
                setIsUhira(true)
              }
                setSubscriptions(subs)
            }).catch(err => {
                console.log(err)
            })
  },[])

  
  
  const sub_amazi = () => {
    // e.preventDefault()
    const names = customer.FirstName + ' ' + customer.LastName
    const postObj = JSON.stringify({
      'customerID': customer.id,
      'category': 'AMAZI',
      
    })
    console.log(postObj)

    // let my_token = localStorage.getItem('token');

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${my_token}`,
    };

    axios.post('http://wateraccess.t3ch.rw:8234/subscribe/', postObj).then((res) => {
      console.log(res.status)
      alert('Subscribed successfully')
      navigation.navigate('Landing')
    }).catch(err => {
      console.log(err)
    })



  }

  const sub_uhira = () => {
    // e.preventDefault()
    const postObj = JSON.stringify({
      'customerID': customer.id,
      'category': 'UHIRA',
      
    })
    console.log(postObj)

    // let my_token = localStorage.getItem('token');

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${my_token}`,
    };

    axios.post('http://wateraccess.t3ch.rw:8234/subscribe/', postObj).then((res) => {
      console.log(res.status)
      alert('Subscribed successfully')
      navigation.navigate('Landing')
    }).catch(err => {
      console.log(err)
    })



  }


  const sub_inuma = () => {
    // e.preventDefault()
    const postObj = JSON.stringify({
      'customerID': customer.id,
      'category': 'INUMA',
      
    })
    console.log(postObj)

    // let my_token = localStorage.getItem('token');

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${my_token}`,
    };

    axios.post('http://wateraccess.t3ch.rw:8234/subscribe/', postObj).then((res) => {
      console.log(res.status)
      alert('Subscribed successfully')
      navigation.navigate('Landing')
    }).catch(err => {
      console.log(err)
    })



  }

  const amazi_alert = () =>
    Alert.alert(
      "Subscribe",
      "Are you sure you want to subscribe in AMAZI",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => sub_amazi() }
      ]
    );

    const inuma_alert = () =>
    Alert.alert(
      "Subscribe",
      "Are you sure you want to subscribe in INUMA",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => sub_inuma() }
      ]
    );

    const uhira_alert = () =>
    Alert.alert(
      "Subscribe",
      "Are you sure you want to subscribe in UHIRA",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => sub_uhira() }
      ]
    );

  
  

  const renderHeader=()=> {
    
    return (
      <View
        style={{
          width: "100%",
          height: 150,
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
              marginTop:20,
              width: "100%",
              flexDirection:"row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            
            
          </View>

          {/* Balance */}
          <View
            style={{
              paddingTop:30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
              Welcome {customer.FirstName}
            </Text>
          </View>

          {/* Trending */}
         
        </ImageBackground>
            
        
      </View>
    );
  }



  
    
    return (
    
      
    <View style={{flex:1}}>
         {renderHeader()}

         <ScrollView>
         
         {isAmazi?(
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginTop:25}}>
            <View
              style={{
                width: '80%',
                height:120,
                paddingVertical: 5,
                paddingHorizontal: 5,
              
                borderRadius: 10,
                backgroundColor: COLORS.white,
                alignItems:'center',
                justifyContent:'center',
                ...styles.shadow

              }}
              //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base , alignItems:'center'}}>
                  <Image source={require("../assets/images/Amazi.png")}
                    style={{
                      resizeMode: 'contain',
                      width: "180%",
                      height: 50,

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


            </View>
            </TouchableOpacity>
         ):(
          <View style={{alignItems:'center',justifyContent:'center', marginTop:25}}>
            <View
              style={{
                width: '80%',
                height:120,
                paddingVertical: 5,
                paddingHorizontal: 5,
              
                borderRadius: 10,
                backgroundColor: COLORS.white,
                alignItems:'center',
                justifyContent:'center',
                ...styles.shadow

              }}
              //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base , alignItems:'center'}}>
                  <Image source={require("../assets/images/Amazi.png")}
                    style={{
                      resizeMode: 'contain',
                      width: "180%",
                      height: 50,

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
                  <TouchableOpacity onPress={()=>{amazi_alert()}}>
                  <Text style={{ color: 'red', ...FONTS.body3,marginTop:5}}>
                    subscribe
                  </Text>
                  </TouchableOpacity>
                  
                </View>
              </View>


            </View>
            </View>
         )}


            {isInuma?(
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginTop:25}}>
            <View
              style={{
                width: '80%',
                height:120,
                paddingVertical: 5,
                paddingHorizontal: 5,
              
                borderRadius: 10,
                backgroundColor: COLORS.white,
                alignItems:'center',
                justifyContent:'center',
                ...styles.shadow

              }}
              //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base , alignItems:'center'}}>
                  <Image source={require("../assets/images/Inuma.png")}
                    style={{
                      resizeMode: 'contain',
                      width: "180%",
                      height: 50,

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


            </View>
            </TouchableOpacity>
            ):(
              <View style={{alignItems:'center',justifyContent:'center', marginTop:25}}>
            <View
              style={{
                width: '80%',
                height:120,
                paddingVertical: 5,
                paddingHorizontal: 5,
              
                borderRadius: 10,
                backgroundColor: COLORS.white,
                alignItems:'center',
                justifyContent:'center',
                ...styles.shadow

              }}
              //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base , alignItems:'center'}}>
                  <Image source={require("../assets/images/Inuma.png")}
                    style={{
                      resizeMode: 'contain',
                      width: "180%",
                      height: 50,

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
                  <TouchableOpacity onPress={()=>{inuma_alert()}}>
                  <Text style={{ color: 'red', ...FONTS.body3,marginTop:5}}>
                    subscribe
                  </Text>
                  </TouchableOpacity>
                  
                </View>
              </View>


            </View>
            </View>
            )}


            {isUhira?(
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginTop:25}}>
            <View
              style={{
                width: '80%',
                height:120,
                paddingVertical: 5,
                paddingHorizontal: 5,
              
                borderRadius: 10,
                backgroundColor: COLORS.white,
                alignItems:'center',
                justifyContent:'center',
                ...styles.shadow

              }}
              //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base , alignItems:'center'}}>
                  <Image source={require("../assets/images/Uhira.png")}
                    style={{
                      resizeMode: 'contain',
                      width: "180%",
                      height: 50,

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


            </View>
            </TouchableOpacity>
            ):(
              <View style={{alignItems:'center',justifyContent:'center', marginTop:25}}>
            <View
              style={{
                width: '80%',
                height:120,
                paddingVertical: 5,
                paddingHorizontal: 5,
              
                borderRadius: 10,
                backgroundColor: COLORS.white,
                alignItems:'center',
                justifyContent:'center',
                ...styles.shadow

              }}
              //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base , alignItems:'center'}}>
                  <Image source={require("../assets/images/Uhira.png")}
                    style={{
                      resizeMode: 'contain',
                      width: "180%",
                      height: 50,

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
                  <TouchableOpacity onPress={()=>{uhira_alert()}}>
                  <Text style={{ color: 'red', ...FONTS.body3,marginTop:5}}>
                    subscribe
                  </Text>
                  </TouchableOpacity>
                  
                </View>
              </View>


            </View>
            </View>
            )}
            
         </ScrollView>
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
  sliderContainer:{
    height:200,
    width:'90%',
    marginTop:10,
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:8,
},
wrapper:{},
slide:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"transparent",
    borderRadius:8,
},
sliderImage:{
    height:"100%",
    width:"100%",
    alignSelf:"center",
    borderRadius:8,
},
categoryContainer:{
    flexDirection:'row',
    width:'100%',
    alignSelf:'center',
    marginTop:25,
    marginBottom:10,
},
categoryBtn:{
    flex:1,
    width:"30%",
    marginHorizontal:0,
    alignSelf:"center",
},
categoryIcon:{
    borderWidth:0,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    width:70,
    height:70,
    backgroundColor:"#fdeae7",
    borderRadius:50,
},
categoryBtnTxt:{
    alignSelf:"center",
    marginTop:5,
    color:"#de4f35",
},
cardsWrapper:{
    marginTop:20,
    marginLeft:20,
    flexDirection:"row",
    width:'100%'
},
card:{
    height:150,
    width:300,
    marginHorizontal:10,
    marginBottom:20,
    flexDirection:'row',
    shadowColor:'#999',
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:5,
    paddingVertical:5,
    paddingHorizontal:5,
},
cardImgWrapper:{
    width:130,
},
cardImg:{
    width:'100%',
    height:'100%',
    alignSelf:"center",
    borderRadius:8,
    borderBottomRightRadius:0,
    borderTopRightRadius:0,
},
cardInfo:{
    flex:2,
    padding:10,
    borderColor:'#ccc',
    borderWidth:1,
    borderLeftWidth:0,
    borderBottomRightRadius:8,
    borderTopRightRadius:8,
    backgroundColor:"#e5e4eb",
},
cardTitle:{
    fontWeight:'bold',
},
cardDetails:{
    fontSize:12,
    color:'#444'
},
});



export default Home;
