import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom";
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import Tab from '@mui/material/Tab';
import Api from "../../../api/api";
import BasicMenu from "../../common/menu/menu";
import LoadingScreen from "../../common/loading";
import AlertDialog from "../../common/dialog";
import NavSideBar from "../../common/navigation bar/navSideBar";
import { format } from "date-fns";

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsId: [],
            showDialog: false,
            customerList: [],
            loading: true,
            searchString: ""
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true,
        })
        let res = await Api.getCustomerList();
        this.setState({
            customerList: res.data.customerList,
            loading: false,
        })
    }

    getRowData = () => {
        return this.state.customerList.map(item => {
            return {
                id: item.Id,
                name: item.name,
                mobile: item.mobilePhone,
                orderCount: item.orderCount,
                lastSeen: format(new Date(item.lastOrder.createDate), "yyyy-MM-dd HH:mm:ss"),
            }
        })
    }

    onSearchItems = async() => {
        console.log(this.state.searchString)
        this.setState({
            loading: true,
        })
        let res = await Api.searchCustomer(this.state.searchString);
        this.setState({
            customerList: res.data.customerList,
            loading: false,
        })
    }

    onEnter = async(e) => {
        if(e.keyCode === 13){
            console.log(this.state.searchString)
            this.setState({
                loading: true,
            })
            let res = await Api.searchCustomer(this.state.searchString);
            this.setState({
                customerList: res.data.customerList,
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
            { field: 'id', headerName: 'Customer Id', width: 150 },
            { field: 'mobile', headerName: 'Mobile', width: 200 },
            { field: 'name', headerName: 'Name', width: 300 },
            { field: 'orderCount', headerName: 'Order Count', width: 150 },
            { field: 'lastSeen', headerName: 'Last Seen', width: 250 },
        ];
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open = {this.state.loading}
                />
                <AlertDialog
                    open={this.state.showDialog}
                    onCancelClick={this.onCancelDialog}
                    onDeleteClick={this.onConfirmDeleteItems}
                    selectedItems={this.state.selectedItemsId}
                />

                <div className="c-settings-customers">
                    <NavSideBar />
                    <div className="c-settings-customers-content">
                        <div className="c-setting-customers-content-header">
                            Customers
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleAddClick()}
                            >
                                Add Customer
                            </Button>
                        </div>
                        <div className="c-setting-customers-content-info">
                            <div className="c-setting-customers-detail-header">
                                <div className="tag-list">
                                    <Tab label="All Customer" />
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
                                        onKeyDown= {this.onEnter}
                                        disabled={this.state.disable}
                                        placeholder="Search by customer number"
                                        size="small"
                                        
                                    />
                                </div>
                            </div>
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
                            </div>
                            <div className="c-setting-customers-detail-list" style={{ height: 400, width: '95%' }}>
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
        this.props.history.push(`customers/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }
    onHandleAddClick = () => {
        this.props.history.push(`customers/add`);
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
            loading: true,
        })
        await Api.deleteCustomerList(this.state.selectedItemsId);
        let res = await Api.getCustomerList();
        this.setState({
            customerList: res.data.customerList,
            loading: false,
        })
    }
}
export default withRouter (Customers);
