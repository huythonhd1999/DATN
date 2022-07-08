const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const User = require('../models/User')

exports.getUserList = async function (req, res) {
    try {
        var userList =  await User.getUserList()
        res.status(200).json({
            userList: userList,
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

exports.getUser = async function (req, res) {
    try {
        var user =  await User.getUser(req.params.id)
        res.status(200).json({
            user: user
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

exports.createUser = async function (req, res) {
    try {
        var info = req.body
        info.password = await bcrypt.hash(info.password, config.saltRounds)
        var id =  await User.createUser(info)
        var user =  await User.getUser(id)
        res.status(200).json({
            user: user,
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

exports.editUser = async function (req, res) {
    try {
        var data = req.body
        console.log(data)
        if (data.password) {
            data.password = await bcrypt.hash(data.password, config.saltRounds)
        }
        var id = req.body.Id
        await User.editUser(data, id)
        res.status(200).json({
            user: req.body
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

exports.deleteUser = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await User.deleteUser(id)
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

exports.searchUser = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var userList = await User.searchUser(searchString)
        res.status(200).json({
            success: true,
            userList: userList
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