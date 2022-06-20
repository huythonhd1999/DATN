const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getStore = () => {
    return knex.from('Store').select('*').first()
}

exports.editStore = (data, Id) => {
    return knex('Store').where('Id', Id).update({
        ...data
    })
}