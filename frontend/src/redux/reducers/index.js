import {combineReducers} from 'redux'
import authReducer from "./auth/index"
import storeReducer from "./setting/store/index"
import productOptions from './setting/product option'
import sellReducer from './sell/index'

export default combineReducers({
    // note: noteReducers
    authReducer: authReducer,
    storeReducer: storeReducer,
    productOptions: productOptions,
    sellReducer: sellReducer
})