import React, { Component } from 'react'
import './index.scss';
// import SearchIcon from '@mui/icons-material/Search';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
// import Api from '../../../../../api/api';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import SellModal from '../../../../common/modal';
import { connect } from 'react-redux';
import * as SellAction from '../../../../../../redux/action/sell/index';

class ImmediateSaleOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: 1, //1 la cash, 2 la credit card 3 la other
            cashTendered: 0, //Số tiền khách hàng trả
            balanceToCustomer: 0, //Số tiền phải trả lại khách hàng
            cashTenderedErrorMessage: ""
        };
    }

    handlePaymentTypeChange = (e) => {
        this.props.setPaymentType(e.target.value)
    }

    onHandleNotesChange = (e) => {
        this.props.setNotes(e.target.value)
    }

    onHandleCashTenderedChange = (e) => {
        let regEx = new RegExp("^[0-9]+[0-9]*$|^$")
        if (regEx.test(e.target.value)) {
            this.props.setCashTendered(e.target.value)
            if (e.target.value < this.props.sellProps.total) {
                this.props.setCanFinishOrder(false)
                this.setState({
                    cashTenderedErrorMessage: "Cash Tendered is not enough"
                })
            } else {
                this.props.setCanFinishOrder(true)
                this.setState({
                    cashTenderedErrorMessage: ""
                })
            }
        }
    }

    render() {
        return (
            <div className='immediate-sale'>
                <div className='payment-type'>
                    <div className="c-text-field-name">Payment type</div>
                    <FormControl variant="outlined" size="small" fullWidth disabled={this.state.disable}>
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
                    {
                        this.state.paymentType === 1 && 
                        <div className='details'>
                            <div className="c-text-field-name">Cash Tendered</div>
                            <TextField
                                margin="normal"
                                required
                                sx= {{mt:1}}
                                value={this.props.sellProps.cashTendered}
                                fullWidth
                                size="small"
                                error={this.state.cashTenderedErrorMessage ? true : false}
                                helperText={this.state.cashTenderedErrorMessage}
                                onChange={this.onHandleCashTenderedChange}
                            />
                            <div className="c-text-field-name">Balance to Customer</div>
                            <TextField
                                margin="normal"
                                required
                                sx= {{mt:1}}
                                value={this.props.sellProps.cashTendered -  this.props.sellProps.total >= 0 ? (this.props.sellProps.cashTendered -  this.props.sellProps.total) : ""}
                                disabled
                                fullWidth
                                size="small"
                            />
                        </div>
                    }
                    <div className="c-text-field-name">Notes</div>
                    <TextField
                        margin="normal"
                        required
                        sx= {{mt:1, mb: 2}}
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
        setCashTendered: (cashTendered) => {
            dispatch(SellAction.setCashTendered(cashTendered))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ImmediateSaleOrderDetail);
