import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Image,
    Platform,
    StyleSheet ,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from '@react-navigation/native';
import {images} from '../constants'
// import { AuthContext } from '../context/Context';



const Login = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        loading: false,
        check_textInputChange: false,
        secureTextEntry: true,
    });

    // const {signIn} = React.useContext(AuthContext);

    const { colors } = useTheme();


    const textInputChange = (val) => {
        if( val.length != 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                username: val,
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

    const loginHandle = (username,password) => {
        // setData({
        //     ...data,
        //     loading:true
        // });
        // console.log(username,password)
        // // signIn(username,password);
        // setTimeout(()=>{
        //     setData({
        //         ...data,
        //         loading:false
        //     });
        // },10000)
        
    }
    

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0B0123' barStyle="light-content"/>
        <View style={styles.header}>
            <Image source={images.banner}/>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >

            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>

            <View style={styles.action}>
                <Icon 
                name="user"
                color={colors.text}
                size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
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
                size={20}
                />
                </Animatable.View>
                : null}
            </View>
            
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop:35
            }]}>Password</Text>
            <View style={styles.action}>
                <Icon 
                name="lock"
                color={colors.text}
                size={20}
                />
                <TextInput 
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[styles.textInput, {
                    color: colors.text
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
            <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>{navigation.navigate('Home')}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                {data.loading ? (
                    <ActivityIndicator size='large' color='white'/>
                ):
                (
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                )}
                    
                </LinearGradient>
                </TouchableOpacity>

            </View>
        </Animatable.View>
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#0B0123'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        alignSelf:'center',
        backgroundColor: '#fff',
        width:'90%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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
        borderBottomWidth:0.3,
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
    }
  });
