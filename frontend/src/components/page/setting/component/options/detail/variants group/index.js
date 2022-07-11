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
// import CircularProgress from '@mui/material/CircularProgress';

class VariantGroupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            Id: 1,
            name: "",
            productId: "",
            status: 1,
            variantWithoutGroupList: [],
            selectedVariants: [],
            currentVariantGroup: {},
            nameErrorMessage: "",
        };
    }
    componentDidMount = async () => {
        let id = this.props.match.params.id
        this.setState({ loading: true })
        let res = await Api.getVariantGroup(id)
        let res1 = await Api.getVariantWithoutGroupList()
        let variantGroup = res.data.variantGroup;
        this.setState({
            ...variantGroup,
            variantWithoutGroupList: res1.data.variantList,
            selectedVariants: variantGroup.variantList,
            currentVariantGroup: variantGroup,
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
            ...this.state.currentVariantGroup,
            selectedVariants: this.state.currentVariantGroup.variantList,
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
            let editVariantGroup = {
                Id: this.state.Id,
                name: this.state.name,
                variantList: this.state.selectedVariants.map((item) => item.Id)
            };

            let res = await Api.editVariantGroup(editVariantGroup)
            let variantGroup = res.data.variantGroup;
            let res1 = await Api.getVariantWithoutGroupList()
            this.setState({
                ...variantGroup,
                variantWithoutGroupList: res1.data.variantList,
                selectedVariants: variantGroup.variantList,
                currentVariantGroup: variantGroup,
                loading: false
            })
        }
    }
    onHandleVariantGroupNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onHandleStatusChange = () => {
        this.setState({
            status: 1 - this.state.status
        })
    }

    onHandleVariantListChange = (value) => {
        this.setState({
            selectedVariants: value
        })
    }

    render() {
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-settings-variant-group-info">
                    <SettingNav />
                    <div className="c-settings-variant-group-info-content">
                        <div className="c-setting-variant-group-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/settings/product-options")}>Product Options </div>
                                <div> {" / " + this.state.currentVariantGroup.name}</div>
                            </div>
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleEditClick()}
                                disabled={!this.state.disable}
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="c-setting-variant-group-info-content-info">
                            <div className="c-setting-variant-group-info-content-info-column-1">
                                <div className="c-setting-variant-group-info-info-guild">
                                    <div className="c-guild-header">
                                        Setup Variant Group
                                    </div>
                                    <div className="c-guild-content">
                                        Variant groups are used to bunch a set of variants and attach it to a product. Only one variant can be chosen from a variant group.
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-variant-group-info-content-info-column-2">
                                <div className="c-setting-variant-group-info-info-detail">
                                    <div className="c-text-field-name">Status</div>
                                    <Switch
                                        disabled={this.state.disable}
                                        checked={this.state.status === 1}
                                        onChange={this.onHandleStatusChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <div className="c-text-field-name">Variant Group Name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}

                                        onChange={this.onHandleVariantGroupNameChange}
                                    />

                                    <div className="c-text-field-name">Variant List</div>
                                    <Tags
                                        disabled={this.state.disable}
                                        options={this.state.variantWithoutGroupList}
                                        value={this.state.selectedVariants}
                                        onSelectedListChange={this.onHandleVariantListChange}
                                    />
                                    <div className="c-setting-variant-group-info-control-form">
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(VariantGroupInfo));