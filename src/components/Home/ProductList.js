import React, { Component } from "react";
import PropTypes from "prop-types";

import ProductItem from "./ProductItem";
import "./ProductList.css";
import Filter from "../Filter/Filter";

export class ProductList extends Component {
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (
      <div className="container-clothes">
        <div className="title">
          <h1>{this.Capitalize(this.props.categoryName)}</h1>
        </div>
        <div className="products">
          <div
            style={{ position: "absolute", left: "0" }}
            className="filter-container"
          >
            <Filter attributes={this.props.attributes} />
          </div>
          {this.props.products.map((product) => {
            return (
              <ProductItem
                key={product.name}
                onOpen={this.props.onOpen}
                product={product}
                changeCurrency={this.props.changeCurrency}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  categoryName: PropTypes.string,
  products: PropTypes.array,
  onOpen: PropTypes.func,
  changeCurrency: PropTypes.string,
  attributes: PropTypes.object,
};

export default ProductList;
