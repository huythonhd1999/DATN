import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import NavSideBar from "../../../common/navigation bar/navSideBar";
import Api from "../../../../api/api";
import { connect } from 'react-redux';
import LoadingScreen from "../../../common/loading";
import { withRouter } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@mui/material";

class PettyCashAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            loading: false,
            Id: 1,
            amount: "",
            notes: "",
            status: 1,
            currentPettyCash: {},
            amountErrorMessage: "",
            type: 1
        };
    }

    onHandleCancelClick = () => {
        this.props.history.push("/expenses")
    }
    onHandleSaveClick = async (e) => {
        e.preventDefault();

        if (this.state.amount === "") {
            this.setState({
                amountErrorMessage: "Cannot leave this field empty."
            })
        } else {
            this.setState({
                amountErrorMessage: ""
            })
        }

        if (this.state.amount !== "") {
            this.setState({
                disable: true,
                loading: true
            })
            e.preventDefault();
            let newPettyCash = {
                type: this.state.type,
                notes: this.state.notes,
                amount: this.state.amount,
                userId: this.props.user.userId || 1,
            };

            let res = await Api.createPettyCash(newPettyCash)
            let pettyCash = res.data.pettyCash;
            this.setState({
                ...pettyCash,
                currentPettyCash: pettyCash,
                loading: false
            })
            this.props.history.push("/expenses")
        }
    }
    
    onHandleNotesChange = (e) => {
        this.setState({
            notes: e.target.value
        })
    }
    onHandleAmountChange = (e) => {
        let regEx = new RegExp("^[0-9]+[0-9]*$|^$")
        if (regEx.test(e.target.value)) {
            this.setState({
                amount: e.target.value
            })
        }
    }

    onHandleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    render() {
        return (
            <div className="c-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-expense-info">
                    <NavSideBar />
                    <div className="c-expense-info-content">
                        <div className="c-expense-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/expenses")}>Petty Cashes </div>
                                <div> {" / New Petty Cash Entry"}</div>
                            </div>
                        </div>
                        <div className="c-expense-info-content-info">
                            <div className="c-expense-info-content-info-column-1">
                                <div className="c-expense-info-info-guild">
                                    <div className="c-guild-header">
                                        Your Petty Cash Details
                                    </div>
                                    {/* đổi state chỗ này */}
                                    <div className="c-guild-content">
                                        Add your petty cash details here.
                                    </div>
                                </div>
                            </div>
                            <div className="c-expense-info-content-info-column-2">
                                <div className="c-expense-info-info-detail">
                                    <div className="c-text-field-name">Type</div>
                                    <FormControl variant="outlined" size="small" fullWidth disabled={this.state.disable}>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.onHandleTypeChange}
                                            fullWidth
                                        >
                                            <MenuItem value={-1} disabled>
                                                <em>Select type of user</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Cash In</MenuItem>
                                            <MenuItem value={2}>Cash Out</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div className="c-text-field-name">Amount</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.amount}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        error={this.state.amountErrorMessage ? true : false}
                                        helperText={this.state.amountErrorMessage}
                                        onChange={this.onHandleAmountChange}
                                    />
                                    <div className="c-text-field-name">Notes</div>
                                    <TextField
                                        margin="normal"
                                        required
                                        value={this.state.notes}
                                        fullWidth
                                        disabled={this.state.disable}
                                        size="small"
                                        multiline
                                        onChange={this.onHandleNotesChange}
                                    />
                                    <div className="c-expense-info-control-form">
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
        ...state.authReducer
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(PettyCashAdd));
