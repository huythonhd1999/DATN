import * as types from "../../../data/index";

export const setSelectedTab = (selectedTab) => {
    return {
        type: types.SET_SELECTED_TAB,
        selectedTab,
    }
}