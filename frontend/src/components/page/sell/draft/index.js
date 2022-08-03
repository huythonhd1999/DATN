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

export default class Draft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            draftOrders: [],
            isShowDraftModel: false,
        };
    }

    componentDidMount = () => {
        let draftOrders = JSON.parse(localStorage.getItem("draftOrders"))
        this.setState({
            draftOrders: draftOrders
        })
    }

    render() {
        return (
            <div className='draft-order-table'>
                {this.state.isShowDraftModel && 
                    <SaveOrderToDraftModal
                        open = {this.state.isShowDraftModel}
                        onRemove = {() => true}
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
                            {this.state.draftOrders.map((order, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{color: "blue"}} >
                                        {format(new Date(order.createDate), "yyyy-MM-dd HH:mm:ss")}
                                    </TableCell>
                                    <TableCell>{order.notes}</TableCell>
                                    <TableCell>{order.detail.total}</TableCell>
                                    <TableCell>
                                        <div className='action-button' onClick={() => this.setState({isShowDraftModel: true})}>
                                            <ModeEditOutlineOutlinedIcon />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
