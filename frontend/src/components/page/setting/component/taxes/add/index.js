import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../common/setting nav/settingNav";
import './index.css';
import Api from "../../../../../../api/api";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
// import CustomizedSnackbars from "../../../../../common/notification/index"
// import CircularProgress from '@mui/material/CircularProgress';
import { withSnackbar } from 'notistack';

class TaxAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Id: 1,
            name: "",
            percent: "",
            status: 1,
            currentTax: {},
            nameErrorMessage: "",
            percentErrorMessage: "",
            showNotification: false,
        };
    }

    onHandleCancelClick = () => {
        this.setState({
            ...this.state.currentTax,
        })
        this.props.history.push('/settings/taxes')
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
                loading: true
            })
            e.preventDefault();
            let newTax = {
                name: this.state.name,
                percent: this.state.percent
            };

            let res = await Api.createTax(newTax)
            let tax = res.data.tax;
            this.setState({
                ...tax,
                loading: false,
                showNotification: true,
            })
            this.props.history.push('/settings/taxes')
            this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
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
                <div className="c-settings-tax-info">
                    <SettingNav />
                    <div className="c-settings-tax-info-content">
                        <div className="c-setting-tax-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/settings/taxes")}>Taxes </div>
                                <div> {" / New tax"}</div>
                            </div>
                        </div>
                        <div className="c-setting-tax-info-content-info">
                            <div className="c-setting-tax-info-content-info-column-1">
                                <div className="c-setting-tax-info-info-guild">
                                    <div className="c-guild-header">
                                        Setup Taxes
                                    </div>
                                    <div className="c-guild-content">
                                        Create separate taxes for different tax rates and types.
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-tax-info-content-info-column-2">
                                <div className="c-setting-tax-info-info-detail">
                                    <div className="c-text-field-name">Tax Name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}

                                        onChange={this.onHandleTaxNameChange}
                                    />
                                    <div className="c-text-field-name">Tax Percent</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.percent}
                                        fullWidth
                                        error={this.state.percentErrorMessage ? true : false}
                                        helperText={this.state.percentErrorMessage}
                                        size="small"
                                        onChange={this.onHandleTaxPercentChange}

                                    />
                                    <div className="c-setting-tax-info-control-form">
                                        <Button
                                            type="cancel"
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => this.onHandleCancelClick()}
                                        >
                                            Cancel
                                        </Button>
                                        {!this.state.loading ?
                                            (<Button
                                                type="submit"
                                                variant="contained"
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(TaxAdd)));
