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
// import { createStackNavigator } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-community/async-storage';
import { Home } from "../screens";
import { COLORS, FONTS, icons, images } from "../constants";
import Modal from "react-native-modal";
import Login from '../screens/Login'
const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

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
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  const [isVisible, setIsVisible] = useState(false);

  const modalHandler = () => {
    setIsVisible(!isVisible);
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
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
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
                       
                
                      <ScrollView showsVerticalScrollIndicator={false}>
                      
                        <Text style={{ textAlign: "center", fontSize: 30, color:"white",marginTop:30,paddingBottom:30 }}>
                          Quick Access
                          </Text>
                        <TouchableOpacity activeOpacity={1}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignContent: "center",
                            }}
                          >
                            <TouchableOpacity>
                              <View style={{ alignContent: "center"}}>
                              <View style={{marginLeft:'3%',backgroundColor:"white",width:110,height:120,alignItems:"center",justifyContent:"center",borderRadius:20}}>
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
                                <Text style={{ textAlign: "center",fontWeight:"bold",color:"white",paddingTop:10  }}>Our systems</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <View style={{ alignContent: "center"}}>
                                <View style={{marginLeft:'2%',backgroundColor:"white",width:110,height:120,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                                <Image
                                  source={icons.mtn}
                                  resizeMode="contain"
                                  style={{
                                    width: 90,
                                    height: 120,
                                    marginLeft: 0,
                                  }}
                                  />
                                  </View>
                                <Text style={{ textAlign: "center",fontWeight:"bold",color:"white",paddingTop:10 }}>Maintanance</Text>
                              </View>
                            </TouchableOpacity>
                            <View>
                              <TouchableOpacity>
                                <View>
                                <View style={{marginLeft:'2%',backgroundColor:"white",width:110,height:120,alignItems:"center",justifyContent:"center",borderRadius:20}}>
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
                                  <Text style={{ textAlign: "center",fontWeight:"bold",color:"white",paddingTop:10 }}>Support</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>

                        </TouchableOpacity>
                      </ScrollView>
                      </ImageBackground>
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
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
                style={{ width: "60%", margin: "3%" }}
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
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
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
