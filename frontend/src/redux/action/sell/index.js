import * as types from "../../data/index";

export const setLoading = (loadingState) => {
    return {
        type: types.SET_LOADING,
        loadingState,
    }
}

export const setOrderItemList = (orderItemList) => {
    return {
        type: types.SET_ORDER_ITEM_LIST,
        orderItemList,
    }
}