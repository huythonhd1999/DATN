import { Button, Card, CardContent, FormControl, MenuItem, Select } from "@mui/material";
import React, { Component } from "react";
import NavSideBar from "../../common/navigation bar/navSideBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chart from 'react-apexcharts'
import Api from "../../../api/api";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "./index.scss"
import LoadingScreen from "../../common/loading";
import { format } from 'date-fns'

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                xaxis: {
                    categories: []
                }
            },
            series: [{
                name: 'Total sales',
                data: []
            }],
            scope: 1, //1 la hom nay 2 la 7 ngay truoc 3 la 30 ngay truoc
            numNewCustomer: 0,
            topOrderItemList: [],
            totalBookingAdvance: 0,
            totalImmediateSaleOrder: 0,
            totalOrder: 0,
            totalRefundAmount: 0,
            numOrderToday: 0,
            numCanceledOrderToday: 0,
            loading: false,
            detail: [],
            paymentSummary: {}
        };
    }

    handleScopeChange = async (e) => {
        this.setState({
            scope: e.target.value
        })
        this.setState({ loading: true })
        const res1 = await Api.getStatisticByDate(e.target.value)
        const data1 = await res1.data
        this.setState({
            ...data1,
            loading: false
        }, () => { this.getChartData() })
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        const res = await Api.getTodayStatistic()
        const data = res.data
        const res1 = await Api.getStatisticByDate(this.state.scope)
        const data1 = await res1.data
        this.setState({
            ...data,
            ...data1,
            loading: false
        })
        this.getChartData()
    }
    getProductName(order) {
        if (order.productInfo) {
            return order.productInfo.name + " / " + order.variantInfo.name
        } else {
            return order.variantInfo.name
        }
    }
    getTotalOrder(data) {
        let sum = 0
        data.totalOrder.forEach((item) => {
            sum = sum + item.totalOrder
        })
        return sum
    }

    getPaymentSummary() {
        let totalOrder = 0
        let totalCash = 0
        let totalCard = 0
        let totalOther = 0
        // const totalPettyCash = 0
        this.state.detail.forEach((item) => {
            totalOrder = totalOrder + item.data.numOrderToday
            item.data.totalOrder.forEach((detail) => {
                switch (detail.paymentType) {
                    case 1:
                        totalCash = totalCash + detail.totalOrder
                        break
                    case 2:
                        totalCard = totalCard + detail.totalOrder
                        break
                    case 3:
                        totalOther = totalOther + detail.totalOrder
                        break
                    default:
                }
            })
        })
        return {
            totalOrder: totalOrder,
            totalCash: totalCash,
            totalCard: totalCard,
            totalOther: totalOther,
        }
    }


    getChartData() {
        let categories = []
        let chartData = []
        // const totalCash = 0
        // const totalCard = 0
        // const totalOther = 0
        // const totalPettyCash = 0

        switch (this.state.scope) {
            case 1:
                this.state.detail.forEach((data) => {
                    categories.push(format(new Date(data.date), "HH"))
                    chartData.push(this.getTotalOrder(data.data))
                })
                break
            case 2:
            case 3:
                this.state.detail.forEach((data) => {
                    categories.push(format(new Date(data.date), "MM-dd"))
                    chartData.push(this.getTotalOrder(data.data))
                })
                categories.reverse()
                chartData.reverse()
                break
            default:
        }
        const paymentSummary = this.getPaymentSummary()

        this.setState({
            options: {
                xaxis: {
                    categories: categories
                }
            },
            series: [{
                name: 'Total sales',
                data: chartData
            }],
            paymentSummary: paymentSummary
        })
    }

    getTotal() {
        return (this.state.paymentSummary?.totalCard + this.state.paymentSummary?.totalCash + this.state.paymentSummary?.totalOther) || ""
    }

    getTimeRange() {
        switch (this.state.scope) {
            case 1:
                return format(new Date(), "MM-dd-YYY")
            case 2:
            case 3:
                return this.state.options.xaxis.categories[0] + " to " + this.state.options.xaxis.categories.slice(-1)[0]
            default:
        }
    }

    render() {
        return (
            <div className="dashboard-page">
                <LoadingScreen
                    open={this.state.loading}
                />
                <NavSideBar />
                <div className="dashboard-content">
                    <div className="header">
                        Dashboard
                    </div>
                    <div className="dashboard-detail">
                        <div className="column-1">
                            <div className="hello-message">
                                Hello {this.props.user?.userName}, here's how today is.
                            </div>
                            <div className="analysis-today-cards">
                                <Card sx={{ width: 250 }}>
                                    <CardContent className="summary">
                                        <div className='title'>Total sales</div>
                                        <div className='value'>{this.state.totalOrder || 0}</div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ width: 250 }}>
                                    <CardContent className="summary">
                                        <div className='title'>Total orders</div>
                                        <div className='value'>{this.state.numOrderToday || 0}</div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ width: 250 }}>
                                    <CardContent className="summary">
                                        <div className='title'>New customer</div>
                                        <div className='value'>{this.state.numNewCustomer || 0}</div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="top-selling">
                                <div className="title">
                                    {this.state.topOrderItemList.length === 0 ? "You haven't made a sale yet today." : "Top Selling"}
                                </div>
                                <div className="table">
                                    {
                                        this.state.topOrderItemList.length > 0 &&
                                        <TableContainer component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Product Name</TableCell>
                                                        <TableCell>Today's Demand</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.state.topOrderItemList.map((order, index) => {
                                                            if (index < 5) {
                                                                return (
                                                                    <TableRow
                                                                        key={index}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row" sx={{ color: "blue" }} >
                                                                            {this.getProductName(order)}
                                                                        </TableCell>
                                                                        <TableCell>{order.numVariant}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            } else {
                                                                return <></>
                                                            }
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    }
                                    {
                                        this.state.topOrderItemList.length === 0 &&
                                        <div className="message-component">
                                            <Button
                                                onClick={() => this.props.history.push("/sell")}
                                                type="submit"
                                                variant="contained"
                                            >
                                                Start selling
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="need-help">
                                <div className="title"> Need Help</div>
                                <div className="help-link-list">
                                    <div className="column">
                                        <div className="title">
                                            Check out our user guide
                                        </div>
                                        <div className="link-list">
                                            <ul>
                                                <li>Getting Started</li>
                                                <li>Selling</li>
                                                <li>Manage Products</li>
                                                <li>Getting Started</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="title">
                                            Need help or support?
                                        </div>
                                        <div className="link-list">
                                            <ul>
                                                <li>Launch live support</li>
                                                <li>Email to huyvq218@gmail.com</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column-2">
                            <div className="title">
                                Sales Summary
                            </div>

                            <div className="graph">
                                <div className="detail">
                                    <div className="drop-down-option">
                                        <FormControl variant="outlined" size="small" className="scope-selection">
                                            <Select
                                                value={this.state.scope}
                                                onChange={(e) => this.handleScopeChange(e)}
                                            >
                                                <MenuItem value={1}>Today</MenuItem>
                                                <MenuItem value={2}>Last 7 days</MenuItem>
                                                <MenuItem value={3}>Last 30 days</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="num-order">
                                        <div className="key">
                                            <div className="receipt">{this.state.paymentSummary?.totalOrder || 0} orders</div>
                                            <div className="time-range">{this.getTimeRange()}</div>
                                        </div>
                                        <div className="value">

                                        </div>
                                    </div>
                                </div>
                                <Chart options={this.state.options} series={this.state.series} type="bar" width={"100%"} height={300} />
                            </div>
                            <div className="payment-summary">
                                <div className="title"> Payments Summary </div>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell> Total </TableCell>
                                                <TableCell>{this.getTotal()}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell> Cash </TableCell>
                                                <TableCell>{this.state.paymentSummary?.totalCash}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell> Card </TableCell>
                                                <TableCell>{this.state.paymentSummary?.totalCard}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell> Other </TableCell>
                                                <TableCell>{this.state.paymentSummary?.totalOther}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        ...state.authReducer
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {

    }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(DashBoard));