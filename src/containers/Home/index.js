import React, { Component } from 'react'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import Likelist from './components/Likelist'
import HomeHeader from './components/HomeHeader'
import Banner from './components/Banner'
import Activity from "./components/Activity"
import Footer from '../../components/Footer'


export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Activity />
        <Category />
        <Headline />
        <Discount />
        <Likelist />
        <Footer />
      </div>
    );
  }
}
