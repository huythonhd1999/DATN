const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getCouponList = () => {
    return knex.from('Coupon').select('*').where('status', 1)
}

exports.getCoupon = (couponId) => {
    return knex.from('Coupon').select('*').where('Id', couponId).first()
}

exports.getCouponByCode = (code) => {
    return knex.from('Coupon').select('*').where('code', code).first()
}

exports.editCoupon = (data, Id) => {
    return knex('Coupon').where('Id', Id).update({
        ...data
    })
}

exports.createCoupon = (coupon) => {
    return knex('Coupon').insert({
        ...coupon
    })
}

exports.deleteCoupon = (couponId) => {
    return knex('Coupon').where('Id', couponId).update({
        status: 0
    })
}

exports.searchCoupon = (query) => {
    return knex.from('Coupon').select('*').where('code', 'like', `%${query}%`).where('status', 1)
}