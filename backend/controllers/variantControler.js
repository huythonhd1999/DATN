const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Variant = require('../models/Variant')

exports.getVariantList = async function (req, res) {
    try {
        var variantList =  await Variant.getVariantList()
        res.status(200).json({
            variantList: variantList,
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

exports.getVariantListWithoutGroup = async function (req, res) {
    try {
        var variantList =  await Variant.getVariantListWithoutGroup()
        res.status(200).json({
            variantList: variantList,
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

exports.getVariant = async function (req, res) {
    try {
        var variant =  await Variant.getVariant(req.params.id)
        res.status(200).json({
            variant: variant
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

exports.createVariant = async function (req, res) {
    try {
        var info = req.body
        var id =  await Variant.createVariant(info)
        var variant =  await Variant.getVariant(id)
        res.status(200).json({
            variant: variant,
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

exports.editVariant = async function (req, res) {
    try {
        var data = req.body
        var id = req.body.Id
        await Variant.editVariant(data, id)
        res.status(200).json({
            variant: req.body
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

exports.deleteVariant = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await Variant.deleteVariant(id)
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

exports.searchVariant = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var variantList = await Variant.searchVariant(searchString)
        res.status(200).json({
            success: true,
            variantList: variantList
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