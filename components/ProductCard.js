import React, { Component,useState } from 'react';
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
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons,Feather } from "@expo/vector-icons";
import {AuthContext} from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import { connect } from 'react-redux';

const BoxAnimated= Animated.createAnimatedComponent(View)
const windowWidth = Dimensions.get('window').width/2-20;


const ProductCard = ({product})=> {

  const format = (amount) =>{
    return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')

};
    // const [isHover,setHover]=useState(false)
    // const [opacity,setOpacity]=useState(new Animated.Value(1))
    // const [qtyOpacity,setQtyOpacity]=useState(new Animated.Value())
    

    // const handleClose=()=>{
    // setHover(false)
    // }

        return(
            <View key={product.id} style={{height:225,backgroundColor:'white',width:windowWidth,position:'relative',margin:10,alignItems:'center',justifyContent:'center',borderRadius:10}}>
          <View>
            <View style={{marginBottom:10,marginTop:30,alignItems:'center',justifyContent:'center'}}>
              <Image style={{width:120,height:100}} resizeMode="contain" source={{uri:product.image}}/>
            </View>
            <View>
              <Text style={{fontWeight:'bold',color:'#01B0F1',margin:6}}>{product.name}:  <Text style={{fontWeight:'bold', color:'black'}}>{format(product.price)} Rwf</Text></Text>
            </View>
          </View>
          
          
          <TouchableOpacity  style={{position:'absolute',width:25,height:25,alignItems:'center',justifyContent:"center",top:10,right:5,backgroundColor: product.cartQuantity > 0 ? '#01B0F1':'white'}}>
            {product.cartQuantity > 0 ? (
              <Text style={{color:'white'}}>{product.cartQuantity}</Text>
            ):(

            <Text></Text>
            )}
          </TouchableOpacity>
         
          {/* {this.state.isHover && (
            <BoxAnimated opacity={this.state.qtyOpacity} style={{backgroundColor:'#f2f0f5',borderRadius:6,position:'absolute',top:10,right:10,left:10,zIndex:99}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:2}}>
                {product.cartQuantity>1?(
                  <TouchableOpacity >
                <Feather name="minus" size={20} color="#01B0F1"/>
                </TouchableOpacity>
                ):(
                  <TouchableOpacity >
                <Feather name="trash-2" size={20} color="#01B0F1"/>
                </TouchableOpacity>
                )}
                

                <Text>{product.cartQuantity}</Text>

                <TouchableOpacity >
                <Feather name="plus" size={20} color="#01B0F1"/>
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