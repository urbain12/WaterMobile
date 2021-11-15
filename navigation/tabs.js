import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as Linking from 'expo-linking';
// import { createStackNavigator } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { Home } from "../screens";
import { COLORS, FONTS, icons, images } from "../constants";
import Modal from "react-native-modal";
import Login from '../screens/Login';
import Settings from '../screens/Settings';
import CryptoDetail from '../screens/CryptoDetail'
import { MaterialIcons, AntDesign, Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import axios from "axios";
const Tab = createBottomTabNavigator();

const handleSubmit = () => {
  console.log('ok')
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
  }
  axios.get('http://kwetu.t3ch.rw:5070/api/web/index.php?r=v1/app/get-payment-url', options,).then(res => {
    const my_data = JSON.parse(res.data)
    Linking.openURL(my_data.url)
  }).catch(err => {
    console.log('there is an error')
  })
}

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View

        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#01B0F1'
        }}
      >
        {children}
         
      </View>
      <View style={{marginBottom:10,width:"100%"}}>

              <Text
                style={{
                  color:'black',fontFamily: "Roboto-Regular", fontSize: 12, lineHeight: 22
                }}
              >
                QUICK ACCESS
              </Text>
              </View>
    </TouchableOpacity>
    
  );
};

const Tabs = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const modalHandler = () => {
    setIsVisible(!isVisible);
  };
  const modalHandler2 = () => {
    setIsVisible2(!isVisible2);
  };

  // const loggedIn=await AsyncStorage.getItem('login')

  // if(!loggedIn){
  //    return(
  //      <Login/>
  //    )
  // }
  // else {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: 100,
          width:"100%"
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" ,width:70}}>
              {/* modal1 */}
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
                      <ImageBackground source={images.modalbanner} style={{ width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden' }}>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

                          <Text style={{ textAlign: "center", fontSize: 30, color: "white", marginTop: 30, paddingBottom: 30 }}>
                            Quick Access </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignContent: "center",
                              width: '100%'
                            }}
                          >

                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '30%' }}

                              onPress={() => { navigation.navigate("Shop"); setIsVisible(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                <FontAwesome
                                  name="shopping-bag"
                                  size={80}
                                  color="#01B0F1"
                                  resizeMode="contain"
                                />
                              </View>
                              <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Shop</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '30%' }}

                              onPress={() => {
                                setIsVisible2(true); setIsVisible(false);
                              }}
                            >
                              <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                <Image
                                  source={icons.waterpipe}
                                  resizeMode="contain"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Maintenance</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '30%' }}

                              onPress={() => { navigation.navigate("query"); setIsVisible(false); }}
                            >
                              <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                <Image
                                  source={icons.watersupport}
                                  resizeMode="contain"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Support</Text>
                            </TouchableOpacity>

                          </View>
                        </ScrollView>
                      </ImageBackground>
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>


              {/* modal 2 */}
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
                        height: "45%",
                        width: "95%",
                        backgroundColor: "#fff",
                        borderRadius: 40,

                      }}

                    >
                      <ImageBackground source={images.modalbanner} style={{ width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden' }}>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

                          <Text style={{ textAlign: "center", fontSize: 30, color: "white", marginTop: 30, paddingBottom: 30 }}>
                            Choose Maintenance type </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignContent: "center",
                              width: '100%'
                            }}
                          >

                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '4%', width: '45%' }}

                              onPress={() => { navigation.navigate("request"); setIsVisible2(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                <AntDesign name="tool" size={80} color="#01B0F1" />
                              </View>
                              <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Request Technician</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '45%' }}

                              onPress={() => { navigation.navigate("Catridgeshop"); setIsVisible2(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '100%', height: 120, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                <Image
                                  source={icons.waterpipe}
                                  resizeMode="contain"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", paddingTop: 10, fontWeight: "bold", color: "white" }}>Catridge shop</Text>
                            </TouchableOpacity>
                          </View>
                        </ScrollView>
                      </ImageBackground>
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>
              <Entypo name="home" size={30} color={focused ? '#01B0F1' : COLORS.black} />
              <Text
                style={{
                  color: focused ? '#01B0F1' : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Transaction"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <TouchableOpacity
                style={{ width: "100%", margin: "3%" }}
                onPress={() => {
                  setIsVisible(true);
                }}
              >
                <Image
                  source={icons.transaction}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: COLORS.white,
                  }}
                />
              </TouchableOpacity>
             
            </View>

          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
         
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center",width:70 }}>
              <Ionicons name="settings-sharp" size={30} color={focused ? '#01B0F1' : COLORS.black} />
              <Text
                style={{
                  color: focused ? '#01B0F1' : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
  // }
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Tabs;
