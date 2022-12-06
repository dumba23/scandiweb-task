import React, { Component } from "react";
import PropTypes from "prop-types";

import Price from "../Pdp/Price";
import "./CartOverlayItem.css";
import CartOverlaySizeTest from "./CartOverlaySizeTest";

export class CartOverlayItem extends Component {
  render() {
    return (
      <div className="cart-overlay-item-content">
        <div className="cart-overlay-product-name">
          <span style={{ fontWeight: "bold" }}>
            {this.props.product.item[0].brand}
          </span>
          <br />
          <span className="cart-overlay-product-name-st">
            {this.props.product.item[0].name}
          </span>
        </div>
        <div className="price-comp">
          {<Price price={this.props.price} currency={this.props.currency} />}
        </div>
        <div>
          <CartOverlaySizeTest
            selectedAttr={this.props.selectedAttributes}
            item={this.props.product.item}
            attrChange={this.props.attrChange}
            itemId={this.props.product.item[0].id}
            selectedAttributes={this.props.product.selectedAttributes}
            allAttributes={this.props.product.item[0].attributes}
          />
        </div>
      </div>
    );
  }
}

CartOverlayItem.propTypes = {
  product: PropTypes.object,
  price: PropTypes.array,
  currency: PropTypes.string,
  selectedAttributes: PropTypes.any,
  attrChange: PropTypes.func,
};

export default CartOverlayItem;
