import React, { useState } from "react";
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
  Animated
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons,Feather } from "@expo/vector-icons";
import {AuthContext} from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';

const BoxAnimated= Animated.createAnimatedComponent(View)

const Shop = ({ navigation }) => {
  const [customer,setCustomer]=useState({})
  const [quantity,setQuantity]=useState(0)
  const [category,setCategory]=useState('')
  const [opacity,setOpacity]=useState(new Animated.Value(1))
  const [isHover,setIsHover]=useState(false)
  const [transactionHistory, setTransactionHistory] = React.useState(
    dummyData.transactionHistory
  );

  const handlePlusPress=()=>{
    fadeIn()
    setQuantity(1)
    setIsHover(true)
  }

  const handleInc=()=>{
    setQuantity(quantity+1)
  }

  const handleDec=()=>{
    setQuantity(quantity-1)
  }

  const fadeIn=()=>{
    Animated.timing(opacity,{toValue:0.4,duration:200,useNativeDriver: true}).start()
  }

  const fadeOut=()=>{
    Animated.timing(opacity,{toValue:1,duration:200,useNativeDriver: true}).start()
  }

  const handleClose=()=>{
    fadeOut()
    setIsHover(false)
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
          source={images.banner}
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
              flexDirection:"row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                marginRight:'80%',
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
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {context.signOut()}}
            >
              <AntDesign
                name="logout"
                size={28}
                color="red"
                resizeMode="contain"
              />
            </TouchableOpacity>
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
              Our products
            </Text>
          </View>

          {/* Trending */}
         
        </ImageBackground>
      </View>
    );
  }



 

  // page content
  return (
    
      <View style={{ flex: 1, paddingBottom: 130 }}>
    <View>
        {renderHeader()}

        <View style={{backgroundColor:'white',width:150,position:'relative',alignItems:'center',justifyContent:'center'}}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <BoxAnimated opacity={opacity}>
            <View style={{marginBottom:10,marginTop:30}}>
              <Image style={{width:120,height:100}} resizeMode="contain" source={images.tool}/>
            </View>
            <View>
              <Text>10,000 Rwf</Text>
            </View>
          </BoxAnimated>
          </TouchableWithoutFeedback>
          
          {!isHover && (
          <TouchableOpacity onPress={()=> handlePlusPress()} style={{position:'absolute',width:25,height:25,borderRadius:12.5,
                      borderColor:'#875ced',borderWidth:1,alignItems:'center',justifyContent:"center",top:10,right:5,backgroundColor:quantity>0?'#875ced':'white'}}>
            {quantity > 0 ? (
              <Text style={{color:'white'}}>{quantity}</Text>
            ):(

            <Feather name="plus" size={15} color="#875ced" />
            )}
          </TouchableOpacity>
          )}

          {isHover && (
            <View style={{backgroundColor:'#f2f0f5',borderRadius:6,position:'absolute',top:10,right:10,left:10,zIndex:99}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:2}}>
                {quantity>1?(
                  <TouchableOpacity onPress={()=>{handleDec()}}>
                <Feather name="minus" size={20} color="#875ced"/>
                </TouchableOpacity>
                ):(
                  <TouchableOpacity onPress={()=>{handleClose(); setQuantity(0)}}>
                <Feather name="trash-2" size={20} color="#875ced"/>
                </TouchableOpacity>
                )}
                

                <Text>{quantity}</Text>

                <TouchableOpacity onPress={()=>{handleInc()}}>
                <Feather name="plus" size={20} color="#875ced"/>
                </TouchableOpacity>

              </View>
            </View>
          )}
          
        </View>
        
    </View>


    {/* shopping cart icon */}
    <View style={{
                   position:"absolute",
                   backgroundColor:"#000",
                   height:50,
                   width:50,
                   bottom:20,
                   alignItems:"center",
                   justifyContent:"center",
                   alignSelf:"center",
                   borderRadius:25
               }}>
                 <FontAwesome 
                 name="shopping-cart"
                 size={24}
                 color="#fff"/>
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

export default Shop;
