import React, { useMemo, useEffect, useState ,useRef} from 'react';
import { Provider } from 'react-redux';
import { CryptoDetail, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login'
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, Text } from 'react-native';
import Tabs from "./navigation/tabs";
import { AuthContext } from './context/Context';
import store from './redux/store';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Shop from './screens/Shop';
import Catridgeshop from './screens/Catridgeshop';
import CatridgesDetails from './screens/CatridgesDetails';
import Catridgecart from './screens/Catridgecart';
import Cart from './screens/Cart';
import query from './screens/Query';
import momo from './screens/Momopay';
import ProductDetails from './screens/ProductDetails';
import creditcard from './screens/creditcard';
import Pay from './screens/Pay';
import { checkConnected } from './function';
import NoInternet from './components/NoInternet';
import uhira from './screens/uhira';
import inuma from './screens/inuma';
import changepassword from './screens/changepassword';
import Notification from './screens/notifications'
import Responses from './screens/Responses';
import paywater from './screens/paywater';
import request from './screens/request';
import Landing from './screens/Landing';
import Register from './screens/Register';
import checkPhone from './screens/checkPhone';
import verifyphone from './screens/verifyphone';
import UpdateCustomer from './screens/UpdateCustomer';
import Resetpassword from './screens/Resetpassword';
import Payuhira from './screens/Payuhira';
import Payinuma from './screens/Payinuma';
import Constants from 'expo-constants';
import WaitingScreen from './screens/WaitingScreen';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Water Access Rwanda 📬",
      body: 'You are using Water Access App',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  console.log('token at start', token); 
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "No Notification Permission",
        "please goto setting and on notification permission manual",
        [
          { text: "cancel", onPress: () => console.log("cancel") },
          { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
        ],
        { cancelable: false }
      );
      return;
    }
//    if (finalStatus !== 'granted') {
//      alert('Failed to get push token for push notification!');
//      return;
//    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const App = () => {
  const [netState,setNetState]=useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  checkConnected().then(res=>{
    setNetState(res)
  })
  const initialState = {
    isLoading: true,
    user_id: '',
    showAlert:true,
    token: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          user_id: action.user_id,
          showAlert:true,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          user_id: action.user_id,
          showAlert:true,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          token: null,
          user_id: null,
          showAlert:true,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialState)

  const authContext = useMemo(() => ({
    signIn: async (phone, password) => {
      // setUserToken('kdjf');
      // setIsLoading(false)

      const postObj = JSON.stringify({
        'phone': phone,
        'password': password,
      })
      console.log(postObj)

      // let my_token = localStorage.getItem('token');

      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.headers = {
        "Content-Type": "application/json",
        // Authorization: `Token ${my_token}`,
      };


      await axios.post("http://admin.amazi.rw/customer_login/", postObj)
        .then(res => {

          if (res.data.code == 200) {
            // console.log(res.data)
            console.log(res.data.code)


            const items = [['token', JSON.stringify(res.data.token)],
            ['user_id', JSON.stringify(res.data.user_id)],
            ['showAlert','true'],
            ['showNotification','true']
            ]
            AsyncStorage.multiSet(items, () => {
              console.log('asyncstorage set successfully')
            });
            dispatch({
              type: 'LOGIN',
              token: JSON.stringify(res.data.token),
              user_id: JSON.stringify(res.data.user_id),

            })

          }
          else {
            alert('Invalid phone or password!')
          }
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            alert('Invalid phone or password!')
          }
        })


    },
    signOut: async () => {

      try {
        await AsyncStorage.multiRemove(["token", "user_id"]);
      } catch (error) {
        console.log(error)
      }
      dispatch({ type: 'LOGOUT' })
    }
  }))

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    setTimeout(async()=>{
      await schedulePushNotification()
    },4000)
    

    setTimeout(async () => {
      // setIsLoading(false);
      let token;
      let user_id;

      token = null;
      user_id = null;


      try {
        //  await   AsyncStorage.multiRemove(["userToken", "userName", "email", "redirect_page","properties","tenant_info"]);
        const data = await AsyncStorage.multiGet(["token", "user_id"]);
        const new_data = data.map(entry => entry[1]);
        token = new_data[0]
        user_id = new_data[1]

        dispatch({
          type: 'RETRIEVE_TOKEN',
          token: token,
          user_id: user_id,

        })
      } catch (error) {
        console.log(error)
      }

    }, 2000)
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [])

  const [loaded] = useFonts({
    "Roboto-Black": require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if(netState===true){
    if (!loaded) {
      return null;
    }
  
    if(loginState.isLoading){
      return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size='large' color='#000'/>
          </View>
      )
  }



  else{
    if(loginState.token !== null){

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            
          >

            <Stack.Screen
              name="Home"
              component={Tabs}
            />
            <Stack.Screen
              name="query"
              component={query}
            />
            <Stack.Screen
              name="Landing"
              component={Landing}
            />
            <Stack.Screen
              name="momo"
              component={momo}
            />
             <Stack.Screen
              name="paywater"
              component={paywater}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
            />
            <Stack.Screen
              name="Responses"
              component={Responses}
            />
            <Stack.Screen
              name="creditcard"
              component={creditcard}
            />
            <Stack.Screen
              name="CryptoDetail"
              component={CryptoDetail}
            />

            <Stack.Screen
              name="Shop"
              component={Shop}
            />

            <Stack.Screen
              name="Cart"
              component={Cart}
            />

            <Stack.Screen
              name="Pay"
              component={Pay}
            />
            <Stack.Screen
              name="uhira"
              component={uhira}
            />
            <Stack.Screen
              name="inuma"
              component={inuma}
            />
            <Stack.Screen
              name="changepassword"
              component={changepassword}
            />
            <Stack.Screen
              name="Notification"
              component={Notification}
            />
            <Stack.Screen
              name="Transaction"
              component={Transaction}
            />
            <Stack.Screen
              name="request"
              component={request}
            />

            <Stack.Screen
              name="UpdateCustomer"
              component={UpdateCustomer}
            />
            <Stack.Screen
              name="Payuhira"
              component={Payuhira}
            />
            <Stack.Screen
              name="Payinuma"
              component={Payinuma}
            />
            <Stack.Screen
              name="WaitingScreen"
              component={WaitingScreen}
            />
            <Stack.Screen
              name="Catridgeshop"
              component={Catridgeshop}
            />
            <Stack.Screen
            name="CatridgesDetails"
            component={CatridgesDetails}
          />
          <Stack.Screen
          name="Catridgecart"
          component={Catridgecart}
        />
            
             
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  )

  }else{
      return (
          <AuthContext.Provider value={authContext}>
              <NavigationContainer>
              <Stack.Navigator screenOptions={{
              headerShown: false
            }}>
                <Stack.Screen
                  name="Login"
                  component={Login}
                />
              <Stack.Screen
              name="Register"
              component={Register}
            />
            <Stack.Screen
              name="checkPhone"
              component={checkPhone}
            />
            <Stack.Screen
              name="verifyphone"
              component={verifyphone}
            />
            <Stack.Screen
              name="Resetpassword"
              component={Resetpassword}
            />
              </Stack.Navigator>
              </NavigationContainer>
          </AuthContext.Provider>
      )
  }

  }
  }else{
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size='large' color='#000'/>
          </View>
    )
  }

    

}

export default App;