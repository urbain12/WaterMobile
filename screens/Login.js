import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    StyleSheet,
    CheckBox,
    StatusBar,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/Entypo';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { icons, images } from '../constants'
import { AuthContext } from '../context/Context';
import { RadioButton } from 'react-native-paper'



const Login = ({ navigation }) => {

    const year = new Date().getFullYear()

    const [data, setData] = React.useState({
        phone: '',
        password: '',
        loading: false,
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const { signIn } = React.useContext(AuthContext);
    const [isSelected, setSelection] = useState(false)

    const { colors } = useTheme();


    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                phone: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                phone: val,
                check_textInputChange: false,
            });
        }
    }

    const handlePasswordChange = (val) => {

        setData({
            ...data,
            password: val,

        });

    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (phone, password) => {
        setData({
            ...data,
            loading: true
        });
        console.log(phone, password)
        signIn(phone, password);
        setTimeout(() => {
            setData({
                ...data,
                loading: false
            });
        }, 10000)

    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#e6e4df' barStyle="light-content" />
            <View style={styles.header}>
                <ImageBackground source={icons.asset} style={{ width: '110%', height: '100%', overflow: 'hidden' }}>

                    <Image source={images.Logo}
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: "50%",
                            marginTop: 65,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    />
                </ImageBackground>
                    <Text style={{fontWeight:"900",marginTop:8,fontSize:18}}>Water Access Rwanda</Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "bold", marginBottom: 10, color: "#707070" }}>Providing Simple,Affordable, and Durable water solutions</Text>

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, styles.shadow, {
                    backgroundColor: "white",
                }]}
            >
                <Text style={{ textAlign: 'center', color: "#1B1C1E", fontWeight: "bold", paddingBottom: 20, fontSize: 18 }}>Welcome</Text>


                <View style={styles.action}>
                    <Icon
                        name="user"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="07-------"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text,marginLeft:10
                        }]}
                        value={data.username}
                        onChangeText={(val) => textInputChange(val)}
                        autoCapitalize="none"
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Icon
                                name="check"
                                color="green"
                                size={30}
                            />
                        </Animatable.View>
                        : null}
                </View>

                <View style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 10
                }]}></View>
                <View style={styles.action}>
                    <Icon
                        name="lock"
                        color={colors.text}
                        size={30}
                        style={{marginLeft:-5}}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text,marginLeft:10
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?

                            <Icon
                                name="eye-with-line"
                                color="grey"
                                size={20}
                            />
                            :
                            <Icon
                                name="eye"
                                color="black"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>





                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.phone, data.password) }}
                    >
                        <View
                            style={{ backgroundColor: "#009cde", width: "100%", height: "100%", alignItems: "center", borderRadius: 10 }}
                        >
                            {data.loading ? (
                                <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                            ) :
                                (
                                    <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Sign In</Text>
                                )}

                        </View>
                    </TouchableOpacity>

                </View>


                <TouchableOpacity onPress={() => navigation.navigate('Resetpassword')}>
                    <Text style={{ color: '#1B1C1E', marginTop: 15, fontWeight: "bold" }}>Forgot password?  <Text style={{ color: "#009cde", fontWeight: "bold" }}>Recover credentials</Text></Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: '#1B1C1E', marginTop: 10, fontWeight: "bold" }}>Don't have an account?  </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={{ color: "#009cde", fontWeight: "bold", marginTop:10 }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", marginTop: "45%" }}>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "#707070" }}>Copyright @ {year} Water access Rwanda</Text>
                </View>

            </Animatable.View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
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
    footer: {
        flex: 3,
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '90%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        elevation: 5
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 0.3,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

});
