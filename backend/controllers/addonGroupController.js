const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const AddonGroup = require('../models/AddonGroup')
const Addon = require('../models/Addon')

exports.getAddonGroupList = async function (req, res) {
    try {
        var addonGroupList =  await AddonGroup.getAddonGroupList()
        for(let item of addonGroupList) {
            item.addonList = await Addon.getAddonListByAddonGroupId(item.Id)
        }
        res.status(200).json({
            addonGroupList: addonGroupList,
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

exports.getAddonGroup = async function (req, res) {
    try {
        var addonGroup =  await AddonGroup.getAddonGroup(req.params.id)
        addonGroup.addonList = await Addon.getAddonListByAddonGroupId(req.params.id) || []
        res.status(200).json({
            addonGroup: addonGroup
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

exports.createAddonGroup = async function (req, res) {
    try {
        var info = {
            name: req.body.name, 
            productId: req.body.productId, 
        }
        var addonGroupId =  await AddonGroup.createAddonGroup(info)

        if(req.body.addonList.length > 0) {
            req.body.addonList.forEach(async(id) => {
                await Addon.editAddon({addonGroupId: addonGroupId},id)
            })
        }

        var addonGroup =  await AddonGroup.getAddonGroup(addonGroupId)
        addonGroup.addonList = await Addon.getAddonListByAddonGroupId(addonGroupId)

        res.status(200).json({
            addonGroup: addonGroup,
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

exports.editAddonGroup = async function (req, res) {
    try {
        var data = {
            name: req.body.name, 
            productId: req.body.productId, 
            status: req.body.status
        }

        var addonGroupId = req.body.Id

        await Addon.editAddonByAddonGroupId({addonGroupId: null}, addonGroupId)

        req.body.addonList.forEach(async(id) => {
            await Addon.editAddon({addonGroupId: addonGroupId},id)
        })

        await AddonGroup.editAddonGroup(data, addonGroupId)
        var addonGroup =  await AddonGroup.getAddonGroup(addonGroupId)
        addonGroup.addonList = await Addon.getAddonListByAddonGroupId(addonGroupId)

        res.status(200).json({
            addonGroup: addonGroup
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

exports.deleteAddonGroup = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await AddonGroup.deleteAddonGroup(id)
            await Addon.editAddonByAddonGroupId({addonGroupId: null}, id)
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

exports.searchAddonGroup = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var addonGroupList = await AddonGroup.searchAddonGroup(searchString)
        for(let item of addonGroupList) {
            item.addonList = await Addon.getAddonListByAddonGroupId(item.Id)
        }
        res.status(200).json({
            success: true,
            addonGroupList: addonGroupList
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