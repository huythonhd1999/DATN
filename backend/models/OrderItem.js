const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getOrderItemListByOrderId = (orderId) => {
    return knex.from('Order_Item').select('*').where('orderId', orderId)
}

exports.getOrderItem = (orderItemId) => {
    return knex.from('Order_Item').select('*').where('Id', orderItemId).first()
}

exports.editOrderItem = (data, Id) => {
    return knex('Order_Item').where('Id', Id).update({
        ...data
    })
}

exports.createOrderItem = (orderItem) => {
    return knex('Order_Item').insert({
        ...orderItem
    })
}

exports.deleteOrderItem = (orderItemId) => {
    return knex('Order_Item').where('Id', orderItemId).del()
}

exports.searchOrderItem = (query) => {
    return knex.from('Order_Item').select('*').where('name', 'like', `%${query}%`)
}