
const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

//Use for auth login
exports.getUserByUserName = (username) => {
    return knex.from('User').select('*').where('userName', username).first()
}

exports.getUserList = () => {
    return knex.from('User').select('*')
}

exports.getUser = (userId) => {
    return knex.from('User').select('*').where('Id', userId).first()
}

exports.editUser = (data, Id) => {
    return knex('User').where('Id', Id).update({
        ...data
    })
}

exports.createUser = (user) => {
    return knex('User').insert({
        ...user
    })
}

exports.deleteUser = (userId) => {
    return knex('User').where('Id', userId).del()
}

exports.searchUser = (query) => {
    return knex.from('User').select('*').where('userName', 'like', `%${query}%`)
}