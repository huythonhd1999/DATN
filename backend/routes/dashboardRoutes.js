const dashboardRouter = require('express').Router()
const dashboardController = require('../controllers/dashboardController')
const notFound = require('./404')

dashboardRouter.get('/get-today-statistic', dashboardController.getTodayStatistic)
// dashboardRouter.get('/get-list', customerController.getCustomerList)

dashboardRouter.use(notFound)

module.exports = dashboardRouter