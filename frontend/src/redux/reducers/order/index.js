import * as types from "../../data/index"

var initState = {
    selectedOrderType: 0 //0 là all 1 là immediate sale 2 là booking 3 là canceled
}

var orderOptions = (state = initState, action) => {
    switch (action.type) {
        case types.SET_SELECTED_ORDER_TYPE:
            return {
                ...state, 
                selectedOrderType: action.selectedOrderType
            }
        default:
            return state
    }
};

export default orderOptions