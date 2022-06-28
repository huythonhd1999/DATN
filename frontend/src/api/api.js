import axios from 'axios';
import packagejson from "../../package.json"

const baseUrl = packagejson.proxy.charAt(packagejson.proxy.length - 1) === "/" ? packagejson.proxy.slice(0, -1) : packagejson.proxy

const user = axios.create({ timeout: 30000 });
const guest = axios.create({ timeout: 30000 });

guest.defaults.withCredentials = true; //goi kem vs cookie

user.interceptors.request.use(function (config) { //truoc khi goi user thi lam gi: lay accsessToken dính vào header 
    //console.log(config)
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["x-access-token"] = accessToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

user.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const originalRequest = error.config;
    //console.log(error.response)
    if (!originalRequest.retry && error.response && error.response.status === 401) {
        try {
            originalRequest.retry = true;
            let res = await Api.refreshToken()
            localStorage.setItem("accessToken", res.data.accessToken)
            console.log("Access token refreshed")
            return user(originalRequest) 
        } catch (err) {
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

const Api = {
    login: (username, password) => {
        return guest.post(`${baseUrl}/auth/login`, { username: username, password: password })
    },
    refreshToken: () => {
        return guest.post(`${baseUrl}/auth/refresh-token`)
    },

    getStore: () => {
        return user.get(`${baseUrl}/setting/store/get-store`)
    },
    setStore: (store) => {
        return user.post(`${baseUrl}/setting/store/set-store`, store)
    },

    getTaxList: () => {
        return guest.get(`${baseUrl}/setting/tax/get-list`)
    },
    getTax: (id) => {
        return guest.get(`${baseUrl}/setting/tax/id/${id}`)
    },
    createTax: (tax) => {
        return user.post(`${baseUrl}/setting/tax/create-tax`, tax)
    },
    searchTax: (searchString) => {
        return guest.post(`${baseUrl}/setting/tax/search-tax`, {searchString: searchString})
    },
    editTax: (tax) => {
        return user.post(`${baseUrl}/setting/tax/edit-tax`, tax)
    },
    deleteTaxList: (IdList) => {
        return user.post(`${baseUrl}/setting/tax/delete-tax`, IdList)
    },

    getCouponList: () => {
        return guest.get(`${baseUrl}/setting/coupon/get-list`)
    },
    getCoupon: (id) => {
        return guest.get(`${baseUrl}/setting/coupon/id/${id}`)
    },
    createCoupon: (coupon) => {
        return user.post(`${baseUrl}/setting/coupon/create-coupon`, coupon)
    },
    searchCoupon: (searchString) => {
        return guest.post(`${baseUrl}/setting/coupon/search-coupon`, {searchString: searchString})
    },
    editCoupon: (coupon) => {
        return user.post(`${baseUrl}/setting/coupon/edit-coupon`, coupon)
    },
    deleteCouponList: (IdList) => {
        return user.post(`${baseUrl}/setting/coupon/delete-coupon`, {IdList: IdList})
    },
}
export default Api;