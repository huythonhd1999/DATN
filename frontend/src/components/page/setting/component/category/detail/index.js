import React, { Component } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../common/setting nav/settingNav";
import './index.css';
import Api from "../../../../../../api/api";
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { withRouter } from "react-router-dom";
import Tags from "../../../../../common/selected search";
import LoadingScreen from "../../../../../common/loading";
import { withSnackbar } from 'notistack';
// import CircularProgress from '@mui/material/CircularProgress';

class ProductCategoryInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            Id: 1,
            name: "",
            note: "",
            status: 1,
            currentCategory: {},
            nameErrorMessage: "",
            selectedProducts: [],
            productWithoutCategory: [], 
            productOptions: []
        };
    }
    componentDidMount = async () => {
        let id = this.props.match.params.id
        this.setState({ loading: true })
        let res = await Api.getCategory(id)
        let res1 = await Api.getProductWithoutCategory()
        let category = res.data.category;
        this.setState({
            ...category,
            productWithoutCategory: res1.data.productList,
            currentCategory: category,
            selectedProducts: category.productList,
            loading: false,
            productOptions: [...res1.data.productList,...category.productList]
        })
    }
    onHandleEditClick = () => {
        this.setState({
            disable: !this.state.disable
        })
    }
    onHandleCancelClick = () => {
        this.setState({
            ...this.state.currentCategory,
            selectedProducts: this.state.currentCategory.productList,
            disable: true
        })
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

        if (this.state.name) {
            this.setState({
                disable: true,
                loading: true
            })
            e.preventDefault();
            let editCategory = {
                Id: this.state.Id,
                name: this.state.name,
                note: this.state.note,
                productList: this.state.selectedProducts.map((item) => item.Id)
            };

            let res = await Api.editCategory(editCategory)
            let category = res.data.category;
            let res1 = await Api.getProductWithoutCategory()
            this.setState({
                ...category,
                productWithoutCategory: res1.data.productList,
                currentCategory: category,
                selectedProducts: category.productList,
                productOptions: [...res1.data.productList,...category.productList],
                loading: false
            })
            this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
        }
    }
    onHandleCategoryNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onHandleCategoryNoteChange = (e) => {
        this.setState({
            note: e.target.value
        })
    }

    onHandleProductListChange = (value) => {
        this.setState({
            selectedProducts: value
        })
    }

    render() {
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-settings-category-info">
                    <SettingNav />
                    <div className="c-settings-category-info-content">
                        <div className="c-setting-category-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/settings/product-categories")}>Product Categories </div>
                                <div> {" / " + this.state.currentCategory.name}</div>
                            </div>
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleEditClick()}
                                disabled={!this.state.disable}
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="c-setting-category-info-content-info">
                            <div className="c-setting-category-info-content-info-column-1">
                                <div className="c-setting-category-info-info-guild">
                                    <div className="c-guild-header">
                                        Your Product Category Details
                                    </div>
                                    <div className="c-guild-content">
                                        Products will be grouped under these categories in the sales register.
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-category-info-content-info-column-2">
                                <div className="c-setting-category-info-info-detail">
                                    <div className="c-text-field-name">Product Category Name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}

                                        onChange={this.onHandleCategoryNameChange}
                                    />
                                    <div className="c-text-field-name">Note</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.note}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}
                                        multiline
                                        onChange={this.onHandleCategoryNoteChange}
                                    />

                                    <div className="c-text-field-name">Product List</div>
                                    <Tags
                                        disabled={this.state.disable}
                                        options={this.state.productOptions}
                                        value={this.state.selectedProducts}
                                        onSelectedListChange={this.onHandleProductListChange}
                                    />
                                    <div className="c-setting-category-info-control-form">
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(ProductCategoryInfo)));
