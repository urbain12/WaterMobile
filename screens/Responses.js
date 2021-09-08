import React,{useEffect, useState} from "react";
import { Text, StatusBar, View,ImageBackground, ScrollView, TouchableOpacity, Image, StyleSheet} from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import {Ionicons,FontAwesome,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';



const Responses = (props) => {
    const [responses,setResponses]=useState([])
    useEffect(()=>{
        const options = {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-auth": "705d3a96-c5d7-11ea-87d0-0242ac133829",
              "app-type": "none",
              "app-version": "v1",
              "app-device": "Postman",
              "app-device-os": "Postman",
              "app-device-id": "0",
              "format": "json"
            }
          };
          axios.get(`http://wateraccess.t3ch.rw:8234/Request/list/`).then(res => {
            console.log(res.data)
            const my_responses = res.data
            setResponses(my_responses);
          });
    },[])
    return(
    <View style={{flex:1}}>
        <StatusBar backgroundColor='#4263ec' barStyle="light-content"/>
        <ImageBackground source={images.banner_settings} style={{margin:0,flexDirection:'row'}}>

          <View style={{
              width:'20%',
              alignItems:'center',
              marginTop:'10%',
              marginBottom:'10%'
          }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={40} color="white" />
          </TouchableOpacity>
          </View>

          <View style={{
              width:'60%',
              alignItems:'center',
              marginTop:'10%',
              marginBottom:'10%'
          }}>
            <Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20,marginTop:10}}>Responses</Text>
          </View>

          <View style={{
              width:'20%',
              alignItems:'center',
              marginTop:'10%',
              marginBottom:'10%'
          }}>
          </View>

        </ImageBackground>

        <ScrollView style={{backgroundColor: "#f4f6fc",}}>
        

        {JSON.stringify(responses) !== 'null' && JSON.stringify(responses) !=='[]' ? (
  responses.map(response => {
    return (
      <View>
      <View style={styles.container}>
            <View style={styles.gradient}>
                <Text style={styles.text}>{response.Message} </Text>
            </View>
        </View>
        
        <View style={styles.container2}>
          <View>
          <View style={styles.gradient2} >
                <Text style={styles.text}>{response.reply}</Text>
            </View>
          </View>
        </View>
        </View>
    )
  })
) : (
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <Text>No Response yet...</Text>
    </View>
  )}
        
        </ScrollView>
    </View>
    )
}

export default Responses;

const styles = StyleSheet.create({
  container:{
      marginVertical:5,
      alignSelf:'flex-end'
  },
  duration:{
      color:'#b6b6b6',
      fontSize:11,
      marginTop:5,
      marginHorizontal:10,
      alignSelf:'flex-end'
  },
  gradient:{
      maxWidth:220,
      backgroundColor:'#3f423f',
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:15,
      marginHorizontal:10,
      paddingVertical:10,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      borderBottomLeftRadius:25,
  },
  gradient2:{
      maxWidth:220,
      backgroundColor:'#01b0f1',
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:15,
      marginHorizontal:10,
      paddingVertical:10,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      borderBottomRightRadius:25,
  },
  text:{
      color:'#fff',
  },
  duration2:{
    color:'#b6b6b6',
    fontSize:11,
    marginHorizontal:10,
    marginTop:5,
  },
  container2:{
    flexDirection:'row',
    marginTop:5,
    width:250
  },
  message2:{
    fontSize:13,
    marginHorizontal:15,
  }
})



