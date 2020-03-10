import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchBox from "./components/SearchBox";
import PopularSearch from "./components/PopularSearch";
import SearchHistory from "./components/SearchHistory";
import {
  actions as searchActions,
  getPopularKeywords,
  getRelatedKeywords,
  getInputText,
  getHistoryKeywords
} from "../../redux/modules/search";

class Search extends Component {
  render() {
    const {
      popularKeywords,
      relatedKeywords,
      inputText,
      historyKeywords
    } = this.props;
    return (
      <div>
        <SearchBox
          inputText={inputText}
          relatedKeywords={relatedKeywords}
          onChange={this.handleChangeInput}
          onCancel={this.handleCancel}
          onClear={this.handleClear}
          onClickItem={this.handleClickItem}
        />
        <PopularSearch
          popularKeywords={popularKeywords}
          onClickItem={this.handleClickItem}
        />
        <SearchHistory
          historyKeywords={historyKeywords}
          onClickItem={this.handleClickItem}
          onClearHistoryKeywords={this.handleClearHistoryKeywords}
        />
      </div>
    );
  }

  componentDidMount() {
    this.props.searchActions.loadPopularKeywords();
  }

  componentWillUnmount() {
    const { clearInputText } = this.props.searchActions;
    clearInputText()
  }

  handleChangeInput = text => {
    const { setInputText, loadRelatedKeywords } = this.props.searchActions
    setInputText(text)
    loadRelatedKeywords(text)
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleClear = () => {
    this.props.searchActions.clearInputText();
  };

  handleClickItem = item => {
    const {
      setInputText,
      addHistoryKeyword,
      loadRelatedShops
    } = this.props.searchActions;
    setInputText(item.keyword);
    addHistoryKeyword(item.id);
    loadRelatedShops(item.id)
    this.props.history.push("/searchResult")
  };

  handleClearHistoryKeywords = () => {
    const { clearHistoryKeywords } = this.props.searchActions;
    clearHistoryKeywords()
  }
}

const mapStateToProps = (state, props) => {
  return {
    popularKeywords: getPopularKeywords(state),
    relatedKeywords: getRelatedKeywords(state),
    inputText: getInputText(state),
    historyKeywords: getHistoryKeywords(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(
      searchActions,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
