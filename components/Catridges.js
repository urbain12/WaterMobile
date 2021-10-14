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
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

const BoxAnimated = Animated.createAnimatedComponent(View)
const windowWidth = Dimensions.get('window').width / 2 - 20;


const Catridges = ({ product }) => {

  const format = (amount) => {
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

  return (
    <View key={product.id} style={{ height: 80, backgroundColor: 'white', width: windowWidth,  margin: 10,marginTop:20, alignItems: 'center', justifyContent: 'center', borderRadius: 10,...styles.shadow }}>
      <View>
        <View>
          {/* <Text style={{ fontWeight: 'bold', color: '#01B0F1', margin: 10 }}>{product.System.title} ...</Text> */}
          <Text style={{ fontWeight: 'bold', color: '#01B0F1', fontSize:18 }}>{JSON.stringify(product.ToolID) !== null && product.ToolID.Title}</Text>
          <Text style={{ fontWeight: 'bold', color: 'black',  }}>{JSON.stringify(format(product.ToolID.Amount)).substring(1, JSON.stringify(format(product.ToolID.Amount)).length - 4)} Rwf</Text>
        </View>
      </View>

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
// const mapStateToProps=state=>{
//   return{
//     products:state.shop.products
//   }
// }


export default Catridges;