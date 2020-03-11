import React, { Component } from "react";
import { connect } from "react-redux";
import { isLogin } from "../../redux/modules/login";
import {
  Route,
  Redirect
} from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const {
      component: Component,
      login,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          return login ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  login: isLogin(state)
});

export default connect(mapStateToProps)(
  PrivateRoute
);
