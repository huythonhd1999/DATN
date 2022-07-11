const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getVariantList = () => {
    return knex.from('Variant').select('*')
}

exports.getVariantListByVariantGroupId = (variantGroupId) => {
    return knex.from('Variant').select('*').where('variantGroupId', variantGroupId)
}

exports.getVariantListWithoutGroup = () => {
    return knex.from('Variant').select('*').where('variantGroupId', null).whereNot('status', 2)
}

exports.getVariant = (variantId) => {
    return knex.from('Variant').select('*').where('Id', variantId).first()
}

exports.editVariant = (data, Id) => {
    return knex('Variant').where('Id', Id).update({
        ...data
    })
}

exports.editVariantByVariantGroupId = (data, Id) => {
    return knex('Variant').where('variantGroupId', Id).update({
        ...data
    })
}

exports.createVariant = (variant) => {
    return knex('Variant').insert({
        ...variant
    })
}

exports.deleteVariant = (variantId) => {
    return knex('Variant').where('Id', variantId).del()
}

exports.searchVariant = (query) => {
    return knex.from('Variant').select('*').where('name', 'like', `%${query}%`)
}