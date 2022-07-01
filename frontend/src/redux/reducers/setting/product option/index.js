import * as types from "../../../data/index"

var initState = {
    selectedTab: 1
}

var productOptions = (state = initState, action) => {
    switch (action.type) {
        case types.SET_SELECTED_TAB:
            return {
                ...state, 
                selectedTab: action.selectedTab
            }
        default:
            return state
    }
};

export default productOptions