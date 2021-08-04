import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { COLORS, SIZES, FONTS, icons } from "../constants"

const PriceAlert = ({ customContainerStyle,navigation }) => {
    const dismissNotification=  ()=>{
        AsyncStorage.setItem('showNotification','false')
    }
    return (
        <View
        
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.padding * 1,
                marginHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding,
                paddingHorizontal: SIZES.radius,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                ...customContainerStyle,
                ...styles.shadow
            }}
        >
            <Image
                resizeMode='contain'
                source={icons.notification_color}
                style={{
                    width: 30,
                    height: 30
                }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ ...FONTS.h3 }}>Notifications</Text>
                <Text stlye={{ color:"#707070" }}>See your notifications here!!!</Text>
            </View>
                <TouchableOpacity onPress={dismissNotification}>
                   <FontAwesome
              name="times"
              size={20}
              color="red"
              resizeMode="contain"
            /> 
                </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8
    }
})

export default PriceAlert;