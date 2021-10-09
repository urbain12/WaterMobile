import * as actionTypes from './shopping-types';
import axios from 'axios'
import { AsyncStorage } from 'react-native';


export const retrieveProducts=()=>async dispatch=>{
	try{
      const id = await AsyncStorage.getItem('user_id')
      const res=await axios.get(`http://wateraccess.t3ch.rw:8234/SubscriptionsTools/${id}`);
      dispatch({
      	type:actionTypes.RETRIEVE_PRODUCTS,
      	payload:res.data
      })
	}catch(err){
        console.log(err)
}
}

export const addToCart=(itemID)=>{
    return {
        type:actionTypes.ADD_TO_CART,
        payload:{
            id:itemID
        }
    }
}

export const decreaseQty=(itemID)=>{
    return {
        type:actionTypes.DECREASE_QTY,
        payload:{
            id:itemID
        }
    }
}

export const removeFromCart=(itemID)=>{
    return {
        type:actionTypes.REMOVE_FROM_CART,
        payload:{
            id:itemID
        }
    }
}

export const adjustQty=(itemID,value)=>{
    return {
        type:actionTypes.ADJUST_QTY,
        payload:{
            id:itemID,
            qty:value
        }
    }
}

export const loadCurrentItem=(item)=>{
    return {
        type:actionTypes.LOAD_CURRENT_ITEM,
        payload:item
    }
}