const knex = require('./database')
const bcrypt = require('bcrypt')
const config = require('../config/config')

exports.getPettyCashList = () => {
    return knex.from('Petty_Cash').select('*')
}

exports.getPettyCashListByPettyCashGroupId = (pettyCashGroupId) => {
    return knex.from('Petty_Cash').select('*').where('pettyCashGroupId', pettyCashGroupId)
}

exports.getPettyCashListWithoutGroup = () => {
    return knex.from('Petty_Cash').select('*').where('pettyCashGroupId', null)
}

exports.getPettyCash = (pettyCashId) => {
    return knex.from('Petty_Cash').select('*').where('Id', pettyCashId).first()
}

exports.editPettyCash = (data, Id) => {
    return knex('Petty_Cash').where('Id', Id).update({
        ...data
    })
}

exports.editPettyCashByPettyCashGroupId = (data, Id) => {
    return knex('Petty_Cash').where('pettyCashGroupId', Id).update({
        ...data
    })
}

exports.createPettyCash = (pettyCash) => {
    return knex('Petty_Cash').insert({
        ...pettyCash
    })
}

exports.deletePettyCash = (pettyCashId) => {
    return knex('Petty_Cash').where('Id', pettyCashId).del()
}

exports.searchPettyCash = (query) => {
    return knex.from('Petty_Cash').select('*').where('notes', 'like', `%${query}%`)
}