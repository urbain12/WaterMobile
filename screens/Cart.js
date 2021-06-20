import React, { useState } from "react";
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
  LogBox,
  Animated
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons,Feather, Entypo } from "@expo/vector-icons";
import {AuthContext} from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import ProductCard from "../components/ProductCard";

const BoxAnimated= Animated.createAnimatedComponent(View)

@inject('productsStore')
@inject('shoppingCartStore')
@observer
class Cart extends React.Component {
  // const [customer,setCustomer]=useState({})
  // const [quantity,setQuantity]=useState(0)
  // const [category,setCategory]=useState('')
  // const [opacity,setOpacity]=useState(new Animated.Value(1))
  // const [isHover,setIsHover]=useState(false)

  state={
    quantity:0,
    opacity:new Animated.Value(1),
    qtyOpacity:new Animated.Value(0),
    isHover:false,
  }


  
 
  
  // React.useEffect(() => {
  //   LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  //   async function setInfo() {
  //     const id = await AsyncStorage.getItem('user_id')
  //     axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
  //       setCustomer(res.data[0])
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //     axios.get(`http://wateraccess.t3ch.rw:8234/get_category/${id}`).then((res) => {
  //       setCategory(res.data.category)
  //     }).catch(err => {
  //       console.log(err)
  //     })

  //   }

  //   setInfo()
    
  // }, []);

  renderHeader=()=> {
    // const renderItem = ({ item, index }) => (
    //   <TouchableOpacity
    //     style={{
    //       width: 180,
    //       paddingVertical: SIZES.padding,
    //       paddingHorizontal: SIZES.padding,
    //       marginLeft: index == 0 ? SIZES.padding : 0,
    //       marginRight: SIZES.radius,
    //       borderRadius: 10,
    //       backgroundColor: COLORS.white,
    //     }}
    //     onPress={() => props.navigation.navigate("CryptoDetail", { currency: item })}
    //   >
    //     <View style={{ flexDirection: "row" }}>
    //       <View style={{ marginLeft: SIZES.base }}>
    //         <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
    //         <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
    //           water access
    //         </Text>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // );
    // const context=React.useContext(AuthContext)
    return (
      <View
        style={{
          width: "100%",
          height: '28%',
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
              onPress={() => this.props.navigation.navigate('Shop')}
            >
              <Ionicons
                name="arrow-back"
                size={40}
                color="white"
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
              Cart
            </Text>
          </View>

          {/* Trending */}
         
        </ImageBackground>
      </View>
    );
  }



  render(){
    return (
    
      <View>
    <View>
         {this.renderHeader()}
    {/* <Text style={{color:'black'}}>flskdjf    {JSON.stringify(this.props.productsStore.data)}</Text> */}
        <ScrollView style={{height:'60%'}}>
        
         {this.props.shoppingCartStore.totalProducts === 0 ? (
             <View style={{width:'100%',height:400,alignItems:'center',justifyContent:'center'}}>
             <Text>Empty Cart</Text>
             </View>
         ):(
             <View>
             <View style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10 }}>
            
            <View style={{ width:'33%',alignItems:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Name</Text>
            </View>

            <View style={{ width:'33%',alignItems:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Unity price</Text>
            </View>

            <View style={{ width:'33%',alignItems:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Total</Text>
            </View>
          </View>
                 {this.props.shoppingCartStore.products.map(product => (
                    <View style={{ width:'92%',height: 60, borderTopColor: '#707070', borderTopWidth: 0.5, flexDirection: 'row', padding: 10 ,alignSelf:'center'}}>
                        
                        <View style={{ width:'33%',alignItems:'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{product.Title}</Text>
                        <Text style={{ color: '#707070' }}>{product.cartQuantity} items</Text>
                        </View>

                        <View style={{ width:'33%',alignItems:'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{product.Amount} Rwf</Text>
                        </View>

                        <View style={{ width:'33%',alignItems:'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: "green", }}>{product.totalPrice} Rwf</Text>
                        </View>
                    </View>
                 ))}
                 <View style={{ width:'92%',height: 60, borderTopColor: '#707070', borderTopWidth: 0.5, flexDirection: 'row', padding: 10 ,alignSelf:'center'}}>
                        
                        <View style={{ width:'33%',alignItems:'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Total:</Text>
                        </View>

                        <View style={{ width:'33%',alignItems:'center' }}>
                        </View>

                        <View style={{ width:'33%',alignItems:'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: "#01B0F1", }}>{this.props.shoppingCartStore.totalAmount} Rwf</Text>
                        </View>
                    </View>

                    
                 {/* <Text>{this.props.shoppingCartStore.totalAmount}</Text> */}
             </View>

             
             
         )}

        </ScrollView>
          
        {this.props.shoppingCartStore.totalProducts > 0 && (
            <TouchableOpacity
            style={styles.signIn}
            // onPress={() => { loginHandle(data.phone, data.password) }}
        >
            <View
                style={{ backgroundColor: "#01B0F1", width: "50%", height: "100%", alignItems: "center", borderRadius: 10, justifyContent:'center'}}
            >
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Order</Text>
            </View>
        </TouchableOpacity>
        )}
        
          
        
    </View>


    {/* shopping cart icon */}
    
      </View>
        
        
  );
};

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
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
});

export default Cart;
