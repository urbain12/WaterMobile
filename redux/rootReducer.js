import { combineReducers } from "redux";
import shopReducer from './shopping/shopping-reducers'
import catReducer from './shopping/catridges-reducers'
const rootReducer = combineReducers({
    shop:shopReducer,
    shop:catReducer
});

export default rootReducer;