const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')


exports.getOrderList = () => {
    return knex.from('Order').select('*').orderBy('createDate', 'desc')
}

exports.getOrder = (orderId) => {
    return knex.from('Order').select('*').where('Id', orderId).first()
}

exports.editOrder = (data, Id) => {
    return knex('Order').where('Id', Id).update({
        ...data
    })
}

exports.createOrder = (order) => {
    return knex('Order').insert({
        ...order
    })
}

exports.deleteOrder = (orderId) => {
    return knex('Order').where('Id', orderId).del()
}

exports.searchOrder = (query) => {
    return knex.from('Order').select('*').where('Id', 'like', `%${query}%`)
}