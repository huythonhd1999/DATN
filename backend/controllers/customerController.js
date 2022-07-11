const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Customer = require('../models/Customer')

exports.getCustomerList = async function (req, res) {
    try {
        var customerList =  await Customer.getCustomerList()
        res.status(200).json({
            customerList: customerList,
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

exports.getCustomer = async function (req, res) {
    try {
        console.log(req.body)
        var customer =  await Customer.getCustomer(req.params.id)
        res.status(200).json({
            customer: customer
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

exports.createCustomer = async function (req, res) {
    try {
        var info = req.body
        var id =  await Customer.createCustomer(info)
        var customer =  await Customer.getCustomer(id)
        res.status(200).json({
            customer: customer,
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

exports.editCustomer = async function (req, res) {
    try {
        var data = req.body
        var id = req.body.Id
        await Customer.editCustomer(data, id)
        var customer =  await Customer.getCustomer(id)
        res.status(200).json({
            customer: customer
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

exports.deleteCustomer = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await Customer.deleteCustomer(id)
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

exports.searchCustomer = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var customerList = await Customer.searchCustomer(searchString)
        res.status(200).json({
            success: true,
            customerList: customerList
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