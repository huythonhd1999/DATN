const { format } = require('date-fns')

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
const VariantGroup = require('../models/VariantGroup')
const User = require('../models/User')

exports.getTodayStatistic = async function (req, res) {
    try {
        //lay thong tin co ban
        const numNewCustomer = await Customer.getNumNewCustomerToday() || 0
        const totalOrder = await Order.getTotalOrderSalesToday() || 0
        const totalImmediateSaleOrder = await Order.getTotalImmediateOrderToday() || 0
        const totalBookingAdvance = await BookingOrder.getTotalBookingOrderToday() || 0
        const totalRefundAmount = await CanceledOrder.getTotalCanceledOrderToday() || 0
        const numOrderToday = await Order.getNumOrderToday() || 0
        const numCanceledOrderToday = await CanceledOrder.getNumCanceledOrderToday() || 0


        const topOrderItemList = await OrderItem.getTopVariantToday()
        for (var item of topOrderItemList) {
            item.variantInfo = await Variant.getVariant(item.variantId)
            if (item.variantInfo.variantGroupId) {
                const variantGroupInfo = await VariantGroup.getVariantGroup(item.variantInfo.variantGroupId)
                item.productInfo = await Product.getProduct(variantGroupInfo.productId)
            }
        }


        res.status(200).json({
            numNewCustomer: numNewCustomer.todayNumUser,
            totalOrder: totalOrder.totalOrderToday,
            totalImmediateSaleOrder: totalImmediateSaleOrder.totalOrderToday,
            totalBookingAdvance: totalBookingAdvance.totalBookingAdvanceToday,
            totalRefundAmount: totalRefundAmount.totalRefundAmountToday,
            topOrderItemList: topOrderItemList,
            numOrderToday: numOrderToday.numOrderToday,
            numCanceledOrderToday: numCanceledOrderToday.numOrder
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
}

exports.getDetailStatisticByDate = async function (req, res) {
    try {
        //chia lam 3 truong hop trong ngay = 1, trong tuan = 2 va trong thang = 3
        const type = req.params.type
        const now = new Date()
        console.log(now)
        var detail = []
        switch (Number(type)) {
            case 1: //lay thong tin trong ngay
                for (let i = 0; i <= 23; i++) {
                    const hour = new Date(now.setHours(i,0,0,0))
                    console.log(hour)
                    const data = {
                        totalOrder: await Order.getTotalOrderDetailSalesByHour(hour) || [],
                        numOrderToday: (await Order.getNumOrderByHour(hour)).numOrder || 0,
                    }
                    detail.push({ date: format(hour, "yyyy-MM-dd HH:mm:ss"), data: data })
                }
                break
            case 2: //lay thong tin tu 7 ngay truoc
                for (let i = 0; i <= 7; i++) {
                    const date = new Date(now - i * 86400000);
                    const data = {
                        totalOrder: await Order.getTotalOrderDetailSalesByDay(date) || [],
                        numOrderToday: (await Order.getNumOrderByDay(date)).numOrder || 0,
                    }
                    detail.push({ date: format(date, "yyyy-MM-dd HH:mm:ss"), data: data })
                }
                break
            case 3: //lay thong tin tu 30 ngay truoc
                for (let i = 0; i <= 30; i++) {
                    const date = new Date(now - i * 86400000);
                    const data = {
                        totalOrder: await Order.getTotalOrderDetailSalesByDay(date) || [],
                        numOrderToday: (await Order.getNumOrderByDay(date)).numOrder || 0,
                    }
                    detail.push({ date: format(date, "yyyy-MM-dd HH:mm:ss"), data: data })
                }
                break
            default:

        }

        res.status(200).json({
            detail: detail
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            err,
        });
    }
}