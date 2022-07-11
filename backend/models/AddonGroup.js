const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getAddonGroupList = () => {
    return knex.from('Addon_Group').select('*')
}

exports.getAddonGroupsByProductId = (productId) => {
    return knex.from('Addon_Group').select('*').where('productId', productId)
}

exports.getAddonGroup = (addonGroupId) => {
    return knex.from('Addon_Group').select('*').where('Id', addonGroupId).first()
}

exports.editAddonGroup = (data, Id) => {
    return knex('Addon_Group').where('Id', Id).update({
        ...data
    })
}

exports.editAddonGroupByProductId = (data, productId) => {
    return knex.from('Addon_Group').where('productId', productId).update({
        ...data
    })
}

exports.createAddonGroup = (addonGroup) => {
    return knex('Addon_Group').insert({
        ...addonGroup
    })
}

exports.deleteAddonGroup = (addonGroupId) => {
    return knex('Addon_Group').where('Id', addonGroupId).del()
}

exports.searchAddonGroup = (query) => {
    return knex.from('Addon_Group').select('*').where('name', 'like', `%${query}%`)
}