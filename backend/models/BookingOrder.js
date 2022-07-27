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
    return knex('Booking_Order').where('Id', Id).update({
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