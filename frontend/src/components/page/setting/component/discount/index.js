import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom";
import SettingNav from "../../../../common/setting nav/settingNav";
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import Api from "../../../../../api/api";
import { format } from 'date-fns';
// import Api from "../../../../../api/api";
// import * as taxesAction from "../../../../../redux/action/index";
// import {connect} from 'react-redux';
import Tab from '@mui/material/Tab';
import BasicMenu from "../../../../common/menu/menu";
import AlertDialog from "../../../../common/dialog";
import LoadingScreen from "../../../../common/loading";
import { withSnackbar } from 'notistack';

class DiscountRules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsId: [],
            showDialog: false,
            couponList: [],
            loading: true,
            searchString: ""
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true,
        })
        let res = await Api.getCouponList();
        this.setState({
            couponList: res.data.couponList,
            loading: false,
        })
    }

    getRowData = () => {
        return this.state.couponList.map(item => {
            return {
                id: item.Id,
                type: item.type === 0 ? "Percentage": "Fixed Amount",
                code: item.code,
                discount: item.amount,
                startDate: format(new Date(item.startTime), "yyyy-MM-dd"), 
                endDate: item.endTime ? format(new Date(item.endTime), "yyyy-MM-dd") : undefined, 
                status: item.status === 1 ? "Enable" : "Disable"
            }
        })
    }

    onSearchItems = async () => {
        console.log(this.state.searchString)
        this.setState({
            loading: true,
        })
        let res = await Api.searchCoupon(this.state.searchString);
        this.setState({
            couponList: res.data.couponList,
            loading: false,
        })
    }

    onEnter = async (e) => {
        if (e.keyCode === 13) {
            console.log(this.state.searchString)
            this.setState({
                loading: true,
            })
            let res = await Api.searchCoupon(this.state.searchString);
            this.setState({
                couponList: res.data.couponList,
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
            { field: 'id', headerName: 'Coupon Id', width: 100 },
            { field: 'type', headerName: 'Coupon Type', width: 200 },
            { field: 'code', headerName: 'Coupon Code', width: 150 },
            { field: 'discount', headerName: 'Discount', width: 100 },
            { field: 'startDate', headerName: 'Start Date', width: 150 },
            { field: 'endDate', headerName: 'End Date', width: 150 },
            { field: 'status', headerName: 'Status', width: 100 }
        ];
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <AlertDialog
                    open={this.state.showDialog}
                    onCancelClick={this.onCancelDialog}
                    onDeleteClick={this.onConfirmDeleteItems}
                    selectedItems={this.state.selectedItemsId}
                />

                <div className="c-settings-coupons">
                    <SettingNav />
                    <div className="c-settings-coupons-content">
                        <div className="c-setting-coupons-content-header">
                            Discount Rules
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleAddClick()}
                            >
                                Add Discount Rule
                            </Button>
                        </div>
                        <div className="c-setting-coupons-content-info">
                            <div className="c-setting-coupons-detail-header">
                                <div className="tag-list">
                                    <Tab label="All discount rules" />
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
                                        placeholder="Search by discount code"
                                        size="small"
                                        
                                    />
                                </div>
                            </div>
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
                            </div>
                            <div className="c-setting-coupons-detail-list" style={{ height: 400, width: '95%' }}>
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
    onRowClick = (params) => {
        this.props.history.push(`discount-rules/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }
    onHandleAddClick = () => {
        this.props.history.push(`discount-rules/add`);
    }
    onDeleteSelectedItems = () => {
        this.setState({
            showDialog: true
        })
    }
    onCancelDialog = () => {
        this.setState({
            showDialog: false
        })
    }
    onConfirmDeleteItems = async () => {
        this.setState({
            showDialog: false,
            loading: true
        })
        await Api.deleteCouponList(this.state.selectedItemsId);
        let res = await Api.getCouponList();
        this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
        this.setState({
            couponList: res.data.couponList,
            loading: false
        })
    }
}
export default withRouter(withSnackbar(DiscountRules));
