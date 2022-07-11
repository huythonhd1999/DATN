const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getCategoryList = () => {
    return knex.from('Category').select('*')
}

exports.getCategory = (variantGroupId) => {
    return knex.from('Category').select('*').where('Id', variantGroupId).first()
}

exports.editCategory = (data, Id) => {
    return knex('Category').where('Id', Id).update({
        ...data
    })
}

exports.createCategory = (variantGroup) => {
    return knex('Category').insert({
        ...variantGroup
    })
}

exports.deleteCategory = (variantGroupId) => {
    return knex('Category').where('Id', variantGroupId).del()
}

exports.searchCategory = (query) => {
    return knex.from('Category').select('*').where('name', 'like', `%${query}%`)
}