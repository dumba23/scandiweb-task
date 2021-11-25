import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// A simple component that shows the pathname of the current location
class ShowLocation extends React.Component {
  static propTypes = {
        location: PropTypes.object.isRequired,
  };

  render() {
    const { location } = this.props;

    return location.pathname
  }
}

export default withRouter(ShowLocation);