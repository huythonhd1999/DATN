const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getProductList = () => {
    return knex.from('Product').select('*').where('status', 1)
}

exports.getProductListByCategoryId = (categoryId) => {
    return knex.from('Product').select('*').where('categoryId', categoryId)
}

exports.getProductListWithoutCategory = () => {
    return knex.from('Product').select('*').where('categoryId', null)
}

exports.getProduct = (productId) => {
    return knex.from('Product').select('*').where('Id', productId).first()
}

exports.editProduct = (data, Id) => {
    return knex('Product').where('Id', Id).update({
        ...data
    })
}

exports.editProductByCategoryId = (data, Id) => {
    return knex('Product').where('categoryId', Id).update({
        ...data
    })
}

exports.createProduct = (product) => {
    return knex('Product').insert({
        ...product
    })
}

exports.deleteProduct = (productId) => {
    return knex('Product').where('Id', productId).update({
        status: 0
    })
}

exports.searchProduct = (query) => {
    return knex.from('Product').select('*').where('name', 'like', `%${query}%`).where('status', 1)
}