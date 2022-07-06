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


export default class BookingOrderDetail extends Component {
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
            <div className='booking'>
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
                    <div className="c-text-field-name">Delivery Date & Time</div>
                    <Stack direction="row" spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="MM/dd/yyyy"
                                value={this.state.endTime}
                                disabled={this.state.disable}
                                onChange={() => true}
                                minDate={new Date(this.state.startTime)}
                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                            />
                            <TimePicker
                                value={this.state.startHappyHour}
                                ampm={false}
                                onChange={() => true}
                                disabled={this.state.disable}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                    <div className="c-text-field-name">Booking Advance</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.name}
                        fullWidth
                        size="small"
                        error={this.state.nameErrorMessage ? true : false}
                        helperText={this.state.nameErrorMessage}
                        onChange={this.onHandleTaxNameChange}
                    />
                    <div className="c-text-field-name">Notes</div>
                    <TextField
                        margin="normal"
                        required
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
