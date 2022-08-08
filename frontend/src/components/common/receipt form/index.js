import { format } from 'date-fns';
import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './index.scss'

export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            createDate: new Date()
        };
    }
    getOrderItemName(orderItem) {
        let variantName = orderItem.name || orderItem.productInfo.name + " / " + orderItem.selectedVariant.name

        orderItem.selectedAddons.forEach((addon) => {
            variantName = variantName + " + " + addon.name || addon.addonInfo.name
        })
        return variantName
    }
    getOrderItemPrice(orderItem) {
        let variantPrice = orderItem.selectedVariant.price
        let taxPercent = orderItem.taxInfo?.percent || 0
        orderItem.selectedAddons.forEach((addon) => {
            variantPrice = variantPrice + addon.price || addon.addonInfo.price * (1 + taxPercent / 100)
        })
        return variantPrice * orderItem.quantity
    }
    getPaymentType() {
        switch (this.props.order.paymentType) {
            case 1:
                return "Cash"
            case 2:
                return "Card"
            case 3:
                return "Other"
            default:
                return
        }
    }
    getGetSubTotal() {
        var subTotal = 0
        this.props.order.orderItemList?.forEach((orderItem) => {
            subTotal = subTotal + this.getOrderItemPrice(orderItem)
        })
        return subTotal + "$"
    }

    getDiscountAmount() {
        if (this.props.order?.coupon?.type === 0) {
            return this.props.order?.total * this.props.order?.coupon?.amount / 100 + `$ (${this.props.order?.coupon?.amount}%)`
        } else {
            return this.props.order?.coupon?.amount || 0 + "$"
        }
    }
    getPaidAmount() {
        if (this.props.order.orderType === 1) {
            return this.props.order?.total
        } else {
            return this.props.order?.bookingAdvance
        }
    }
    getPendingPaymentAmount() {
        return this.props.order.total - this.props.order.bookingAdvance
    }

    getCreateDate () {
        if (this.props.order.createDate) {
            return format(new Date(this.props.order.createDate), "yyyy-MM-dd HH:mm:ss")
        } else {
            return format(new Date(), "yyyy-MM-dd HH:mm:ss")
        }
    }

    render() {
        return (
            <div className='receipt-from'>
                <div className='receipt-header'>
                    <div className='name'>
                        {this.props.store?.restaurantName}
                    </div>
                    <div className='address'>
                        {this.props.store?.address}
                    </div>
                    <div className='phone-number'>
                        {this.props.store?.mobilePhoneNumber}
                    </div>
                    <div className='text'>
                        Receipt
                    </div>
                </div>
                <div className='receipt-contents'>
                    <div className='general-info'>
                        <div className='text'>General Information</div>

                        <div className='content'>
                            <div className='key'>Order type: </div>
                            <div className='value'>{this.props.order?.orderType === 1 ? "Immediate Sale" : "Booking"}</div>
                        </div>
                        <div className='content'>
                            <div className='key'>Host by: </div>
                            <div className='value'>{this.props.user?.userName}</div>
                        </div>
                        <div className='content'>
                            <div className='key'>Create date: </div>
                            <div className='value'>{this.getCreateDate()}</div>
                        </div>
                        {
                            this.props.order.orderType === 2 &&
                            <div className='content'>
                                <div className='key'>Delivery Date: </div>
                                <div className='value'>{format(new Date(this.props.order?.deliveryDate), "yyyy-MM-dd HH:mm:ss")}</div>
                            </div>
                        }
                        {
                            this.props.order.orderType === 2 &&
                            <div className='content'>
                                <div className='key'>Is Door Delivery: </div>
                                <div className='value'>{this.props.order?.isDoorDelivery === 1 ? "Yes" : "No"}</div>
                            </div>
                        }
                    </div>

                    <div className='customer-info'>
                        <div className='text'>Customer Information</div>

                        <div className='content'>
                            <div className='key'>Name: </div>
                            <div className='value'>{this.props.order?.customer?.name}</div>
                        </div>
                        <div className='content'>
                            <div className='key'>Mobile Phone: </div>
                            <div className='value'>{this.props.order?.customer?.mobilePhone}</div>
                        </div>
                        <div className='content'>
                            <div className='key'>Email: </div>
                            <div className='value'>{this.props.order?.customer?.email}</div>
                        </div>
                        <div className='content'>
                            <div className='key'>Shipping Address: </div>
                            <div className='value'>{this.props.order?.customer?.shippingAddress}</div>
                        </div>
                    </div>


                    <div className='order-info'>
                        <div className='text'>Order Items Information</div>
                        <div className='order-item-list'>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Tax %</TableCell>
                                            <TableCell>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.order?.orderItemList?.map((orderItem, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {this.getOrderItemName(orderItem)}
                                                    </TableCell>
                                                    <TableCell>{orderItem.quantity}</TableCell>
                                                    <TableCell>{orderItem.taxInfo?.percent || 0}</TableCell>
                                                    <TableCell>{this.getOrderItemPrice(orderItem)}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    <div className='payment-info'>
                        <div className='text'>Payment Information</div>
                        <div className='content'>
                            <div className='key'>Payment Type: </div>
                            <div className='value'>{this.getPaymentType()}</div>
                        </div>
                        <div className='content'>
                            <div className='key'>Sub Total: </div>
                            <div className='value'>{this.getGetSubTotal()}</div>
                        </div>
                        <div className='content'>
                            <div className='key'>Discount: </div>
                            <div className='value'>{this.getDiscountAmount()}</div>
                        </div>

                    </div>
                    <div className='final-info'>
                        <div className='content'>
                            <div className='key'>Total: </div>
                            <div className='value'>{this.props.order.total}$</div>
                        </div>

                        <div className='content'>
                            <div className='key'>Paid: </div>
                            <div className='value'>{this.getPaidAmount()}$</div>
                        </div>

                        {
                            this.props.order.orderType === 2 &&
                            <div className='content'>
                                <div className='key'>Pending Payment: </div>
                                <div className='value'>{this.getPendingPaymentAmount()}$</div>
                            </div>
                        }
                    </div>
                </div>
                <div className='receipt-footer'>
                    <div className='text'>
                        Customer Copy
                    </div>
                    <div className='text'>
                        Thank you for visiting
                    </div>
                    <div className='text'>
                        {this.props.store?.restaurantName}
                    </div>
                </div>
            </div>
        );
    }
}