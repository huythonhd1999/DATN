import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom";
import SettingNav from "../../../../common/setting nav/settingNav";
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import Api from "../../../../../api/api";
// import Api from "../../../../../api/api";
// import * as taxesAction from "../../../../../redux/action/index";
// import {connect} from 'react-redux';
import Tab from '@mui/material/Tab';
import BasicMenu from "../../../../common/menu/menu";
import AlertDialog from "../../../../common/dialog";
import LoadingScreen from "../../../../common/loading";
import { InputBase } from "@mui/material";

class Users extends Component {
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
            {
                field: 'id',
                headerName: 'User Id',
                width: 100
            },
            {
                field: 'name',
                headerName: 'User Name',
                width: 300,
            },
            {
                field: 'password',
                headerName: 'User Password',
                width: 200,
                renderCell: (params) => {
                    <InputBase
                        fullWidth
                        type="password"
                        value={params.value}
                    />
                }
            },
            {
                field: 'type',
                headerName: 'User Type',
                width: 250
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 150
            },
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

                <div className="c-settings-users">
                    <SettingNav />
                    <div className="c-settings-users-content">
                        <div className="c-setting-users-content-header">
                            Users
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleAddClick()}
                            >
                                Add User
                            </Button>
                        </div>
                        <div className="c-setting-users-content-info">
                            <div className="c-setting-users-detail-header">
                                <div className="tag-list">
                                    <Tab label="All users" />
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
                                        placeholder="Search by user name"
                                        size="small"
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
                            </div>
                            <div className="c-setting-users-detail-list" style={{ height: 400, width: '95%' }}>
                                <DataGrid
                                    rows={this.getRowData()}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick={true}
                                    onRowClick={(params) => this.onRowClick(params)}
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
        this.props.history.push(`users/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }
    onHandleAddClick = () => {
        this.props.history.push(`users/add`);
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
            showDialog: false
        })
        await Api.deleteTaxList(this.state.selectedItemsId);
        let res = await Api.getTaxList();
        this.setState({
            taxList: res.data.taxList
        })
    }
}
export default withRouter(Users);