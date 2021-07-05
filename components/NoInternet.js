import React from 'react'
import {View,Image,Button,Text,TouchableOpacity} from 'react-native';
const NoInternet = (props) => {
    return (
        <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }}>
            <Image 
            source={require('../assets/icons/no_internet.jpg')}
            style={{width:'50%',height:'30%'}}
            resizeMode='contain'
            />
            <TouchableOpacity
            onPress={props.check}
            style={{
            backgroundColor:'blue',
            borderRadius:5,
            width:'30%',
            height:'5%',
            alignItems:'center',
            justifyContent:'center'
        }}>
                <Text style={{color:'white'}}>Reload</Text>
            </TouchableOpacity>

        </View>
    )
}

export default NoInternet;