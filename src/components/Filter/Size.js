import React, { Component } from "react";
import PropTypes from "prop-types";

export class Select extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      defaultValue: "",
    };
  }

  handleChange(value) {
    this.props.handleAddFilter(this.props.options.name, value);
    this.setState({ defaultValue: value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset && this.props.reset === true) {
      this.setState({
        defaultValue: "",
      });
    }
  }

  render() {
    const { defaultValue } = this.state;
    const { options } = this.props;
    const { items, name } = options;
    let attributeValues = [];

    for (let i = 0; i < items.length; i++) {
      attributeValues = [...attributeValues, ...items[i]];
    }

    return (
      <div className="filter-item">
        <div>{name}:</div>
        <div style={{ margin: "1px" }}>
          <select
            value={defaultValue}
            onChange={(e) => this.handleChange(e.target.value)}
          >
            <option value="" disabled>
              Choose here
            </option>
            {attributeValues.map((value, idx) => {
              return (
                <option value={value} key={idx}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.object,
  handleAddFilter: PropTypes.func,
  reset: PropTypes.bool,
};

export default Select;
