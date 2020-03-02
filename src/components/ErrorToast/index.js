import React, { Component } from "./node_modules/react";
import "./style.css";

export default class ErrorToast extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div className="errorToast">
        <div className="errorToast__text">{msg}</div>
      </div>
    );
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.clearError();
    }, 3000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
}
