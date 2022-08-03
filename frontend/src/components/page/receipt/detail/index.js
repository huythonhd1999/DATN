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
import { withSnackbar } from 'notistack';
import CancelOrderModal from '../../../common/cancel order modal/index'


class ReceiptDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            currentOrder: {},
            type: 1,
            fulFill: false,
            isShowCanceledModal: false
        };
    }
    componentDidMount = async () => {
        let id = this.props.match.params.id
        this.setState({ loading: true })
        let res = await Api.getOrder(id)
        let order = res.data.order;
        this.setState({
            ...order,
            currentOrder: order,
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
        this.setState({ loading: true })
        e.preventDefault();

        const bookingOrder = {
            orderId: this.state.currentOrder.bookingInfo.orderId,
            bookingAdvance: this.state.currentOrder.total
        }
        const res = await Api.editBookingOrder(bookingOrder)
        if (res.data.success) {
            let id = this.props.match.params.id
            let res = await Api.getOrder(id)
            let order = res.data.order;
            this.setState({
                ...order,
                currentOrder: order,
                loading: false
            })
            this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } })
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

    getOrderType() {
        if (this.state.currentOrder?.canceledOrderInfo) return "Canceled"
        switch (this.state.status) {
            case 1:
                return "Immediate Sale"
            case 2:
                return "Booking"
            default:
                return "Booking"
        }
    }
    getPaymentStatus() {
        if (this.state.immediateSaleInfo) {
            return "Finished"
        }
        if (this.state.bookingInfo?.bookingAdvance < this.state.total) {
            return "Unfinished"
        } else {
            return "Finished"
        }
    }

    getOrderItemName(orderItem) {
        let orderItemName = orderItem.productInfo.name + " / " + orderItem.selectedVariant.name

        orderItem.selectedAddons.forEach((addon) => {
            orderItemName = orderItemName + " + " + addon.addonInfo.name
        })
        return orderItemName
    }

    getOrderItemPrice(orderItem) {
        let variantPrice = orderItem.selectedVariant.price
        let taxPercent = orderItem.taxInfo?.percent || 0
        orderItem.selectedAddons.forEach((addon) => {
            variantPrice = variantPrice + addon.addonInfo.price * (1 + taxPercent / 100)
        })
        return variantPrice * orderItem.quantity
    }
    getSubTotal() {
        let subTotal = 0
        this.state.currentOrder?.orderItemList?.forEach((orderItem) => {
            subTotal = subTotal + this.getOrderItemPrice(orderItem)
        })
        return subTotal
    }
    getDiscountValue() {
        const coupon = this.state.currentOrder?.couponInfo
        if (coupon) {
            if (coupon.type === 0) { //giảm theo phần trăm
                return coupon.amount + " %"
            }
            return coupon.amount
        }
        return 0
    }
    getNotes() {
        switch (this.state.currentOrder?.status) {
            case 1: //immediate sale 
                return this.state.currentOrder?.immediateSaleInfo?.notes
            case 2: //booking
                return this.state.currentOrder?.bookingInfo?.notes
            case 3: // cancel 
                return this.state.currentOrder?.canceledOrderInfo?.notes
            default:
                return ""
        }
    }
    getPaymentType() {
        switch (this.state.currentOrder?.paymentType) {
            case 1: //Cash 
                return "Cash"
            case 2: //Credit Card
                return "Credit Card"
            case 3: // Other 
                return "Other"
            default:
                return ""
        }
    }
    getPaymentDetail() {
        var detail = ""
        switch (this.state.currentOrder?.status) {
            case 1: //immediate sale 
                detail = this.state.currentOrder?.total
                break
            case 2: //booking
                detail = this.state.currentOrder?.bookingInfo?.bookingAdvance
                break
            default:
                detail = ""
        }
        return detail + "$ on " + this.getPaymentType()
    }

    getPaymentTitle() {
        if (this.state.currentOrder?.status === 2) {
            return `Pending Payment ${this.state.currentOrder?.total - this.state.currentOrder?.bookingInfo?.bookingAdvance}$`
        }
    }

    onHandleCanceledOrderClick = () => {
        this.setState({
            isShowCanceledModal: true
        })
    }
    onHandelModelClose = () => {
        this.setState({
            isShowCanceledModal: false
        })
    }

    onCreateCanceledOrderInfo = async (canceledOrderInfo) => {
        this.setState({ loading: true })
        const res = await Api.createCanceledOrder(canceledOrderInfo)
        if (res.data.success) {
            let id = this.props.match.params.id
            let res = await Api.getOrder(id)
            let order = res.data.order;
            this.setState({
                ...order,
                currentOrder: order,
                loading: false
            })
            this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } })
        }
    }

    render() {
        return (
            <div className="c-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                {
                    this.state.isShowCanceledModal &&
                    <CancelOrderModal
                        open={this.state.isShowCanceledModal}
                        onClose={this.onHandelModelClose}
                        orderDetail={this.state.currentOrder}
                        onClickSave={this.onCreateCanceledOrderInfo}
                    />
                }
                <div className="c-receipt-info">
                    <NavSideBar />
                    <div className="c-receipt-info-content">
                        <div className="c-receipt-info-content-header">
                            <div className="text">
                                <div className="title" onClick={() => this.props.history.push("/receipts")}>Receipts </div>
                                <div> {" / " + this.state.currentOrder.Id}</div>
                            </div>
                            {
                                this.state.currentOrder?.bookingInfo &&
                                !this.state.currentOrder?.canceledOrderInfo &&
                                <Button
                                    variant="contained"
                                    onClick={() => this.onHandleEditClick()}
                                    disabled={!this.state.disable}
                                >
                                    Edit
                                </Button>
                            }
                        </div>
                        <div className="c-receipt-info-content-info">
                            <div className="c-receipt-info-content-info-column-1">
                                <div className="c-receipt-info-info-guild">
                                    <div className="c-guild-header">
                                        Receipt Details
                                    </div>
                                    {/* đổi state chỗ này */}
                                    <div className="c-guild-content">
                                        Prepared by {this.state.currentOrder.userInfo?.userName}
                                    </div>
                                    <div className="c-guild-content">
                                        on {!this.state.loading ? (new Date(this.state.currentOrder?.createDate)).toLocaleString() : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="c-receipt-info-content-info-column-2">
                                <div className="c-receipt-info-info-detail">
                                    <div className="info">
                                        <div className="status">
                                            <div className="c-text-field-name">Status</div>
                                            <Stack spacing={0.5} direction="row">
                                                <Chip label={this.getOrderType()} color="success" />
                                                <Chip label={this.getPaymentStatus()} color="warning" />
                                            </Stack>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="action-button">Print</button>
                                            {
                                                !this.state.currentOrder?.canceledOrderInfo &&
                                                <button className="action-button" onClick={() => this.onHandleCanceledOrderClick()}>Cancel</button>
                                            }
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
                                                {
                                                    !this.state.loading &&
                                                    this.state.currentOrder?.orderItemList?.map((orderItem, index) => (
                                                        <TableRow onClick={() => { this.handleClickOrderItem(orderItem) }}
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {this.getOrderItemName(orderItem)}
                                                            </TableCell>
                                                            <TableCell>{orderItem.quantity}</TableCell>
                                                            <TableCell>{orderItem.taxInfo?.percent || 0}</TableCell>
                                                            <TableCell>{this.getOrderItemPrice(orderItem)}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                                {
                                                    this.state.loading &&
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                        <TableCell className='no-item' colSpan={4} style={{ textAlign: "center" }}>
                                                            No item to show in this view
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                                <TableRow
                                                    key={"subTotal"}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>{"Sub Total"}</TableCell>
                                                    <TableCell>{this.getSubTotal()}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                    key={"discount"}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>{"Discount"}</TableCell>
                                                    <TableCell>{this.getDiscountValue()}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                    key={"total"}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>{"Total"}</TableCell>
                                                    <TableCell>{this.state.currentOrder?.total}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <div className="element">
                                        {this.state.currentOrder?.bookingInfo &&
                                            <>
                                                <div className="c-text-field-name-1">Delivery Date & Time</div>
                                                <Stack direction="row" spacing={2}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DesktopDatePicker
                                                            inputFormat="MM/dd/yyyy"
                                                            value={this.state.currentOrder?.bookingInfo?.deliveryDate}
                                                            disabled={true}
                                                            onChange={() => true}
                                                            minDate={new Date(this.state.startTime)}
                                                            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                                        />
                                                        <TimePicker
                                                            value={this.state.currentOrder?.bookingInfo?.deliveryDate}
                                                            ampm={false}
                                                            disabled={true}
                                                            onChange={() => true}
                                                            renderInput={(params) => <TextField size="small" {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Stack>
                                            </>
                                        }
                                        <div className="c-text-field-name">Notes</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.getNotes()}
                                            fullWidth
                                            disabled={true}
                                            size="small"
                                            multiline
                                        />
                                        {
                                            this.state.currentOrder?.bookingInfo &&
                                            <FormControlLabel
                                                disabled={true}
                                                label={<div className="c-text-field-name-1">Is Door Delivery?</div>}
                                                control={
                                                    <Checkbox
                                                        icon={<CircleUnchecked />}
                                                        size="small"
                                                        checkedIcon={<CircleCheckedFilled />}
                                                        checked={this.state.currentOrder?.bookingInfo?.isDoorDelivery === 1}
                                                    />
                                                }
                                            />
                                        }
                                    </div>
                                    <div className="element">
                                        <div className="c-text-field-name">Customer Name</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.state.currentOrder?.customerInfo?.name}
                                            fullWidth
                                            disabled={true}
                                            size="small"
                                        />
                                        <div className="c-text-field-name">Customer Phone</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.state.currentOrder?.customerInfo?.mobilePhone}
                                            fullWidth
                                            disabled={true}
                                            size="small"
                                        />
                                        <div className="c-text-field-name">Customer Email</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.state.currentOrder?.customerInfo?.email}
                                            fullWidth
                                            disabled={true}
                                            size="small"
                                        />
                                        <div className="c-text-field-name">Shipping Address</div>
                                        <TextField
                                            margin="normal"
                                            required
                                            value={this.state.currentOrder?.customerInfo?.shippingAddress}
                                            fullWidth
                                            multiline
                                            disabled={true}
                                            size="small"
                                        />
                                    </div>
                                    <div className="element">
                                        {
                                            this.state.currentOrder?.canceledOrderInfo &&
                                            <>
                                                <div className="c-text-field-name">Cancelation Notes</div>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    value={this.state.currentOrder?.canceledOrderInfo?.notes}
                                                    fullWidth
                                                    disabled={true}
                                                    size="small"
                                                    multiline
                                                />
                                            </>
                                        }
                                        <div className="c-text-field-name">Payment Details: {this.getPaymentTitle()}</div>
                                        <div className="detail">
                                            <div className="c-amount">{this.getPaymentDetail()} </div>
                                            <div className="c-date">  {!this.state.loading ? (new Date(this.state.currentOrder?.createDate)).toLocaleString() : ""}</div>
                                        </div>
                                    </div>
                                    <div className="payment">
                                        {
                                            this.state.currentOrder?.status === 2 &&
                                            !this.state.currentOrder?.canceledOrderInfo &&
                                            this.state.currentOrder?.total - this.state.currentOrder?.bookingInfo?.bookingAdvance > 0 &&
                                            <FormControlLabel
                                                disabled={this.state.disable}
                                                label={<div className="c-text-field-name-2">Fulfill</div>}
                                                control={
                                                    <Checkbox
                                                        icon={<CircleUnchecked />}
                                                        size="small"
                                                        checkedIcon={<CircleCheckedFilled />}
                                                        checked={this.state.fulFill}
                                                        onClick={() => this.onHandleFulFill()}
                                                    />
                                                }
                                            />
                                        }
                                    </div>
                                    {
                                        this.state.currentOrder?.status === 2 &&
                                        !this.state.currentOrder?.canceledOrderInfo &&
                                        this.state.currentOrder?.total - this.state.currentOrder?.bookingInfo?.bookingAdvance > 0 &&
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
                                                    disabled={this.state.disable || !this.state.fulFill}
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
                                    }
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
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(ReceiptDetail)));
