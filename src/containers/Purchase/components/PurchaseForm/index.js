import React, { Component } from "react";
import "./style.css";

export default class PurchaseForm extends Component {
  render() {
    const {
      quantity,
      phone,
      totalPrice
    } = this.props;
    return (
      <div className="purchaseForm">
        <div className="purchaseForm__wrapper">
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">数量</div>
            <div className="purchaseForm__rowValue">
              <span
                className="purchaseForm__counter--dec"
                onClick={this.handleDecrease}
              >
                -
              </span>
              <input
                type="number"
                className="purchaseForm__quantity"
                value={quantity}
                onChange={this.handleChange}
              />
              <span
                className="purchaseForm__counter--inc"
                onClick={this.handleIncrease}
              >
                +
              </span>
            </div>
          </div>

          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">小计</div>
            <div className="purchaseForm__rowValue">
              <span className="purchaseForm__totalPrice">￥{totalPrice}</span>
            </div>
          </div>

          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">手机号</div>
            <div className="purchaseForm__rowValue">{phone}</div>
          </div>
        </div>

        <ul className="purchaseForm__remark">
          <li className="purchaseForm__remarkItem">
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持随时退</span>
          </li>
          <li>
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持过期退</span>
          </li>
        </ul>

        <a
          className="purchaseForm__submit"
          href="##"
          onClick={this.handleClick}
        >
          提交订单
        </a>
      </div>
    );
  }

  handleDecrease = () => {
    const { quantity, onSetQuantity } = this.props;
    quantity >= 2 && onSetQuantity(quantity - 1);
  };

  handleIncrease = () => {
    const { quantity, onSetQuantity } = this.props;
    onSetQuantity(quantity + 1);
  };

  handleChange = e => {
    const { onSetQuantity } = this.props;
    const newQuantity = Number(e.target.value)
    if (newQuantity > 0) {
      onSetQuantity(newQuantity);
    }
  };

  handleClick = () => {
    this.props.onSubmit();
  };
}
