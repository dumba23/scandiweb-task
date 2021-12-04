import React, { Component } from 'react';
import './CartOverlayItemCounter.css';

export class CartOverlayItemCounter extends Component{
    constructor(props){
        super(props)
        this.handleClickOnMinus = this.handleClickOnMinus.bind(this);
        this.handleCountItems = this.handleCountItems.bind(this);
        this.state={
            count:1,
        }
    }
 

    handleCountItems = () =>{
        this.props.countItems(this.state.count);
    }

    handleClickOnPlus = () =>{
        this.setState({ count: this.state.count+1 },this.handleCountItems);
        this.props.countSelectedItem(this.props.itemId, this.props.selectedAttributes, this.props.item.item);
    }
    handleClickOnMinus = () =>{
        this.setState({ count: this.state.count-1 },this.handleCountItems);
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
 
export default CartOverlayItemCounter;