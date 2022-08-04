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

export const setIsShowDraftModal = (isShowDraftModal) => {
    return {
        type: types.SET_IS_SHOW_DRAFT_MODAL,
        isShowDraftModal,
    }
}

export const setCheck = (coupon) => {
    return {
        type: types.SET_COUPON,
        coupon,
    }
}

export const setCoupon = (coupon) => {
    return {
        type: types.SET_COUPON,
        coupon,
    }
}

export const setOrderType = (orderType) => {
    return {
        type: types.SET_ORDER_TYPE,
        orderType,
    }
}

export const setPaymentType = (paymentType) => {
    return {
        type: types.SET_PAYMENT_TYPE,
        paymentType,
    }
}

export const setDeliveryDate = (deliveryDate) => {
    return {
        type: types.SET_DELIVERY_DATE,
        deliveryDate,
    }
}

export const setBookingAdvance = (bookingAdvance) => {
    return {
        type: types.SET_BOOKING_ADVANCE,
        bookingAdvance,
    }
}

export const setNotes = (notes) => {
    return {
        type: types.SET_NOTES,
        notes,
    }
}

export const setIsDoorDelivery = (isDoorDelivery) => {
    return {
        type: types.SET_IS_DOOR_DELIVERY,
        isDoorDelivery,
    }
}

export const setCanFinishOrder = (canFinishOrder) => {
    return {
        type: types.SET_CAN_FINISH_ORDER,
        canFinishOrder,
    }
}

export const setCashTendered = (cashTendered) => {
    return {
        type: types.SET_CASH_TENDERED,
        cashTendered,
    }
}

export const setDraftOrder = (order) => {
    return {
        type: types.SET_DRAFT_ORDER,
        ...order
    }
}

export const resetSate = () => {
    return {
        type: types.RESET_STATE,
    }
}