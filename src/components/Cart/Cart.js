import React, { Component } from "react";
import PropTypes from "prop-types";

import CartOverlayItem from "../CartOverlay/CartOverlayItem";
import CartOverlayItemCounter from "../CartOverlay/CartOverlayItemCounter";
import getSymbolFromCurrency from "currency-symbol-map";
import CartImg from "./CartImg";
import "./Cart.css";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.itemWasDeletedFromCart = this.itemWasDeletedFromCart.bind(this);
    this.sumOfItem = this.sumOfItem.bind(this);
    this.state = {
      deletedItemIndex: null,
      countItems: 1,
    };
  }

  sumOfItem(x) {
    this.setState({ countItems: x });
  }

  itemWasDeletedFromCart(item) {
    this.setState({ deletedItemIndex: item });
  }

  getTotalPrice() {
    let total = 0;
    this.props.product.filter((element) => {
      let price = element.item[0].prices.find(
        (price) => price.currency.label === this.props.currency
      );
      total += price.amount * element.counter;
      return total;
    });
    return (
      getSymbolFromCurrency(this.props.currency) +
      (total * 0.21 + total).toFixed(2)
    );
  }

  getTaxPrice() {
    let total = 0;
    this.props.product.filter((element) => {
      let price = element.item[0].prices.find(
        (price) => price.currency.label === this.props.currency
      );
      total += price.amount * element.counter;
      return total * 0;
    });
    return (
      getSymbolFromCurrency(this.props.currency) + (total * 0.21).toFixed(2)
    );
  }

  render() {
    return (
      <div className="cart-container">
        <div className="cart-name">CART</div>
        {this.props.product.map((item, index) => {
          return (
            <div className="cart-content" key={index}>
              <div className="cart-content-left" key={item.item[0].name}>
                <CartOverlayItem
                  selectedAttributes={this.props.selectedAttributes}
                  attrChange={this.props.attrChange}
                  product={item}
                  currency={this.props.currency}
                  price={item.item[0].prices}
                />
              </div>
              <div className="cart-content-right">
                <div className="cart-counter">
                  <CartOverlayItemCounter
                    itemId={item.itemId}
                    selectedAttributes={item.selectedAttributes}
                    item={item}
                    quantity={item.counter}
                    countItems={this.sumOfItem}
                    id={this.props.product.indexOf(item)}
                    toDeleteItem={this.itemWasDeletedFromCart}
                    deleteItem={this.props.toDeleteItem}
                    countSelectedItem={this.props.countSelectedItem}
                  />
                </div>
                <div className="cart-img">
                  <CartImg
                    images={item.item[0].gallery}
                    width={"151px"}
                    height={"185px"}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="cart-footer">
          <div style={{ marginBottom: "8px" }}>
            Tax 21%:{" "}
            <span className="cart-footer-right">{this.getTaxPrice()}</span>
          </div>
          <div style={{ marginBottom: "8px" }}>
            Quantity:{" "}
            <span className="cart-footer-right">
              {this.props.product.length}
            </span>
          </div>
          <div className="cart-footer-right">Total: {this.getTotalPrice()}</div>
          <button
            className={`${
              this.props.selectedAttributes.length > 0
                ? "add-to-cart"
                : "add-to-cart-disabled"
            }`}
          >
            ORDER
          </button>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  product: PropTypes.array,
  selectedAttributes: PropTypes.func,
  attrChange: PropTypes.func,
  currency: PropTypes.string,
  toDeleteItem: PropTypes.func,
  countSelectedItem: PropTypes.func,
};

export default Cart;
