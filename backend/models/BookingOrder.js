const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getBookingOrderList = () => {
    return knex.from('Booking_Order').select('*')
}

exports.getBookingOrderByOrderId = (orderId) => {
    return knex.from('Booking_Order').select('*').where('orderId', orderId).first()
}

exports.editBookingOrder = (data, Id) => {
    return knex('Booking_Order').where('orderId', Id).update({
        ...data
    })
}

exports.createBookingOrder = (bookingOrder) => {
    return knex('Booking_Order').insert({
        ...bookingOrder
    })
}

exports.deleteBookingOrder = (bookingOrderId) => {
    return knex('Booking_Order').where('Id', bookingOrderId).del()
}

exports.searchBookingOrder = (query) => {
    return knex.from('Booking_Order').select('*').where('name', 'like', `%${query}%`)
}

exports.getTotalBookingOrderToday = () => { //lay tong so tien ma khach hang da dat trc cac don hang (da va chua thanh toan) cho don giao ngay
    const now = new Date()
    const startTime = new Date(now.setHours(0,0,0,0));
    const endTime = new Date(now.setHours(23,59,59,999));
    return knex("Booking_Order").sum("bookingAdvance", {as: 'totalBookingAdvanceToday'})
    .whereIn('orderId', function () {
        this.select('Id').from('Order').where("createDate",">=", startTime).where("createDate","<=", endTime)
    }).first()
}