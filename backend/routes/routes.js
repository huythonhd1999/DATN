const authRouter = require('./authRoutes')
const settingRouter = require('./settingRoutes')
const userRouter = require('./userRoutes')
const postRouter = require('./postRoutes')
const answerRouter = require('./answerRoutes')
const adminRouter = require('./adminRoutes')
const notFound = require('./404')

module.exports = function (app) {
    app.use('/auth', authRouter)
    app.use('/setting', settingRouter)
    app.use('/user', userRouter)
    app.use('/post', postRouter)
    app.use('/answer', answerRouter)
    app.use('/admin', adminRouter)
    app.use(notFound)
}