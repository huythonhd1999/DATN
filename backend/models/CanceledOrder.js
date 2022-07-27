const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getCanceledOrderList = () => {
    return knex.from('Canceled_Order').select('*')
}

exports.getCanceledOrderByOrderId = (orderId) => {
    return knex.from('orderId').select('*').where('orderId', orderId).first()
}

exports.editCanceledOrder = (data, Id) => {
    return knex('Canceled_Order').where('Id', Id).update({
        ...data
    })
}

exports.createCanceledOrder = (canceledOrder) => {
    return knex('Canceled_Order').insert({
        ...canceledOrder
    })
}

exports.deleteCanceledOrder = (canceledOrderId) => {
    return knex('Canceled_Order').where('Id', canceledOrderId).del()
}

exports.searchCanceledOrder = (query) => {
    return knex.from('Canceled_Order').select('*').where('name', 'like', `%${query}%`)
}