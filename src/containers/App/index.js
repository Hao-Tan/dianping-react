import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";
import { actions as appActions, getError } from "../../redux/modules/app";
import { isLogin } from "../../redux/modules/login";
import PrivateRoute from "../PrivateRoute";
import asyncComponent from '../../utils/asyncComponent'

const [Home, ProductDetail, Search, SearchResult, Login, User, Purchase] = [
  asyncComponent(() => import("../Home")),
  asyncComponent(() => import("../ProductDetail")),
  asyncComponent(() => import("../Search")),
  asyncComponent(() => import("../SearchResult")),
  asyncComponent(() => import("../Login")),
  asyncComponent(() => import("../User")),
  asyncComponent(() => import("../Purchase"))
];

class App extends Component {
  render() {
    const {
      error,
      appActions: { clearError }
    } = this.props;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/search" component={Search} />
            <Route path="/searchResult" component={SearchResult} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/user" component={User} />
            <PrivateRoute path="/purchase/:id" component={Purchase} />
          </Switch>
        </Router>
        {error ? <ErrorToast msg={error} clearError={clearError} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: getError(state),
    login: isLogin(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
