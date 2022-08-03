const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const {format} = require('date-fns')

exports.getCustomerList = () => {
    return knex.from('Customer').select('*')
}

exports.getCustomerByPhone = (phone) => {
    return knex.from('Customer').select('*').where('mobilePhone', phone).first()
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

exports.getNumNewCustomerToday = () => {
    const now = new Date()
    const startTime = new Date(now.setHours(0,0,0,0));
    const endTime = new Date(now.setHours(23,59,59,999));
    return knex("Customer").count("Id", {as: 'todayNumUser'}).where("createDate",">=", startTime).where("createDate","<=", endTime).first()
}