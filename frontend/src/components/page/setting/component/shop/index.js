import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../common/setting nav/settingNav";
import './index.css';
import Api from "../../../../../api/api";
import * as storeAction from "../../../../../redux/action/setting/store/index";
import {connect} from 'react-redux';
import LoadingScreen from "../../../../common/loading";
import { withSnackbar } from 'notistack';
// import CircularProgress from '@mui/material/CircularProgress';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: true,
            Id: 1,
            restaurantName: "",
            mobilePhoneNumber: "",
            email: "",
            ownerName: "",
            facebookLink: "",
            websiteLink: "",
            address: "",
        };
    }
    componentDidMount = async() => {
        this.setState({ loading: true })
        let res = await Api.getStore();
        let store = res.data.store;
        this.setState({
            ...store,
            loading: false
        })
        this.props.setStoreInfo(store);
    }
    onHandleEditClick = () => {
        this.setState({
            disable: !this.state.disable
        })
    }
    onHandleCancelClick = () => {
        console.log(this.props.store.store)
        this.setState({
            ...this.props.store.store,
            disable: true
        })
    }
    onHandleSaveClick = async (e) => {
        e.preventDefault();
        console.log(this.state)
        this.setState({
            disable: true,
            loading: true
        })
        e.preventDefault();
        let newStore = {
            Id: this.state.Id,
            restaurantName: this.state.restaurantName,
            mobilePhoneNumber: this.state.mobilePhoneNumber,
            email: this.state.email,
            ownerName: this.state.ownerName,
            facebookLink: this.state.facebookLink,
            websiteLink: this.state.websiteLink,
            address: this.state.address,
        };
        let res = await Api.setStore(newStore)
        let store = res.data.store;
        this.setState({
            ...store,
            loading: false
        })
        this.props.setStoreInfo(store);
        this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
    }
    onHandleResNameChange = (e) => {
        this.setState({
            restaurantName: e.target.value
        })
    }
    onHandleAddressChange = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    onHandleWebLinkChange = (e) => {
        this.setState({
            websiteLink: e.target.value
        })
    }
    onHandleFBLinkChange = (e) => {
        this.setState({
            facebookLink: e.target.value
        })
    }
    onHandleOwnerNameChange = (e) => {
        this.setState({
            ownerName: e.target.value
        })
    }
    onHandleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    onHandlePhoneNumChange = (e) => {
        this.setState({
            mobilePhoneNumber: e.target.value
        })
    }
    render() {
        return (
            <div className="c-settings-page">
                <LoadingScreen 
                    open = {this.state.loading}
                />
                <div className="c-settings-store">
                    <SettingNav />
                    <div className="c-settings-store-content">
                        <div className="c-setting-store-content-header">
                            Shop setup
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleEditClick()}
                                disabled={!this.state.disable}
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="c-setting-store-content-info">
                            <div className="c-setting-store-content-info-column-1">
                                <div className="c-setting-store-info-guild">
                                    <div className="c-guild-header">
                                        Your shop setup
                                    </div>
                                    <div className="c-guild-content">
                                        Your shop detail and settings
                                    </div>
                                </div>
                                <div className="c-setting-store-info-gap" />
                                <div className="c-setting-store-info-guild">
                                    <div className="c-guild-header">
                                        Your account details
                                    </div>
                                    <div className="c-guild-content">
                                        Your details help us serve you better
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-store-content-info-column-2">
                                <div className="c-setting-store-info-detail">
                                    <div className="c-text-field-name">Restaurant Name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.restaurantName}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        
                                        onChange={this.onHandleResNameChange}
                                    />
                                    <div className="c-text-field-name">Address</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.address}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        onChange={this.onHandleAddressChange}
                                        
                                    />
                                    <div className="c-text-field-name">Website Link</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.websiteLink}
                                        fullWidth
                                        onChange={this.onHandleWebLinkChange}
                                        disabled={this.state.disable}
                                        size="small"
                                        
                                    />
                                    <div className="c-text-field-name">Facebook Link</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={this.state.facebookLink}
                                        disabled={this.state.disable}
                                        size="small"
                                        onChange={this.onHandleFBLinkChange}
                                        
                                    />
                                    <div className="c-text-field-gap" />
                                    <div className="c-text-field-name">Owner name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={this.state.ownerName}
                                        onChange={this.onHandleOwnerNameChange}
                                        disabled={this.state.disable}
                                        size="small"
                                        
                                    />
                                    <div className="c-text-field-name">Email</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={this.state.email}
                                        onChange={this.onHandleEmailChange}
                                        disabled={this.state.disable}
                                        size="small"
                                        
                                    />
                                    <div className="c-text-field-name">Mobile phone number</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={this.state.mobilePhoneNumber}
                                        onChange={this.onHandlePhoneNumChange}
                                        disabled={this.state.disable}
                                        size="small"
                                        
                                    />
                                    <div className="c-setting-store-control-form">
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
        store: state.storeReducer
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        setStoreInfo: (store) => {
            dispatch(storeAction.setStoreInfo(store))
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp) (withSnackbar(Shop));
