const Customer = require('../models/Customer')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const OrderItemAddon = require('../models/OrderItemAddon')
const BookingOrder = require('../models/BookingOrder')
const ImmediateSaleOrder = require('../models/ImmediateSaleOrder')
const CanceledOrder = require('../models/CanceledOrder')


exports.getOrderList = async function (req, res) {
    try {
        var orderList = await Order.getOrderList()
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
        console.log(req.body)
        var order = await Order.getOrder(req.params.id)
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

exports.editOrder = async function (req, res) {
    try {
        var data = req.body
        var id = req.body.Id
        await Order.editOrder(data, id)
        var order = await Order.getOrder(id)
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
        console.log(searchString)
        var orderList = await Order.searchOrder(searchString)
        res.status(200).json({
            success: true,
            orderList: orderList
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