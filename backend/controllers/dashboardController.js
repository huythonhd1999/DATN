const {format}  = require('date-fns')

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
        const numNewCustomer = await Customer.getNumNewCustomerToday()
        const totalOrder = await Order.getTotalOrderSalesToday()
        const totalImmediateSaleOrder = await Order.getTotalImmediateOrderToday()
        const totalBookingAdvance = await BookingOrder.getTotalBookingOrderToday()
        const totalRefundAmount = await CanceledOrder.getTotalCanceledOrderToday()

        
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
            totalOrder: totalOrder.totalOrderToday ,
            totalImmediateSaleOrder: totalImmediateSaleOrder.totalOrderToday ,
            totalBookingAdvance: totalBookingAdvance.totalBookingAdvanceToday,
            totalRefundAmount: totalRefundAmount.totalRefundAmountToday,
            topOrderItemList: topOrderItemList
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