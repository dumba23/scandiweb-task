import React, { Component } from "react";
import PropTypes from "prop-types";

export class Capacity extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      defaultValue: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset && this.props.reset === true) {
      this.setState({
        defaultValue: "",
      });
    }
  }

  handleChange(value) {
    this.props.handleAddFilter(this.props.options.name, value);
    this.setState({ defaultValue: value });
  }

  render() {
    const { defaultValue } = this.state;
    const { options } = this.props;
    const { items, name } = options;

    return (
      <div className="">
        <div>{name}:</div>
        <select
          value={defaultValue}
          onChange={(e) => this.handleChange(e.target.value)}
        >
          <option value="" disabled>
            Choose here
          </option>
          {items.map((item, idx) => {
            return (
              <option key={idx} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

Capacity.propTypes = {
  options: PropTypes.object,
  handleAddFilter: PropTypes.func,
  reset: PropTypes.bool,
};

export default Capacity;
