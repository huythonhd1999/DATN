import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingNav from "../../../../../common/setting nav/settingNav";
import Api from "../../../../../../api/api";
import { withRouter } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import LoadingScreen from "../../../../../common/loading";
import { format } from "date-fns";
// import CircularProgress from '@mui/material/CircularProgress';

class CouponAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            loading: false,
            Id: 1,
            code: "",
            type: 1,
            amount: "",
            status: 1,
            minimumOrderValue: 0,
            startTime: new Date(),
            endTime: new Date(),
            startHappyHour: new Date(),
            endHappyHour: new Date(),

            currentCoupon: {},

            codeErrorMessage: "",
            minimumOrderValueErrorMessage: "",
            amountErrorMessage: "",
            startErrorMessage: "",

            setEndDate: false,
            setHappyHour: false,
            setDayOfWeek: false,

            keyDayOfWeek: ["Sunday", "Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday"],
            selectedDayOfWeek: [false, false, false, false, false, false, false]
        };
    }

    formatCoupon = (coupon) => {
        const startDate = new Date(coupon.startTime)
        return {
            ...coupon,
            selectedDayOfWeek: coupon.dayOfWeek ?
                this.state.selectedDayOfWeek.map((_item, index) => {
                    if (coupon.dayOfWeek.indexOf(index) !== -1) {
                        return true
                    }
                    return false
                }) : this.state.selectedDayOfWeek,
            endTime: coupon.endTime ? new Date(coupon.endTime) : startDate,
            startHappyHour: coupon.startHappyHour ? new Date("2021-07-01 " + coupon.startHappyHour) : startDate,
            endHappyHour: coupon.endHappyHour ? new Date("2021-07-01 " + coupon.endHappyHour) : startDate,
            setEndDate: coupon.endTime ? true : false,
            setHappyHour: coupon.startHappyHour && coupon.endHappyHour ? true : false,
            setDayOfWeek: coupon.dayOfWeek ? true : false,
        }
    }

    onHandleCancelClick = () => {
        this.setState({
            ...this.state.currentCoupon,
            disable: true
        })
    }

    getSelectedDayOfWeekModel = () => {
        let dayOfWeekString = ""
        this.state.selectedDayOfWeek.forEach((item, index) => {
            if (item) {
                dayOfWeekString = dayOfWeekString + index + ","
            }
        });
        return dayOfWeekString
    }

    onHandleSaveClick = async (e) => {
        e.preventDefault();

        //map cac state vao model de gui len api tuong ung
        const startDate = new Date(this.state.startTime)
        const endDate = new Date(this.state.endTime)
        const coupon = {
            code: this.state.code,
            type: this.state.type,
            amount: this.state.amount,
            minimumOrderValue: this.state.minimumOrderValue,
            startTime: format(startDate, "yyyy-MM-dd HH:mm:ss"),
            endTime: this.state.setEndDate ? format(endDate, "yyyy-MM-dd HH:mm:ss") : null,
            dayOfWeek: this.state.setDayOfWeek ? this.getSelectedDayOfWeekModel() : "",
            startHappyHour: this.state.setHappyHour ? format(this.state.startHappyHour, "HH:mm:ss") : null,
            endHappyHour: this.state.setHappyHour ? format(this.state.endHappyHour, "HH:mm:ss") : null,
        }

        console.log(coupon)
        //call API
        if (coupon.code && coupon.type !== undefined && coupon.amount && coupon.startTime) {
            this.setState({
                disable: true,
                loading: true
            })
            e.preventDefault();

            let res = await Api.createCoupon(coupon)
            let editedCoupon = res.data.coupon;
            let formatCoupon = this.formatCoupon(editedCoupon)

            this.setState({
                ...formatCoupon,
                currentCoupon: formatCoupon,
                loading: false
            })
            this.props.history.push("/settings/discount-rules")
        } else {
            if (!coupon.code) {
                this.setState({
                    codeErrorMessage: "Cannot leave this field empty.",
                })
            } else {
                this.setState({
                    codeErrorMessage: "",
                })
            }
        }
    }
    onHandleCodeChange = (e) => {
        this.setState({
            code: e.target.value
        })
        if (!e.target.value) {
            this.setState({
                codeErrorMessage: "Cannot leave this field empty.",
            })
        } else {
            this.setState({
                codeErrorMessage: "",
            })
        }
    }

    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value,
            amount: 0
        })
    }

    handleStartDateChange = (newValue) => {
        if (!newValue) {
            this.setState({
                startTime: format(newValue, "yyyy-MM-dd HH:mm:ss"),
                startErrorMessage: "Cannot leave this field empty."
            })
            return
        }

        newValue.setHours(0, 0, 0)
        this.setState({
            startTime: format(newValue, "yyyy-MM-dd HH:mm:ss"),
            startErrorMessage: ""
        })
        const endDate = new Date(this.state.endTime)
        if (newValue.getTime() > endDate.getTime()) {
            this.setState({
                endTime: format(newValue, "yyyy-MM-dd HH:mm:ss"),
            })
        }
    }

    handleEndDateChange = (newValue) => {
        if (!newValue) {
            this.setState({
                endTime: format(newValue, "yyyy-MM-dd HH:mm:ss"),
            })
            return
        }

        newValue.setHours(23, 59, 59)
        this.setState({
            endTime: format(newValue, "yyyy-MM-dd HH:mm:ss"),
        })
    }

    handleStartHappyHourChange = (newValue) => {
        this.setState({
            startHappyHour: newValue,
        })
    }

    handleEndHappyHourChange = (newValue) => {
        this.setState({
            endHappyHour: newValue,
        })
    }

    onCheckDayOfWeekChange = (_e, selectedIndex) => {
        this.setState({
            selectedDayOfWeek: this.state.selectedDayOfWeek.map((item, index) => {
                if (index === selectedIndex) {
                    return !item
                }
                return item
            })
        })
    }

    onHandleAmountChange = (e) => {
        let regExCheckNumber = /^[0-9]+[0-9]*$|^$/
        let regExCheckPercent = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$|^$/

        if (regExCheckNumber.test(e.target.value) || e.target.value === undefined) {
            if (this.state.type === 0) { // la dang percentage
                if (regExCheckPercent.test(e.target.value) || e.target.value === undefined) {
                    this.setState({
                        amount: e.target.value,
                    })
                }
            }
            else {
                this.setState({
                    amount: e.target.value
                })
            }
        }
        if (!e.target.value) {
            this.setState({
                amountErrorMessage: "Cannot leave this field empty.",
            })
        } else {
            this.setState({
                amountErrorMessage: "",
            })
        }
    }

    onHandleMinimumOrderValueChange = (e) => {
        let regEx = /^[1-9]+[0-9]*$|^$/
        if (regEx.test(e.target.value)) {
            this.setState({
                minimumOrderValue: e.target.value
            })
        }
    }
    onHandleStatusChange = (e) => {
        this.setState({
            status: 1 - this.state.status
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="c-settings-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <div className="c-settings-coupon-info">
                    <SettingNav />
                    <div className="c-settings-coupon-info-content">
                        <div className="c-setting-coupon-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/settings/discount-rules")}>Discount Rules </div>
                                <div> {" / New Discount Rule"}</div>
                            </div>
                        </div>
                        <div className="c-setting-coupon-info-content-info">
                            <div className="row">
                                <div className="left-col">
                                    <div className="c-setting-coupon-info-info-guild">
                                        <div className="c-guild-header">
                                            Discount Rule Details
                                        </div>
                                        <div className="c-guild-content">
                                            Choose the type of discount rule you want to create. Discount rules are identified by a unique coupon code.
                                        </div>
                                    </div>
                                </div>

                                <div className="right-col">
                                    <div className="element">
                                        <div className="c-setting-coupon-info-info-detail">
                                            <div className="c-text-field-name">Coupon Code</div>
                                            <TextField
                                                margin="normal"
                                                required
                                                value={this.state.code}
                                                fullWidth
                                                disabled={this.state.disable}
                                                size="small"
                                                error={this.state.codeErrorMessage ? true : false}
                                                helperText={this.state.codeErrorMessage}
                                                
                                                onChange={this.onHandleCodeChange}
                                            />

                                            <div className="element">
                                                <div className="c-text-field-name">Coupon Type</div>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    value={this.state.type}
                                                    fullWidth
                                                    size="small"
                                                    disabled={this.state.disable}
                                                    onChange={this.handleTypeChange}
                                                >
                                                    <MenuItem disabled value={-1}>
                                                        <em>Select type of coupon</em>
                                                    </MenuItem>
                                                    <MenuItem value={0}>Percentage</MenuItem>
                                                    <MenuItem value={1}>Fixed Amount</MenuItem>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="left-col">
                                    <div className="c-setting-coupon-info-info-guild">
                                        <div className="c-guild-header">
                                            Discount Visibility
                                        </div>
                                        <div className="c-guild-content">
                                            Set the time period when the discount rule is active. Two column layout for start and end date.
                                        </div>
                                    </div>
                                </div>
                                <div className="right-col">
                                    <div className="c-setting-coupon-info-info-detail">
                                        <div className="element">
                                            <div className="c-text-field-name-1">Start Date</div>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    inputFormat="MM/dd/yyyy"
                                                    value={this.state.startTime}
                                                    onChange={this.handleStartDateChange}
                                                    disabled={this.state.disable}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            error={this.state.startErrorMessage ? true : false}
                                                            helperText={this.state.startErrorMessage}
                                                            {...params} />
                                                    }
                                                />
                                            </LocalizationProvider>
                                        </div>

                                        <div className="element">
                                            <FormControlLabel
                                                disabled={this.state.disable}
                                                label={<div className="c-text-field-name-1">End Date (Optional)</div>}
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

                                            {this.state.setEndDate &&
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DesktopDatePicker
                                                        inputFormat="MM/dd/yyyy"
                                                        value={this.state.endTime}
                                                        disabled={this.state.disable}
                                                        onChange={this.handleEndDateChange}
                                                        minDate={new Date(this.state.startTime)}
                                                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                                    />
                                                </LocalizationProvider>}
                                        </div>

                                        <div className="element">
                                            <FormControlLabel
                                                disabled={this.state.disable}
                                                label={<div className="c-text-field-name-1">Happy Hours Time (Optional)</div>}
                                                control={
                                                    <Checkbox
                                                        icon={<CircleUnchecked />}
                                                        size="small"
                                                        checkedIcon={<CircleCheckedFilled />}
                                                        checked={this.state.setHappyHour}
                                                        onChange={() => this.setState({
                                                            setHappyHour: !this.state.setHappyHour
                                                        })}
                                                    />
                                                }
                                            />

                                            {this.state.setHappyHour &&
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Stack direction="row" >
                                                        <div className="hour">
                                                            <div className="c-text-field-name">Start time</div>
                                                            <TimePicker
                                                                value={this.state.startHappyHour}
                                                                ampm={false}
                                                                onChange={this.handleStartHappyHourChange}
                                                                disabled={this.state.disable}
                                                                renderInput={(params) => <TextField size="small" {...params} />}
                                                            />
                                                        </div>
                                                        <div className="hour">
                                                            <div className="c-text-field-name">End time</div>
                                                            <TimePicker
                                                                value={this.state.endHappyHour}
                                                                ampm={false}
                                                                onChange={this.handleEndHappyHourChange}
                                                                minTime={this.state.startHappyHour}
                                                                disabled={this.state.disable}
                                                                renderInput={(params) => <TextField size="small" {...params} />}
                                                            />
                                                        </div>
                                                    </Stack>
                                                </LocalizationProvider>}
                                        </div>

                                        <div className="happy-day">
                                            <FormControlLabel
                                                disabled={this.state.disable}
                                                label={<div className="c-text-field-name-1">Set Days Of Week </div>}
                                                control={
                                                    <Checkbox
                                                        icon={<CircleUnchecked />}
                                                        size="small"
                                                        checkedIcon={<CircleCheckedFilled />}
                                                        checked={this.state.setDayOfWeek}
                                                        onChange={() => this.setState({
                                                            setDayOfWeek: !this.state.setDayOfWeek
                                                        })}
                                                    />
                                                }
                                            />

                                            {this.state.setDayOfWeek &&
                                                <div className="list">
                                                    {this.state.keyDayOfWeek.map((day, index) => {
                                                        const isChecked = this.state.selectedDayOfWeek[index]
                                                        return (
                                                            <div className="day-filter" key={index}>
                                                                <FormControlLabel
                                                                    disabled={this.state.disable}
                                                                    label={day}
                                                                    size="small"
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CircleUnchecked />}
                                                                            checkedIcon={<CircleCheckedFilled />}
                                                                            checked={isChecked}
                                                                            onChange={(e) => this.onCheckDayOfWeekChange(e, index)}
                                                                        />
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="left-col">
                                    <div className="c-setting-coupon-info-info-guild">
                                        <div className="c-guild-header">
                                            Discount Conditions
                                        </div>
                                        <div className="c-guild-content">
                                            Select the conditions required for the discount rule to be applied.
                                        </div>
                                    </div>
                                </div>
                                <div className="right-col">
                                    <div className="c-setting-coupon-info-info-detail">
                                        <div className="c-text-field-name">
                                            {this.state.type === 1 ? "Discount  Amount" : "Discount Percent"}
                                        </div>
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
                                        <div className="c-text-field-name">Minimum Order Value</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.state.minimumOrderValue}
                                            fullWidth
                                            disabled={this.state.disable}
                                            size="small"
                                            error={this.state.minimumOrderValueErrorMessage ? true : false}
                                            helperText={this.state.minimumOrderValueErrorMessage}
                                            
                                            onChange={this.onHandleMinimumOrderValueChange}
                                        />

                                        <div className="c-setting-coupon-info-control-form">
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
            </div>
        );
    }
}

export default withRouter(CouponAdd)
