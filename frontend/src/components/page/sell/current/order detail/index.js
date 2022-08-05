import React, { Component } from 'react'
import './index.scss';
// import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ImmediateSaleOrderDetail from './immediate sale';
import BookingOrderDetail from './booking';
import { connect } from 'react-redux';
import * as SellAction from '../../../../../redux/action/sell/index';
import Api from '../../../../../api/api';
import { format } from "date-fns";
import { withSnackbar } from 'notistack';
import { withRouter } from "react-router-dom";
import { LoadingButton } from '@mui/lab';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import SellModal from '../../../../common/modal';


class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderType: 1, //1 la immediate sale, 2 la booking
            customers: [],
            phone: "",
            name: "",
            email: "",
            shippingAddress: "",
            phoneErrorMessage: "",
            nameErrorMessage: "",
            emailErrorMessage: "",
            shippingAddressErrorMessage: "",
            completeLoading: false,
            receiveLoading: false,
        };
    }

    componentDidMount = async () => {
        const res = await Api.getCustomerList()
        this.setState({ customers: res.data.customerList })
    }


    getReceived() {
        return this.state.orderType === 1 ? this.props.sellProps.total : this.props.sellProps.bookingAdvance
    }

    onSelectOldCustomer = (value) => {
        const oldCustomer = this.state.customers.find((item) => item.mobilePhone === value)
        this.setState({
            phone: value,
            name: oldCustomer.name,
            email: oldCustomer.email,
            shippingAddress: oldCustomer.shippingAddress,
        })
    }

    onHandlePhoneChange = (e) => {
        this.setState({ phone: e.target.value })
    }

    onHandleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    onHandleEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onHandleShippingAddressChange = (e) => {
        this.setState({ shippingAddress: e.target.value })
    }

    getOrderDetail() {
        const model = {
            orderItemList: this.props.sellProps.orderItemList.map((item) => {
                return {
                    quantity: item.quantity,
                    selectedVariant: item.selectedVariant,
                    selectedAddons: item.selectedAddons,
                    taxId: item.taxId,
                    productId: item.Id
                }
            }),
            userId: this.props.user?.userId || 1,
            orderType: this.state.orderType, //2 la booking 1 la immediate sale 3 la canceled
            coupon: this.props.sellProps.coupon || null,
            total: this.props.sellProps.total,
            customer: {
                mobilePhone: this.state.phone,
                name: this.state.name,
                email: this.state.email,
                shippingAddress: this.state.shippingAddress
            },
            bookingAdvance: Number(this.props.sellProps.bookingAdvance),
            paymentType: this.props.sellProps.paymentType,
            deliveryDate: format(new Date(this.props.sellProps.deliveryDate), "yyyy-MM-dd HH:mm:ss"),
            notes: this.props.sellProps.notes
        }
        return model
    }

    onHandleComplete = async () => {
        // không in hoá đơn
        const model = this.getOrderDetail()

        this.setState({
            completeLoading: true
        })
        const res = await Api.createOrder(model)

        if (res.data.success) {
            //thông báo tạo thành công và chuyển hướng về trang chủ, xoá state redux
            this.props.enqueueSnackbar('Successfully to create an order.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } })
            this.props.resetState()
            this.props.clickPrevStep()
        }
        this.setState({
            completeLoading: false
        })
    }

    onHandleReceipt = () => {
        //gọi hàm in hóa đơn

        //tạo hóa đơn
        this.onHandleComplete()
    }

    render() {
        return (
            <div className='detail-element'>
                <div className='column-1'>
                    <div className='order-type'>
                        <div className="c-text-field-name">Order type</div>
                        <FormControlLabel
                            label={<div className="option">Immediate Sale </div>}
                            control={
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    size="small"
                                    checkedIcon={<CircleCheckedFilled />}
                                    checked={this.state.orderType === 1}
                                    onChange={() => this.setState({
                                        orderType: 1
                                    })}
                                />
                            }
                        />
                        <FormControlLabel
                            label={<div className="option">Booking </div>}
                            control={
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    size="small"
                                    checkedIcon={<CircleCheckedFilled />}
                                    checked={this.state.orderType === 2}
                                    onChange={() => this.setState({
                                        orderType: 2
                                    })}
                                />
                            }
                        />
                    </div>
                    <div className='order-detail'>
                        {this.state.orderType === 1 && <ImmediateSaleOrderDetail />}
                        {this.state.orderType === 2 && <BookingOrderDetail />}
                    </div>
                    <div className='controller'>
                        {/* button de dieu khien */}
                        <Stack direction="row">
                            <Button
                                type="cancel"
                                fullWidth
                                variant="outlined"
                                sx={{ mr: 1, width: 120 }}
                                onClick={() => this.props.clickPrevStep()}
                            >
                                Back
                            </Button>
                            {!this.state.completeLoading ?
                                <Button
                                    type="cancel"
                                    fullWidth
                                    variant="outlined"
                                    disabled={!this.props.sellProps.canFinishOrder}
                                    sx={{ mr: 1, width: 150 }}
                                    onClick={this.onHandleComplete}
                                >
                                    Complete
                                </Button>
                                :
                                (<LoadingButton
                                    loading
                                    variant="contained"
                                    sx={{ mr: 1, width: 150 }}
                                >
                                    Complete
                                </LoadingButton>)
                            }
                            {!this.state.receiveLoading ?
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!this.props.sellProps.canFinishOrder}
                                    onClick={this.onHandleReceipt}
                                >
                                    Received {this.getReceived()}
                                </Button>
                                :
                                <LoadingButton
                                    loading
                                    variant="contained"
                                    fullWidth
                                >
                                    Complete
                                </LoadingButton>
                            }
                        </Stack>
                    </div>
                </div>
                <div className='column-2'>
                    <div className="c-text-field-name">Customer Phone</div>
                    <Autocomplete
                        freeSolo
                        disableClearable
                        options={this.state.customers.map((option) => option.mobilePhone)}
                        onChange={(_e, value) => this.onSelectOldCustomer(value)}
                        value={this.state.mobilePhone}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                                onChange={this.onHandlePhoneChange}
                                error={this.state.phoneErrorMessage ? true : false}
                                helperText={this.state.phoneErrorMessage}
                                size="small"
                            />
                        )}
                    />
                    <div className="c-text-field-name">Customer Name</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.name}
                        fullWidth
                        size="small"
                        error={this.state.nameErrorMessage ? true : false}
                        helperText={this.state.nameErrorMessage}
                        onChange={this.onHandleNameChange}
                    />
                    <div className="c-text-field-name">Customer Email</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.email}
                        fullWidth
                        size="small"
                        error={this.state.emailErrorMessage ? true : false}
                        helperText={this.state.emailErrorMessage}

                        onChange={this.onHandleEmailChange}
                    />
                    <div className="c-text-field-name">Shipping Address</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.shippingAddress}
                        fullWidth
                        multiline
                        size="small"
                        error={this.state.shippingAddressErrorMessage ? true : false}
                        helperText={this.state.shippingAddressErrorMessage}
                        onChange={this.onHandleShippingAddressChange}
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProp = (state) => {
    return {
        ...state.authReducer,
        sellProps: state.sellReducer
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {
        setLoading: (loadingState) => {
            dispatch(SellAction.setLoading(loadingState))
        },
        setCanFinishOrder: (canFinishOrder) => {
            dispatch(SellAction.setCanFinishOrder(canFinishOrder))
        },
        resetState: () => {
            dispatch(SellAction.resetSate())
        },
        setOrderItemList: (orderItemList) => {
            dispatch(SellAction.setOrderItemList(orderItemList))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(OrderDetail)));
