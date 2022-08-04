import React, { Component } from 'react'
import './index.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Api from '../../../../../api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SellModal from '../../../../common/modal';
import { connect } from 'react-redux';
import * as SellAction from '../../../../../redux/action/sell/index';


class OrderItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            selectedItems: [],
            selectedTax: {},
            draftReceipts: [],
            searchString: "",
            selectedCategory: {
                Id: -1,
                name: "All product",
                note: "All product",
                status: 1,
            },
            selectedProduct: undefined,
            selectedOrderItem: undefined,
            orderItems: [],
            categories: [],
            total: 0,
            couponCode: "",
            couponErrorMessage: "",
        };
    }

    onHandleSearchStringChange = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    onEnter = async (e) => {
        this.props.setLoading(true)
        if (e.keyCode === 13) {
            this.setState({
                loading: true,
            })
            let res = await Api.searchProduct(this.state.searchString);
            this.setState({
                products: res.data.productList,
                selectedCategory: {
                    Id: -1,
                    name: "All product",
                    note: "All product",
                    status: 1,
                },
            })
        }
        this.props.setLoading(false)
    }

    onCouponEnter = async (e) => {
        this.props.setLoading(true)
        if (e.keyCode === 13) {
            this.setState({
                loading: true,
            })
            const coupon = {
                couponCode: this.state.couponCode,
                totalQuantity: this.props.sellProps
            }
            let res = await Api.checkCoupon(coupon);
            if (res.data.success) {
                this.props.setCoupon(res.data.coupon)
                this.setState({
                    couponErrorMessage: ""
                })
            } else {
                this.setState({
                    couponErrorMessage: "Coupon code is invalid"
                })
            }
        }
        this.props.setLoading(false)
    }

    onHandleCouponChange = (e) => {
        this.setState({
            couponCode: e.target.value
        })
    }

    onSearchItems = async () => {
        this.props.setLoading(true)
        let res = await Api.searchProduct(this.state.searchString);
        this.setState({
            products: res.data.productList,
            selectedCategory: {
                Id: -1,
                name: "All product",
                note: "All product",
                status: 1,
            },
        })
        this.props.setLoading(false)
    }

    componentDidMount = async () => {
        this.props.setLoading(true)
        const productRes = await Api.getProductList()
        const products = productRes.data.productList
        const categoryRes = await Api.getCategoryList()
        let categories = categoryRes.data.categoryList
        categories.unshift({
            Id: -1,
            name: "All product",
            note: "All product",
            status: 1,
        })
        this.setState({
            products: products,
            categories: categories,
            couponCode: this.props.sellProps?.coupon.code || ""
        })
        this.props.setLoading(false)
    }

    handleClickProduct = (product) => {
        this.setState({
            selectedProduct: { ...product }
        })
    }

    handleClickOrderItem = (orderItem) => {
        this.setState({
            selectedOrderItem: { ...orderItem }
        })
    }
    onHandleClickRemoveCoupon = () => {
        this.props.setCoupon({})
        this.setState({
            couponCode: ""
        })
    }

    saveOrderItem = (orderItem) => {
        const newOrderItemList = this.props.sellProps.orderItemList
        // newOrderItemList.push(orderItem)
        this.props.setOrderItemList([...newOrderItemList, orderItem])
    }

    checkEditOrderItem(item) {
        const editingItem = this.state.selectedOrderItem
        let check = editingItem.quantity === item.quantity && editingItem.selectedVariant === item.selectedVariant && editingItem.selectedAddons === item.selectedAddons
        return check
    }

    saveEditedOrderItem = (newOrderItem) => {
        const newOrderItemList = this.props.sellProps.orderItemList.map((item) => {
            if (this.checkEditOrderItem(item)) {
                return newOrderItem
            } else {
                return item
            }
        })
        this.props.setOrderItemList(newOrderItemList)
    }

    removeSelectedItem = () => {
        const newOrderItemList = this.props.sellProps.orderItemList.filter((item) => (!this.checkEditOrderItem(item) && item))
        this.props.setOrderItemList(newOrderItemList)
    }


    handleCategoryChange = (value) => {
        this.setState({ selectedCategory: value })
    }

    getOrderItemName(orderItem) {
        let variantName = orderItem.name + " / " + orderItem.selectedVariant.name

        orderItem.selectedAddons.forEach((addon) => {
            variantName = variantName + " + " + addon.name
        })
        return variantName
    }

    getOrderItemPrice(orderItem) {
        let variantPrice = orderItem.selectedVariant.price
        let taxPercent = orderItem.taxInfo?.percent || 0
        orderItem.selectedAddons.forEach((addon) => {
            variantPrice = variantPrice + addon.price * (1 + taxPercent / 100)
        })
        return variantPrice * orderItem.quantity
    }

    onHandleClickHold = () => {
        this.props.setIsShowDraftModal(true)
    }

    getDiscountAmount = () => {
        if (this.props.sellProps?.coupon?.type === 0) {
            return this.props.sellProps?.total * this.props.sellProps?.coupon?.amount / 100 + ` (${this.props.sellProps?.coupon?.amount}%)`
        } else {
            return this.props.sellProps?.coupon?.amount
        }
    }

    onHandleClickClear = () => {
        this.props.resetSate()
        this.setState({
            couponCode: ""
        })
    }

    render() {
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
                                isOptionEqualToValue={(option, value) =>
                                    option.Id === value.Id
                                }
                                onChange={(_event, value) => this.handleCategoryChange(value)}
                                value={this.state.selectedCategory}
                                disableClearable
                                defaultValue={this.state.categories[0]}
                                renderInput={(params) => <TextField {...params} fullWidth size='small' placeholder="Select category" />}
                            />
                        </div>
                        <div className='products'>
                            {this.state.selectedProduct &&
                                <SellModal
                                    product={this.state.selectedProduct}
                                    onClose={() => this.setState({ selectedProduct: undefined })}
                                    onSave={this.saveOrderItem}
                                />
                            }
                            {this.state.products?.map((product) => {
                                if (product.categoryId === this.state.selectedCategory.Id || this.state.selectedCategory.Id === -1) {
                                    return (
                                        <div key={product.Id} className='product' onClick={() => { this.handleClickProduct(product) }}>
                                            <Card sx={{ width: 120, height: 120 }} key={product.id}>
                                                <CardContent>
                                                    <div className='name'>
                                                        {product.name}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                } else {
                                    return <></>
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className='column-2'>
                    <div className='order-table'>
                        <div className="c-text-field-name">
                            Order Details
                            <div className='action-button'>
                                <button onClick={() => this.onHandleClickHold()}>Hold</button>
                                <button onClick={() => this.onHandleClickClear()}>Clear</button>
                            </div>
                        </div>
                        {this.state.selectedOrderItem &&
                            <SellModal
                                product={this.state.selectedOrderItem}
                                onClose={() => this.setState({ selectedOrderItem: undefined })}
                                onSave={this.saveEditedOrderItem}
                                onRemove={this.removeSelectedItem}
                            />
                        }
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
                                    {this.props.sellProps.orderItemList.length > 0 &&
                                        this.props.sellProps.orderItemList.map((orderItem, index) => (
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
                                        this.props.sellProps.orderItemList.length === 0 &&
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            <TableCell className='no-item' colSpan={4} style={{ textAlign: "center" }}>
                                                No item to show in this view
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='coupon-code'>
                        <div className="c-text-field-name">
                            Coupon code
                            {
                                this.props.sellProps.coupon.code &&
                                <div className='action-button'>
                                    <button onClick={() => this.onHandleClickRemoveCoupon()}>Remove coupon</button>
                                </div>
                            }
                        </div>
                        <TextField
                            margin="normal"
                            required
                            value={this.state.couponCode}
                            fullWidth
                            sx={{ mt: 1, mb: 1 }}
                            placeholder='Enter coupon code'
                            error={this.state.couponErrorMessage ? true : false}
                            helperText={this.state.couponErrorMessage}
                            size="small"
                            disabled={this.props.sellProps?.orderItemList?.length === 0}
                            onChange={this.onHandleCouponChange}
                            onKeyDown={this.onCouponEnter}
                        />
                        {this.props.sellProps.coupon.code &&
                            <div className="c-text-field-name">Discount amount: {this.getDiscountAmount()}</div>
                        }
                    </div>
                    <div className='control-button'>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!this.props.sellProps.total}
                            sx={{ mt: 1, mb: 1 }}
                            onClick={() => this.props.clickNextStep()}
                        >
                            Charge {this.props.sellProps.total}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        sellProps: state.sellReducer
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {
        setLoading: (loadingState) => {
            dispatch(SellAction.setLoading(loadingState))
        },
        setOrderItemList: (orderItemList) => {
            dispatch(SellAction.setOrderItemList(orderItemList))
        },
        setCoupon: (coupon) => {
            dispatch(SellAction.setCoupon(coupon))
        },
        setIsShowDraftModal: (isShow) => {
            dispatch(SellAction.setIsShowDraftModal(isShow))
        },
        resetSate: () => {
            dispatch(SellAction.resetSate())
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(OrderItems);