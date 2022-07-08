import React, { Component } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../../common/setting nav/settingNav";
import Api from "../../../../../../../api/api";
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { withRouter } from "react-router-dom";
import Tags from "../../../../../../common/selected search";
// import CircularProgress from '@mui/material/CircularProgress';

class AddonGroupAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            Id: 1,
            name: "",
            percent: "",
            status: 1,
            currentTax: {},
            nameErrorMessage: "",
            percentErrorMessage: "",
            showPassword: false,
            password: "",
            type: 1,
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
        console.log(res)
    }
    onHandleEditClick = () => {
        this.setState({
            disable: !this.state.disable
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
        let regEx = new RegExp("^[0-9]+[0-9]*$|^$")
        if (regEx.test(e.target.value)) {
            this.setState({
                percent: e.target.value
            })
        }
    }
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className="c-settings-page">
                <div className="c-settings-addon-group-info">
                    <SettingNav />
                    <div className="c-settings-addon-group-info-content">
                        <div className="c-setting-addon-group-info-content-header">
                        <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/settings/product-options")}>Product Options </div>
                                <div> {" / New Addon Group" }</div>
                            </div>
                        </div>
                        <div className="c-setting-addon-group-info-content-info">
                            <div className="c-setting-addon-group-info-content-info-column-1">
                                <div className="c-setting-addon-group-info-info-guild">
                                    <div className="c-guild-header">
                                        Setup Addon Group
                                    </div>
                                    <div className="c-guild-content">
                                        Addon groups are used to bunch a set of addons and attach to a product. Multiple addons can be chosen from an addon group.
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-addon-group-info-content-info-column-2">
                                <div className="c-setting-addon-group-info-info-detail">
                                    <div className="c-text-field-name">Addon Group Name</div>
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

                                    <div className="c-text-field-name">Addon List</div>
                                    <Tags
                                        disabled={this.state.disable}
                                    />
                                    <div className="c-setting-addon-group-info-control-form">
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AddonGroupAdd));