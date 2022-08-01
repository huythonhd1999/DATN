import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import { withRouter } from "react-router-dom";
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import Tab from '@mui/material/Tab';
import Api from "../../../api/api";
import LoadingScreen from "../../common/loading";
import AlertDialog from "../../common/dialog";
import NavSideBar from "../../common/navigation bar/navSideBar";
import Tabs from '@mui/material/Tabs';
import * as OrderAction from '../../../redux/action/order/index';
import { connect } from 'react-redux';

class Receipts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsId: [],
            showDialog: false,
            allOrder: [],
            orderList: [],
            loading: true,
            searchString: ""
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true,
        })
        let res = await Api.getOrderList();
        this.setState({
            orderList: res.data.orderList,
            allOrder: res.data.orderList,
            loading: false,
        })
    }

    getRowData = () => {
        return this.state.orderList.map(item => {
            return {
                id: item.Id,
                createDate: (new Date (item.createDate)).toLocaleString(),
                mobilePhone: item.customerInfo?.mobilePhone,
                orderType: this.getOrderType(item.status),
                total: item.total,
                status: this.getStatus(item)
            }
        })
    }

    getOrderType(status)  {
        switch(status) {
            case 1:
                return "Immediate Sale"
            case 2: 
                return "Booking"
            case 3:
                return "Canceled"
            default:
                return ""
        }
    }

    getStatus(item) {
        if(item.immediateSaleInfo) {
            return "Finished"
        }
        if (item.bookingInfo.bookingAdvance < item.total) {
            return "Unfinished"
        } else {
            return "Finished"
        }
    }

    onSearchItems = async () => {
        console.log(this.state.searchString)
        this.setState({
            loading: true,
        })
        let res = await Api.searchOrder(this.state.searchString);
        this.setState({
            orderList: res.data.orderList,
            loading: false,
        })
    }

    onEnter = async (e) => {
        if (e.keyCode === 13) {
            console.log(this.state.searchString)
            this.setState({
                loading: true,
            })
            let res = await Api.searchOrder(this.state.searchString);
            this.setState({
                orderList: res.data.orderList,
                loading: false,
            })
        }
    }

    onHandleSearchStringChange = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    render() {
        const columns = [
            { field: 'id', headerName: 'Receipt Id', width: 150 },
            { field: 'createDate', headerName: 'Create Date', width: 250 },
            { field: 'mobilePhone', headerName: 'Customer Mobile Phone', width: 250 },
            { field: 'orderType', headerName: 'Order Type', width: 150 },
            { field: 'total', headerName: 'Total', width: 150 },
            { field: 'status', headerName: 'Status', width: 100 },
        ];
        return (
            <div className="c-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <AlertDialog
                    open={this.state.showDialog}
                    onCancelClick={this.onCancelDialog}
                    onDeleteClick={this.onConfirmDeleteItems}
                    selectedItems={this.state.selectedItemsId}
                />

                <div className="c-receipts">
                    <NavSideBar />
                    <div className="c-receipts-content">
                        <div className="c-receipts-content-header">
                            Receipts
                        </div>
                        <div className="c-receipts-content-info">
                            <div className="c-receipts-detail-header">
                                <div className="tag-list">
                                    <Tabs  value = {this.props.orderOptions.selectedOrderType} onChange={this.setSelectedOrderType}>
                                        <Tab label="All" value={0} />
                                        <Tab label="Immediate Sale" value={1} />
                                        <Tab label="Booking" value={2} />
                                        <Tab label="Canceled" value={3} />
                                    </Tabs>
                                </div>
                                <div className="search-bar">
                                    <div className="icon">
                                        <SearchIcon onClick={this.onSearchItems} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={this.state.searchString}
                                        onChange={this.onHandleSearchStringChange}
                                        onKeyDown={this.onEnter}
                                        disabled={this.state.disable}
                                        placeholder="Search by receipt id"
                                        size="small"

                                    />
                                </div>
                            </div>
                            <div className="c-receipts-detail-list" style={{ height: 400, width: '95%' }}>
                                <DataGrid
                                    rows={this.getRowData()}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick={true}
                                    onRowClick={(params) => this.onRowClick(params)}
                                    selectionModel={this.state.selectedItemsId}
                                    onSelectionModelChange={(selectedItems) => this.onHandleSelected(selectedItems)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    setSelectedOrderType = (_e, newValue) => {
        switch(newValue) {
            case 0:
                this.setState({
                    orderList: this.state.allOrder
                })
                break
            default:
                this.setState({
                    orderList: this.state.allOrder.filter((item) => item.status === newValue)
                })
        }
        this.props.setSelectedOrderType(newValue)
    }

    onRowClick = (params) => {
        this.props.history.push(`receipts/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }
}

const mapStateToProp = (state) => {
    return {
        ...state.authReducer,
        orderOptions: state.orderOptions
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {
        setSelectedOrderType: (selectedOrderType) => {
            dispatch(OrderAction.setSelectedOrderType(selectedOrderType))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(Receipts));
