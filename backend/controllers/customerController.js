const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const OrderItemAddon = require('../models/OrderItemAddon')
const BookingOrder = require('../models/BookingOrder')
const ImmediateSaleOrder = require('../models/ImmediateSaleOrder')
const CanceledOrder = require('../models/CanceledOrder')
const Product = require('../models/Product')
const Tax = require('../models/Tax')
const Coupon = require('../models/Coupon')
const Addon = require('../models/Addon')
const Variant = require('../models/Variant')
const User = require('../models/User')

exports.getCustomerList = async function (req, res) {
    try {
        var customerList = await Customer.getCustomerList()
        for (var customer of customerList) {
            customer.orderCount = (await Order.getOrderCountByCustomerId(customer.Id)).numOrder
            customer.lastOrder = await Order.getLastOrderByCustomerId(customer.Id)
            customer.totalOrder = (await Order.getOrdersTotalByCustomerId(customer.Id)).totalOrder
        }
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
        var customer = await Customer.getCustomer(req.params.id)
        customer.orderCount = (await Order.getOrderCountByCustomerId(req.params.id)).numOrder
        customer.lastOrder = await Order.getLastOrderByCustomerId(req.params.id)
        customer.totalOrder = (await Order.getOrdersTotalByCustomerId(req.params.id)).totalOrder
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
        var id = await Customer.createCustomer(info)
        var customer = await Customer.getCustomer(id)
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
        var customer = await Customer.getCustomer(id)
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
        idList.forEach(async (id) => {
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