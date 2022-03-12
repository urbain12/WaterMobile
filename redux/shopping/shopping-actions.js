import * as actionTypes from './shopping-types';
import axios from 'axios'

export const retrieveProducts=()=>async dispatch=>{
	try{
      const res=await axios.get('http://admin.amazi.rw/Productlist/');
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

export const clearCart=()=>{
    return {
        type:actionTypes.CLEAR_CART,
    }
}