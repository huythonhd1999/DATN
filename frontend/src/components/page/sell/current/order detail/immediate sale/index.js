import React, { Component } from 'react'
import './index.scss';
// import SearchIcon from '@mui/icons-material/Search';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
// import Api from '../../../../../api/api';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import SellModal from '../../../../common/modal';


export default class ImmediateSaleOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: 1, //1 la cash, 2 la credit card 3 la other
        };
    }

    handleChange = (e) => {
        this.setState({
            paymentType: e.target.value
        })
    }

    render() {


        return (
            <div className='immediate-sale'>
                <div className='payment-type'>
                    <div className="c-text-field-name">Payment type</div>
                    <FormControl variant="outlined" size="small" fullWidth disabled={this.state.disable}>
                        <Select
                            value={this.state.paymentType}
                            onChange={(e) => this.handleChange(e)}
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
                                value={this.state.name}
                                fullWidth
                                size="small"
                                error={this.state.nameErrorMessage ? true : false}
                                helperText={this.state.nameErrorMessage}
                                onChange={this.onHandleTaxNameChange}
                            />
                            <div className="c-text-field-name">Balance to Customer</div>
                            <TextField
                                margin="normal"
                                required
                                sx= {{mt:1}}
                                value={this.state.name}
                                fullWidth
                                size="small"
                                error={this.state.nameErrorMessage ? true : false}
                                helperText={this.state.nameErrorMessage}
                                onChange={this.onHandleTaxNameChange}
                            />
                        </div>
                    }
                    <div className="c-text-field-name">Notes</div>
                    <TextField
                        margin="normal"
                        required
                        sx= {{mt:1, mb: 2}}
                        value={this.state.name}
                        fullWidth
                        size="small"
                        error={this.state.nameErrorMessage ? true : false}
                        helperText={this.state.nameErrorMessage}
                        onChange={this.onHandleTaxNameChange}
                    />
                </div>
            </div >
        )
    }
}
