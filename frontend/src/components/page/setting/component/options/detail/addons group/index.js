import React, { Component } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../../common/setting nav/settingNav";
import './index.css';
import Api from "../../../../../../../api/api";
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { withRouter } from "react-router-dom";
import Tags from "../../../../../../common/selected search";
import Switch from '@mui/material/Switch';
import LoadingScreen from "../../../../../../common/loading";
import { withSnackbar } from 'notistack';
// import CircularProgress from '@mui/material/CircularProgress';

class AddonGroupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            Id: 1,
            name: "",
            productId: "",
            status: 1,
            addonWithoutGroupList: [],
            selectedAddons: [],
            currentAddonGroup: {},
            nameErrorMessage: "",
            addonOptions: []
        };
    }
    componentDidMount = async () => {
        let id = this.props.match.params.id
        this.setState({ loading: true })
        let res = await Api.getAddonGroup(id)
        let res1 = await Api.getAddonWithoutGroupList()
        let addonGroup = res.data.addonGroup;
        this.setState({
            ...addonGroup,
            addonWithoutGroupList: res1.data.addonList,
            selectedAddons: addonGroup.addonList,
            currentAddonGroup: addonGroup,
            addonOptions: [...res1.data.addonList, ...addonGroup.addonList],
            loading: false
        })
    }
    onHandleEditClick = () => {
        this.setState({
            disable: !this.state.disable
        })
    }
    onHandleCancelClick = () => {
        this.setState({
            ...this.state.currentAddonGroup,
            selectedAddons: this.state.currentAddonGroup.addonList,
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
            let editAddonGroup = {
                Id: this.state.Id,
                name: this.state.name,
                addonList: this.state.selectedAddons.map((item) => item.Id)
            };

            let res = await Api.editAddonGroup(editAddonGroup)
            let addonGroup = res.data.addonGroup;
            let res1 = await Api.getAddonWithoutGroupList()
            this.setState({
                ...addonGroup,
                addonWithoutGroupList: res1.data.addonList,
                selectedAddons: addonGroup.addonList,
                currentAddonGroup: addonGroup,
                addonOptions: [...res1.data.addonList, ...addonGroup.addonList],
                loading: false
            })
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
        console.log("test")
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
                                <div> {" / " + this.state.currentAddonGroup.name}</div>
                            </div>
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleEditClick()}
                                disabled={!this.state.disable}
                            >
                                Edit
                            </Button>
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
                                    <div className="c-text-field-name">Status</div>
                                    <Switch
                                        disabled={this.state.disable}
                                        checked={this.state.status === 1}
                                        onChange={this.onHandleStatusChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
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
                                        options={this.state.addonOptions}
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(AddonGroupInfo)));