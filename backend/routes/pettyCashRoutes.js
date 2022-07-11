const pettyCashRouter = require('express').Router()
const pettyCashController = require('../controllers/PettyCashController')
const authMiddleware = require('../middlewares/authentication')
const notFound = require('./404')

pettyCashRouter.get('/id/:id', pettyCashController.getPettyCash)
pettyCashRouter.get('/get-list', pettyCashController.getPettyCashList)
pettyCashRouter.post('/search-petty-cash', pettyCashController.searchPettyCash)

pettyCashRouter.use(authMiddleware.isAuth)

//petty cash  route
pettyCashRouter.post('/create-petty-cash', pettyCashController.createPettyCash)
pettyCashRouter.post('/edit-petty-cash', pettyCashController.editPettyCash)
pettyCashRouter.post('/delete-petty-cash', pettyCashController.deletePettyCash)

pettyCashRouter.use(notFound)

module.exports = pettyCashRouter