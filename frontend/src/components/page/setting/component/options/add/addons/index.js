import React, { Component } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../../common/setting nav/settingNav";
import Api from "../../../../../../../api/api";
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { withRouter } from "react-router-dom";
import LoadingScreen from "../../../../../../common/loading";
// import CircularProgress from '@mui/material/CircularProgress';

class AddonAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            loading: false,
            Id: 1,
            name: "",
            price: "",
            status: 1,
            currentAddon: {},
            nameErrorMessage: "",
            priceErrorMessage: "",
            addonGroupId: ""
        };
    }

    onHandleCancelClick = () => {
        this.props.history.push("/settings/product-options")
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
            let newAddon = {
                name: this.state.name,
                price: this.state.price,
                addonGroupId: null,
            };

            let res = await Api.createAddon(newAddon)
            let addon = res.data.addon;
            this.setState({
                ...addon,
                currentAddon: addon,
                loading: false
            })
            this.props.history.push("/settings/product-options")
        }
    }
    onHandleAddonNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onHandlePriceNameChange = (e) => {
        let regEx = new RegExp("^[0-9]+[0-9]*$|^$")
        if (regEx.test(e.target.value)) {
            this.setState({
                price: e.target.value
            })
        }
    }

    onHandleStatusChange = () => {
        this.setState({
            status: 1 - this.state.status
        })
    }

    render() {
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-settings-addon-info">
                    <SettingNav />
                    <div className="c-settings-addon-info-content">
                        <div className="c-setting-addon-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/settings/product-options")}>Product Options </div>
                                <div> {" / New Addon" }</div>
                            </div>
                        </div>
                        <div className="c-setting-addon-info-content-info">
                            <div className="c-setting-addon-info-content-info-column-1">
                                <div className="c-setting-addon-info-info-guild">
                                    <div className="c-guild-header">
                                        Setup Addon
                                    </div>
                                    <div className="c-guild-content">
                                        Create product addons for sizes, flavours etc.
                                    </div>
                                    <div className="c-guild-content">
                                        For example, create addons Small, Medium & Large and group them under a addon group called Size.
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-addon-info-content-info-column-2">
                                <div className="c-setting-addon-info-info-detail">
                                    <div className="c-text-field-name">Addon Name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}
                                        onChange={this.onHandleAddonNameChange}
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
                                        onChange={this.onHandlePriceNameChange}
                                    />

                                    <div className="c-setting-addon-info-control-form">
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AddonAdd));