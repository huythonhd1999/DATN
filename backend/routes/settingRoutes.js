const settingRouter = require('express').Router()
const storeController = require('../controllers/storeController')
const taxController = require('../controllers/taxControler')
const couponController = require('../controllers/couponController')
const authMiddleware = require('../middlewares/authentication')
const notFound = require('./404')

settingRouter.get('/tax/id/:id', taxController.getTax)
settingRouter.get('/tax/get-list', taxController.getTaxList)
settingRouter.post('/tax/search-tax', taxController.searchTax)

settingRouter.get('/coupon/id/:id', couponController.getCoupon)
settingRouter.get('/coupon/get-list', couponController.getCouponList)
settingRouter.post('/coupon/search-coupon', couponController.searchCoupon)

settingRouter.use(authMiddleware.isAuth)

// store setting route
settingRouter.get('/store/get-store', storeController.getStore)
settingRouter.post('/store/set-store', storeController.setStore)

//tax setting route
settingRouter.post('/tax/create-tax', taxController.createTax)
settingRouter.post('/tax/edit-tax', taxController.editTax)
settingRouter.post('/tax/delete-tax', taxController.deleteTax)

//coupon setting route
settingRouter.post('/coupon/create-coupon', couponController.createCoupon)
settingRouter.post('/coupon/edit-coupon', couponController.editCoupon)
settingRouter.post('/coupon/delete-coupon', couponController.deleteCoupon)

settingRouter.use(notFound)

module.exports = settingRouter