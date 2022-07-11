const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Addon = require('../models/Addon')

exports.getAddonList = async function (req, res) {
    try {
        var addonList =  await Addon.getAddonList()
        res.status(200).json({
            addonList: addonList,
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

exports.getAddonListWithoutGroup = async function (req, res) {
    try {
        var addonList =  await Addon.getAddonListWithoutGroup()
        res.status(200).json({
            addonList: addonList,
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

exports.getAddon = async function (req, res) {
    try {
        console.log(req.body)
        var addon =  await Addon.getAddon(req.params.id)
        res.status(200).json({
            addon: addon
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

exports.createAddon = async function (req, res) {
    try {
        var info = req.body
        var id =  await Addon.createAddon(info)
        var addon =  await Addon.getAddon(id)
        res.status(200).json({
            addon: addon,
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

exports.editAddon = async function (req, res) {
    try {
        var data = req.body
        var id = req.body.Id
        await Addon.editAddon(data, id)
        res.status(200).json({
            addon: req.body
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

exports.deleteAddon = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await Addon.deleteAddon(id)
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

exports.searchAddon = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var addonList = await Addon.searchAddon(searchString)
        res.status(200).json({
            success: true,
            addonList: addonList
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