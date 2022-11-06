import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

export class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    const {
      options: { name },
    } = this.props;
    const color = new URLSearchParams(this.props.history.location.search).get(
      "Color"
    );
    if (color === null) {
      this.props.handleAddFilter(name, value);
    } else {
      this.props.handleResetFilter(name);
    }
  }

  render() {
    const { options } = this.props;
    const { items, name } = options;

    const color = new URLSearchParams(this.props.history.location.search).get(
      "Color"
    );

    return (
      <div className="">
        <div>{name}:</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {items.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => this.handleChange(item)}
                style={{
                  backgroundColor: `${item.toLowerCase()}`,
                  border: ` ${
                    color === item ? "2px solid #4caf50" : "2px solid black"
                  }`,
                  width: "20px",
                  height: "20px",
                  margin: "1px",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ColorBox.propTypes = {
  options: PropTypes.object,
  history: PropTypes.object,
  handleAddFilter: PropTypes.func,
  handleResetFilter: PropTypes.func,
};

export default withRouter(ColorBox);
