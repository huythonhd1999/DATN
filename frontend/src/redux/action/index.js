import * as types from "../data/index";

export const setUserInfo = (userInfo) => {
    return {
        type: types.SET_USER_INFO,
        userInfo,
    }
}

export const setStoreInfo = (store) => {
    return {
        type: types.SET_STORE_INFO,
        store,
    }
}