import React, { Component } from "react";
import "./style.css";

class PopularSearch extends Component {
  render() {
    const { popularKeywords: data } = this.props;
    return (
      <div className="popularSearch">
        {data.map((item, index) => {
          return (
            <span
              key={item.id}
              className="popularSearch__item"
              onClick={(e) => this.handleClick(item, e)}
            >
              {item.keyword}
            </span>
          );
        })}
      </div>
    );
  }

  handleClick = item => {
    this.props.onClickItem(item)
  }
}

export default PopularSearch;
