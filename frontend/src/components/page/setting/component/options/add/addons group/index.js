import React, { Component } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../../common/setting nav/settingNav";
import Api from "../../../../../../../api/api";
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { withRouter } from "react-router-dom";
import Tags from "../../../../../../common/selected search";
import LoadingScreen from "../../../../../../common/loading";
// import CircularProgress from '@mui/material/CircularProgress';
import { withSnackbar } from 'notistack';

class AddonGroupAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            loading: false,
            Id: 1,
            name: "",
            productId: "",
            status: 1,
            addonWithoutGroupList: [],
            selectedAddons: [],
            currentAddonGroup: {},
            nameErrorMessage: "",
        };
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        let res1 = await Api.getAddonWithoutGroupList()
        this.setState({
            addonWithoutGroupList: res1.data.addonList,
            loading: false
        })
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

        if (this.state.name) {
            this.setState({
                disable: true,
                loading: true
            })
            e.preventDefault();
            let newAddonGroup = {
                name: this.state.name,
                addonList: this.state.selectedAddons.map((item) => item.Id)
            };

            let res = await Api.createAddonGroup(newAddonGroup)
            let addonGroup = res.data.addonGroup;
            let res1 = await Api.getAddonWithoutGroupList()
            this.setState({
                ...addonGroup,
                addonWithoutGroupList: res1.data.addonList,
                selectedAddons: addonGroup.addonList,
                currentAddonGroup: addonGroup,
                loading: false
            })
            this.props.history.push("/settings/product-options")
            this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
        }
    }
    onHandleAddonGroupNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onHandleStatusChange = () => {
        this.setState({
            status: 1 - this.state.status
        })
    }

    onHandleAddonListChange = (value) => {
        this.setState({
            selectedAddons: value
        })
    }

    render() {
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
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
                                        Addon groups are used to bunch a set of addons and attach it to a product. Only one addon can be chosen from a addon group.
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

                                        onChange={this.onHandleAddonGroupNameChange}
                                    />

                                    <div className="c-text-field-name">Addon List</div>
                                    <Tags
                                        disabled={this.state.disable}
                                        options={this.state.addonWithoutGroupList}
                                        value={this.state.selectedAddons}
                                        onSelectedListChange={this.onHandleAddonListChange}
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(AddonGroupAdd)));