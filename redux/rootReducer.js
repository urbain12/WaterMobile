import { combineReducers } from "redux";
import shopReducer from './shopping/shopping-reducers'
const rootReducer = combineReducers({
    shop:shopReducer
});

export default rootReducer;