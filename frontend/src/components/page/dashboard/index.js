import { Card, CardContent } from "@mui/material";
import React, { Component } from "react";
import NavSideBar from "../../common/navigation bar/navSideBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./index.scss"

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                <Card sx={{ width: 200 }}>
                                    <CardContent>
                                        <div className='title'>Total sales</div>
                                        <div className='value'>{"100"}</div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ width: 200 }}>
                                    <CardContent>
                                        <div className='title'>Total bills</div>
                                        <div className='value'>{"100"}</div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ width: 200 }}>
                                    <CardContent>
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
                            <div className="need-help"></div>
                        </div>
                        <div className="column-2">
                            <div className="title">
                                Sales Summary
                            </div>
                            <div className="graph">

                            </div>
                            <div className="payment-summary">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DashBoard;