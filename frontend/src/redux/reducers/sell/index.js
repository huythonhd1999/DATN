import * as types from "../../data/index"

var initState = {
    loading: true,
    orderItemList: [],
    total: 0
}

function getOrderItemPrice(orderItem) {
    let variantPrice = orderItem.selectedVariant.price
    let taxPercent = orderItem.taxInfo?.percent || 0
    orderItem.selectedAddons.forEach((addon) => {
        variantPrice = variantPrice + addon.price * (1 + taxPercent/100)
    })
    return variantPrice * orderItem.quantity
}

function getTotal(orderItemList) {
    let total = 0
    orderItemList.forEach((orderItem) => {
        total = total + getOrderItemPrice(orderItem)
    })
    return total
}

var sellReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            return {
                ...state, 
                loading: action.loadingState
            }
        case types.SET_ORDER_ITEM_LIST :
            return {
                ...state,
                orderItemList: action.orderItemList,
                total: getTotal(action.orderItemList),
            }
        default:
            return state
    }
};

export default sellReducer