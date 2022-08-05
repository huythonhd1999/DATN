const authRouter = require('./authRoutes')
const settingRouter = require('./settingRoutes')
const pettyCashRouter = require('./pettyCashRoutes')
const productRouter = require('./productRoutes')
const customerRouter = require('./customerRoutes')
const orderRouter = require('./orderRoutes')
const dashboardRouter = require('./dashboardRoutes')
const notFound = require('./404')

module.exports = function (app) {
    app.use('/auth', authRouter)
    app.use('/setting', settingRouter)
    app.use('/petty-cash', pettyCashRouter)
    app.use('/product', productRouter)
    app.use('/customer', customerRouter)
    app.use('/order', orderRouter)
    app.use('/dashboard', dashboardRouter)
    app.use(notFound)
}