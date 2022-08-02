const orderRouter = require('express').Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middlewares/authentication')
const notFound = require('./404')

orderRouter.get('/id/:id', orderController.getOrder)
orderRouter.get('/get-list', orderController.getOrderList)
orderRouter.post('/search-order', orderController.searchOrder)

orderRouter.use(authMiddleware.isAuth)

//order route
orderRouter.post('/create-order', orderController.createOrder)
orderRouter.post('/create-canceled-order', orderController.createCanceledOrder)
orderRouter.post('/edit-booking-border', orderController.editBookingOrder)
// orderRouter.post('/delete-order', orderController.deleteOrder)


orderRouter.use(notFound)

module.exports = orderRouter