const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getVariantGroupList = () => {
    return knex.from('Variant_Group').select('*')
}

exports.getVariantGroupsByProductId = (productId) => {
    return knex.from('Variant_Group').select('*').where('productId', productId)
}

exports.getVariantGroup = (variantGroupId) => {
    return knex.from('Variant_Group').select('*').where('Id', variantGroupId).first()
}

exports.editVariantGroupByProductId = (data, productId) => {
    return knex.from('Variant_Group').where('productId', productId).update({
        ...data
    })
}

exports.editVariantGroup = (data, Id) => {
    return knex('Variant_Group').where('Id', Id).update({
        ...data
    })
}

exports.createVariantGroup = (variantGroup) => {
    return knex('Variant_Group').insert({
        ...variantGroup
    })
}

exports.deleteVariantGroup = (variantGroupId) => {
    return knex('Variant_Group').where('Id', variantGroupId).del()
}

exports.searchVariantGroup = (query) => {
    return knex.from('Variant_Group').select('*').where('name', 'like', `%${query}%`)
}