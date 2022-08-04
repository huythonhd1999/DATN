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

exports.getNumOrderToday = () => { //lay so order tao hom nay
    const now = new Date()
    const startTime = new Date(now.setHours(0,0,0,0));
    const endTime = new Date(now.setHours(23,59,59,999));
    return knex("Order").count("Id", {as: 'numOrderToday'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
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

exports.getTotalOrderSalesByDay = (date) => { //laasy toongr gias tri cac don hang (da va chua thanh toan)
    const startTime = new Date(date.setHours(0,0,0,0));
    const endTime = new Date(date.setHours(23,59,59,999));
    return knex("Order").sum("total", {as: 'totalOrder'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalOrderDetailSalesByDay = (date) => { //laasy toongr gias tri cac don hang (da va chua thanh toan)
    const startTime = new Date(date.setHours(0,0,0,0));
    const endTime = new Date(date.setHours(23,59,59,999));
    return knex("Order").select('paymentType').sum("total", {as: 'totalOrder'}).where("createDate",">=", startTime).groupBy('paymentType').where("createDate","<=", endTime)
}

exports.getNumOrderByDay = (date) => { //lay so order tao trong 1 ngay
    const startTime = new Date(date.setHours(0,0,0,0));
    const endTime = new Date(date.setHours(23,59,59,999));
    return knex("Order").count("Id", {as: 'numOrder'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalImmediateOrderByDay = (date) => { //laasy toongr gias tri cac don hang (da va chua thanh toan) cho don giao ngay
    const startTime = new Date(date.setHours(0,0,0,0));
    const endTime = new Date(date.setHours(23,59,59,999));
    return knex("Order").sum("total", {as: 'totalOrder'})
    .where("createDate",">=", startTime)
    .where("createDate","<=", endTime)
    .where("status", 1).first()
}

exports.getTotalOrderSalesByHour = (date) => { //laasy toongr gias tri cac don hang (da va chua thanh toan) trong 1 gio
    const startTime = new Date(date.setMinutes(0,0,0));
    const endTime = new Date(date.setMinutes(59,59,999));
    return knex("Order").sum("total", {as: 'totalOrder'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalOrderDetailSalesByHour = (date) => { //laasy toongr gias tri cac don hang theo phuong thuc thanh toan(da va chua thanh toan) trong 1 gio
    const startTime = new Date(date.setMinutes(0,0,0));
    const endTime = new Date(date.setMinutes(59,59,999));
    return knex("Order").select('paymentType').sum("total", {as: 'totalOrder'}).where("createDate",">=", startTime).groupBy('paymentType').where("createDate","<=", endTime)
}

exports.getNumOrderByHour = (date) => { //lay so order tao trong 1 gio
    const startTime = new Date(date.setMinutes(0,0,0));
    const endTime = new Date(date.setMinutes(59,59,999));
    return knex("Order").count("Id", {as: 'numOrder'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}

exports.getTotalImmediateOrderByHour = (date) => { //laasy toongr gias tri cac don hang (da va chua thanh toan) cho don giao ngay trong 1 gio
    const startTime = new Date(date.setMinutes(0,0,0,0));
    const endTime = new Date(date.setMinutes(59,59,999));
    return knex("Order").sum("total", {as: 'totalOrder'})
    .where("createDate",">=", startTime)
    .where("createDate","<=", endTime)
    .where("status", 1).first()
}
