import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "./Size";
import ColorBox from "./ColorBox";
import Capacity from "./Capacity";
import Checkbox from "./Checkbox";

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleResetFilter = this.handleResetFilter.bind(this);
    this.handleFilterOptionReset = this.handleFilterOptionReset.bind(this);
    this.state = {
      filters: {},
      reset: false,
    };
  }

  handleAddFilter(key, value) {
    const { filters } = this.state;
    const params = new URLSearchParams();
    let filterOptions = {};

    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [key]: value,
      },
    }));

    filterOptions = Object.assign({}, filters, { [key]: value });

    Object.keys(filterOptions).map((item) =>
      params.append(item, filterOptions[item])
    );
    this.setState({ reset: false });

    return this.props.history.push(`/?${params}`);
  }

  handleResetFilter() {
    const { history } = this.props;
    const {
      location: { pathname },
    } = history;

    history.replace(pathname);

    this.setState({ filters: {}, reset: true });
  }

  handleFilterOptionReset(item) {
    const { filters } = this.state;
    const params = new URLSearchParams();
    let newFilters = filters;
    delete newFilters[item];
    this.setState({ filters: newFilters });

    newFilters = Object.assign({}, filters);

    Object.keys(newFilters).map((item) =>
      params.append(item, newFilters[item])
    );

    return this.props.history.push(`/?${params}`);
  }

  render() {
    const { attributes } = this.props;
    const { reset } = this.state;

    const attributeKeys = Object.keys(attributes);

    return (
      <div className="filter-container">
        {attributeKeys.map((item, idx) => {
          switch (item) {
            case "Size":
              return (
                <Select
                  key={idx}
                  options={attributes[item]}
                  handleAddFilter={this.handleAddFilter}
                  reset={reset}
                />
              );
            case "Color":
              return (
                <ColorBox
                  key={idx}
                  options={attributes[item]}
                  handleAddFilter={this.handleAddFilter}
                  handleResetFilter={this.handleFilterOptionReset}
                />
              );
            case "Capacity":
              return (
                <Capacity
                  key={idx}
                  options={attributes[item]}
                  handleAddFilter={this.handleAddFilter}
                  reset={reset}
                />
              );
            case "With USB 3 ports":
              return (
                <Checkbox
                  key={idx}
                  options={attributes[item]}
                  handleAddFilter={this.handleAddFilter}
                  handleResetFilter={this.handleFilterOptionReset}
                  reset={reset}
                />
              );
            case "Touch ID in keyboard":
              return (
                <Checkbox
                  key={idx}
                  options={attributes[item]}
                  handleAddFilter={this.handleAddFilter}
                  handleResetFilter={this.handleFilterOptionReset}
                  reset={reset}
                />
              );
          }
        })}
        <button
          className="filter-reset-button"
          onClick={this.handleResetFilter}
        >
          Reset
        </button>
      </div>
    );
  }
}

Filter.propTypes = {
  attributes: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Filter);
