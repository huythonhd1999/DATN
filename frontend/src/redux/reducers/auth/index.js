import * as types from "../../data/index"

var initState = {}

var authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return {
                ...state, 
                user: action.userInfo
            }
        default:
            return state
    }
};

export default authReducer