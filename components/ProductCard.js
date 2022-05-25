import React, { Component, useState } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from 'react-native';
import { observer } from 'mobx-react/native';
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { connect } from 'react-redux';

const BoxAnimated = Animated.createAnimatedComponent(View)
const windowWidth = Dimensions.get('window').width / 2 - 20;


const ProductCard = ({ product }) => {

  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')

  };
  // const [isHover,setHover]=useState(false)
  // const [opacity,setOpacity]=useState(new Animated.Value(1))
  // const [qtyOpacity,setQtyOpacity]=useState(new Animated.Value())
  // const name = JSON.stringify(product) == undefined && product.name.slice(0,24)

  // const handleClose=()=>{
  // setHover(false)
  // }

  return (
    <View key={product.id} style={{ height: 200, backgroundColor: 'white', width: windowWidth, position: 'relative', margin: 10,  justifyContent: 'center', borderRadius: 8 }}>
      <View>
        <View style={{ marginBottom: 10, marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ width: 120, height: 100 }} resizeMode="contain" source={{ uri: product.image }} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', color: '#009cde',marginLeft:20 }}>{JSON.stringify(product) !== undefined && product.name.slice(0,18)} {product.name && (product.name.length>18 && '...')}</Text>
          <Text style={{ fontWeight: 'bold', color: 'black',marginTop:5,marginLeft:20 }}>{JSON.stringify(format(product.price)).substring(1, JSON.stringify(format(product.price)).length - 4)} Rwf</Text>
        </View>
      </View>


      <TouchableOpacity style={{ position: 'absolute', width: 25, height: 25, alignItems: 'center', justifyContent: "center", top: 10, right: 5, backgroundColor: product.cartQuantity > 0 ? '#009cde' : 'white' }}>
        {product.cartQuantity > 0 ? (
          <Text style={{ color: 'white' }}>{product.cartQuantity}</Text>
        ) : (

          <Text></Text>
        )}
      </TouchableOpacity>

      {/* {this.state.isHover && (
            <BoxAnimated opacity={this.state.qtyOpacity} style={{backgroundColor:'#f2f0f5',borderRadius:6,position:'absolute',top:10,right:10,left:10,zIndex:99}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:2}}>
                {product.cartQuantity>1?(
                  <TouchableOpacity >
                <Feather name="minus" size={20} color="#009cde"/>
                </TouchableOpacity>
                ):(
                  <TouchableOpacity >
                <Feather name="trash-2" size={20} color="#009cde"/>
                </TouchableOpacity>
                )}
                

                <Text>{product.cartQuantity}</Text>

                <TouchableOpacity >
                <Feather name="plus" size={20} color="#009cde"/>
                </TouchableOpacity>

              </View>
            </BoxAnimated>
          )} */}


    </View>
  )
}

// const mapStateToProps=state=>{
//   return{
//     products:state.shop.products
//   }
// }


export default ProductCard;