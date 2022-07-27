import React, { Component } from 'react'
import './index.scss';
// import SearchIcon from '@mui/icons-material/Search';
import { FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
// import Api from '../../../../../api/api';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import SellModal from '../../../../common/modal';
import { connect } from 'react-redux';
import * as SellAction from '../../../../../../redux/action/sell/index';


class BookingOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: 1, //1 la cash, 2 la credit card 3 la other
            bookingAdvanceErrorMessage: ""
        };
    }

    handlePaymentTypeChange = (e) => {
        this.props.setPaymentType(e.target.value)
    }

    onHandleBookingAdvanceChange= (e) => {
        let regEx = new RegExp("^[0-9]+[0-9]*$|^$")
        if (regEx.test(e.target.value)) {
            this.props.setBookingAdvance(e.target.value)
            if (e.target.value > this.props.sellProps.total) {
                this.props.setCanFinishOrder(false)
                this.setState({
                    bookingAdvanceErrorMessage: `Booking Advance can not greater than the order value: ${this.props.sellProps.total}`
                })
            } else {
                this.props.setCanFinishOrder(true)
                this.setState({
                    bookingAdvanceErrorMessage: ""
                })
            }
        }
    }

    onHandleNotesChange = (e) => {
        this.props.setNotes(e.target.value)
    }

    render() {
        return (
            <div className='booking'>
                <div className='payment-type'>
                    <div className="c-text-field-name">Payment type</div>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <Select
                            value={this.props.sellProps.paymentType}
                            onChange={(e) => this.handlePaymentTypeChange(e)}
                            fullWidth
                        >
                            <MenuItem value={1}>Cash</MenuItem>
                            <MenuItem value={2}>Credit/Debit Card</MenuItem>
                            <MenuItem value={3}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='payment-detail'>
                    <div className="c-text-field-name">Delivery Date & Time</div>
                    <Stack direction="row" spacing={2} className="delivery-date">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="MM/dd/yyyy"
                                value={this.props.sellProps.deliveryDate}
                                disabled={this.state.disable}
                                onChange={(value) => this.props.setDeliveryDate(value)}
                                minDate={new Date()}
                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                            />
                            <TimePicker
                                value={this.props.sellProps.deliveryDate}
                                ampm={false}
                                onChange={(value) => this.props.setDeliveryDate(value)}
                                disabled={this.state.disable}
                                minTime={new Date()}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                    <div className="c-text-field-name">Booking Advance</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.props.sellProps.bookingAdvance}
                        fullWidth
                        size="small"
                        onChange={this.onHandleBookingAdvanceChange}
                        error={this.props.sellProps.bookingAdvance > this.props.sellProps.total}
                        helperText={this.state.bookingAdvanceErrorMessage}
                    />
                    <div className="c-text-field-name">Notes</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.props.sellProps.notes}
                        fullWidth
                        size="small"
                        onChange={this.onHandleNotesChange}
                    />
                </div>
            </div >
        )
    }
}

const mapStateToProp = (state) => {
    return {
        sellProps: state.sellReducer
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {
        setLoading: (loadingState) => {
            dispatch(SellAction.setLoading(loadingState))
        },
        setPaymentType: (paymentType) => {
            dispatch(SellAction.setPaymentType(paymentType))
        },
        setNotes: (notes) => {
            dispatch(SellAction.setNotes(notes))
        },
        setCanFinishOrder: (canFinishOrder) => {
            dispatch(SellAction.setCanFinishOrder(canFinishOrder))
        },
        setDeliveryDate: (deliveryDate) => {
            dispatch(SellAction.setDeliveryDate(deliveryDate))
        },
        setBookingAdvance: (bookingAdvance) => {
            dispatch(SellAction.setBookingAdvance(bookingAdvance))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(BookingOrderDetail);