import {combineReducers} from 'redux'
import authReducer from "./auth/index"
import storeReducer from "./setting/store/index"

export default combineReducers({
    // note: noteReducers
    authReducer: authReducer,
    storeReducer: storeReducer
})