import React, { Component } from 'react'
import './index.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { format } from "date-fns";
import SaveOrderToDraftModal from '../../../common/draft modal';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import * as SellAction from '../../../../redux/action/sell/index';

class Draft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            draftOrders: [],
            isShowDraftModel: false,
            selectedDraftOrder: {}
        };
    }

    componentDidMount = () => {
        let draftOrders = JSON.parse(localStorage.getItem("draftOrders"))
        this.setState({
            draftOrders: draftOrders
        })
    }
    handleClickDraftOrder = (order) => {
        this.setState({
            isShowDraftModel: true,
            selectedDraftOrder: { ...order }
        })
    }
    handleRemove = () => {
        const newDraftOrders = this.state.draftOrders.filter((order) => (order.createDate !== this.state.selectedDraftOrder.createDate))
        localStorage.setItem("draftOrders", JSON.stringify(newDraftOrders))
        this.setState({
            draftOrders: newDraftOrders
        })
        this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }
    handleSave = (notes) => {
        const newDraftOrder = {
            ...this.state.selectedDraftOrder,
            notes: notes
        }
        const newDraftOrders = this.state.draftOrders.map((draftOrder) => {
            if(draftOrder.createDate !== this.state.selectedDraftOrder.createDate)  {
                return draftOrder
            } else {
                return newDraftOrder
            }
        })
        localStorage.setItem("draftOrders", JSON.stringify(newDraftOrders))
        this.setState({
            draftOrders: newDraftOrders
        })
        this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }
    handleClickToEdit = (order) => {
        // this.props.setDraftOrder(order.detail)
        // this.props.onClickDraftOrder()
    }

    render() {
        return (
            <div className='draft-order-table'>
                {this.state.isShowDraftModel &&
                    <SaveOrderToDraftModal
                        open={this.state.isShowDraftModel}
                        onRemove={this.handleRemove}
                        order={this.state.selectedDraftOrder}
                        onClose={() => this.setState({
                            isShowDraftModel: false
                        })}
                        onSave={this.handleSave}
                    />
                }
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Create at</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.draftOrders.length > 0 &&
                                this.state.draftOrders.map((order, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ color: "blue" }} onClick = {() => this.handleClickToEdit(order)}>
                                            {format(new Date(order.createDate), "yyyy-MM-dd HH:mm:ss")}
                                        </TableCell>
                                        <TableCell>{order.notes}</TableCell>
                                        <TableCell>{order.detail.total}</TableCell>
                                        <TableCell>
                                            <div className='action-button' onClick={() => this.handleClickDraftOrder(order)}>
                                                <ModeEditOutlineOutlinedIcon />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            {
                                this.state.draftOrders.length === 0 &&
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell className='no-item' colSpan={4} style={{ textAlign: "center" }}>
                                        No item to show in this view
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
const mapStateToProp = (state) => {
    return {
        sellProps: state.sellReducer
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        setDraftOrder: (order) => {
            dispatch(SellAction.setDraftOrder(order))
        },
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(withSnackbar(Draft))
