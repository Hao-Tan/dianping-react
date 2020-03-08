import React, { Component } from "react";
import "./style.css";

export default class Remark extends Component {
  render() {
    const { purchaseNotes, vadilityPeriod } = this.props.data;
    return (
      <div className="remark">
        <div className="remark__header">
          购买须知
          <i className="remark__icon"></i>
        </div>

        <div className="remark__list">
          <dl className="remark__item">
            <dt className="remark__itemTitle">有效期</dt>
            <dd className="remark__itemDesc">{vadilityPeriod}</dd>
          </dl>
          {purchaseNotes.map((item, index) => (
            <dl className="remark__item" key={index}>
              <dt className="remark__itemTitle">{item.title}</dt>
              <dd className="remark__itemDesc">{item.content}</dd>
            </dl>
          ))}
        </div>
      </div>
    );
  }
}
