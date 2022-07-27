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
import { FormHelperText } from "@mui/material";
import LoadingScreen from "../../../../../common/loading";
import { withSnackbar } from 'notistack';
// import CircularProgress from '@mui/material/CircularProgress';

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            loading: false,
            Id: 1,
            userName: "",
            password: "",
            userType: 1,
            status: 1,
            userNameErrorMessage: "",
            passwordErrorMessage: "",
            showPassword: false,
        };
    }

    onHandleCancelClick = () => {
        this.props.history.push("/settings/users")
    }
    onHandleSaveClick = async (e) => {
        e.preventDefault();

        if (!this.state.userName) {
            this.setState({
                userNameErrorMessage: "Cannot leave this field empty."
            })
        } else {
            this.setState({
                userNameErrorMessage: ""
            })
        }

        if (this.state.password === "") {
            this.setState({
                passwordErrorMessage: "Cannot leave this field empty."
            })
        } else {
            this.setState({
                passwordErrorMessage: ""
            })
        }

        if (this.state.userName !== "" && this.state.password !== "") {
            this.setState({
                disable: true,
                loading: true
            })
            e.preventDefault();
            let newUser = {
                userName: this.state.userName,
                password: this.state.password,
                userType: this.state.userType
            };

            let res = await Api.createUser(newUser)
            let user = res.data.user;
            this.setState({
                ...user,
                loading: false,
                showPassword: false
            })
            this.props.history.push("/settings/users")
            this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }})
        }
    }
    onHandleUserNameChange = (e) => {
        this.setState({
            userName: e.target.value
        })
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

    handleUserTypeChange = (e) => {
        this.setState({
            userType: e.target.value
        })
    }

    render() {
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-settings-user-info">
                    <SettingNav />
                    <div className="c-settings-user-info-content">
                        <div className="c-setting-user-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/settings/users")}>Users </div>
                                <div> {" / New User"}</div>
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
                                        value={this.state.userName}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.userNameErrorMessage ? true : false}
                                        helperText={this.state.userNameErrorMessage}
                                        onChange={this.onHandleUserNameChange}
                                        inputProps={{
                                            autoComplete: 'new-password',
                                            form: {
                                                autoComplete: 'off',
                                            },
                                        }}
                                    />
                                    <div className="c-text-field-name">User Password</div>
                                    <FormControl
                                        variant="outlined"
                                        size="small" fullWidth
                                        disabled={this.state.disable}
                                        error={this.state.passwordErrorMessage ? true : false}
                                    >
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
                                                autoComplete: 'new-password',
                                                form: {
                                                    autoComplete: 'off',
                                                },
                                            }}
                                        />
                                        {!!this.state.passwordErrorMessage && (
                                            <FormHelperText error id="password-error">
                                                {this.state.passwordErrorMessage}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    <div className="c-text-field-name">User Type</div>
                                    <FormControl variant="outlined" size="small" fullWidth disabled={this.state.disable}>
                                        <Select
                                            value={this.state.userType}
                                            onChange={this.handleUserTypeChange}
                                            fullWidth
                                        >
                                            <MenuItem value={-1} disabled>
                                                <em>Select type of user</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Manager</MenuItem>
                                            <MenuItem value={2}>Cashier</MenuItem>
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(UserAdd)));
