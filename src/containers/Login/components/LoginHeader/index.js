import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default class LoginHeader extends Component {
  render() {
    return (
      <header className="loginHeader">
        <Link to="/" className="loginHeader__back"></Link>
        <span className="loginHeader__title">账号秘密登录</span>
      </header>
    );
  }
}
