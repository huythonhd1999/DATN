import * as types from "../../../data/index"

var initState = {}

var storeReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_STORE_INFO:
            return {
                ...state, 
                store: action.store
            }
        default:
            return state
    }
};

export default storeReducer