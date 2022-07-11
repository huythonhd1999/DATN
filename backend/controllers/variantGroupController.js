const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const VariantGroup = require('../models/VariantGroup')
const Variant = require('../models/Variant')

exports.getVariantGroupList = async function (req, res) {
    try {
        var variantGroupList =  await VariantGroup.getVariantGroupList()
        for(let item of variantGroupList) {
            item.variantList = await Variant.getVariantListByVariantGroupId(item.Id)
        }
        res.status(200).json({
            variantGroupList: variantGroupList,
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

exports.getVariantGroup = async function (req, res) {
    try {
        var variantGroup =  await VariantGroup.getVariantGroup(req.params.id)
        variantGroup.variantList = await Variant.getVariantListByVariantGroupId(req.params.id) || []
        res.status(200).json({
            variantGroup: variantGroup
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

exports.createVariantGroup = async function (req, res) {
    try {
        var info = {
            name: req.body.name, 
            productId: req.body.productId, 
        }
        var variantGroupId =  await VariantGroup.createVariantGroup(info)

        if(req.body.variantList.length > 0) {
            req.body.variantList.forEach(async(id) => {
                await Variant.editVariant({variantGroupId: variantGroupId},id)
            })
        }

        var variantGroup =  await VariantGroup.getVariantGroup(variantGroupId)
        variantGroup.variantList = await Variant.getVariantListByVariantGroupId(variantGroupId)

        res.status(200).json({
            variantGroup: variantGroup,
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

exports.editVariantGroup = async function (req, res) {
    try {
        var data = {
            name: req.body.name, 
            productId: req.body.productId, 
            status: req.body.status
        }

        var variantGroupId = req.body.Id

        await Variant.editVariantByVariantGroupId({variantGroupId: null}, variantGroupId)

        req.body.variantList.forEach(async(id) => {
            await Variant.editVariant({variantGroupId: variantGroupId},id)
        })

        await VariantGroup.editVariantGroup(data, variantGroupId)
        var variantGroup =  await VariantGroup.getVariantGroup(variantGroupId)
        variantGroup.variantList = await Variant.getVariantListByVariantGroupId(variantGroupId)

        res.status(200).json({
            variantGroup: variantGroup
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

exports.deleteVariantGroup = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await VariantGroup.deleteVariantGroup(id)
            await Variant.editVariantByVariantGroupId({variantGroupId: null}, id)
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

exports.searchVariantGroup = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var variantGroupList = await VariantGroup.searchVariantGroup(searchString)
        for(let item of variantGroupList) {
            item.variantList = await Variant.getVariantListByVariantGroupId(item.Id)
        }
        res.status(200).json({
            success: true,
            variantGroupList: variantGroupList
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