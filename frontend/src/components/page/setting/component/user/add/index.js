import React, { Component } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../common/setting nav/settingNav";
import Api from "../../../../../../api/api";
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import { withRouter } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
// import CircularProgress from '@mui/material/CircularProgress';

class UserAdd extends Component {
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
                <div className="c-settings-user-info">
                    <SettingNav />
                    <div className="c-settings-user-info-content">
                        <div className="c-setting-user-info-content-header">
                            <div>
                                <a href="/settings/users">User</a>
                                {" / New User"}
                            </div>
                        </div>
                        <div className="c-setting-user-info-content-info">
                            <div className="c-setting-user-info-content-info-column-1">
                                <div className="c-setting-user-info-info-guild">
                                    <div className="c-guild-header">
                                        User Details
                                    </div>
                                    <div className="c-guild-content">
                                        Cashiers have access only to billing. Cashier will use user name and password to lock and unlock their register.
                                    </div>
                                    <div className="c-guild-content">
                                        Manager have access to everything. Manager will use user name and password to lock and unlock their register.
                                    </div>
                                </div>
                            </div>
                            <div className="c-setting-user-info-content-info-column-2">
                                <div className="c-setting-user-info-info-detail">
                                    <div className="c-text-field-name">User Name</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.name}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.nameErrorMessage ? true : false}
                                        helperText={this.state.nameErrorMessage}
                                        autoFocus
                                        onChange={this.onHandleTaxNameChange}
                                        autoComplete="false"
                                        inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }}
                                    />
                                    <div className="c-text-field-name">User Password</div>
                                    <FormControl variant="outlined" size="small" fullWidth disabled={this.state.disable}>
                                        <OutlinedInput
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            inputProps={{
                                                autocomplete: 'new-password',
                                                form: {
                                                    autocomplete: 'off',
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <div className="c-text-field-name">User Type</div>
                                    <FormControl variant="outlined" size="small" fullWidth disabled={this.state.disable}>
                                        <Select
                                            value={this.state.type}
                                            // onChange={handleChange}
                                            fullWidth
                                        >
                                            <MenuItem value={-1} disabled>
                                                <em>Select type of user</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Manager</MenuItem>
                                            <MenuItem value={0}>Cashier</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div className="c-setting-user-info-control-form">
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(UserAdd));
