import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  actions as purchaseActions,
  getTipStatus,
  getQuantity,
  getProduct,
  getTotalPrice
} from "../../redux/modules/purchase";
import { actions as detailActions } from "../../redux/modules/detail";
import Header from "../../components/Header";
import PurchaseForm from "./components/PurchaseForm";
import Tip from "../../components/Tip";
import { getUsername } from "../../redux/modules/login";

class Purchase extends Component {
  render() {
    const { product, phone, quantity, showTip, totalPrice } = this.props;
    return (
      <div>
        <Header title="下单" onBack={this.handleBack} />
        {product ? (
          <PurchaseForm
            product={product}
            phone={phone}
            quantity={quantity}
            totalPrice={totalPrice}
            onSubmit={this.handleSubmit}
            onSetQuantity={this.handleSetQuantity}
          />
        ) : null}
        {showTip ? (
          <Tip message="购买成功！" onClose={this.handleCloseTip} />
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    const { product } = this.props;
    if (!product) {
      const productId = this.props.match.params.id;
      this.props.detailActions.loadProductDetail(productId);
    }
  }

  componentWillUnmount() {
    this.props.purchaseActions.setOrderQuantity(1);
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  handleCloseTip = () => {
    this.props.purchaseActions.closeTip();
  };

  handleSubmit = () => {
    const productId = this.props.match.params.id;
    const { submitOrder } = this.props.purchaseActions;
    submitOrder(productId);
  };

  handleSetQuantity = quantity => {
    const { setOrderQuantity } = this.props.purchaseActions;
    setOrderQuantity(quantity);
  };
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id;
  return {
    quantity: getQuantity(state),
    showTip: getTipStatus(state),
    product: getProduct(state, productId),
    phone: getUsername(state),
    totalPrice: getTotalPrice(state, productId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseActions: bindActionCreators(purchaseActions, dispatch),
    detailActions: bindActionCreators(detailActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
