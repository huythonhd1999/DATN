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

    //tax
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

    //coupon
    getCouponList: () => {
        return guest.get(`${baseUrl}/setting/coupon/get-list`)
    },
    getCoupon: (id) => {
        return guest.get(`${baseUrl}/setting/coupon/id/${id}`)
    },
    checkCoupon: (coupon) => {
        return guest.post(`${baseUrl}/setting/coupon/check-coupon`, coupon)
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
    
    //user
    getUserList: () => {
        return guest.get(`${baseUrl}/setting/user/get-list`)
    },
    getUser: (id) => {
        return guest.get(`${baseUrl}/setting/user/id/${id}`)
    },
    createUser: (userInfo) => {
        return user.post(`${baseUrl}/setting/user/create-user`, userInfo)
    },
    searchUser: (searchString) => {
        return guest.post(`${baseUrl}/setting/user/search-user`, {searchString: searchString})
    },
    editUser: (userInfo) => {
        return user.post(`${baseUrl}/setting/user/edit-user`, userInfo)
    },
    deleteUserList: (IdList) => {
        return user.post(`${baseUrl}/setting/user/delete-user`, {IdList: IdList})
    },

    //options
    getVariantList: () => {
        return guest.get(`${baseUrl}/setting/variant/get-list`)
    },
    getVariantGroupList: () => {
        return guest.get(`${baseUrl}/setting/variant-group/get-list`)
    },
    getAddonList: () => {
        return guest.get(`${baseUrl}/setting/addon/get-list`)
    },
    getAddonGroupList: () => {
        return guest.get(`${baseUrl}/setting/addon-group/get-list`)
    },
    searchVariant: (searchString) => {
        return guest.post(`${baseUrl}/setting/variant/search-variant`, {searchString: searchString})
    },
    searchVariantGroup: (searchString) => {
        return guest.post(`${baseUrl}/setting/variant-group/search-variant-group`, {searchString: searchString})
    },
    searchAddon: (searchString) => {
        return guest.post(`${baseUrl}/setting/addon/search-addon`, {searchString: searchString})
    },
    searchAddonGroup: (searchString) => {
        return guest.post(`${baseUrl}/setting/addon-group/search-addon-group`, {searchString: searchString})
    },
    deleteVariantList: (IdList) => {
        return user.post(`${baseUrl}/setting/variant/delete-variant`, {IdList: IdList})
    },
    deleteVariantGroupList: (IdList) => {
        return user.post(`${baseUrl}/setting/variant-group/delete-variant-group`, {IdList: IdList})
    },
    deleteAddonList: (IdList) => {
        return user.post(`${baseUrl}/setting/addon/delete-addon`, {IdList: IdList})
    },
    deleteAddonGroupList: (IdList) => {
        return user.post(`${baseUrl}/setting/addon-group/delete-addon-group`, {IdList: IdList})
    },
    getVariant: (id) => {
        return guest.get(`${baseUrl}/setting/variant/id/${id}`)
    },
    createVariant: (info) => {
        return user.post(`${baseUrl}/setting/variant/create-variant`, info)
    },
    editVariant: (info) => {
        return user.post(`${baseUrl}/setting/variant/edit-variant`, info)
    },
    getVariantGroup: (id) => {
        return guest.get(`${baseUrl}/setting/variant-group/id/${id}`)
    },
    getVariantWithoutGroupList: () => {
        return guest.get(`${baseUrl}/setting/variant/get-list-without-group`)
    },
    createVariantGroup: (info) => {
        return user.post(`${baseUrl}/setting/variant-group/create-variant-group`, info)
    },
    editVariantGroup: (info) => {
        return user.post(`${baseUrl}/setting/variant-group/edit-variant-group`, info)
    },
    getAddon: (id) => {
        return guest.get(`${baseUrl}/setting/addon/id/${id}`)
    },
    createAddon: (info) => {
        return user.post(`${baseUrl}/setting/addon/create-addon`, info)
    },
    editAddon: (info) => {
        return user.post(`${baseUrl}/setting/addon/edit-addon`, info)
    },
    getAddonGroup: (id) => {
        return guest.get(`${baseUrl}/setting/addon-group/id/${id}`)
    },
    getAddonWithoutGroupList: () => {
        return guest.get(`${baseUrl}/setting/addon/get-list-without-group`)
    },
    createAddonGroup: (info) => {
        return user.post(`${baseUrl}/setting/addon-group/create-addon-group`, info)
    },
    editAddonGroup: (info) => {
        return user.post(`${baseUrl}/setting/addon-group/edit-addon-group`, info)
    },

    //category
    getCategoryList: () => {
        return guest.get(`${baseUrl}/setting/category/get-list`)
    },
    getCategory: (id) => {
        return guest.get(`${baseUrl}/setting/category/id/${id}`)
    },
    getProductWithoutCategory: () => {
        return guest.get(`${baseUrl}/setting/category/get-product-without-category`)
    },
    createCategory: (category) => {
        return user.post(`${baseUrl}/setting/category/create-category`, category)
    },
    searchCategory: (searchString) => {
        return guest.post(`${baseUrl}/setting/category/search-category`, {searchString: searchString})
    },
    editCategory: (category) => {
        return user.post(`${baseUrl}/setting/category/edit-category`, category)
    },
    deleteCategoryList: (IdList) => {
        return user.post(`${baseUrl}/setting/category/delete-category`, {IdList: IdList})
    },

    //petty-cash
    getPettyCashList: () => {
        return guest.get(`${baseUrl}/petty-cash/get-list`)
    },
    getPettyCash: (id) => {
        return guest.get(`${baseUrl}/petty-cash/id/${id}`)
    },
    createPettyCash: (pettyCash) => {
        return user.post(`${baseUrl}/petty-cash/create-petty-cash`, pettyCash)
    },
    searchPettyCash: (searchString) => {
        return guest.post(`${baseUrl}/petty-cash/search-petty-cash`, {searchString: searchString})
    },
    editPettyCash: (pettyCash) => {
        return user.post(`${baseUrl}/petty-cash/edit-petty-cash`, pettyCash)
    },
    deletePettyCashList: (IdList) => {
        return user.post(`${baseUrl}/petty-cash/delete-petty-cash`, {IdList: IdList})
    },

    //product
    getProductList: () => {
        return guest.get(`${baseUrl}/product/get-list`)
    },
    getProduct: (id) => {
        return guest.get(`${baseUrl}/product/id/${id}`)
    },
    createProduct: (product) => {
        return user.post(`${baseUrl}/product/create-product`, product)
    },
    searchProduct: (searchString) => {
        return guest.post(`${baseUrl}/product/search-product`, {searchString: searchString})
    },
    editProduct: (product) => {
        return user.post(`${baseUrl}/product/edit-product`, product)
    },
    deleteProductList: (IdList) => {
        return user.post(`${baseUrl}/product/delete-product`, {IdList: IdList})
    },

     //customer
    getCustomerList: () => {
        return guest.get(`${baseUrl}/customer/get-list`)
    },
    getCustomer: (id) => {
        return guest.get(`${baseUrl}/customer/id/${id}`)
    },
    createCustomer: (customer) => {
        return user.post(`${baseUrl}/customer/create-customer`, customer)
    },
    searchCustomer: (searchString) => {
        return guest.post(`${baseUrl}/customer/search-customer`, {searchString: searchString})
    },
    editCustomer: (customer) => {
        return user.post(`${baseUrl}/customer/edit-customer`, customer)
    },
    deleteCustomerList: (IdList) => {
        return user.post(`${baseUrl}/customer/delete-customer`, {IdList: IdList})
    },


    //order
    createOrder: (order) => {
        return user.post(`${baseUrl}/order/create-order`, order)
    },
    getOrderList: () => {
        return guest.get(`${baseUrl}/order/get-list`)
    },
    searchOrder: (searchString) => {
        return guest.post(`${baseUrl}/order/search-order`, {searchString: searchString})
    },
    getOrder: (id) => {
        return guest.get(`${baseUrl}/order/id/${id}`)
    },
    editBookingOrder: (bookingOrder) => {
        return user.post(`${baseUrl}/order/edit-booking-border`, bookingOrder)
    },
    createCanceledOrder: (canceledOrder) => {
        return user.post(`${baseUrl}/order/create-canceled-order`, canceledOrder)
    },

}
export default Api;