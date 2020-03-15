import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  actions as userActions,
  getCurrentTab,
  getDeletingOrderId,
  getCommentingOrderId,
  getCurrentOrderComment,
  getCurrentOrderStars
} from "../../../../redux/modules/user";
import OrderItem from "../../components/OrderItem";
import Confirm from "../../../../components/Confirm";
import "./style.css";

const tabTitles = ["全部订单", "待付款", "可使用", "退款/售后"];

class UserMain extends Component {
  render() {
    const { currentTab, data, deletingOrderId, userActions } = this.props;
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {tabTitles.map((item, index) => {
            return (
              <div
                key={index}
                className="userMain__tab"
                onClick={this.handleClickTab.bind(this, index)}
              >
                <span
                  className={
                    currentTab === index
                      ? "userMain__title userMain__title--active"
                      : "userMain__title"
                  }
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <div className="userMain__content">
          {data && data.length > 0
            ? this.renderOrderList(data)
            : this.renderEmpty()}
        </div>
        {deletingOrderId ? (
          <Confirm
            content="确定删除该订单吗？"
            cancelText="取消"
            confirmText="确定"
            onCancel={userActions.hideDeleteDialog}
            onConfirm={userActions.deleteOrder}
          />
        ) : null}
      </div>
    );
  }

  renderOrderList = data => {
    const { commentingOrderId, orderComment, orderStar } = this.props
    return data.map(item => {
      return (
        <OrderItem
          key={item.id}
          data={item}
          isCommenting={item.id === commentingOrderId}
          comment={item.id === commentingOrderId ? orderComment : ""}
          stars={item.id === commentingOrderId ? orderStar : 0}
          onRemove={this.handleRemove.bind(this, item.id)}
          onComment={this.handleComment}
          onCommentChange={this.handleCommentChange}
          onStarsChange={this.handleStarsChange}
          onSubmitComment={this.handleSubmitComment}
          onCancelComment={this.handleCancelComment}
        />
      );
    });
  };

  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    );
  };

  // 点击标签
  handleClickTab = index => {
    this.props.userActions.setCurrentTab(index);
  };

  // 点击移除
  handleRemove = (orderId) => {
    this.props.userActions.showDeleteDialog(orderId);
  };

  handleCommentChange = (comment) => {
    const {setComment} = this.props.userActions
    setComment(comment)
  }

  handleStarsChange = (stars) => {
    const {setStars} = this.props.userActions
    setStars(stars)
  }

  handleComment = (orderId) => {
    const {showCommentArea} = this.props.userActions
    showCommentArea(orderId)
  }

  handleSubmitComment = () => {
    const {submitComment} = this.props.userActions
    submitComment()
  }
  
  handleCancelComment = () => {
    const {hideCommentArea} = this.props.userActions
    hideCommentArea()
  }  
}

const mapStateToProps = (state, props) => {
  return {
    currentTab: getCurrentTab(state),
    deletingOrderId: getDeletingOrderId(state),
    commentingOrderId: getCommentingOrderId(state),
    orderComment: getCurrentOrderComment(state),
    orderStar: getCurrentOrderStars(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMain);
