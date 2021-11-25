import React, { Component } from 'react';
import Price from '../Pdp/Price';
import CartOverlaySize from './CartOverlaySize';
import './CartOverlayItem.css';
 
export class CartOverlayItem extends Component{
    render(){
        return(
            <div className="cart-overlay-item-content">
                <div className="cart-overlay-product-name">{this.props.product.item[0].name}</div>     
                <div className="price-comp">{<Price price={this.props.price} currency={this.props.currency} />}</div>      
                <div className="item-sizes">
                <CartOverlaySize attributes={this.props.product.item[0].attributes} attributesIndex={0} selectedAttributes={{color:this.props.product.color,size:this.props.product.size}}/>
                {this.props.product.item[0].attributes.length > 1 ?
                    <CartOverlaySize attributes={this.props.product.item[0].attributes} attributesIndex={1} selectedAttributes={{color:this.props.product.color,size:this.props.product.size}}/>
                    :
                    null
                }
                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}

export default CartOverlayItem;