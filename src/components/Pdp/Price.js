import React, { Component } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import PropTypes from "prop-types";

export class Price extends Component {
  render() {
    return (
      <div className="price-container">
        <div
          className="price-amount"
          style={{ fontSize: "16px", fontFamily: 'Raleway', fontWeight: 500 }}
        >
          {getSymbolFromCurrency(this.props.currency)}
          {this.props.price.map((price) => {
            if (price.currency.label === this.props.currency) {
              var x = 0;
              x = price.amount;
            }
            return x;
          })}
        </div>
      </div>
    );
  }
}

Price.propTypes = {
  currency: PropTypes.string,
  price: PropTypes.array,
};

export default Price;
