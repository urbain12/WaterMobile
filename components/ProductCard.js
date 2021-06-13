import React, { Component } from 'react';
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

const BoxAnimated= Animated.createAnimatedComponent(View)
const windowWidth = Dimensions.get('window').width/2-20;

@observer
class ProductCard extends Component {

    state={
        opacity:new Animated.Value(1),
        qtyOpacity:new Animated.Value(0),
        isHover:false,
      }

    handlePlusPress=()=>{
    this.fadeIn()
    if(this.props.product.cartQuantity===0){
        this.props.product.addToCart();
    }
    this.setState({
        isHover:true,
    })
    }

    handleRemove=()=>{
        this.handleClose();
        this.props.product.removeFromCart();
    }

    handleInc=()=>{
    this.props.product.incCartQuantity()
    }


    handleDec=()=>{
    this.props.product.decCartQuantity()
    }

    fadeIn=()=>{
    Animated.parallel([
        Animated.timing(this.state.opacity,{toValue:0.4,duration:200,useNativeDriver: true}).start(),
        Animated.timing(this.state.qtyOpacity,{toValue:1,duration:200,useNativeDriver: true}).start()
    ])
    }

    fadeOut=()=>{
    Animated.parallel([
        Animated.timing(this.state.opacity,{toValue:1,duration:200,useNativeDriver: true}).start(),
        Animated.timing(this.state.qtyOpacity,{toValue:0,duration:200,useNativeDriver: true}).start()
    ])
    
    }

    handleClose=()=>{
    this.fadeOut()
    this.setState({
        isHover:false
    })
    }

    render(){
        const {product}=this.props;
        return(
            <View key={product.id} style={{backgroundColor:'white',width:windowWidth,position:'relative',margin:10,alignItems:'center',justifyContent:'center',borderRadius:10}}>
        <TouchableWithoutFeedback onPress={this.handleClose}>
          <BoxAnimated opacity={this.state.opacity}>
            <View style={{marginBottom:10,marginTop:30}}>
              <Image style={{width:120,height:100}} resizeMode="contain" source={images.tool}/>
            </View>
            <View>
              <Text style={{fontWeight:'bold',color:'#01B0F1'}}>{product.Title}:  <Text style={{fontWeight:'bold', color:'black'}}>{product.Amount} Rwf</Text></Text>
            </View>
          </BoxAnimated>
          </TouchableWithoutFeedback>
          
          {!this.state.isHover && (
          <TouchableOpacity onPress={this.handlePlusPress} style={{position:'absolute',width:25,height:25,borderRadius:12.5,
                      borderColor:'#01B0F1',borderWidth:1,alignItems:'center',justifyContent:"center",top:10,right:5,backgroundColor: product.cartQuantity > 0 ? '#01B0F1':'white'}}>
            {product.cartQuantity > 0 ? (
              <Text style={{color:'white'}}>{product.cartQuantity}</Text>
            ):(

            <Feather name="plus" size={15} color="#01B0F1" />
            )}
          </TouchableOpacity>
          )}

          {this.state.isHover && (
            <BoxAnimated opacity={this.state.qtyOpacity} style={{backgroundColor:'#f2f0f5',borderRadius:6,position:'absolute',top:10,right:10,left:10,zIndex:99}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:2}}>
                {product.cartQuantity>1?(
                  <TouchableOpacity onPress={this.handleDec}>
                <Feather name="minus" size={20} color="#01B0F1"/>
                </TouchableOpacity>
                ):(
                  <TouchableOpacity onPress={this.handleRemove}>
                <Feather name="trash-2" size={20} color="#01B0F1"/>
                </TouchableOpacity>
                )}
                

                <Text>{product.cartQuantity}</Text>

                <TouchableOpacity onPress={this.handleInc}>
                <Feather name="plus" size={20} color="#01B0F1"/>
                </TouchableOpacity>

              </View>
            </BoxAnimated>
          )}
          
          
        </View>
        )
    }

}

export default ProductCard;