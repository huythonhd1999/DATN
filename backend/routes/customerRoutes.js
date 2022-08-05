const customerRouter = require('express').Router()
const customerController = require('../controllers/customerController')
const authMiddleware = require('../middlewares/authentication')
const notFound = require('./404')

customerRouter.get('/id/:id', customerController.getCustomer)
customerRouter.get('/get-list', customerController.getCustomerList)
customerRouter.post('/search-customer', customerController.searchCustomer)

customerRouter.use(authMiddleware.isAuth)

//customer  route
customerRouter.post('/create-customer', customerController.createCustomer)
customerRouter.post('/edit-customer', customerController.editCustomer)
customerRouter.post('/delete-customer', customerController.deleteCustomer)

customerRouter.use(notFound)

module.exports = customerRouter