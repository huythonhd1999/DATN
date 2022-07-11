import React, { Component } from "react";
import TextField from '@mui/material/TextField';
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
import Tabs from '@mui/material/Tabs';

class Receipts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsId: [],
            showDialog: false,
            taxList: [],
            loading: true,
            searchString: ""
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true,
        })
        let res = await Api.getTaxList();
        this.setState({
            taxList: res.data.taxList,
            loading: false,
        })
    }

    getRowData = () => {
        return this.state.taxList.map(item => {
            return {
                id: item.Id,
                name: item.name,
                percent: item.percent,
            }
        })
    }

    onSearchItems = async () => {
        console.log(this.state.searchString)
        this.setState({
            loading: true,
        })
        let res = await Api.searchTax(this.state.searchString);
        this.setState({
            taxList: res.data.taxList,
            loading: false,
        })
    }

    onEnter = async (e) => {
        if (e.keyCode === 13) {
            console.log(this.state.searchString)
            this.setState({
                loading: true,
            })
            let res = await Api.searchTax(this.state.searchString);
            this.setState({
                taxList: res.data.taxList,
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
                                    <Tabs  value = {1}>
                                        <Tab label="All" value={1} />
                                        <Tab label="Immediate Sale" value={2} />
                                        <Tab label="Booking" value={3} />
                                        <Tab label="Canceled" value={4} />
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
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
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
    onRowClick = (params) => {
        this.props.history.push(`receipts/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
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
        await Api.deleteTaxList(this.state.selectedItemsId);
        let res = await Api.getTaxList();
        this.setState({
            taxList: res.data.taxList,
            loading: false
        })
    }
}
export default withRouter(Receipts);
