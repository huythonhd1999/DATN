import * as types from "../../../data/index";

export const setStoreInfo = (store) => {
    return {
        type: types.SET_STORE_INFO,
        store,
    }
}