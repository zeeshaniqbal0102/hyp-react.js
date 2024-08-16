import React, { Component } from "react";
import { Link } from "react-router-dom";

class Anchor extends Component {
  render() {
    const { linkType, link, text } = this.props;
    return linkType === 1 ? (
      <a href={link} >{text}</a>
    ) : (
      <Link to={link}>{text}</Link>
    );
  }
}
export default Anchor;
