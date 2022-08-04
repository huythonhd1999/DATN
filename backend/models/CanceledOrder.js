const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getCanceledOrderList = () => {
    return knex.from('Canceled_Order').select('*')
}

exports.getCanceledOrderByOrderId = (orderId) => {
    return knex.from('Canceled_Order').select('*').where('orderId', orderId).first()
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

exports.getNumCanceledOrderToday = () => { //lay so order bi huy hom nay
    const now = new Date()
    const startTime = new Date(now.setHours(0,0,0,0));
    const endTime = new Date(now.setHours(23,59,59,999));
    return knex("Canceled_Order").count("orderId", {as: 'numOrder'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalCanceledOrderToday = () => { //lay tong so tien ma khach hang da duoc tra lai
    const now = new Date()
    const startTime = new Date(now.setHours(0,0,0,0));
    const endTime = new Date(now.setHours(23,59,59,999));
    return knex("Canceled_Order").sum("refundAmount", {as: 'totalRefundAmountToday'})
    .where("createDate",">=", startTime)
    .where("createDate","<=", endTime)
    .first()
}

exports.getNumCanceledOrderByDate = (date) => { //lay so order bi huy trong 1 ngay
    const startTime = new Date(date.setHours(0,0,0,0));
    const endTime = new Date(date.setHours(23,59,59,999));
    return knex("Canceled_Order").count("orderId", {as: 'numOrder'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalCanceledOrderByDate = (date) => { //lay tong so tien ma khach hang da duoc tra lai trong 1 ngay
    const startTime = new Date(date.setHours(0,0,0,0));
    const endTime = new Date(date.setHours(23,59,59,999));
    return knex("Canceled_Order").sum("refundAmount", {as: 'totalRefundAmountToday'})
    .where("createDate",">=", startTime)
    .where("createDate","<=", endTime)
    .first()
}

exports.getNumCanceledOrderByHour = (date) => { //lay so order bi huy trong 1 gio
    const startTime = new Date(date.setMinutes(0,0,0));
    const endTime = new Date(date.setMinutes(59,59,999));
    return knex("Canceled_Order").count("orderId", {as: 'numOrder'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalCanceledOrderByHour = (date) => { //lay tong so tien ma khach hang da duoc tra lai trong 1 gio
    const startTime = new Date(date.setMinutes(0,0,0));
    const endTime = new Date(date.setMinutes(59,59,999));
    return knex("Canceled_Order").sum("refundAmount", {as: 'totalRefundAmountToday'})
    .where("createDate",">=", startTime)
    .where("createDate","<=", endTime)
    .first()
}