import React, { Component, useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {images} from '../constants/images';
import {Ionicons,FontAwesome} from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addToCart, decreaseQty } from '../redux/shopping/shopping-actions';

const ProductDetails =({navigation,currentItem,addToCart,cart,decreaseQty}) => {
    const [productCart,setProductCart]=useState({})
    const [cartCount,setCartCount]=useState(0)
    const format = (amount) =>{
        return Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    
    };

    useEffect(()=>{
        let count=0;
        cart.forEach(item => {
          count+=item.qty;
        });
        setCartCount(count)
       },[cart,cartCount])

    useEffect(()=>{
        var cart_items=[]
        for (var i=0;i<cart.length;i++){
            cart_items.push(cart[i].id)
        }
        if(cart_items.includes(currentItem.id)){
            var _product= cart.find(prod=> prod.id===currentItem.id)
            setProductCart(_product)
        }
    },[cart,cartCount])
        return (
            <View style={{backgroundColor:"#fff",height:'100%'}}>
               <ScrollView>
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginTop:40,
                    marginHorizontal:20,
                }}>
                 <View style={{width:"10%"}}>
                   <TouchableOpacity onPress={()=>navigation.goBack()}>
                   <Ionicons name="arrow-back-outline" size={24} color="black" />
                   </TouchableOpacity>
                 </View>
                 <View style={{width:"80%",alignItems:"center"}}>
                    <View style={{
                      flexDirection:"row",
                      alignItems:"center",
                      alignSelf:"center"
                    }}>
                     
                    </View>
                 </View>
                 <View style={{width:"10%"}}>
                 <TouchableOpacity onPress={()=>{navigation.navigate('Cart')}}>
                 <FontAwesome 
                        name="shopping-cart"
                        size={24}
                        color="#000"/>
                {cartCount>0 && (
                  <View style={{positions:'absolute',height:18,width:18,borderRadius:9,backgroundColor:'red',alignItems:'center',top:-30,right:-18}}>
                  <Text style={{color:'white'}}>{cartCount}</Text>
                 </View>
                 )}
                 </TouchableOpacity>
                 </View>
                </View>
                <Image source={{uri: currentItem.image}} 
                  style={{height:300,width:300,alignSelf:"center",marginTop:20}}
                />
                <View style={{
                    flexDirection:"row",
                    alignSelf:"center",
                    alignItems:"center",
                    justifyContent:"center",
                    backgroundColor:"#35b9e6",
                    width:"80%",
                    paddingVertical:8,
                    marginTop:5
                }}>
                  <TouchableOpacity onPress={()=>{addToCart(currentItem.id)}}>
                   <Text style={{
                       fontWeight:"bold",
                       color:"white",
                       fontSize:30,
                   }}>+</Text>
                  </TouchableOpacity>

                  <Text style={{
                      fontSize:18,
                      fontWeight:"bold",
                      paddingHorizontal:20,
                  }}>
                  {cart.find(prod=> prod.id===currentItem.id)===undefined? 0: cart.find(prod=> prod.id===currentItem.id).qty}
                  </Text>
                    
                  <TouchableOpacity onPress={()=>{
                      decreaseQty(currentItem.id)
                      }}>
                   <Text style={{
                       fontWeight:"bold",
                       color:"white",
                       fontSize:30
                   }}>-</Text>
                  </TouchableOpacity>

                </View>
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:20,
                    marginTop:30,
                }}>
                  <View>
                    <Text style={{
                        fontWeight:"bold",
                        fontSize:25
                    }}>{currentItem.name}</Text>
                    
                  </View>
                  <Text style={{
                      fontSize:28,
                      fontWeight:"bold",
                      marginLeft:80
                  }}>Rwf {format(currentItem.price)}</Text>
                </View>
                

                
                <Text style={{
                    fontWeight:"bold",
                    fontSize:20,
                    marginTop:30,
                    marginHorizontal:20
                }}>Details</Text>
                <Text style={{
                    color:"#a4a4a9",
                    fontWeight:"bold",
                    fontSize:15,
                    marginTop:10,
                    marginHorizontal:20,
                    textAlign:"justify"
                }}>The most unique fire grilled patty,flame grilled, charred, seared, well-done.
                 All natural beef, grass-feed beef, Fiery ,juicy, greacy. Delicious moist.
                 The most unique fire grilled patty,flame grilled, charred, seared, well-done.
                 All natural beef, grass-feed beef, Fiery ,juicy, greacy. Delicious moist</Text>
               </ScrollView> 
               
            </View>
        )
    }

const mapDispatchToProps=(dispatch)=>{
    return{
        addToCart:(id)=>dispatch(addToCart(id)),
        decreaseQty:(id)=>dispatch(decreaseQty(id)),
    }
    }

const mapStateToProps=state=>{
    return{
        currentItem:state.shop.currentItem,
        cart:state.shop.cart,
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);