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
// import * as categoryesAction from "../../../../../redux/action/index";
// import {connect} from 'react-redux';
import Tab from '@mui/material/Tab';
import BasicMenu from "../../../../common/menu/menu";
import AlertDialog from "../../../../common/dialog";
import LoadingScreen from "../../../../common/loading";
class ProductCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsId: [],
            showDialog: false,
            categoryList: [],
            loading: true,
            searchString: ""
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true,
        })
        let res = await Api.getCategoryList();
        this.setState({
            categoryList: res.data.categoryList,
            loading: false,
        })
    }

    getRowData = () => {
        return this.state.categoryList.map(item => {
            return {
                id: item.Id,
                name: item.name,
                note: item.note,
                numProduct: item.productList.length
            }
        })
    }

    onSearchItems = async () => {
        console.log(this.state.searchString)
        this.setState({
            loading: true,
        })
        let res = await Api.searchCategory(this.state.searchString);
        this.setState({
            categoryList: res.data.categoryList,
            loading: false,
        })
    }

    onEnter = async (e) => {
        if (e.keyCode === 13) {
            console.log(this.state.searchString)
            this.setState({
                loading: true,
            })
            let res = await Api.searchCategory(this.state.searchString);
            this.setState({
                categoryList: res.data.categoryList,
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
                headerName: 'Category Id',
                width: 150
            },
            {
                field: 'name',
                headerName: 'Category Name',
                width: 300,
            },
            {
                field: 'numProduct',
                headerName: 'Number of Products',
                width: 200,
            },
            {
                field: 'note',
                headerName: 'Note',
                width: 500,
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

                <div className="c-settings-categories">
                    <SettingNav />
                    <div className="c-settings-categories-content">
                        <div className="c-setting-categories-content-header">
                            Categories
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleAddClick()}
                            >
                                Add Category
                            </Button>
                        </div>
                        <div className="c-setting-categories-content-info">
                            <div className="c-setting-categories-detail-header">
                                <div className="tag-list">
                                    <Tab label="All categories" />
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
                                        placeholder="Search by category name"
                                        size="small"
                                        
                                    />
                                </div>
                            </div>
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
                            </div>
                            <div className="c-setting-categories-detail-list" style={{ height: 400, width: '95%' }}>
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
        this.props.history.push(`product-categories/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }
    onHandleAddClick = () => {
        this.props.history.push(`product-categories/add`);
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
        await Api.deleteCategoryList(this.state.selectedItemsId);
        let res = await Api.getCategoryList();
        this.setState({
            categoryList: res.data.categoryList,
            loading: false
        })
    }
}
export default withRouter(ProductCategories);
