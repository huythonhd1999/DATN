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

class Products extends Component {
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

    onSearchItems = async() => {
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

    onEnter = async(e) => {
        if(e.keyCode === 13){
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
            { field: 'id', headerName: 'Product Id', width: 150 },
            { field: 'name', headerName: 'Name', width: 250 },
            { field: 'category', headerName: 'Category', width: 250 },
            { field: 'taxGroup', headerName: 'Tax Group', width: 250 },
            { field: 'price', headerName: 'Price', width: 150 },
        ];
        return (
            <div className="c-page">
                <LoadingScreen
                    open = {this.state.loading}
                />
                <AlertDialog
                    open={this.state.showDialog}
                    onCancelClick={this.onCancelDialog}
                    onDeleteClick={this.onConfirmDeleteItems}
                    selectedItems={this.state.selectedItemsId}
                />

                <div className="c-products">
                    <NavSideBar />
                    <div className="c-products-content">
                        <div className="c-products-content-header">
                            Products
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleAddClick()}
                            >
                                Add Product
                            </Button>
                        </div>
                        <div className="c-products-content-info">
                            <div className="c-products-detail-header">
                                <div className="tag-list">
                                    <Tab label="All Product" />
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
                                        placeholder="Search by product name"
                                        size="small"
                                        
                                    />
                                </div>
                            </div>
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
                            </div>
                            <div className="c-products-detail-list" style={{ height: 400, width: '95%' }}>
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
        this.props.history.push(`products/${params.id}`);
    }
    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }
    onHandleAddClick = () => {
        this.props.history.push(`products/add`);
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
export default withRouter (Products);
