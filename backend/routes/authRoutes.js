const authRouter = require('express').Router()
const authController = require('../controllers/authController')
const notFound = require('./404')


authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logOut)
authRouter.post('/refresh-token', authController.refreshToken)

authRouter.use(notFound)

module.exports = authRouter
