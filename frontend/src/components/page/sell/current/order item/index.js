import React, { Component } from 'react'
import './index.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Api from '../../../../../api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SellModal from '../../../../common/modal';


export default class OrderItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            selectedItems: [],
            selectedTax: {},
            draftReceipts: [],
            searchString: "",
            selectedCategory: {},
            selectedProduct: undefined,
            orderItems: [],
            categories: [
                {
                    id: 1,
                    name: "variant test 1",
                    products: [
                        {
                            id: 1,
                            name: "product 1",
                            price: 100
                        },
                        {
                            id: 2,
                            name: "product 2",
                            price: 100
                        },
                        {
                            id: 3,
                            name: "product 3",
                            price: 100
                        },
                    ]
                },
                {
                    id: 2,
                    name: "variant test 2",
                    products: [
                        {
                            id: 1,
                            name: "product 4",
                            price: 100
                        },
                        {
                            id: 2,
                            name: "product 5",
                            price: 100
                        },
                        {
                            id: 3,
                            name: "product 6",
                            price: 100
                        },
                        {
                            id: 1,
                            name: "product 4",
                            price: 100
                        },
                        {
                            id: 2,
                            name: "product 5",
                            price: 100
                        },
                        {
                            id: 3,
                            name: "product 6",
                            price: 100
                        },
                    ]
                },
                {
                    id: 3,
                    name: "variant test 3",
                    products: [
                        {
                            id: 1,
                            name: "product 7",
                            price: 100
                        },
                        {
                            id: 2,
                            name: "product 8",
                            price: 100
                        },
                        {
                            id: 3,
                            name: "product 9",
                            price: 100
                        },
                    ]
                },
            ]
        };
    }

    onHandleSearchStringChange = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    onEnter = async (e) => {
        if (e.keyCode === 13) {
            console.log(this.state.searchString)
            this.setState({
                loading: true,
            })
            let res = await Api.searchTax(this.state.searchString);
            this.setState({
                taxList: res.data.taxList,
                loading: false,
            })
        }
    }

    onSearchItems = async () => {
        console.log(this.state.searchString)
        this.setState({
            loading: true,
        })
        let res = await Api.searchTax(this.state.searchString);
        this.setState({
            taxList: res.data.taxList,
            loading: false,
        })
    }

    componentDidMount = () => {
        this.setState({
            selectedCategory: this.state.categories[0]
        })
    }

    handleClickProduct = (product) => {
        console.log(product)
        this.setState({
            selectedProduct: { ...product }
        })
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
            <div className='order-element'>
                <div className='column-1'>
                    <div className="search-bar">
                        <TextField
                            margin="normal"
                            InputProps={{
                                startAdornment: <SearchIcon onClick={this.onSearchItems} />
                            }}
                            required
                            fullWidth
                            value={this.state.searchString}
                            onChange={this.onHandleSearchStringChange}
                            onKeyDown={this.onEnter}
                            placeholder="Search item"
                            size="small"

                        />
                    </div>
                    <div className='categories'>
                        <div className='selection'>
                            <div className="c-text-field-name-1">Select category</div>
                            <Autocomplete
                                id="variants"
                                options={this.state.categories}
                                getOptionLabel={(option) => option?.name || ""}
                                onChange={(_event, value) => this.setState({ selectedCategory: value })}
                                value={this.state.selectedCategory}
                                defaultValue={this.state.categories[0]}
                                renderInput={(params) => <TextField {...params} fullWidth size='small' placeholder="Select category" />}
                            />
                        </div>
                        <div className='products'>
                            {this.state.selectedProduct &&
                                <SellModal
                                    product={this.state.selectedProduct}
                                    onClose={() => this.setState({ selectedProduct: undefined })}
                                />}
                            {this.state.selectedCategory.products?.map((product) => (
                                <div key = {product.id} className='product' onClick={() => { this.handleClickProduct(product) }}>
                                    <Card sx={{ width: 120, height: 120 }} key = {product.id}>
                                        <CardContent>
                                            <div className='name'>
                                                {product.name}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='column-2'>
                    <div className='order-table'>
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
                                        <TableRow onClick={() => { this.handleClickProduct(row) }}
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='coupon-code'>
                        <div className="c-text-field-name">Coupon code</div>
                        <TextField
                            margin="normal"
                            required
                            value={this.state.percent}
                            fullWidth
                            sx={{ mt: 1, mb: 1 }}
                            placeholder='Enter coupon code'
                            // error={this.state.percentErrorMessage ? true : false}
                            // helperText={this.state.percentErrorMessage}
                            size="small"
                        // onChange={this.onHandleTaxPercentChange}
                        />
                    </div>
                    <div className='control-button'>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 1 }}
                            onClick={() => this.props.clickNextStep()}
                        >
                            Charge {"456"}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
