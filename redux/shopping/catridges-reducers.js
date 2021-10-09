import { action } from 'mobx';
import * as actionTypes from './shopping-types';

const initialState={
    products:[],
    cart:[],
    currentItem:null
}

const catReducer=(state=initialState,action)=>{
    switch(action.type){

        case actionTypes.RETRIEVE_PRODUCTS:
            return {
                ...state,
                products:action.payload,
            }

        case actionTypes.ADD_TO_CART:
            const item=state.products.find(prod=> prod.id===action.payload.id)
            const inCart=state.cart.find(item=> item.id===action.payload.id ? true:false)
            return {
                ...state,
                cart: inCart? state.cart.map(item=> item.id === action.payload.id ? {...item,qty:item.qty+1,total:(item.qty+1)*item.Amount} : item):[...state.cart,{...item,qty:1,total:item.Amount}]
            }

        case actionTypes.DECREASE_QTY:
            const my_item=state.cart.find(item=> item.id===action.payload.id)
            let many;
            if(my_item){
                many=my_item.qty>1
            }
            else{
                many=false
            }
            return {
                ...state,
                cart: many? state.cart.map(item=> item.id === action.payload.id ? {...item,qty:item.qty-1,total:(item.qty-1)*item.Amount} : item):state.cart.filter(item => item.id!==action.payload.id)
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart:state.cart.filter(item => item.id!==action.payload.id)
            }

        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart:state.cart.map(item=> item.id===action.payload.id ? {...item,qty:action.payload.qty}:item)
            }

        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem:action.payload,
            }
        default:
            return state;
    }
}

export default catReducer;