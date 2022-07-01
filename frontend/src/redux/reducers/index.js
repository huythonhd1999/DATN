import {combineReducers} from 'redux'
import authReducer from "./auth/index"
import storeReducer from "./setting/store/index"
import productOptions from './setting/product option'

export default combineReducers({
    // note: noteReducers
    authReducer: authReducer,
    storeReducer: storeReducer,
    productOptions: productOptions

})