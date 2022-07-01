import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import NavSideBar from "../../../common/navigation bar/navSideBar";
import Api from "../../../../api/api";
import { connect } from 'react-redux';
import LoadingScreen from "../../../common/loading";
import { withRouter } from "react-router-dom";

// import CircularProgress from '@mui/material/CircularProgress';

class CustomerAdd extends Component {
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
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-settings-customer-info">
                    <NavSideBar />
                    <div className="c-settings-customer-info-content">
                        <div className="c-setting-customer-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/customers")}>Customers </div>
                                <div> {" / New Customer"}</div>
                            </div>
                        </div>
                        <div className="c-setting-customer-info-content-info">
                            <div className="c-setting-customer-info-content-info-column-1">
                                <div className="c-setting-customer-info-info-guild">
                                    <div className="c-guild-header">
                                        Customer Details
                                    </div>
                                    {/* đổi state chỗ này */}
                                    <div className="c-guild-content">
                                        Please fill customer details to create new customer
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-customer-info-content-info-column-2">
                                <div className="c-setting-customer-info-info-detail">
                                    <div className="c-text-field-name">Customer Name</div>
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
                                    <div className="c-text-field-name">Customer Phone</div>
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
                                    <div className="c-text-field-name">Shipping Address</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        multiline
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}

                                        onChange={this.onHandleTaxNameChange}
                                    />
                                    <div className="c-setting-customer-info-control-form">
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(CustomerAdd));
