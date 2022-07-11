const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const PettyCash = require('../models/PettyCash')
const User = require('../models/User')

exports.getPettyCashList = async function (req, res) {
    try {
        var pettyCashList =  await PettyCash.getPettyCashList()
        for(let item of pettyCashList) {
            item.userInfo = await User.getUser(item.userId)
        }
        res.status(200).json({
            pettyCashList: pettyCashList,
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

exports.getPettyCash = async function (req, res) {
    try {
        console.log(req.body)
        var pettyCash =  await PettyCash.getPettyCash(req.params.id)
        pettyCash.userInfo = await User.getUser(pettyCash.userId)
        res.status(200).json({
            pettyCash: pettyCash
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

exports.createPettyCash = async function (req, res) {
    try {
        var info = req.body
        var id =  await PettyCash.createPettyCash(info)
        var pettyCash =  await PettyCash.getPettyCash(id)
        pettyCash.userInfo = await User.getUser(pettyCash.userId)
        res.status(200).json({
            pettyCash: pettyCash,
            success: true,
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

exports.editPettyCash = async function (req, res) {
    try {
        var data = req.body
        var id = req.body.Id
        await PettyCash.editPettyCash(data, id)
        var pettyCash =  await PettyCash.getPettyCash(id)
        console.log(pettyCash)
        pettyCash.userInfo = await User.getUser(pettyCash.userId)
        res.status(200).json({
            pettyCash: pettyCash
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

exports.deletePettyCash = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await PettyCash.deletePettyCash(id)
        });
        res.status(200).json({
            success: true,
            numDelete: idList.length
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

exports.searchPettyCash = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var pettyCashList = await PettyCash.searchPettyCash(searchString)
        res.status(200).json({
            success: true,
            pettyCashList: pettyCashList
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