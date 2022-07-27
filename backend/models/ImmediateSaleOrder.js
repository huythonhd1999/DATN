const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getImmediateSaleOrderList = () => {
    return knex.from('Immediate_Sale_Order').select('*')
}

exports.getImmediateSaleOrderByOrderId = (orderId) => {
    return knex.from('Immediate_Sale_Order').select('*').where('orderId', orderId).first()
}

exports.editImmediateSaleOrder = (data, Id) => {
    return knex('Immediate_Sale_Order').where('Id', Id).update({
        ...data
    })
}

exports.createImmediateSaleOrder = (immediateSaleOrder) => {
    return knex('Immediate_Sale_Order').insert({
        ...immediateSaleOrder
    })
}

exports.deleteImmediateSaleOrder = (immediateSaleOrderId) => {
    return knex('Immediate_Sale_Order').where('Id', immediateSaleOrderId).del()
}

exports.searchImmediateSaleOrder = (query) => {
    return knex.from('Immediate_Sale_Order').select('*').where('name', 'like', `%${query}%`)
}