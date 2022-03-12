import React, { useState, useEffect } from "react";
import {inject, observer} from 'mobx-react';
import Modal from "react-native-modal";
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
  TextInput,
  LogBox,
  Alert,
  Animated,
  ActivityIndicator
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons,Feather, Entypo } from "@expo/vector-icons";
import {AuthContext} from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import ProductCard from "../components/ProductCard";
import { connect } from "react-redux";
import { removeFromCart } from "../redux/shopping/shopping-actions";



const Cart = ({navigation,cart,removeFromCart}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [cname, setNames] = useState('')
  const [loading, setLoading] = useState(false)
  const [paid, setpaid] = useState(false)
  const [phone, setPhone] = useState('')
  const [Email, setEmail] = useState('')
  const [customer, setCustomer] = useState('')
  const [cnumber, setcnumber] = useState('07542121')
  const [details, setdetails] = useState('Water-Access-Rwanda')
  const [pmethod, setpmethod] = useState('cc')
  const [cartCount,setCartCount]=useState(0)
  const [totalAmount,setTotalAmount]=useState(0)

  const modalHandler = () => {
    setIsVisible(!isVisible);
  };

  const modalHandler2 = () => {
    setIsVisible2(!isVisible2);
  };
  const handlePhone = (val) => {
    setPhone(val)
  }

  const handleSubmit = (e) => {
    console.log("vip?")
    setLoading(true)
    e.preventDefault();

    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.headers = {
    //     "Content-Type": "application/json",
    //     // Authorization: `Token ${my_token}`,
    // };

    const options = {
      headers: {
        "Content-Type": "application/json",
        "app-type": "none",
        "app-version": "v1",
        "app-device": "Postman",
        "app-device-os": "Postman",
        "app-device-id": "0",
        "x-auth": "705d3a96-c5d7-11ea-87d0-0242ac130003"
      }
    };

    const postObj = JSON.stringify({
      'amount':totalAmount,
      'phone_number': phone,
      'payment_code':'1010'

  })
  console.log(postObj)

    

  axios.post('http://app.amazi.rw/api/web/index.php?r=v1/app/send-transaction', postObj, options).then(res => {
    console.log('success')
    console.log(res.data)
    setIsVisible2(false)
    setPhone('')
    alert('Confirm with your phone and wait for approval')
    navigation.navigate('Home')
    const setint=setInterval(() => {
      console.log('checking status')
      if (!paid) {
        console.log('not paid yet')
        const my_data=JSON.parse(res.data)
        console.log(my_data.transactionid)          
        axios.get(`http://app.amazi.rw/api/web/index.php?r=v1/app/get-transaction-status&transactionID=${my_data.transactionid}`,options).then(res => {
        const my_data2=JSON.parse(res.data)
        console.log(my_data2)  
        console.log(my_data2[0].payment_status)  
        if (my_data2[0].payment_status == "SUCCESSFUL") {
          axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
              axios.defaults.xsrfCookieName = "csrftoken";
              axios.defaults.headers = {
                  "Content-Type": "application/json",
                  // Authorization: `Token ${my_token}`,
              };

              const postObj2 = JSON.stringify({
                'customerID':customer.id,
                'order': cart,


            })
            console.log(postObj2)

              axios.post('http://admin.amazi.rw/create_order/', postObj2).then((res) => {
                  console.log(res.status)
                  for(var i=0;i<cart.length;i++){
                    removeFromCart(cart[i].id)
                  }
                  alert('Order completed!!!')
                  setpaid(true)
                  clearInterval(setint)
                  navigation.push('Home')
              }).catch(err => {
                  console.log(err)
              })

            
          }

        })
      }

    }, 30000)
    

    



  })

  setTimeout(() => {
    setLoading(false)
}, 5000)

};

const handleSubmit2 = () => {
  console.log("vip?")
  setLoading(true)

  // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  // axios.defaults.xsrfCookieName = "csrftoken";
  // axios.defaults.headers = {
  //     "Content-Type": "application/json",
  //     // Authorization: `Token ${my_token}`,
  // };

  const options = {
    headers: {
      "Content-Type": "application/json",
      "app-type": "none",
      "app-version": "v1",
      "app-device": "Postman",
      "app-device-os": "Postman",
      "app-device-id": "0",
      "x-auth": "705d3a96-c5d7-11ea-87d0-0242ac130003"
    }
  };

 

  


            const postObj2 = JSON.stringify({
              'customerID':customer.id,
              'order': cart,


          })
          console.log(postObj2)

            axios.post('http://admin.amazi.rw/pay_later_order/create/', postObj2).then((res) => {
                console.log(res.status)
                for(var i=0;i<cart.length;i++){
                  removeFromCart(cart[i].id)
                }
                alert('Order completed!!!')
                setpaid(true)
                // clearInterval(setint)
                navigation.push('Home')
            }).catch(err => {
                console.log(err)
            })


setTimeout(() => {
  setLoading(false)
}, 5000)

};


  const format = (amount) =>{
    return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')

};
  useEffect(()=>{
    console.log(cart)
   let count=0;
   let amount=0
   cart.forEach(item => {
     count += item.qty;
     amount += item.qty*item.price
   });
   setCartCount(count)
   setTotalAmount(amount)
  },[cart,cartCount,totalAmount,setCartCount,setTotalAmount])

  useEffect(() => {
    async function setInfo() {
      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://admin.amazi.rw/getcustomerbyid/${id}`).then((res) => {
          setCustomer(res.data[0])
      }).catch(err => {
          console.log(err)
      })
  }

  setInfo()
  }, [])
  

  const deleteAlert = (itemID) =>
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item from your cart",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => removeFromCart(itemID) }
      ]
    );

    const Order = () =>
    Alert.alert(
      "Order",
      "Do you want to pay Now or Later?",
      [
        {
          text: "Now",
          onPress: () => modalHandler(),
          style: "cancel"
        },
        { text: "Later", onPress: () => handleSubmit2() }
      ]
    );
  
 
  
  

  const renderHeader=()=> {
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
              onPress={() => navigation.navigate('Shop')}
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



  
    return (
    
      <View>
    <View>
         {renderHeader()}
        <ScrollView style={{height:'60%'}}>
        
         { cart.length === 0 ? (
             <View style={{width:'100%',height:400,alignItems:'center',justifyContent:'center'}}>
             <Text>Empty Cart</Text>
             </View>
         ):(
             <View>
             <View style={{ height: 60, borderTopColor: '#707070', borderTopWidth: 0.2, flexDirection: 'row', padding: 10 }}>
            
            <View style={{ width:'35%',alignItems:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Name</Text>
            </View>

            <View style={{ width:'30%',alignItems:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Unity price</Text>
            </View>

            <View style={{ width:'25%',alignItems:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Total</Text>
            </View>

            <View style={{ width:'10%',alignItems:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', }}></Text>
            </View>
          </View>
                 {cart.map(product => (
                    <View style={{ width:'100%',height: 60, borderTopColor: '#707070', borderTopWidth: 0.5, flexDirection: 'row', padding: 10 ,alignSelf:'center'}}>
                        
                        <View style={{ width:'35%',alignItems:'center' }}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{product.name}:</Text>
                        <Text style={{ color: '#707070' }}>{product.qty} items</Text>
                        </View>

                        <View style={{ width:'25%',alignItems:'center' }}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{JSON.stringify(format(product.price)).substring(1,JSON.stringify(format(product.price)).length-4)} Rwf</Text>
                        </View>

                        <View style={{ width:'30%',alignItems:'center' }}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: "green", }}>{JSON.stringify(format(product.qty*product.price)).substring(1,JSON.stringify(format(product.qty*product.price)).length-4)} Rwf</Text>
                        </View>

                        <View style={{ width:'10%',alignItems:'center' }}>
                        <TouchableOpacity onPress={()=>{deleteAlert(product.id)}}>
                        <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>
                        </View>
                    </View>
                 ))}
                 <View style={{ width:'100%',height: 60, borderTopColor: '#707070', borderTopWidth: 0.5, flexDirection: 'row', padding: 10 ,alignSelf:'center'}}>
                        
                        <View style={{ width:'25%',alignItems:'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Total:</Text>
                        </View>

                        <View style={{ width:'25%',alignItems:'center' }}>
                        </View>

                        <View style={{ width:'17%',alignItems:'center' }}>
                        </View>

                        <View style={{ width:'33%',alignItems:'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: "#009cde", }}>{JSON.stringify(format(totalAmount)).substring(1,JSON.stringify(format(totalAmount)).length-4)} Rwf</Text>
                        </View>
                    </View>

                    
                 {/* <Text>{this.props.shoppingCartStore.totalAmount}</Text> */}
             </View>

             
             
         )}

        </ScrollView>
          
        {cartCount > 0 && (
            <TouchableOpacity
            style={styles.signIn}
            onPress={Order}
        >
            <View
                style={{ backgroundColor: "#009cde", width: "50%", height: "100%", alignItems: "center", borderRadius: 10, justifyContent:'center'}}
            >
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Order</Text>
            </View>
        </TouchableOpacity>
        )}
        
          
        
    </View>


    <Modal
                animationType="slide"
                visible={isVisible}
                style={{ backgroundColor: "#000000AA", margin: 0 }}
              >
                
                <TouchableOpacity
                  onPress={modalHandler}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  
                  <TouchableWithoutFeedback>
                    

                    <View
                      style={{
                        height: "45%",
                        width: "95%",
                        backgroundColor: "#fff",
                        borderRadius: 40,
                        
                      }}

                    >
                      <ImageBackground source={images.modalbanner} style={{width: '100%', height: '100%',borderRadius:40,overflow: 'hidden'}}>
                       
                
                      <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
                      
                        <Text style={{ textAlign: "center", fontSize: 30, color:"white",marginTop:30,paddingBottom:30 }}>
                          Pay With
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignContent: "center",
                              width:'100%'
                            }}
                          >
                            
                              <TouchableOpacity style={{ alignContent: "center",marginLeft:'2%',width:'30%'}}
                              onPress={() => {modalHandler2(); setIsVisible(false);}}
                              
                              >
                              <View style={{backgroundColor:"white",width:'100%',height:120,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                                <Image
                                  source={icons.mtn}
                                  resizeMode="contain"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                                </View>
                              </TouchableOpacity>
                            
                            
                              <TouchableOpacity style={{ alignContent: "center",marginLeft:'2%',width:'30%'}}
                              
                              
                              
                              >
                              <View style={{backgroundColor:"white",width:'100%',height:120,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                                <Image
                                  source={icons.visa}
                                  resizeMode="contain"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                                </View>
                              </TouchableOpacity>
                            
                            
                              <TouchableOpacity style={{ alignContent: "center",marginLeft:'2%',width:'30%'}}
                              >
                              <View style={{backgroundColor:"white",width:'100%',height:120,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                                <Image
                                  source={icons.airtel}
                                  resizeMode="contain"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                                </View>
                              </TouchableOpacity>
                           
                            </View>
                        </ScrollView>
                        </ImageBackground>
                      </View>
                    </TouchableWithoutFeedback>
                  </TouchableOpacity>
                </Modal>



                <Modal
                animationType="slide"
                visible={isVisible2}
                style={{ backgroundColor: "#000000AA", margin: 0 }}
              >
                
                <TouchableOpacity
                  onPress={modalHandler2}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  
                  <TouchableWithoutFeedback>
                    

                    <View
                      style={{
                        height: "40%",
                        width: "90%",
                        backgroundColor: "#000",
                        borderRadius: 40,
                        
                      }}
                    >
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                          <Text style={{marginTop:30,fontSize:18,fontWeight:"bold",color:'white'}}>Enter momo number</Text>
                          <TextInput
                          style={{
                            borderColor: "gray",
                            borderWidth: 1,
                            borderRadius: 10,
                            height: 35,
                            width: "90%",
                            color:'white',
                            marginTop: 40,
                            marginBottom: 20,
                            textAlign: "center",
                          }}
                          name="Names"
                          placeholder="Phone Number"
                          keyboardType="numeric"
                          onChangeText={text => handlePhone(text)}
                        />

                    <TouchableOpacity style={{ marginTop: 20 }}
                    onPress={(e) => {
                        handleSubmit(e)
                    }}>

                    <View
                        style={{ backgroundColor: "#009cde", width: "100%", height: "45%", alignItems: "center",justifyContent:'center', borderRadius: 10 }}
                    >
                        {loading ? (
                            <ActivityIndicator size='large' color='white' style={{margin:15}}/>
                        ) :
                            (
                                <Text style={{ color: "white", marginVertical: "3%",marginHorizontal:"5%", fontSize: 20, fontWeight: "bold" }}>Submit</Text>
                            )}

                    </View>


                </TouchableOpacity>
                        </View>
                      
                      </View>
                    </TouchableWithoutFeedback>
                  </TouchableOpacity>
                </Modal>
    
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
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
});

const mapDispatchToProps=(dispatch)=>{
  return{
      removeFromCart:(id)=>dispatch(removeFromCart(id)),
  }
  }

const mapStateToProps=state=>{
  return  {
    cart:state.shop.cart,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);