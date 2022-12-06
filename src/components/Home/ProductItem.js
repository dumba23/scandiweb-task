import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import getSymbolFromCurrency from "currency-symbol-map";

import circle from "./svgs/circle-icon.png";
import "./ProductItem.css";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(e) {
    if (e.target === this.ref.current) {
      let defaultAttributes = [];
      this.props.product.attributes.forEach((item) => {
        defaultAttributes.push({
          id: item.name,
          itemId: this.props.product.id,
          value: item.items[0].displayValue,
        });
      });
      this.props.onAdd(
        [this.props.product],
        this.props.product.id,
        defaultAttributes
      );
    } else {
      this.props.onOpen(this.props.product);
      this.props.history.push(`/PDP/${this.props.product.id}`);
    }
  }

  handleInStockImg() {
    if (this.props.product.inStock) {
      return (
        <img
          alt="product"
          src={this.props.product.gallery[0]}
          max-width="354px"
          height="330px"
        ></img>
      );
    } else
      return (
        <figure className="textover">
          <img
            className="outStock"
            alt="product"
            src={this.props.product.gallery[0]}
            width="354px"
            height="330px"
          ></img>
          <figcaption className="outStock-txt">Out of stock</figcaption>
        </figure>
      );
  }
  render() {
    return (
      <div
        className="product-clothes"
        key={this.props.product.name}
        onClick={(e) => this.handleOpen(e)}
      >
        <div className="img">{this.handleInStockImg()}</div>
        {this.props.product.inStock ? (
          <div className="circle-icon">
            <img src={circle} alt="product" ref={this.ref} />
          </div>
        ) : null}
        <div className="content-clothes">
          <div className="name">
            {`${this.props.product.brand} `}
            {this.props.product.name}
          </div>
          <div className="prices">
            {getSymbolFromCurrency(this.props.changeCurrency)}
            {this.props.product.prices.map((price) => {
              if (price.currency.label === this.props.changeCurrency) {
                var x = 0;
                x = price.amount;
              }
              return x;
            })}
          </div>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  onOpen: PropTypes.func,
  product: PropTypes.object,
  history: PropTypes.object,
  changeCurrency: PropTypes.string,
  onAdd: PropTypes.func,
};

export default withRouter(ProductItem);
