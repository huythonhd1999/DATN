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
import { withSnackbar } from 'notistack';

class PettyCashes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsId: [],
            showDialog: false,
            pettyCashList: [],
            loading: true,
            searchString: ""
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true,
        })
        let res = await Api.getPettyCashList();
        this.setState({
            pettyCashList: res.data.pettyCashList,
            loading: false,
        })
    }

    getRowData = () => {
        return this.state.pettyCashList.map(item => {
            return {
                id: item.Id,
                date: (new Date (item.createDate)).toLocaleString(),
                type: item.type === 1 ? "Cash In" : "Cash Out",
                amount: item.amount,
                note: item.notes,
                user: item.userInfo.userName
            }
        })
    }

    onSearchItems = async () => {
        console.log(this.state.searchString)
        this.setState({
            loading: true,
        })
        let res = await Api.searchPettyCash(this.state.searchString);
        this.setState({
            pettyCashList: res.data.pettyCashList,
            loading: false,
        })
    }

    onEnter = async (e) => {
        if (e.keyCode === 13) {
            console.log(this.state.searchString)
            this.setState({
                loading: true,
            })
            let res = await Api.searchPettyCash(this.state.searchString);
            this.setState({
                pettyCashList: res.data.pettyCashList,
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
            { field: 'id', headerName: 'Product Id', width: 100 },
            { field: 'date', headerName: 'Create Date', width: 250 },
            { field: 'type', headerName: 'Type', width: 150 },
            { field: 'amount', headerName: 'Amount', width: 150 },
            { field: 'user', headerName: 'Create By', width: 150 },
            { field: 'note', headerName: 'Note', width: 400 },
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

                <div className="c-expenses">
                    <NavSideBar />
                    <div className="c-expenses-content">
                        <div className="c-expenses-content-header">
                            Petty Cash
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleAddClick()}
                            >
                                Add Entry
                            </Button>
                        </div>
                        <div className="c-expenses-content-info">
                            <div className="c-expenses-detail-header">
                                <div className="tag-list">
                                    <Tab label="All Entries" />
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
                                        placeholder="Search by note"
                                        size="small"

                                    />
                                </div>
                            </div>
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
                            </div>
                            <div className="c-expenses-detail-list" style={{ height: 400, width: '95%' }}>
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
        this.props.history.push(`expenses/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }
    onHandleAddClick = () => {
        this.props.history.push(`expenses/add`);
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
        await Api.deletePettyCashList(this.state.selectedItemsId);
        this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
        let res = await Api.getPettyCashList();
        this.setState({
            pettyCashList: res.data.pettyCashList,
            loading: false,
        })
    }
}
export default withRouter(withSnackbar(PettyCashes));
