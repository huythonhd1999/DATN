import React, { Component } from "react";
import NavSideBar from "../../common/navigation bar/navSideBar";
import './index.scss';
import { connect } from 'react-redux';
import LoadingScreen from "../../common/loading";
import { withRouter } from "react-router-dom";
// import SellModal from "../../common/modal";
import { Tab, Tabs } from "@mui/material";
import Current from "./current";
import Draft from "./draft";
import * as SellAction from '../../../redux/action/sell/index';
import SaveOrderToDraftModal from "../../common/draft modal";
import { withSnackbar } from 'notistack';

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            loading: false,
            selectedTab: 1, //1 la current 2 la drafts
            isShowModal: false,
            products: [],
            categories: [],
            selectedItems: [],
            selectedTax: {},
            draftReceipts: []
        };
    }

    onChangeSelectedTab = (value) => {
        this.setState({
            selectedTab: value
        })
    }

    saveDraftOrder = (notes) => {
        const oldDraftOrders = JSON.parse(localStorage.getItem("draftOrders")) || []
        let newDraftOrders = []
        const data = {
            orderItemList: this.props.sellProps.orderItemList,
            total: this.props.sellProps.total,
            coupon: this.props.sellProps.coupon,
            totalQuantity: this.props.sellProps.totalQuantity,
            orderType: this.props.sellProps.orderType,
            paymentType: this.props.sellProps.paymentType,
            deliveryDate: this.props.sellProps.deliveryDate,
            bookingAdvance: this.props.sellProps.bookingAdvance,
            notes: this.props.sellProps.notes,
            canFinishOrder: this.props.sellProps.canFinishOrder,
            cashTendered: this.props.sellProps.cashTendered,
            isDoorDelivery: this.props.sellProps.isDoorDelivery,
            draftNotes: notes,
            createDate: this.props.sellProps.createDate || new Date(),
        }
        if (oldDraftOrders.find((order) => (order.createDate === data.createDate))) { //chỉnh sửa đơn hàng nháp đã được lưu trước đó
            newDraftOrders = oldDraftOrders.map((order) => {
                if (order.createDate === data.createDate) {
                    return data
                } else {
                    return order
                }
            })
        } else { //thêm đơn hàng nháp mới
            newDraftOrders = [...oldDraftOrders, data]
        }

        localStorage.setItem("draftOrders", JSON.stringify(newDraftOrders))
        this.props.enqueueSnackbar('Successfully to save data.', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } })
        this.props.resetSate()
    }

    render() {
        return (
            <div className="c-page">
                <LoadingScreen
                    open={this.props.sellProps.loading}
                />
                {this.props.sellProps.isShowDraftModal &&
                    <SaveOrderToDraftModal
                        open={this.props.sellProps.isShowDraftModal}
                        onClose={() => this.props.setIsShowDraftModal(false)}
                        onSave={this.saveDraftOrder}
                        order={this.props.sellProps}
                    />
                }
                <div className="c-sell-info">
                    <NavSideBar />
                    <div className="detail">
                        <div className="header">
                            Sell
                        </div>
                        <div className="content">
                            <div className="tag-list">
                                <Tabs
                                    value={this.state.selectedTab}
                                    onChange={(_event, value) => this.setState({
                                        selectedTab: value
                                    })} >
                                    <Tab label="Current" value={1} />
                                    <Tab label="Drafts" value={2} />
                                </Tabs>
                            </div>
                            <div className="tabs">
                                {this.state.selectedTab === 1 && <Current />}
                                {this.state.selectedTab === 2 && <Draft onClickDraftOrder={() => this.onChangeSelectedTab(1)} />}
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
        sellProps: state.sellReducer
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        setLoading: (loadingState) => {
            dispatch(SellAction.setLoading(loadingState))
        },
        setIsShowDraftModal: (isShow) => {
            dispatch(SellAction.setIsShowDraftModal(isShow))
        },
        setOrderItemList: (orderItemList) => {
            dispatch(SellAction.setOrderItemList(orderItemList))
        },
        resetSate: () => {
            dispatch(SellAction.resetSate())
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(withSnackbar(Sell)));
