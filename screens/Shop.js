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
  Animated
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



const Shop =({retrieveProducts,navigation,products,cart,loadCurrentItem})=> {
  const [cartCount,setCartCount]=useState(0)
  useEffect(()=>{
   let count=0;
   cart.forEach(item => {
     count+=item.qty;
   });
   setCartCount(count)
  },[cart,cartCount])

  useEffect(()=>{
    retrieveProducts();
  },[retrieveProducts])
  // const [customer,setCustomer]=useState({})
 


  // const [isHover,setHover]=useState(false)
  // const [opacity,setOpacity]=useState(new Animated.Value(1))
  // const [qtyOpacity,setQtyOpacity]=useState(new Animated.Value())


  
  
  

  const renderHeader=()=> {
    
    return (
      <View
        style={{
          width: "100%",
          height: 185,
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
            <TouchableOpacity onPress={()=>{navigation.navigate('Cart')}} style={{
                   position:"relative",
                   marginTop:10
               }}>
                 

                 <FontAwesome 
                 name="shopping-cart"
                 size={24}
                 color="#fff"/>
                  
                 {cartCount>0 && (
                  <View style={{positions:'absolute',height:18,width:18,borderRadius:9,backgroundColor:'red',alignItems:'center',top:-30,right:-18}}>
                  <Text style={{color:'white'}}>{cartCount}</Text>
                 </View>
                 )}
                 
                 
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



  
    
    return (
    
      
    <View style={{flex:1}}>
         {renderHeader()}
    {/* <Text style={{color:'black'}}>flskdjf    {JSON.stringify(this.props.productsStore.data)}</Text> */}
        {products.length>0 ? (
          <ScrollView>
        
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{navigation.navigate('ProductDetails');loadCurrentItem(item)}}>
            <ProductCard key={item.id} product={item}/>
          </TouchableOpacity>
          
        )}
        />

        </ScrollView>
        ):(
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{marginTop:50}}>
          <ActivityIndicator size='large' color='black'/>
          <Text style={{fontSize:18,fontWeight:"900"}}>No added product yet</Text>
          </View>
          </View>
        )}
        
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

const mapStateToProps=state=>{
  return{
    products:state.shop.products,
    cart:state.shop.cart
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    loadCurrentItem:(item)=>dispatch(loadCurrentItem(item)),
    retrieveProducts:()=>dispatch(retrieveProducts())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop);
