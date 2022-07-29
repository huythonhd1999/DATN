import * as types from "../../data/index"

var initState = {
    loading: true,
    orderItemList: [],
    total: 0,
    coupon: {},
    totalQuantity: 0,
    orderType: 1,
    paymentType: 1,
    deliveryDate: (new Date()).toString(),
    bookingAdvance: 0,
    notes: "",
    canFinishOrder: false,
    cashTendered: 0,
    isDoorDelivery: 1,
}

function getOrderItemPrice(orderItem) {
    let variantPrice = orderItem.selectedVariant.price
    let taxPercent = orderItem.taxInfo?.percent || 0
    orderItem.selectedAddons.forEach((addon) => {
        variantPrice = variantPrice + addon.price * (1 + taxPercent / 100)
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

function getOrderValue(total, coupon) {
    if (coupon) {
        return coupon.type === 0 ? total * (1 - coupon.amount) : total - coupon.amount
    } else {
        return total
    }
}

function getTotalQuantity(orderItemList) {
    let total = 0
    orderItemList.forEach((orderItem) => {
        total = total + orderItem.quantity
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
        case types.SET_ORDER_ITEM_LIST:
            return {
                ...state,
                orderItemList: action.orderItemList,
                total: getTotal(action.orderItemList),
                totalQuantity: getTotalQuantity(action.orderItemList)
            }
        case types.SET_COUPON:
            return {
                ...state,
                coupon: action.coupon,
                total: getOrderValue(getTotal(state.orderItemList), action.coupon)
            }
        case types.SET_ORDER_TYPE:
            return {
                ...state,
                orderType: action.orderType,
            }
        case types.SET_PAYMENT_TYPE:
            return {
                ...state,
                paymentType: action.paymentType,
            }
        case types.SET_DELIVERY_DATE:
            return {
                ...state,
                deliveryDate: action.deliveryDate,
            }
        case types.SET_BOOKING_ADVANCE:
            return {
                ...state,
                bookingAdvance: action.bookingAdvance,
            }
        case types.SET_NOTES:
            return {
                ...state,
                notes: action.notes,
            }
        case types.SET_CAN_FINISH_ORDER:
            return {
                ...state,
                canFinishOrder: action.canFinishOrder,
            }
        case types.SET_CASH_TENDERED:
            return {
                ...state,
                cashTendered: action.cashTendered,
            }
        case types.SET_IS_DOOR_DELIVERY:
            return {
                ...state,
                isDoorDelivery: action.isDoorDelivery,
            }
        case types.RESET_STATE:
            return {
                orderItemList: [],
                ...initState,
            }
        default:
            return {
                ...state,
                ...action
            }
    }
};

export default sellReducer