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
        <div
            className=""
          >
            <Filter attributes={this.props.attributes} />
          </div>
        <div className="title">
          <div>{this.Capitalize(this.props.categoryName)}</div>
        </div>
        <div className="products">
          {this.props.products.map((product) => {
            return (
              <ProductItem
                key={product.name}
                onOpen={this.props.onOpen}
                product={product}
                changeCurrency={this.props.changeCurrency}
                onAdd={this.props.onAdd}
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
  onAdd: PropTypes.func,
};

export default ProductList;
