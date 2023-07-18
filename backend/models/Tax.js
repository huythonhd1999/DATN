const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getTaxList = () => {
    return knex.from('Tax').select('*').where('status', 1)
}

exports.getTax = (taxId) => {
    return knex.from('Tax').select('*').where('Id', taxId).first()
}

exports.editTax = (data, Id) => {
    return knex('Tax').where('Id', Id).update({
        ...data
    })
}

exports.createTax = (tax) => {
    return knex('Tax').insert({
        name: tax.name,
        percent: tax.percent,
    })
}

exports.deleteTax = (data, taxId) => {
    return knex('Tax').where('Id', taxId).update({
        ...data
    })
}

exports.searchTax = (query) => {
    return knex.from('Tax').select('*').where('name', 'like', `%${query}%`).where('status', 1)
}