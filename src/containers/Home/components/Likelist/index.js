import React, { Component } from "react";
import LikeItem from "../LikeItem";
import Loading from "../../../../components/Loading";
import "./style.css";

export default class Likelist extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.removeEventListener = false;
  }

  render() {
    const { data, pageCount } = this.props;
    
    return (
      <div ref={this.myRef} className="likeList">
        <div className="likeList__header">猜你喜欢</div>
        <ul className="likeList__list">
          {data.map((item, index) => {
            return <LikeItem key={index} data={item} />;
          })}
        </ul>

        {pageCount < 3 ? (
          <Loading />
        ) : (
          <a href="##" className="likeList__viewAll">
            查看更多
          </a>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.pageCount < 3) {
      document.addEventListener("scroll", this.handleScroll);
    } else {
      this.removeEventListener = true
    }
    
    if (this.props.pageCount === 0) {
      this.props.fetchData()
    }
    this.props.fetchData();
  }

  componentDidUpdate() {
    if (this.props.pageCount >= 3 && !this.removeEventListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeEventListener = true;
    }
  }

  componentWillUnmount() {
    if (!this.removeEventListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeEventListener = true;
    }
  }

  handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;

    if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
      this.props.fetchData();
    }
  };
}
