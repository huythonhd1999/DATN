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
import { connect } from 'react-redux';
import Tab from '@mui/material/Tab';
import BasicMenu from "../../../../common/menu/menu";
import AlertDialog from "../../../../common/dialog";
import LoadingScreen from "../../../../common/loading";
import Tabs from '@mui/material/Tabs';
import * as productOptionAction from "../../../../../redux/action/setting/product options/index"
import { withSnackbar } from 'notistack';
class ProductOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsId: [],
            showDialog: false,
            itemList: [],
            loading: true,
            searchString: "",
            selectedTab: 1 //1 la variant, 2 la variant group, 3 la addon, 4 la addon group
        };
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        let newItems = []
        let req = {}

        switch (this.props.productOptions.selectedTab) {
            case 1: //variant
                req = await Api.getVariantList()
                newItems = req.data.variantList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.variantGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break

            case 2: //variant group
                req = await Api.getVariantGroupList()
                newItems = req.data.variantGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.variantList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 3: //addon
                req = await Api.getAddonList()
                newItems = req.data.addonList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.addonGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 4: //addon group
                req = await Api.getAddonGroupList()
                newItems = req.data.addonGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.addonList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            default:
        }

        this.setState({
            selectedItemsId: [],
            loading: false,
            itemList: newItems
        })
    }

    onSearchItems = async () => {
        this.setState({
            loading: true,
        })
        let req = {}
        let newItems = []
        switch (this.props.productOptions.selectedTab) {
            case 1: //variant
                req = await Api.searchVariant(this.state.searchString)
                newItems = req.data.variantList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.variantGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break

            case 2: //variant group
                req = await Api.searchVariantGroup(this.state.searchString)
                newItems = req.data.variantGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.variantList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 3: //addon
                req = await Api.searchAddon(this.state.searchString)
                newItems = req.data.addonList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.addonGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 4: //addon group
                req = await Api.searchAddonGroup(this.state.searchString)
                newItems = req.data.addonGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.addonList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            default:
        }

        this.setState({
            selectedItemsId: [],
            loading: false,
            itemList: newItems
        })
    }

    onEnter = async (e) => {
        if (e.keyCode === 13) {

            this.setState({
                loading: true,
            })
            await this.onSearchItems()
            this.setState({
                loading: false,
            })
        }
    }

    onHandleSearchStringChange = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    setSelectedTab = async (_e, newValue) => {
        this.setState({ loading: true })
        let newItems = []
        let req = {}

        switch (newValue) {
            case 1: //variant
                req = await Api.getVariantList()
                newItems = req.data.variantList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.variantGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break

            case 2: //variant group
                req = await Api.getVariantGroupList()
                newItems = req.data.variantGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.variantList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 3: //addon
                req = await Api.getAddonList()
                newItems = req.data.addonList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.addonGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 4: //addon group
                req = await Api.getAddonGroupList()
                newItems = req.data.addonGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.addonList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            default:
        }

        this.setState({
            selectedItemsId: [],
            loading: false,
            itemList: newItems
        })
        this.props.setSelectedTab(newValue)
    }

    getColumns() {
        let columns = []
        switch (this.props.productOptions.selectedTab) {
            case 1: // variant
                columns = [
                    { field: 'id', headerName: 'Variant Id', width: 150 },
                    { field: 'name', headerName: 'Variant Name', width: 300, },
                    { field: 'price', headerName: 'Price', width: 200, },
                    { field: 'isLinked', headerName: 'Is Linked To A Variant Group?', width: 250, },
                    { field: 'status', headerName: 'Status', width: 100, },
                ];
                break
            case 2: // variant group
                columns = [
                    { field: 'id', headerName: 'Variant Id', width: 150 },
                    { field: 'name', headerName: 'Variant Group Name', width: 400, },
                    { field: 'num', headerName: 'Number of Variants', width: 300, },
                    { field: 'status', headerName: 'Status', width: 100, },
                ];
                break
            case 3: // addon
                columns = [
                    { field: 'id', headerName: 'Addon Id', width: 150 },
                    { field: 'name', headerName: 'Addon Name', width: 300, },
                    { field: 'price', headerName: 'Price', width: 200, },
                    { field: 'isLinked', headerName: 'Is Linked To A Addon Group?', width: 250, },
                    { field: 'status', headerName: 'Status', width: 100, },
                ];
                break
            case 4: // addon group
                columns = [
                    { field: 'id', headerName: 'Addon Id', width: 150 },
                    { field: 'name', headerName: 'Addon Group Name', width: 400, },
                    { field: 'num', headerName: 'Number of Addons', width: 300, },
                    { field: 'status', headerName: 'Status', width: 100, },
                ];
                break
            default:
                columns = [];
        }
        return columns
    }

    getSearchPlaceholder() {
        let message = "Search  by"
        switch (this.props.productOptions.selectedTab) {
            case 1: // variant
                message = message + " variant name"
                break
            case 2: // variant group
                message = message + " variant group name"
                break
            case 3: // addon
                message = message + " addon name"
                break
            case 4: // addon group
                message = message + " addon group name"
                break
            default:
                message = ""
        }
        return message
    }

    getButtonLabel() {
        let label = "Add "
        switch (this.props.productOptions.selectedTab) {
            case 1: // variant
                label = label + "Variant"
                break
            case 2: // variant group
                label = label + "Variant Group"
                break
            case 3: // addon
                label = label + "Addon"
                break
            case 4: // addon group
                label = label + "Addon Group"
                break
            default:
                label = ""
        }
        return label
    }

    render() {
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

                <div className="c-settings-options">
                    <SettingNav />
                    <div className="c-settings-options-content">
                        <div className="c-setting-options-content-header">
                            Product Options
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleAddClick()}
                            >
                                {this.getButtonLabel()}
                            </Button>
                        </div>
                        <div className="c-setting-options-content-info">
                            <div className="c-setting-options-detail-header">
                                <div className="tag-list">
                                    <Tabs value={this.props.productOptions.selectedTab} onChange={this.setSelectedTab} >
                                        <Tab label="Variants" value={1} />
                                        <Tab label="Variant Groups" value={2} />
                                        <Tab label="Addons" value={3} />
                                        <Tab label="Addon Groups" value={4} />
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
                                        placeholder={this.getSearchPlaceholder()}
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div className="action-button">
                                <BasicMenu onDeleteSelectedItems={this.onDeleteSelectedItems} />
                            </div>
                            <div className="c-setting-options-detail-list" style={{ height: 400, width: '95%' }}>
                                <DataGrid
                                    rows={this.state.itemList}
                                    columns={this.getColumns()}
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
        switch (this.props.productOptions.selectedTab) {
            case 1: // variant
                this.props.history.push(`variants/${params.id}`);
                break
            case 2: // variant group
                this.props.history.push(`variant-groups/${params.id}`);
                break
            case 3: // addon
                this.props.history.push(`addons/${params.id}`);
                break
            case 4: // addon group
                this.props.history.push(`addon-groups/${params.id}`);
                break
            default:
                break
        }
        return
    }

    onHandleSelected = (selectedItems) => {
        this.setState({
            selectedItemsId: [...selectedItems]
        })
    }

    onHandleAddClick = () => {
        switch (this.props.productOptions.selectedTab) {
            case 1: // variant
                this.props.history.push(`variants/add`);
                break
            case 2: // variant group
                this.props.history.push(`variant-groups/add`);
                break
            case 3: // addon
                this.props.history.push(`addons/add`);
                break
            case 4: // addon group
                this.props.history.push(`addon-groups/add`);
                break
            default:
                break
        }
        return
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
        let req = {}
        let newItems = []
        switch (this.props.productOptions.selectedTab) {
            case 1: //variant
                await Api.deleteVariantList(this.state.selectedItemsId);
                req = await Api.getVariantList()
                newItems = req.data.variantList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.variantGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break

            case 2: //variant group
                await Api.deleteVariantGroupList(this.state.selectedItemsId);
                req = await Api.getVariantGroupList()
                newItems = req.data.variantGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.variantList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 3: //addon
                await Api.deleteAddonList(this.state.selectedItemsId);
                req = await Api.getAddonList()
                newItems = req.data.addonList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    price: item.price,
                    isLinked: !!item.addonGroupId ? "Yes" : "No",
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            case 4: //addon group
                await Api.deleteAddonGroupList(this.state.selectedItemsId);
                req = await Api.getAddonGroupList()
                newItems = req.data.addonGroupList.map((item) => ({
                    id: item.Id,
                    name: item.name,
                    num: item.addonList.length,
                    status: item.status === 1 ? "Enable" : "Disable"
                }))
                break
            default:
        }
        this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
        this.setState({
            selectedItemsId: [],
            loading: false,
            itemList: newItems,
        })
    }
}

const mapStateToProp = (state) => {
    return {
        productOptions: state.productOptions
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {
        setSelectedTab: (selectedTab) => {
            dispatch(productOptionAction.setSelectedTab(selectedTab))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(ProductOptions)));
