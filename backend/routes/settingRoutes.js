const settingRouter = require('express').Router()
const storeController = require('../controllers/storeController')
const taxController = require('../controllers/taxControler')
const authMiddleware = require('../middlewares/authentication')
const notFound = require('./404')

settingRouter.get('/tax/id/:id', taxController.getTax)
settingRouter.get('/tax/get-list', taxController.getTaxList)
settingRouter.post('/tax/search-tax', taxController.searchTax)

settingRouter.use(authMiddleware.isAuth)

// store setting route
settingRouter.get('/store/get-store', storeController.getStore)
settingRouter.post('/store/set-store', storeController.setStore)

//tax setting route
settingRouter.post('/tax/create-tax', taxController.createTax)
settingRouter.post('/tax/edit-tax', taxController.editTax)
settingRouter.post('/tax/delete-tax', taxController.deleteTax)

settingRouter.use(notFound)

module.exports = settingRouter