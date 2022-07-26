const settingRouter = require('express').Router()
const storeController = require('../controllers/storeController')
const taxController = require('../controllers/taxControler')
const couponController = require('../controllers/couponController')
const userController = require('../controllers/userController')
const variantController = require('../controllers/variantControler')
const variantGroupController = require('../controllers/variantGroupController')
const addonController = require('../controllers/addonController')
const addonGroupController = require('../controllers/addonGroupController')
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/authentication')
const notFound = require('./404')

settingRouter.get('/tax/id/:id', taxController.getTax)
settingRouter.get('/tax/get-list', taxController.getTaxList)
settingRouter.post('/tax/search-tax', taxController.searchTax)

settingRouter.get('/coupon/id/:id', couponController.getCoupon)
settingRouter.get('/coupon/get-list', couponController.getCouponList)
settingRouter.post('/coupon/search-coupon', couponController.searchCoupon)
settingRouter.post('/coupon/check-coupon', couponController.checkCoupon)

settingRouter.get('/user/id/:id', userController.getUser)
settingRouter.get('/user/get-list', userController.getUserList)
settingRouter.post('/user/search-user', userController.searchUser)

settingRouter.get('/variant/id/:id', variantController.getVariant)
settingRouter.get('/variant/get-list', variantController.getVariantList)
settingRouter.get('/variant/get-list-without-group', variantController.getVariantListWithoutGroup)
settingRouter.post('/variant/search-variant', variantController.searchVariant)

settingRouter.get('/variant-group/id/:id', variantGroupController.getVariantGroup)
settingRouter.get('/variant-group/get-list', variantGroupController.getVariantGroupList)
settingRouter.post('/variant-group/search-variant-group', variantGroupController.searchVariantGroup)

settingRouter.get('/addon/id/:id', addonController.getAddon)
settingRouter.get('/addon/get-list', addonController.getAddonList)
settingRouter.get('/addon/get-list-without-group', addonController.getAddonListWithoutGroup)
settingRouter.post('/addon/search-addon', addonController.searchAddon)

settingRouter.get('/addon-group/id/:id', addonGroupController.getAddonGroup)
settingRouter.get('/addon-group/get-list', addonGroupController.getAddonGroupList)
settingRouter.post('/addon-group/search-addon-group', addonGroupController.searchAddonGroup)

settingRouter.get('/category/id/:id', categoryController.getCategory)
settingRouter.get('/category/get-list', categoryController.getCategoryList)
settingRouter.post('/category/search-category', categoryController.searchCategory)
settingRouter.get('/category/get-product-without-category', categoryController.getProductListWithoutCategory)

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

//user setting route
settingRouter.post('/user/create-user', userController.createUser)
settingRouter.post('/user/edit-user', userController.editUser)
settingRouter.post('/user/delete-user', userController.deleteUser)

//variant setting route
settingRouter.post('/variant/create-variant', variantController.createVariant)
settingRouter.post('/variant/edit-variant', variantController.editVariant)
settingRouter.post('/variant/delete-variant', variantController.deleteVariant)

//variant group setting route
settingRouter.post('/variant-group/create-variant-group', variantGroupController.createVariantGroup)
settingRouter.post('/variant-group/edit-variant-group', variantGroupController.editVariantGroup)
settingRouter.post('/variant-group/delete-variant-group', variantGroupController.deleteVariantGroup)

//addon setting route
settingRouter.post('/addon/create-addon', addonController.createAddon)
settingRouter.post('/addon/edit-addon', addonController.editAddon)
settingRouter.post('/addon/delete-addon', addonController.deleteAddon)

//Addon group setting route
settingRouter.post('/addon-group/create-addon-group', addonGroupController.createAddonGroup)
settingRouter.post('/addon-group/edit-addon-group', addonGroupController.editAddonGroup)
settingRouter.post('/addon-group/delete-addon-group', addonGroupController.deleteAddonGroup)

//Category setting route
settingRouter.post('/category/create-category', categoryController.createCategory)
settingRouter.post('/category/edit-category', categoryController.editCategory)
settingRouter.post('/category/delete-category', categoryController.deleteCategory)

settingRouter.use(notFound)

module.exports = settingRouter