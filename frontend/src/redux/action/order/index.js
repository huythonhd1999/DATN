import * as types from "../../data/index";

export const setSelectedOrderType = (selectedOrderType) => {
    return {
        type: types.SET_SELECTED_ORDER_TYPE,
        selectedOrderType,
    }
}