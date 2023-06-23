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
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  axios.get('http://war.t3ch.rw:8231/wa-api/api/web/index.php?r=v1/app/get-payment-url', options,).then(res => {
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
        top: -15,
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
          backgroundColor: '#009cde'
        }}
      >
        {children}
         
      </View>
      <View style={{marginBottom:10,width:"100%"}}>

              <Text
                style={{
                  color:'#707070',fontFamily: "Roboto-Regular", fontSize: 12, lineHeight: 40
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
          height: 85,
          width:"100%",
          ...styles.footer,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ width:70}}>
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
                        height: "36%",
                        width: "95%",
                        backgroundColor: "#fff",
                        borderRadius: 40,

                      }}

                    >
                      <View  style={{ width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden',backgroundColor:"#707070" }}>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

                          <Text style={{ textAlign: "left", fontSize: 24, color: "white", marginTop: 30, paddingBottom: 30,marginLeft:'7%',fontWeight:"bold" }}>
                            Quick Access </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              width: '100%',
                              marginLeft:'5%'
                            }}
                          >

                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '28%' }}

                              onPress={() => { navigation.navigate("Shop"); setIsVisible(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '92%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <FontAwesome
                                  name="shopping-bag"
                                  size={28}
                                  color="#009cde"
                                  resizeMode="contain"
                                />
                              </View>
                              <Text style={{ color:"white",textAlign: "left",  paddingTop: 10,marginLeft:'25%',fontSize:18 }}>Shop</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '28%' }}

                              onPress={() => {
                                setIsVisible2(true); setIsVisible(false);
                              }}
                            >
                              <View style={{ backgroundColor: "white", width: '92%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <Image
                                  source={icons.waterpipe}
                                  resizeMode="contain"
                                  style={{
                                    width: 28,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "left",  paddingTop: 10,marginLeft:'-4%', color: "white",fontSize:18 }}>Maintenance</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '28%' }}

                              onPress={() => { navigation.navigate("query"); setIsVisible(false); }}
                            >
                              <View style={{ backgroundColor: "white", width: '92%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <Image
                                  source={icons.watersupport}
                                  resizeMode="contain"
                                  style={{
                                    width: 28,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "left",  paddingTop: 10,marginLeft:"15%", color: "white",fontSize:18 }}>Support</Text>
                            </TouchableOpacity>

                          </View>
                        </ScrollView>
                      </View>
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
                        height: "37%",
                        width: "95%",
                        backgroundColor: "#fff",
                        borderRadius: 40,

                      }}

                    >
                      <View  style={{ width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden',backgroundColor:"#707070" }}>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

                          <Text style={{ textAlign: "center", fontSize: 24, color: "white", marginTop: 30, paddingBottom: 30 }}>
                            Choose Maintenance type </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignContent: "center",
                              width: '100%',
                              alignItems:"center",
                              marginLeft:"4%"
                            }}
                          >

                            <TouchableOpacity style={{ alignItems: "center", marginLeft: '4%', width: '45%' }}

                              onPress={() => { navigation.navigate("request"); setIsVisible2(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '80%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <AntDesign name="tool" size={30} color="#009cde" />
                              </View>
                              <Text style={{ textAlign: "left", fontWeight: "bold", paddingTop: 10,marginLeft:2, color: "white" }}>Request Technician</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignContent: "center", marginLeft: '2%', width: '45%' }}

                              onPress={() => { navigation.navigate("Catridgeshop"); setIsVisible2(false); }}

                            >
                              <View style={{ backgroundColor: "white", width: '80%', height: 100, alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                                <Image
                                  source={icons.waterpipe}
                                  resizeMode="contain"
                                  style={{
                                    width: 30,
                                    height: 120,
                                    marginLeft: 2,
                                  }}
                                />
                              </View>
                              <Text style={{ textAlign: "left", fontWeight: "bold", paddingTop: 10,marginLeft:'12%', color: "white" }}>Catridge shop</Text>
                            </TouchableOpacity>
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>
              <Entypo name="home" size={30} color={focused ? '#009cde' : '#707070'} />
              <Text
                style={{
                  color: focused ? '#009cde' : '#707070',
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
            <View style={{ alignItems: "center", justifyContent: "center",width:70,marginLeft:30 }}>
              <Ionicons name="settings-sharp" size={30} color={focused ? '#009cde' : '#707070'} />
              <Text
                style={{
                  color: focused ? '#009cde' : '#707070',
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
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  footer: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Tabs;
