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

    render() {
        return (
            <div className="c-page">
                <LoadingScreen
                    open={this.props.sellProps.loading}
                />
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
                                {this.state.selectedTab === 2 && <Draft onClickDraftOrder = {() => this.onChangeSelectedTab(1)} /> }
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
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(Sell));
