import React, { useState, useEffect } from "react";
import { inject, observer } from 'mobx-react';
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
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather,SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from '../context/Context';
import { PriceAlert, TransactionHistory } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import ProductCard from "../components/ProductCard";
import { connect } from "react-redux";
import { retrieveProducts } from "../redux/shopping/shopping-actions";
import { loadCurrentItem } from "../redux/shopping/shopping-actions";



const Home = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState([])
  const [isAmazi, setIsAmazi] = useState(undefined)
  const [isInuma, setIsInuma] = useState(undefined)
  const [isUhira, setIsUhira] = useState(undefined)
  const [customer, setCustomer] = useState({})
  const [image, setImage] = useState({})

  useEffect(() => {
    const setInfo = async () => {
      const id = await AsyncStorage.getItem('user_id')
      axios.get(`http://wateraccess.t3ch.rw:8234/getcustomerbyid/${id}`).then((res) => {
        setCustomer(res.data[0])
      }).catch(err => {
        console.log(err)
      })
      axios.get(`http://wateraccess.t3ch.rw:8234/backgroundlist/`).then((res) => {
        setImage(res.data[0])
      }).catch(err => {
        console.log(err)
      })
      axios.get(`http://wateraccess.t3ch.rw:8234/subscriptions_by_customer/${id}`).then((res) => {
        var subs = []
        console.log(res.data.length)
        navigation.navigate('Home')
        for (var i = 0; i < res.data.length; i++) {
          subs.push(res.data[i].Category.Title.toUpperCase())
          console.log(res.data[i].TotalBalance)
        }
        if (subs.includes('AMAZI')) {
          setIsAmazi(true)
        }
        if (subs.includes('INUMA')) {
          setIsInuma(true)
        }
        if (subs.includes('UHIRA')) {
          setIsUhira(true)
        }
        if (!subs.includes('AMAZI')) {
          setIsAmazi(false)
        }
        if (!subs.includes('INUMA')) {
          setIsInuma(false)
        }
        if (!subs.includes('UHIRA')) {
          setIsUhira(false)
        }
        setSubscriptions(subs)
      }).catch(err => {
        console.log(err)
      })
    }
    setInfo();

  }, [])



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
      navigation.push('Home')
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
      navigation.push('Home')
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
      navigation.push('Home')
    }).catch(err => {
      console.log(err)
    })



  }

  const amazi_alert = () =>
    Alert.alert(
      "Subscribe",
      "To ensure all taps provide safe water and encourage rain water harvesting, Amazi provides first flush diverter systems and point of entry filtration systems. With this solution, households, schools, clinics can save on their water bill in the rain season while reducing the amount of run-off water that would otherwise cause flooding. The systems come with a one-year warranty. Filters include in-line filters, table-top, portable and Aquatabs Chlorinators",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Comfirm", onPress: () => sub_amazi() }
      ]
    );

  const inuma_alert = () =>
    Alert.alert(
      "Subscribe",
      "INUMA creates a borehole-fed micro-grid piped safe water network where purified safe water is available at public points and piped into households for private access. All water is purified through a treatment process, pumped using solar and AC and sold via pre-paid water meters activated through a token.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Comfirm", onPress: () => sub_inuma() }
      ]
    );

  const uhira_alert = () =>
    Alert.alert(
      "Subscribe",
      "Targeted at farmers and off-grid businesses, uhira includes a borehole, a solar pump, a pipeline, elevated storage system and an optional cattle trough or tap system from the tank, our systems allow for reliable access to safe water anywhere, even when living far from surface water. Our team accompanies you from survey to maintenance.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Comfirm", onPress: () => sub_uhira() }
      ]
    );




  const renderHeader = () => {

    return (
      <View
        style={{
          width: "100%",
          height: 200,
          borderBottomLeftRadius:8,
          borderBottomRightRadius:8,
          overflow: 'hidden',

        }}
       >
        <ImageBackground

          resizeMode='cover' 
          source={{ uri: image.Image }}
          style={{
            flex: 1,
            alignItems: "center",
          }}
         >
          {/* Header Bar */}
         

          {/* Balance */}
          {/* <View
            style={{
              paddingTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
           >
            <Text style={{ color: COLORS.white, ...FONTS.h2,marginTop:20 }}>
              Welcome {customer.FirstName}
            </Text> 
          </View> */}

          {/* Trending */}

        </ImageBackground>


      </View>
    );
  }





  return (


    <View style={{ flex: 1, height: "100%",backgroundColor:"#f2f2f2" }}>
      {renderHeader()}

      <Text  style={{fontSize: 24, color: "#009cde",paddingTop:10,marginLeft:22,fontWeight:"bold",marginBottom:10}}>Services</Text>


      <ScrollView style={{ height: "100%", marginBottom: 10 }}>
        {isAmazi===undefined?(
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View
              style={{
                width: '90%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderLeftWidth: 10,
                borderLeftColor: "#88b04b",
                borderRadius: 8,
                backgroundColor: "white",
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow
                

                  }}
                //onPress={() => navigation.navigate("Landing")}
                >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base, alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: "#00b4e3" }}>AMAZI</Text>
                  <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "white",
                    width: 100,
                    marginLeft: 1,
                    marginTop: 5
                  }}>

                  </View>

                  

                </View>
              </View>


            </View>
          </View>
        ):(
          <>
          {isAmazi ? (
          <TouchableOpacity onPress={() => navigation.navigate("CryptoDetail")} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
            <View
              style={{
                width: '95%',
                height: 90,
                paddingVertical: 5,
                paddingHorizontal:18,
                borderRadius: 8,
                backgroundColor: "#00b4e3",
                
                ...styles.shadow

              }}

            >
              <View style={{ flexDirection: 'row'}}>
              <View style={{paddingTop:22}}>
              <Image resizeMode='contain' style={{ width: 35, height: 35 }} source={require('../assets/icons/amazi2.png')} />
              </View>
                <View>
                  <Text style={{ fontSize: 20, color: "white",marginTop:13,fontWeight:"bold",marginLeft:20 }}>AMAZI</Text>
                  
                  <View>
                    <Text style={{ color: 'white', ...FONTS.body3, marginTop: 5, fontSize: 18,marginLeft:20 }}>
                      Subscribed
                    </Text>
                  </View>


                </View>

                <View style={{justifyContent:"center",marginLeft:"45%",paddingTop:20}}>
                  
                  <SimpleLineIcons name="arrow-right" size={20} color="white"  />
   
                </View>
              </View>


            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
            <View
              style={{
                width: '95%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderLeftWidth: 10,
                borderLeftColor: "#00b4e3",
                borderRadius: 8,
                backgroundColor: "#f2f2f2",
                ...styles.shadow

              }}
            //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

              <View style={{paddingTop:20}}>
              <Image resizeMode='contain' style={{ width: 35, height: 35 }} source={require('../assets/icons/amazii.png')} />
              </View>

                <View style={{ marginLeft: 25,  }}>
                  <Text style={{ fontSize: 20, color: "#1f1f1f",marginTop:10,fontWeight:"bold" }}>AMAZI</Text>
                 

                  <TouchableOpacity onPress={() => { amazi_alert() }}>
                    <Text style={{ color: '#707070', ...FONTS.body3, marginTop: 10, fontSize: 18 }}>
                    Tap to Subscribe
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>


            </View>
          </View>
        )}
          </>
        )}

        

        {isInuma===undefined?(
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
            <View
              style={{
                width: '90%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderLeftWidth: 10,
                borderLeftColor: "#00b5de",
                borderRadius: 8,
                backgroundColor: "white",
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow

              }}
            //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base, alignItems: 'center' }}>
                <Text style={{fontSize: 20, color: "#00b4e3",marginTop:10,fontWeight:"bold"}}>INUMA</Text>
                  <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "#00b4e3",
                    width: 75,
                    marginLeft: 1,
                    marginTop: 5
                  }}>

                  </View>
                  

                </View>
              </View>


            </View>
          </View>
              ):(
                <>
        {isInuma ? (
          <TouchableOpacity onPress={() => navigation.navigate("inuma")} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
            <View
              style={{
                width: '95%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 18,
                borderRadius: 8,
                backgroundColor: "#00b5de",
                ...styles.shadow

              }}
            //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>


              <View style={{paddingTop:22}}>
              <Image resizeMode='contain' style={{ width: 35, height: 35 }} source={require('../assets/icons/inuma2.png')} />
              </View>
                <View>
                  <Text style={{ fontSize: 20, color: "white",marginTop:13,fontWeight:"bold",marginLeft:20 }}>INUMA</Text>
                  
                  <View>
                    <Text style={{ color: 'white', ...FONTS.body3, marginTop: 5, fontSize: 18,marginLeft:20 }}>
                      Subscribed
                    </Text>
                  </View>


                </View>
                <View style={{justifyContent:"center",marginLeft:"45%",paddingTop:20}}>
                  
                  <SimpleLineIcons name="arrow-right" size={20} color="white"  />
   
                </View>
              </View>


            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
            <View
              style={{
                width: '95%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderLeftWidth: 10,
                borderLeftColor: "#00b5de",
                borderRadius: 8,
                backgroundColor: "white",
                ...styles.shadow

              }}
            //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

              <View style={{paddingTop:20}}>
              <Image resizeMode='contain' style={{ width: 35, height: 35 }} source={require('../assets/icons/inumai.png')} />
              </View>

                <View style={{ marginLeft: 25, }}>
                <Text style={{fontSize: 20, color: "#1f1f1f",marginTop:10,fontWeight:"bold"}}>INUMA</Text>
                  
                  <TouchableOpacity onPress={() => { inuma_alert() }}>
                    <Text style={{ color: '#707070', ...FONTS.body3, marginTop: 10, fontSize: 18 }}>
                     Tap to Subscribe
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>


            </View>
          </View>
        )}
        </>
        )}



        {isUhira===undefined?(
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25, marginBottom: 100, }}>
            <View
              style={{
                width: '90%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderLeftWidth: 10,
                borderLeftColor: "#88b04b",
                borderRadius: 8,
                backgroundColor: "white",
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow

              }}
            //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

                <View style={{ marginLeft: SIZES.base, alignItems: 'center' }}>
                <Text style={{fontSize: 20, color: "#00b4e3",marginTop:10,fontWeight:"bold"}}>UHIRA</Text>
                  <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "#00b4e3",
                    width: 75,
                    marginLeft: 1,
                    marginTop: 5
                  }}>

                  </View>
                  

                </View>
              </View>


            </View>
          </View>
              ):(
                <>
        {isUhira ? (
          <TouchableOpacity onPress={() => navigation.navigate("uhira")} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 100, }}>
            <View
              style={{
                width: '95%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 12,
                marginBottom: 100,
                borderRadius: 8,
                backgroundColor: "#88b04b",
                ...styles.shadow

              }}
            //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

              <View style={{paddingTop:22}}>
              <Image resizeMode='contain' style={{ width: 35, height: 35,marginLeft:"8%" }} source={require('../assets/icons/uhira2.png')} />
              </View>
                <View>
                  <Text style={{ fontSize: 20, color: "white",marginTop:13,fontWeight:"bold" }}>UHIRA</Text>
                  
                  <View>
                    <Text style={{ color: 'white', ...FONTS.body3, marginTop: 5, fontSize: 18 }}>
                      Subscribed
                    </Text>
                  </View>


                </View>

                <View style={{justifyContent:"center",marginLeft:"45%",paddingTop:20}}>
                  
                  <SimpleLineIcons name="arrow-right" size={20} color="white"  />
   
                </View>
              </View>


            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 100, }}>
            <View
              style={{
                width: '95%',
                height : 90,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderLeftWidth: 10,
                borderLeftColor: "#88b04b",
                borderRadius: 8,
                backgroundColor: "white",
                ...styles.shadow

              }}
            //onPress={() => navigation.navigate("Landing")}
            >
              <View style={{ flexDirection: 'row' }}>

              <View style={{paddingTop:20}}>
              <Image resizeMode='contain' style={{ width: 35, height: 35,marginLeft:"10%" }} source={require('../assets/icons/uhirai.png')} />
              </View>

                <View >
                <Text style={{fontSize: 20, color: "#1f1f1f",marginTop:10,fontWeight:"bold"}}>UHIRA</Text>

                  <TouchableOpacity onPress={() => { uhira_alert() }}>
                    <Text style={{ color: '#707070', ...FONTS.body3, marginTop: 10, fontSize: 18 }}>
                    Tap to Subscribe
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>


            </View>
          </View>
        )}
        </>
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
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "#fdeae7",
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "#de4f35",
  },
  cardsWrapper: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    width: '100%'
  },
  card: {
    height: 150,
    width: 300,
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  cardImgWrapper: {
    width: 130,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#e5e4eb",
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444'
  },
});



export default Home;
