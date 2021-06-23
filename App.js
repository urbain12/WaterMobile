import React, { useMemo, useEffect } from 'react';
import { Provider } from 'mobx-react';
import { CryptoDetail, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login'
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import Tabs from "./navigation/tabs";
import { AuthContext } from './context/Context';
import { store } from './models/index';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Shop from './screens/Shop';
import Cart from './screens/Cart';
import query from './screens/Query';
import momo from './screens/momopay';
import creditcard from './screens/creditcard';
<<<<<<< HEAD
import Pay from './screens/Pay';
=======
import Pay from './screens/Pay'
>>>>>>> e65692dc7c58d7cfc3ce049c361fc7190508116f

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false
}

const App = () => {
  const initialState = {
    isLoading: true,
    user_id: '',
    token: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          user_id: action.user_id,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          user_id: action.user_id,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          token: null,
          user_id: null,
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


      await axios.post("http://wateraccess.t3ch.rw:8234/customer_login/", postObj)
        .then(res => {

          if (res.data.code == 200) {
            // console.log(res.data)
            console.log(res.data.code)


            const items = [['token', JSON.stringify(res.data.token)],
            ['user_id', JSON.stringify(res.data.user_id)],
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
            alert('Invalid email or password!')
          }
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            alert('Invalid email or password!')
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
  }), [])

  useEffect(() => {
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
  }, [])

  const [loaded] = useFonts({
    "Roboto-Black": require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if (!loaded) {
    return null;
  }

  //   if(loginState.isLoading){
  //     return(
  //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //             <ActivityIndicator size='large' color='#000'/>
  //         </View>
  //     )
  // }



  // else{
  //   if(loginState.token !== null){

  return (
    <Provider {...store}>
      <AuthContext.Provider value={authContext}>
<<<<<<< HEAD
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'Home'}
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
            name="momo"
            component={momo}
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
            name="Pay"
            component={Pay}
          />

          <Stack.Screen
            name="Cart"
            component={Cart}
          />

          <Stack.Screen
            name="Transaction"
            component={Transaction}
          />
        </Stack.Navigator>
      </NavigationContainer>
=======
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName={'Home'}
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
              name="momo"
              component={momo}
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
              name="Transaction"
              component={Transaction}
            />
          </Stack.Navigator>
        </NavigationContainer>
>>>>>>> e65692dc7c58d7cfc3ce049c361fc7190508116f
      </AuthContext.Provider>
    </Provider>
  )

  // }else{
  //     return (
  //         <AuthContext.Provider value={authContext}>
  //             <Login/>
  //         </AuthContext.Provider>
  //     )
  // }

  //}

}

export default App;