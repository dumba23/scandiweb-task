import React, { Component } from "react";
import { Query } from "react-apollo";
import { CATEGORIES } from "../../queries";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import ProductList from "./ProductList";
import "./Category.css";

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      filteredProducts: [],
    };
  }

  getAttribute(product) {
    let attributes = product.attributes;

    let newAttributes = {};
    for (let atr of attributes) {
      newAttributes[atr.name] = atr.name;
      newAttributes.items = atr.items;
    }
    return newAttributes;
  }

  handleProductsFilter(products) {
    const {
      history: {
        location: { search },
      },
    } = this.props;
    const params = new URLSearchParams(search);

    let filteredProducts = [];
    for (let product of products) {
      let productAttribute = this.getAttribute(product);
      let showProduct = true;
      params.forEach((value, key) => {
        if (productAttribute[`${key}`] === undefined) {
          showProduct = false;
        }
      });

      if (showProduct) {
        const sizeCheck = new URLSearchParams(search).get("Size");
        if (
          sizeCheck !== null &&
          product.attributes[0].items.filter(
            (item) => item.displayValue === sizeCheck
          ).length > 0
        ) {
          filteredProducts.push(product);
        } else {
          if (
            product.attributes.length !== 0 &&
            product.attributes[0].name !== "Size"
          )
            filteredProducts.push(product);
        }
      }
    }

    return filteredProducts;
  }

  getAttributes(products) {
    let attributes = products?.map((element) =>
      element.attributes.map((i) => i)
    );
    attributes = attributes.reduce((a, b) => a.concat(b), []);

    let newAttributes = [];
    attributes.forEach((element) => {
      let items = element?.items;
      let name = element?.name;
      newAttributes = newAttributes.concat({ name, items });
    });

    let filteredAttributes = {};

    newAttributes.forEach((element) => {
      let name = element.name;
      let items = element.items.map((i) => i.displayValue);

      if (!filteredAttributes[name]) {
        filteredAttributes[name] = { name, items };
      } else if (
        filteredAttributes[name].items[0] !== items[0] &&
        filteredAttributes[name].name !== "Capacity"
      ) {
        filteredAttributes[name] = {
          name,
          items: [filteredAttributes[name].items, items],
        };
      }
    });

    return filteredAttributes;
  }

  render() {
    const { activeCategory } = this.props;

    return (
      <div className="container-products">
        <Query query={CATEGORIES} variables={{ input: activeCategory }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            if (data) {
              let attributes = this.getAttributes(data.category.products);
              let filteredProducts = this.handleProductsFilter(
                data.category.products
              );
              return (
                <ProductList
                  onOpen={this.props.onOpen}
                  products={
                    this.props.history.location.search.length > 0
                      ? filteredProducts
                      : data.category.products
                  }
                  categoryName={data.category.name}
                  changeCurrency={this.props.activeCurrency}
                  attributes={attributes}
                  onAdd={this.props.onAdd}
                />
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

Category.propTypes = {
  activeCategory: PropTypes.string,
  onOpen: PropTypes.func,
  activeCurrency: PropTypes.string,
  history: PropTypes.object,
  onAdd: PropTypes.func,
};

export default withRouter(Category);
