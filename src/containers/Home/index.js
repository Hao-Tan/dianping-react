import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import Likelist from './components/Likelist'
import HomeHeader from './components/HomeHeader'
import Banner from './components/Banner'
import Activity from "./components/Activity"
import Footer from '../../components/Footer'
import { actions as homeActions, getLikes, getDiscounts, getPageCountOfLikes } from '../../redux/modules/home'


class Home extends Component {
  render() {
    const {likes, discounts, pageCount} = this.props
    
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Activity />
        <Category />
        <Headline />
        <Discount data={discounts}/>
        <Likelist data={likes} pageCount={pageCount} fetchData={this.props.homeActions.loadLikes}/>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    this.props.discounts.length === 0 && this.props.homeActions.loadDiscounts();
  }
}

const mapStateToProps = (state, props) => ({
  likes: getLikes(state),
  discounts: getDiscounts(state),
  pageCount: getPageCountOfLikes(state)
})

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(homeActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
