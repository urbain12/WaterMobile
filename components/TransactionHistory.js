import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

import { COLORS, SIZES, FONTS, icons, } from "../constants"
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome5, Ionicons, Entypo, SimpleLineIcons } from "@expo/vector-icons";


const TransactionHistory = ({ customContainerStyle, history,information }) => {
    const format = (amount) =>{
        return Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')

    };
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base
            }}
            onPress={() => console.log(item)}
        >
            <Image
                source={icons.exchange}
                style={{
                    width: 14,
                    height: 14,
                    
                }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ ...FONTS.h3 }}>Instalment</Text>
                <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{item.PaidMonth}</Text>
            </View>

            <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                <Text style={{ color: item.type == "B" ? COLORS.green : COLORS.black, ...FONTS.h3 }}>{JSON.stringify(format(item.Paidamount)).substring(1,JSON.stringify(format(item.Paidamount)).length-4)} Rwf</Text>
                <Image
                    source={icons.right_arrow}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray
                    }}
                />
            </View>
        </TouchableOpacity>
    )

    return (
        <View
            style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                width:"90%",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle,
                marginLeft:20
            }}
        >   
                <Text style={{ ...FONTS.h2 }}>Installment History</Text>
                {information.Downpayment>0&&(
                    <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: SIZES.base
                    }}
                >
                    <FontAwesome5 name="exchange-alt" size={20} color="#009cde" style={{marginTop:2}} />

                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={{ fontSize:18,color:"#707070" }}>Down Payment</Text>
                    </View>

                    <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                        <Text style={{ color: '#009cde', ...FONTS.h3 }}>{JSON.stringify(format(information.Downpayment)).substring(1, JSON.stringify(format(information.Downpayment)).length - 4)} Rwf</Text>
                    </View>
                </TouchableOpacity>
                )}
            {history.length>0?(
                <View>
            <FlatList
                contentContainerStyle={{ marginTop: SIZES.radius }}
                scrollEnabled={false}
                data={history}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ width: "100%", height: 1, backgroundColor: COLORS.lightGray }}></View>
                    )
                }}
            />
                </View>
            ):(
                <>
                {(information.Downpayment==0 && history.length==0)&&(<View style={{justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:20}}>
                <Text>No transaction yet!</Text>
            </View>)}
            </>
            )}
            
        </View>
    )
}

export default TransactionHistory;