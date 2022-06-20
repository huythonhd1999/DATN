const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Store = require('../models/Store')

exports.getStore = async function (req, res) {
    try {
        var store =  await Store.getStore()
        console.log(store)
        res.status(200).json({
            store: store
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};
exports.setStore = async function (req, res) {
    try {
        var newStore = req.body
        await Store.editStore(newStore, newStore.Id)
        newStore = await Store.getStore()
        console.log(newStore)
        res.status(200).json({
            success: true,
            store: newStore
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
};