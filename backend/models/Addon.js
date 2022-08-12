const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getAddonList = () => {
    return knex.from('Addon').select('*').where('status', 1)
}

exports.getAddonListByAddonGroupId = (addonGroupId) => {
    return knex.from('Addon').select(
        '*',
        knex('Addon_Group')
            .select('name')
            .where('Addon_Group.Id', addonGroupId)
            .as('addonGroupName'),
    ).where('addonGroupId', addonGroupId)
}

exports.getAddonListWithoutGroup = () => {
    return knex.from('Addon').select('*').where('addonGroupId', null)
}

exports.getAddon = (addonId) => {
    return knex.from('Addon').select('*').where('Id', addonId).first()
}

exports.editAddon = (data, Id) => {
    return knex('Addon').where('Id', Id).update({
        ...data
    })
}

exports.editAddonByAddonGroupId = (data, Id) => {
    return knex('Addon').where('addonGroupId', Id).update({
        ...data
    })
}

exports.createAddon = (addon) => {
    return knex('Addon').insert({
        ...addon
    })
}

exports.deleteAddon = (addonId) => {
    return knex('Addon').where('Id', addonId).update({
        status: 0
    })
}

exports.searchAddon = (query) => {
    return knex.from('Addon').select('*').where('name', 'like', `%${query}%`).where('status', 1)
}