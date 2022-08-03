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

exports.getTotalOrderSalesToday = () => { //laasy toongr gias tri cac don hang (da va chua thanh toan)
    const now = new Date()
    const startTime = new Date(now.setHours(0,0,0,0));
    const endTime = new Date(now.setHours(23,59,59,999));
    return knex("Order").sum("total", {as: 'totalOrderToday'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalImmediateOrderToday = () => { //laasy toongr gias tri cac don hang (da va chua thanh toan) cho don giao ngay
    const now = new Date()
    const startTime = new Date(now.setHours(0,0,0,0));
    const endTime = new Date(now.setHours(23,59,59,999));
    return knex("Order").sum("total", {as: 'totalOrderToday'})
    .where("createDate",">=", startTime)
    .where("createDate","<=", endTime)
    .where("status", 1).first()
}