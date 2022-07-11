import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import NavSideBar from "../../../common/navigation bar/navSideBar";
import Api from "../../../../api/api";
import { connect } from 'react-redux';
import LoadingScreen from "../../../common/loading";
import { withRouter } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';

// import CircularProgress from '@mui/material/CircularProgress';

class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            loading: true,
            Id: 1,
            name: "",
            price: "",
            taxId: null,
            currentProduct: {},
            nameErrorMessage: "",
            priceErrorMessage: "",
            selectedCategory: null,
            categories: [],
            taxes: [],
            selectedTax: null,
            addonGroups: [],
            variantGroups: [],
            selectedAddonGroups: [],
            selectedVariantGroups: [],
        };
    }
    componentDidMount = async () => {

        let res = await Api.getTaxList()
        let taxes = res.data.taxList

        res = await Api.getCategoryList()
        let categories = res.data.categoryList

        res = await Api.getAddonGroupList()
        let addonGroups = res.data.addonGroupList

        res = await Api.getVariantGroupList()
        let variantGroups = res.data.variantGroupList

        this.setState({
            taxes, categories, addonGroups, variantGroups,
            loading: false
        })
    }
    onHandleEditClick = () => {
        this.setState({
            disable: !this.state.disable
        })
    }
    onHandleCancelClick = () => {
        this.props.history.push("/products")
    }
    onHandleSaveClick = async (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState({
                nameErrorMessage: "Cannot leave this field empty."
            })
        } else {
            this.setState({
                nameErrorMessage: ""
            })
        }

        if (this.state.price === "") {
            this.setState({
                priceErrorMessage: "Cannot leave this field empty."
            })
        } else {
            this.setState({
                priceErrorMessage: ""
            })
        }

        if (this.state.price !== "" && this.state.name) {
            this.setState({
                disable: true,
                loading: true
            })
            e.preventDefault();
            let createProduct = {
                name: this.state.name,
                price: this.state.price,
                addonGroupList: this.state.selectedAddonGroups?.map((item) => item.Id) || [],
                variantGroupList: this.state.selectedVariantGroups?.map((item) => item.Id) || [],
                taxId: this.state.selectedTax?.Id || null,
                categoryId: this.state.selectedCategory?.Id || null,
            };

            let res = await Api.createProduct(createProduct)
            let product = res.data.product;
            this.setState({
                ...product,
                selectedTax: product.taxInfo,
                selectedCategory: product.categoryInfo,
                selectedVariantGroups: product.variantGroupList,
                selectedAddonGroups: product.addonGroupList,
                currentProduct: product,
                loading: false
            })
            this.props.history.push("/products")
        }
    }
    onHandleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onHandlePriceChange = (e) => {
        let regEx = new RegExp("^[0-9]+[0-9]*$|^$")
        if (regEx.test(e.target.value)) {
            this.setState({
                price: e.target.value
            })
        }
    }

    onHandleCategoryChange = (value) => {
        this.setState({
            selectedCategory: value
        })
    }

    onHandleVariantGroupsChange = (value) => {
        this.setState({
            selectedVariantGroups: value
        })
    }

    onHandleAddonGroupsChange = (value) => {
        this.setState({
            selectedAddonGroups: value
        })
    }

    onHandleTaxChange = (value) => {
        this.setState({
            selectedTax: value
        })
    }

    render() {
        return (
            <div className="c-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-product-info">
                    <NavSideBar />
                    <div className="c-product-info-content">
                        <div className="c-product-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/products")}>Products </div>
                                <div> {" / New Product"}</div>
                            </div>
                        </div>
                        <div className="c-product-info-content-info">
                            <div className="c-product-info-content-info-column-1">
                                <div className="c-product-info-info-guild">
                                    <div className="c-guild-header">
                                        Your Product Details
                                    </div>
                                    {/* đổi state chỗ này */}
                                    <div className="c-guild-content">
                                        Edit your product details here. Product name should be unique.
                                    </div>
                                </div>
                            </div>
                            <div className="c-product-info-content-info-column-2">
                                <div className="c-product-info-info-detail">
                                    <div className="c-text-field-name">Product Name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}
                                        onChange={this.onHandleNameChange}
                                    />
                                    <div className="c-text-field-name">Product Category</div>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        getOptionLabel={(option) => option.name}
                                        options={this.state.categories}
                                        disabled={this.state.disable}
                                        value={this.state.selectedCategory}
                                        onChange={(_event, value) => this.onHandleCategoryChange(value)}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="Select a value" />}
                                    />
                                    <div className="c-text-field-name">Price</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.price}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.priceErrorMessage ? true : false}
                                        helperText={this.state.priceErrorMessage}
                                        onChange={this.onHandlePriceChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="c-product-info-content-info">
                            <div className="c-product-info-content-info-column-1">
                                <div className="c-product-info-info-guild">
                                    <div className="c-guild-header">
                                        Product Options
                                    </div>
                                    <div className="c-guild-content">
                                        You can add one ore more variant groups and an add-on group to the product.
                                    </div>
                                </div>
                            </div>
                            <div className="c-product-info-content-info-column-2">
                                <div className="c-product-info-info-detail">
                                    <div className="c-text-field-name">Tax</div>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        getOptionLabel={(option) => option.name}
                                        options={this.state.taxes}
                                        disabled={this.state.disable}
                                        value={this.state.selectedTax}
                                        onChange={(_event, value) => this.onHandleTaxChange(value)}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="Select a value" />}
                                    />
                                    <div className="c-text-field-name">Variant Groups</div>
                                    <Autocomplete
                                        multiple
                                        disablePortal
                                        id="combo-box-demo"
                                        getOptionLabel={(option) => option.name}
                                        options={this.state.variantGroups}
                                        disabled={this.state.disable}
                                        value={this.state.selectedVariantGroups}
                                        onChange={(_event, value) => this.onHandleVariantGroupsChange(value)}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="Select a value" />}
                                    />
                                    <div className="c-text-field-name">Addon Groups</div>
                                    <Autocomplete
                                        multiple
                                        disablePortal
                                        id="combo-box-demo"
                                        getOptionLabel={(option) => option.name}
                                        options={this.state.addonGroups}
                                        disabled={this.state.disable}
                                        value={this.state.selectedAddonGroups}
                                        onChange={(_event, value) => this.onHandleAddonGroupsChange(value)}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" placeholder="Select a value" />}
                                    />
                                    <div className="c-product-info-control-form">
                                        <Button
                                            type="cancel"
                                            variant="outlined"
                                            disabled={this.state.disable}
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => this.onHandleCancelClick()}
                                        >
                                            Cancel
                                        </Button>
                                        {!this.state.loading ?
                                            (<Button
                                                type="submit"
                                                variant="contained"
                                                disabled={this.state.disable}
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={(e) => this.onHandleSaveClick(e)}
                                            >
                                                Save
                                            </Button>) :
                                            (<LoadingButton
                                                loading
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}>
                                                Save
                                            </LoadingButton>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProp = (state) => {
    return {
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(ProductAdd));
