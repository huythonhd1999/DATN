const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getCouponList = () => {
    return knex.from('Coupon').select('*')
}

exports.getCoupon = (couponId) => {
    return knex.from('Coupon').select('*').where('Id', couponId).first()
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
    return knex('Coupon').where('Id', couponId).del()
}

exports.searchCoupon = (query) => {
    return knex.from('Coupon').select('*').where('code', 'like', `%${query}%`)
}