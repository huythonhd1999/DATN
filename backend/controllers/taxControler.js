const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Tax = require('../models/Tax')

exports.getTaxList = async function (req, res) {
    try {
        var taxList =  await Tax.getTaxList()
        res.status(200).json({
            taxList: taxList,
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

exports.getTax = async function (req, res) {
    try {
        var tax =  await Tax.getTax(req.params.id)
        res.status(200).json({
            tax: tax
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

exports.createTax = async function (req, res) {
    try {
        var info = req.body
        var id =  await Tax.createTax(info)
        var tax =  await Tax.getTax(id)
        res.status(200).json({
            tax: tax,
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

exports.editTax = async function (req, res) {
    try {
        var info = {name: req.body.name, percent: req.body.percent}
        var id = req.body.Id
        console.log(info)
        await Tax.editTax(info, id)
        res.status(200).json({
            tax: req.body
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

exports.deleteTax = async function (req, res) {
    try {
        var idList = req.body
        idList.forEach(async(id) => {
            await Tax.deleteTax({status: 0},id)
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

exports.searchTax = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var taxList = await Tax.searchTax(searchString)
        res.status(200).json({
            success: true,
            taxList: taxList
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