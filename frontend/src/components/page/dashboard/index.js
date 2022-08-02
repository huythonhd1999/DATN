import { Card, CardContent, FormControl, MenuItem, Select } from "@mui/material";
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
import "./index.scss"

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul", "8 Jul", "9 Jul", "10 Jul", "11 Jul", "12 Jul", "13 Jul", "14 Jul", "15 Jul", "16 Jul", "17 Jul", "18 Jul"]
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 30, 40, 35, 50, 49, 60, 70, 91, 125]
            }],
            scope: 1
        };
    }

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    handleScopeChange = (e) => {
        this.setState({
            scope: e.target.value
        })
    }

    render() {
        const rows = [
            this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            this.createData('Eclair', 262, 16.0, 24, 6.0),
        ];

        return (
            <div className="dashboard-page">
                <NavSideBar />
                <div className="dashboard-content">
                    <div className="header">
                        Dashboard
                    </div>
                    <div className="dashboard-detail">
                        <div className="column-1">
                            <div className="hello-message">
                                Hello {"Huy"}, here's how today is.
                            </div>
                            <div className="analysis-today-cards">
                                <Card sx={{ width: 250 }}>
                                    <CardContent className="summary">
                                        <div className='title'>Total sales</div>
                                        <div className='value'>{"100"}</div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ width: 250 }}>
                                    <CardContent className="summary">
                                        <div className='title'>Total bills</div>
                                        <div className='value'>{"100"}</div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ width: 250 }}>
                                    <CardContent className="summary">
                                        <div className='title'>New customer</div>
                                        <div className='value'>{"100"}</div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="top-selling">
                                <div className="title">
                                    Top Selling
                                </div>
                                <div className="table">
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product Name</TableCell>
                                                    <TableCell>Today's Demand</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" sx={{ color: "blue" }} >
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell>{row.calories}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                                Sales Summary This Month
                            </div>
                            <div className="graph">
                                <div className="drop-down-option">
                                    <FormControl variant="outlined" size="small" className="scope-selection">
                                        <Select
                                            value={this.state.scope}
                                            onChange={(e) => this.handleScopeChange(e)}
                                        >
                                            <MenuItem value={1}>Today</MenuItem>
                                            <MenuItem value={2}>This Month</MenuItem>
                                            <MenuItem value={3}>This Week</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <Chart options={this.state.options} series={this.state.series} type="bar" width={"100%"} height={300} />
                            </div>
                            <div className="payment-summary">
                                <div className="title"> Payments Summary </div>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell> Cash </TableCell>
                                                <TableCell>{100}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell> Card </TableCell>
                                                <TableCell>{100}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell> Other </TableCell>
                                                <TableCell>{100}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell> Petty Cash </TableCell>
                                                <TableCell>{100}</TableCell>
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
export default DashBoard;