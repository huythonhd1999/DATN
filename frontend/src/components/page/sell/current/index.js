import React, { Component } from 'react'
import './index.scss';
import OrderDetail from './order detail';
import OrderItems from './order item';


export default class Current extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }


    render() {
        return (
            <div className='sell'>
                {this.state.step === 1 && <OrderItems clickNextStep = {() => this.setState({step: 2})} />}
                {this.state.step === 2 && <OrderDetail clickPrevStep = {() => this.setState({step: 1})} />}
            </div>
        )
    }
}
