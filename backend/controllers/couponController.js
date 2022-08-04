const {format}  = require('date-fns')

const jwtHelper = require('../helpers/jwtToken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const Coupon = require('../models/Coupon')

exports.getCouponList = async function (req, res) {
    try {
        var couponList = await Coupon.getCouponList()
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
        var coupon = await Coupon.getCoupon(req.params.id)
        console.log(coupon)
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
        var id = await Coupon.createCoupon(info)
        var coupon = await Coupon.getCoupon(id)
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
        idList.forEach(async (id) => {
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

exports.checkCoupon = async function (req, res) {
    try {
        var code = req.body.couponCode
        var totalQuantity = req.body.totalQuantity
        var coupon = await Coupon.getCouponByCode(code)

        //check coupon có tồn tại hay không
        if (!coupon) {
            return res.status(200).json({
                success: false,
                message: "The coupon is not exist"
            })
        }


        //check minimum order value
        if (totalQuantity < coupon.minimumOrderValue) {
            return res.status(200).json({
                success: false,
                message: "The number of order items is not enough"
            })
        }

        //check startTime và endTime
        var present = new Date()
        const startTime = new Date(coupon.startTime)
        const endTime = new Date(coupon.endTime)
        if (present.getTime() > endTime.getTime() && coupon.endTime) {
            return res.status(200).json({
                success: false,
                message: "The coupon is out of date"
            })
        }

        if (present.getTime() < startTime.getTime() ) {
            return res.status(200).json({
                success: false,
                message: "Can not use the coupon now 3"
            })
        }

        //check happy hour
        if(coupon.startHappyHour && coupon.endHappyHour) {
            const timeNow = format(present, "yyyy-MM-dd")
            const startHappyHourDate = new Date(timeNow + " " + coupon.startHappyHour)
            const endHappyHourDate = new Date(timeNow + " " + coupon.endHappyHour)
            if(startHappyHourDate.getTime() > present.getTime() || endHappyHourDate.getTime() < present.getTime()) {
                return res.status(200).json({
                    success: false,
                    message: "Can not use the coupon now 1" 
                })
            }
        }


        //check day of week
        const dayOfWeek = present.getDay().toString()
        if(!coupon.dayOfWeek.includes(dayOfWeek) && coupon.dayOfWeek) {
            return res.status(200).json({
                success: false,
                message: "Can not use the coupon now 2"
            })
        }

        res.status(200).json({
            success: true,
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