const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getOrderItemAddonListByOrderItemId = (orderItemId) => {
    return knex.from('Order_Item_Addon').select('*').where('orderItemId', orderItemId)
}

exports.getOrderItemAddon = (orderItemAddonId) => {
    return knex.from('Order_Item_Addon').select('*').where('Id', orderItemAddonId).first()
}

exports.editOrderItemAddon = (data, Id) => {
    return knex('Order_Item_Addon').where('Id', Id).update({
        ...data
    })
}

exports.createOrderItemAddon = (orderItemAddon) => {
    return knex('Order_Item_Addon').insert({
        ...orderItemAddon
    })
}

exports.deleteOrderItemAddon = (orderItemAddonId) => {
    return knex('Order_Item_Addon').where('Id', orderItemAddonId).del()
}

exports.searchOrderItemAddon = (query) => {
    return knex.from('Order_Item_Addon').select('*').where('name', 'like', `%${query}%`)
}