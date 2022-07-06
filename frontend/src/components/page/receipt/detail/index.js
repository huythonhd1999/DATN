import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import NavSideBar from "../../../common/navigation bar/navSideBar";
import './index.css';
import Api from "../../../../api/api";
import { connect } from 'react-redux';
import LoadingScreen from "../../../common/loading";
import { withRouter } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


class ReceiptDetail extends Component {
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
            type: 1,
            fulFill: false
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
            disable: true,
            fulFill: false
        })
    }
    onHandleFulFill = () => {
        this.setState({
            fulFill: !this.state.fulFill
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
        let regEx = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$|^$/
        if (regEx.test(e.target.value)) {
            this.setState({
                percent: e.target.value
            })
        }
    }
    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    render() {
        const rows = [
            this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            this.createData('Eclair', 262, 16.0, 24, 6.0),
            this.createData('Cupcake', 305, 3.7, 67, 4.3),
            this.createData('Gingerbread', 356, 16.0, 49, 3.9),
        ];
        return (
            <div className="c-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-receipt-info">
                    <NavSideBar />
                    <div className="c-receipt-info-content">
                        <div className="c-receipt-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/receipts")}>Receipts </div>
                                <div> {" / " + this.state.name}</div>
                            </div>
                            <Button
                                variant="contained"
                                onClick={() => this.onHandleEditClick()}
                                disabled={!this.state.disable}
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="c-receipt-info-content-info">
                            <div className="c-receipt-info-content-info-column-1">
                                <div className="c-receipt-info-info-guild">
                                    <div className="c-guild-header">
                                        Receipt Details
                                    </div>
                                    {/* đổi state chỗ này */}
                                    <div className="c-guild-content">
                                        Prepared by Huy
                                    </div>
                                    <div className="c-guild-content">
                                        on Jul 2, 2022 12:47 AM
                                    </div>
                                </div>
                            </div>
                            <div className="c-receipt-info-content-info-column-2">
                                <div className="c-receipt-info-info-detail">
                                    <div className="info">
                                        <div className="status">
                                            <div className="c-text-field-name">Status</div>
                                            <Chip label="success" color="success" />
                                            <Chip label="warning" color="warning" />
                                        </div>
                                        <div className="action-buttons">
                                            <button className="action-button">Print</button>
                                            <button className="action-button">Cancel</button>
                                        </div>
                                    </div>

                                    <div className="c-text-field-name">Order Details</div>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Items</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell>Tax %</TableCell>
                                                    <TableCell>Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell>{row.calories}</TableCell>
                                                        <TableCell>{row.fat}</TableCell>
                                                        <TableCell>{row.carbs}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow
                                                    key={"subTotal"}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>{"Sub Total"}</TableCell>
                                                    <TableCell>{250}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                    key={"total"}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>{"Total"}</TableCell>
                                                    <TableCell>{250}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <div className="element">
                                        <div className="c-text-field-name-1">Delivery Date & Time</div>
                                        <Stack direction="row" spacing={2}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    inputFormat="MM/dd/yyyy"
                                                    value={this.state.endTime}
                                                    disabled={this.state.disable}
                                                    onChange={() => true}
                                                    minDate={new Date(this.state.startTime)}
                                                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                                />
                                                <TimePicker
                                                    value={this.state.startHappyHour}
                                                    ampm={false}
                                                    onChange={() => true}
                                                    disabled={this.state.disable}
                                                    renderInput={(params) => <TextField size="small" {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Stack>
                                        <div className="c-text-field-name">Notes</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.state.code}
                                            fullWidth
                                            disabled={this.state.disable}
                                            size="small"
                                            error={this.state.codeErrorMessage ? true : false}
                                            helperText={this.state.codeErrorMessage}
                                            multiline
                                            onChange={this.onHandleCodeChange}
                                        />
                                        <FormControlLabel
                                            disabled={this.state.disable}
                                            label={<div className="c-text-field-name-1">Is Door Delivery?</div>}
                                            control={
                                                <Checkbox
                                                    icon={<CircleUnchecked />}
                                                    size="small"
                                                    checkedIcon={<CircleCheckedFilled />}
                                                    checked={this.state.setEndDate}
                                                    onChange={() => this.setState({
                                                        setEndDate: !this.state.setEndDate
                                                    })}
                                                />
                                            }
                                        />
                                    </div>
                                    <div className="element">
                                        <div className="c-text-field-name">Customer Name</div>
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
                                        <div className="c-text-field-name">Customer Phone</div>
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
                                        <div className="c-text-field-name">Customer Email</div>
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
                                        <div className="c-text-field-name">Shipping Address</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.state.name}
                                            fullWidth
                                            multiline
                                            disabled={this.state.disable}
                                            size="small"
                                            error={this.state.nameErrorMessage ? true : false}
                                            helperText={this.state.nameErrorMessage}
                                            onChange={this.onHandleTaxNameChange}
                                        />
                                    </div>
                                    <div className="element">
                                        <div className="c-text-field-name">Payment Details: {"Pending Payment 215.00"}</div>
                                        <div className="detail">
                                            <div className="c-amount">{"10.00 on Cash"} </div>
                                            <div className="c-date"> {"Jul 2, 2022, 12:47 AM"}</div>
                                        </div>
                                    </div>
                                    <div className="payment">
                                        {this.state.fulFill &&
                                            <>
                                                <div className="c-text-field-name-1">Payment Type</div>
                                                <FormControl variant="outlined" size="small" fullWidth disabled={this.state.disable}>
                                                    <Select
                                                        value={this.state.type}
                                                        // onChange={handleChange}
                                                        fullWidth
                                                    >
                                                        <MenuItem value={-1} disabled>
                                                            <em>Select type of payment</em>
                                                        </MenuItem>
                                                        <MenuItem value={2}>Other</MenuItem>
                                                        <MenuItem value={1}>Credit/Debit Card</MenuItem>
                                                        <MenuItem value={0}>Cash</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <div className="c-text-field-name">Notes</div>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    value={this.state.name}
                                                    fullWidth
                                                    multiline
                                                    disabled={this.state.disable}
                                                    size="small"
                                                    error={this.state.nameErrorMessage ? true : false}
                                                    helperText={this.state.nameErrorMessage}
                                                    onChange={this.onHandleTaxNameChange}
                                                />
                                            </>}

                                    </div>
                                    {!this.state.fulFill && <Button
                                        type="cancel"
                                        variant="outlined"
                                        disabled={this.state.disable}
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => this.onHandleFulFill()}
                                    >
                                        Fulfill
                                    </Button>}
                                    <div className="c-receipt-info-control-form">
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(ReceiptDetail));
