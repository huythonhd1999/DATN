const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Coupon = require('../models/Coupon')

exports.getCouponList = async function (req, res) {
    try {
        var couponList =  await Coupon.getCouponList()
        res.status(200).json({
            couponList: couponList,
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

exports.getCoupon = async function (req, res) {
    try {
        var coupon =  await Coupon.getCoupon(req.params.id)
        res.status(200).json({
            coupon: coupon
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

exports.createCoupon = async function (req, res) {
    try {
        var info = req.body
        var id =  await Coupon.createCoupon(info)
        var coupon =  await Coupon.getCoupon(id)
        res.status(200).json({
            coupon: coupon,
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

exports.editCoupon = async function (req, res) {
    try {
        var data = req.body
        var id = req.body.Id
        await Coupon.editCoupon(data, id)
        res.status(200).json({
            coupon: req.body
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

exports.deleteCoupon = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async(id) => {
            await Coupon.deleteCoupon(id)
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

exports.searchCoupon = async function (req, res) {
    try {
        var searchString = req.body.searchString
        console.log(searchString)
        var couponList = await Coupon.searchCoupon(searchString)
        res.status(200).json({
            success: true,
            couponList: couponList
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