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


exports.getOrderList = async function (req, res) {
    try {
        var orderList = await Order.getOrderList() // 1 là immediate sale 2 là booking 3 là cancel
        for (var order of orderList) {
            order.customerInfo = await Customer.getCustomer(order.customerId)
            switch (order.status) {
                case 2: // booking
                    order.bookingInfo = await BookingOrder.getBookingOrderByOrderId(order.Id)
                    break
                case 1: //immediate sale
                    order.immediateSaleInfo = await ImmediateSaleOrder.getImmediateSaleOrderByOrderId(order.Id)
                    break
                default:
                    break
            }
            order.canceledOrderInfo = await CanceledOrder.getCanceledOrderByOrderId(order.Id)
        }
        res.status(200).json({
            orderList: orderList,
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

exports.getOrder = async function (req, res) {
    try {
        var order = await Order.getOrder(req.params.id)
        order.customerInfo = await Customer.getCustomer(order.customerId)

        //lấy thông tin chi tiết về loại order
        switch (order.status) {
            case 2: // booking
                order.bookingInfo = await BookingOrder.getBookingOrderByOrderId(order.Id)
                break
            case 1: //immediate sale
                order.immediateSaleInfo = await ImmediateSaleOrder.getImmediateSaleOrderByOrderId(order.Id)
                break
            default:
                break
        }
        order.canceledOrderInfo = await CanceledOrder.getCanceledOrderByOrderId(order.Id)
        order.userInfo = await User.getUser(order.userId)
        if (order.couponId) {
            order.couponInfo = await Coupon.getCoupon(order.couponId)
        }

        //lấy thông tin về các item trong order
        order.orderItemList = await OrderItem.getOrderItemListByOrderId(order.Id)
        for (var orderItem of order.orderItemList) {
            orderItem.productInfo = await Product.getProduct(orderItem.productId)
            orderItem.taxInfo = await Tax.getTax(orderItem.productInfo.taxId) || null
            orderItem.selectedVariant = await Variant.getVariant(orderItem.variantId)
            orderItem.selectedAddons = await OrderItemAddon.getOrderItemAddonListByOrderItemId(orderItem.Id)
            for (var orderItemAddon of orderItem.selectedAddons) {
                orderItemAddon.addonInfo = await Addon.getAddon(orderItemAddon.addonId)
            }
        }

        res.status(200).json({
            order: order
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

exports.createOrder = async function (req, res) {
    try {
        var info = req.body

        //kiểm tra khách hàng đã tồn tại hay chưa, chưa có thì tạo mới
        var customerId = null
        if (info.customer) {
            var customer = await Customer.getCustomerByPhone(info.customer.mobilePhone)
            if (!customer) {
                customerId = await Customer.createCustomer(info.customer)
            } else {
                customerId = customer.Id
            }
        }

        //tạo order
        var orderData = {
            userId: info.userId,
            couponId: info.coupon.Id || null,
            customerId: customerId,
            paymentType: info.paymentType,
            total: info.total,
            status: info.orderType
        }
        var orderId = await Order.createOrder(orderData)

        //tạo booking order hoặc immediate sale order
        if (info.orderType === 1) { //immediate sale
            var data = {
                orderId: orderId,
                notes: info.notes
            }
            await ImmediateSaleOrder.createImmediateSaleOrder(data)
        } else if (info.orderType === 2) { //booking order
            var data = {
                orderId: orderId,
                isDoorDelivery: info.isDoorDelivery || 1, //1 la true 0 la false
                bookingAdvance: info.bookingAdvance,
                deliveryDate: info.deliveryDate,
                notes: info.notes
            }
            await BookingOrder.createBookingOrder(data)
        }

        //tạo order item
        for (var orderItem of info.orderItemList) {
            var data = {
                orderId: orderId,
                variantId: orderItem.selectedVariant.Id,
                quantity: orderItem.quantity,
                productId: orderItem.productId
            }
            var orderItemId = await OrderItem.createOrderItem(data)
            // tạo order item addon
            for (var orderItemAddon of orderItem.selectedAddons) {
                var data = {
                    orderItemId: orderItemId,
                    addonId: orderItemAddon.Id,
                    quantity: 1
                }
                await OrderItemAddon.createOrderItemAddon(data)
            }
        }

        res.status(200).json({
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

exports.createCanceledOrder = async function (req, res) {
    try {
        var info = req.body
        await CanceledOrder.createCanceledOrder(info)
        // await Order.editOrder({ status: 3 }, info.orderId) //set lại  loại order là canceled
        var canceledOrder = await CanceledOrder.getCanceledOrderByOrderId(info.orderId)
        res.status(200).json({
            canceledOrder: canceledOrder,
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

exports.editBookingOrder = async function (req, res) {
    try {
        var data = req.body
        var id = req.body.orderId
        await BookingOrder.editBookingOrder(data, id)
        var bookingOrder = await BookingOrder.getBookingOrderByOrderId(id)
        res.status(200).json({
            bookingOrder: bookingOrder
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

exports.deleteOrder = async function (req, res) {
    try {
        var idList = req.body.IdList
        idList.forEach(async (id) => {
            await Order.deleteOrder(id)
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

exports.searchOrder = async function (req, res) {
    try {
        var searchString = req.body.searchString
        var orderList = await Order.searchOrder(searchString)
        for (var order of orderList) {
            order.customerInfo = await Customer.getCustomer(order.customerId)
            switch (order.status) {
                case 2: // booking
                    order.bookingInfo = await BookingOrder.getBookingOrderByOrderId(order.Id)
                    break
                case 1: //immediate sale
                    order.immediateSaleInfo = await ImmediateSaleOrder.getImmediateSaleOrderByOrderId(order.Id)
                    break
                default:
                    break
            }
            order.canceledOrderInfo = await CanceledOrder.getCanceledOrderByOrderId(order.Id)
        }
        res.status(200).json({
            orderList: orderList,
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