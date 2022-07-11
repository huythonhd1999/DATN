const productRouter = require('express').Router()
const productController = require('../controllers/ProductController')
const authMiddleware = require('../middlewares/authentication')
const notFound = require('./404')

productRouter.get('/id/:id', productController.getProduct)
productRouter.get('/get-list', productController.getProductList)
productRouter.post('/search-product', productController.searchProduct)

productRouter.use(authMiddleware.isAuth)

//petty cash  route
productRouter.post('/create-product', productController.createProduct)
productRouter.post('/edit-product', productController.editProduct)
productRouter.post('/delete-product', productController.deleteProduct)

productRouter.use(notFound)

module.exports = productRouter