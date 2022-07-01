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
import Tags from "../../../common/selected search";

// import CircularProgress from '@mui/material/CircularProgress';

class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            loading: false,
            Id: 1,
            name: "",
            percent: "",
            status: 1,
            currentTax: {},
            nameErrorMessage: "",
            percentErrorMessage: ""
        };
    }
    componentDidMount = async () => {
        let id = this.props.match.params.id
        this.setState({ loading: true })
        let res = await Api.getTax(id)
        let tax = res.data.tax;
        this.setState({
            ...tax,
            currentTax: tax,
            loading: false
        })
    }

    onHandleCancelClick = () => {
        this.setState({
            ...this.state.currentTax,
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

        if (this.state.percent === "") {
            this.setState({
                percentErrorMessage: "Cannot leave this field empty."
            })
        } else {
            this.setState({
                percentErrorMessage: ""
            })
        }

        if (this.state.percent !== "" && this.state.name) {
            this.setState({
                disable: true,
                loading: true
            })
            e.preventDefault();
            let editTax = {
                Id: this.state.Id,
                name: this.state.name,
                percent: this.state.percent
            };

            let res = await Api.editTax(editTax)
            let tax = res.data.tax;
            this.setState({
                ...tax,
                loading: false
            })
        }
    }
    onHandleTaxNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onHandleTaxPercentChange = (e) => {
        let regEx = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$|^$/
        if (regEx.test(e.target.value)) {
            this.setState({
                percent: e.target.value
            })
        }
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
                                <div> {" / New Products"}</div>
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

                                        onChange={this.onHandleTaxNameChange}
                                    />
                                    <div className="c-text-field-name">Product Category</div>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={[
                                            { label: 'The Shawshank Redemption', year: 1994 },
                                            { label: 'The Godfather', year: 1972 },
                                            { label: 'The Godfather: Part II', year: 1974 },
                                            { label: 'The Dark Knight', year: 2008 },
                                            { label: '12 Angry Men', year: 1957 },
                                            { label: "Schindler's List", year: 1993 },
                                            { label: 'Pulp Fiction', year: 1994 },]}
                                        disabled={this.state.disable}
                                        value={{ label: 'Pulp Fiction', year: 1994 }}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                    />
                                    <div className="c-text-field-name">Tax Group</div>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={[
                                            { label: 'The Shawshank Redemption', year: 1994 },
                                            { label: 'The Godfather', year: 1972 },
                                            { label: 'The Godfather: Part II', year: 1974 },
                                            { label: 'The Dark Knight', year: 2008 },
                                            { label: '12 Angry Men', year: 1957 },
                                            { label: "Schindler's List", year: 1993 },
                                            { label: 'Pulp Fiction', year: 1994 },]}
                                        disabled={this.state.disable}
                                        value={{ label: 'Pulp Fiction', year: 1994 }}
                                        renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                    />
                                    <div className="c-text-field-name">Customer Email</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}

                                        onChange={this.onHandleTaxNameChange}
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
                                    {/* đổi state chỗ này */}
                                    <div className="c-guild-content">
                                        You can add one ore more variant groups and an add-on group to the product.
                                    </div>
                                </div>
                            </div>
                            <div className="c-product-info-content-info-column-2">
                                <div className="c-product-info-info-detail">
                                    <div className="c-text-field-name">Variant Groups</div>
                                    <Tags
                                        disabled={this.state.disable}
                                    />
                                    <div className="c-text-field-name">Addon Groups</div>
                                    <Tags
                                        disabled={this.state.disable}
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
