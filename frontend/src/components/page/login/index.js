import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Api from "../../../api/api"
// import jwt from 'jwt-decode'
// import Loading from '../../common/loading/loading'
// import { store } from 'react-notifications-component';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import jwt from 'jwt-decode';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from "@mui/lab";
import {connect} from 'react-redux';
import * as authAction from "../../../redux/action/auth/index"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            loading: false,
            userNameError: false,
            passwordError: false,
            userNameMessage: "",
            passwordMessage: "",
        };
    }

    componentDidMount() {
        // if (this.context.user) {
        //     this.props.history.push('/')
        // }
    }

    submitHandler = async (e) => {
        this.setState({
            userNameError: false,
            passwordError: false,
            userNameMessage: "",
            passwordMessage: "",
        })
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let data = {
            username: formData.get('userName'),
            password: formData.get('password'),
        };
        //Check empty field
        if (!data.username) {
            this.setState({
                userNameError: true,
                userNameMessage: "Cannot leave this field empty.",
            })
        }
        if (!data.password) {
            this.setState({
                passwordError: true,
                passwordMessage: "Cannot leave this field empty."
            })
            return;
        }
        e.preventDefault();
        this.setState({ loading: true });
        try {
            this.setState({ loading: true });
            let res = await Api.login(data.username, data.password)
            //console.log(res.data.accessToken)
            localStorage.setItem("accessToken", res.data.accessToken)
            let user = jwt(res.data.accessToken)
            //save usser info to redux
            this.props.setUser(user);
            // let from = this.props.location.state && this.props.location.state.from
            this.setState({ loading: false });
            this.props.history.push('/dashboard')
        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
            if (err.response && err.response.status === 401) {
                this.setState({
                    passwordError: true,
                    passwordMessage: "User name or password is incorrect",
                    loading: false,
                })
                return
            }
            if (err.response && err.response.status === 400) {
                this.setState({
                    userNameError: true,
                    userNameMessage: "User name does not exists.",
                    loading: false,
                })
                return
            }
        }
    }

    render() {
        const theme = createTheme();
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={this.submitHandler} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    name="userName"
                                    error={this.state.userNameError}
                                    autoComplete="User Name"
                                    helperText={this.state.userNameMessage}
                                    size="small"
                                    
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    error={this.state.passwordError}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    helperText={this.state.passwordMessage}
                                    size="small"
                                    autoComplete="current-password"
                                />
                                {!this.state.loading ?
                                    (<Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>) :
                                    (<LoadingButton 
                                        loading 
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}>
                                        Submit
                                    </LoadingButton>)
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}
const mapStateToProp = (state) => {
    return {
        user: state.authReducer
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {
        setUser: (userInfo) => {
            dispatch(authAction.setUserInfo(userInfo))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(Login));
