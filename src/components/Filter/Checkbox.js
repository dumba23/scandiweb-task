import React, { Component } from "react";
import PropTypes from "prop-types";

export class Checkbox extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, e) {
    this.props.handleAddFilter(this.props.options.name, value);
    if (e === false) {
      this.props.handleResetFilter(this.props.options.name);
    }
  }

  render() {
    const { options } = this.props;
    const { items, name } = options;

    return (
      <div className="">
        <div>{name}</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {items.map((item, idx) => {
            return (
              <div key={idx}>
                <input
                  type="checkbox"
                  value={item}
                  onChange={(e) =>
                    this.handleChange(e.target.value, e.target.checked)
                  }
                />
                <label>{item}</label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Checkbox.propTypes = {
  options: PropTypes.object,
  handleAddFilter: PropTypes.func,
  handleResetFilter: PropTypes.func,
  reset: PropTypes.bool,
};

export default Checkbox;
