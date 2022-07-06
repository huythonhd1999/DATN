import React, { Component } from 'react'
import './index.scss';
// import SearchIcon from '@mui/icons-material/Search';
import { Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ImmediateSaleOrderDetail from './immediate sale';
import BookingOrderDetail from './booking';
// import Api from '../../../../../api/api';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import SellModal from '../../../../common/modal';


export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderType: 1 //1 la immediate sale, 2 la booking
        };
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
                                sx={{ mr: 1, width: 120}}
                                onClick={() => this.props.clickPrevStep()}
                            >
                                Back
                            </Button>
                            <Button
                                type="cancel"
                                fullWidth
                                variant="outlined"
                                sx={{ mr: 1, width: 150}}
                                onClick={() => this.props.clickPrevStep()}
                            >
                                Complete
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={() => this.props.clickPrevStep()}
                            >
                                Received {"100"}
                            </Button>
                        </Stack>
                    </div>
                </div>
                <div className='column-2'>
                    <div className="c-text-field-name">Customer Name</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.name}
                        fullWidth
                        disabled={this.state.disable}
                        size="small"
                        error={this.state.nameErrorMessage ? true : false}
                        helperText={this.state.nameErrorMessage}

                        onChange={this.onHandleTaxNameChange}
                    />
                    <div className="c-text-field-name">Customer Phone</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.name}
                        fullWidth
                        disabled={this.state.disable}
                        size="small"
                        error={this.state.nameErrorMessage ? true : false}
                        helperText={this.state.nameErrorMessage}

                        onChange={this.onHandleTaxNameChange}
                    />
                    <div className="c-text-field-name">Customer Email</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.name}
                        fullWidth
                        disabled={this.state.disable}
                        size="small"
                        error={this.state.nameErrorMessage ? true : false}
                        helperText={this.state.nameErrorMessage}

                        onChange={this.onHandleTaxNameChange}
                    />
                    <div className="c-text-field-name">Shipping Address</div>
                    <TextField
                        margin="normal"
                        required
                        value={this.state.name}
                        fullWidth
                        multiline
                        disabled={this.state.disable}
                        size="small"
                        error={this.state.nameErrorMessage ? true : false}
                        helperText={this.state.nameErrorMessage}

                        onChange={this.onHandleTaxNameChange}
                    />
                </div>
            </div>
        )
    }
}
