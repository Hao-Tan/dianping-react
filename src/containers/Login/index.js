import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  actions as loginActions,
  getUsername,
  getPassword,
  isLogin
} from "../../redux/modules/login";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";

class Login extends Component {
  render() {
    const { username, password, login } = this.props;
    if (!login) {
      return <Redirect to="/user" />;
    }
    return (
      <div>
        <LoginHeader />
        <LoginForm
          username={username}
          password={password}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }

  handleChange = e => {
    if (e.target.name === "username") {
      this.props.loginActions.setUsername(e.target.value);
    } else if (e.target.name === "password") {
      this.props.loginActions.setPassword(e.target.value);
    }
  };

  handleSubmit = () => {
    this.props.loginActions.login();
  };
}

const mapStateToProps = (state, props) => ({
  username: getUsername(state),
  password: getPassword(state),
  login: isLogin(state)
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
