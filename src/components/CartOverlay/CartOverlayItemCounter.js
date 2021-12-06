import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CartOverlayItemCounter.css';

export class CartOverlayItemCounter extends Component{
    constructor(props){
        super(props)
        this.handleClickOnMinus = this.handleClickOnMinus.bind(this);
        this.handleClickOnPlus = this.handleClickOnPlus.bind(this);
        this.handleCountItems = this.handleCountItems.bind(this);
    }

    handleCountItems  () {
        this.props.countItems(this.state.count);
    }

    handleClickOnPlus  (){
        this.props.countSelectedItem(this.props.itemId, this.props.selectedAttributes, this.props.item.item);
    }

    handleClickOnMinus () {
        this.props.deleteItem(this.props.itemId, this.props.selectedAttributes, this.props.item.item);
        
    }

    render(){
        return(
            <div className="cart-overlay-item-counter-content">
                        <button className="counter-button" onClick={this.handleClickOnPlus}>
                        +
                        </button>
                        {this.props.quantity}
                        <button className="counter-button" onClick={this.handleClickOnMinus}>          
                        -
                        </button>
            </div>
        );
    }
}

CartOverlayItemCounter.propTypes = {
    countItems:PropTypes.func,
    countSelectedItem:PropTypes.func,
    itemId:PropTypes.string,
    selectedAttributes:PropTypes.array,
    item:PropTypes.any,
    deleteItem: PropTypes.func,
    quantity:PropTypes.number,
}
 
export default CartOverlayItemCounter;
