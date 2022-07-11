const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getCustomerList = () => {
    return knex.from('Customer').select('*')
}

exports.getCustomer = (customerId) => {
    return knex.from('Customer').select('*').where('Id', customerId).first()
}

exports.editCustomer = (data, Id) => {
    return knex('Customer').where('Id', Id).update({
        ...data
    })
}

exports.createCustomer = (customer) => {
    return knex('Customer').insert({
        ...customer
    })
}

exports.deleteCustomer = (customerId) => {
    return knex('Customer').where('Id', customerId).del()
}

exports.searchCustomer = (query) => {
    return knex.from('Customer').select('*').where('mobilePhone', 'like', `%${query}%`)
}