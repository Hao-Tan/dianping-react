import { combineReducers } from "redux";
import url from "../../utils/url";
import { FETCH_DATA } from "../middlewares/api";
import {
  schema as keywordsSchema,
  getKeywordById
} from "./entities/keywords";
import { schema as shopsSchema, getShop } from "./entities/shops";

const initialState = {
  inputText: "",
  popularKeywords: {
    ids: [],
    isFetching: false
  },
  /**
   * relatedKeywords结构
   * {
   *   'inputTextKeyword': {
   *      isFetching: false,
   *      ids: []
   *  }
   * }
   */
  relatedKeywords: {},
  // 历史记录保存关键词记录
  historyKeywords: [],
  /**
   * searchedShopKeywords结构
   * {
   *   'searchKeyword': {
   *      isFetching: false,
   *      ids: []
   *  }
   * }
   */
  searchedShopsKeywords: {}
};

const types = {
  // 获取热门搜索关键词
  FETCH_POPULAR_KEYWORDS_REQUEST:
    "SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST",
  FETCH_POPULAR_KEYWORDS_SUCCESS:
    "SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS",
  FETCH_POPULAR_KEYWORDS_FAILURE:
    "SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE",
  // 获取搜索联想结果
  FETCH_RELATED_KEYWORDS_REQUEST:
    "SEARCH/FETCH_RELATED_KEYWORDS_REQUEST",
  FETCH_RELATED_KEYWORDS_SUCCESS:
    "SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS",
  FETCH_RELATED_KEYWORDS_FAILURE:
    "SEARCH/FETCH_RELATED_KEYWORDS_FAILURE",
  // 搜索框内容变更
  SET_INPUT_TEXT: "SEARCH/SET_INPUT_TEXT",
  CLEAR_INPUT_TEXT: "SEARCH/CLEAR_INPUT_TEXT",
  // 获取历史查询记录
  ADD_HISTORY_KEYWORDS:
    "SEARCH/ADD_HISTORY_KEYWORDS",
  CLEAR_HISTORY_KEYWORDS:
    "SEARCH/CLEAR_HISTORY_KEYWORDS",
  // 查询店铺
  FETCH_SHOPS_REQUEST:
    "SEARCH/FETCH_SHOPS_REQUEST",
  FETCH_SHOPS_SUCCESS:
    "SEARCH/FETCH_SHOPS_SUCCESS",
  FETCH_SHOPS_FAILURE:
    "SEARCH/FETCH_SHOPS_FAILURE"
};

export const actions = {
  loadPopularKeywords() {
    return (dispatch, getState) => {
      const {
        ids
      } = getState().search.popularKeywords;
      if (ids.length > 0) {
        return null;
      }
      const endpoint = url.getPopularKeywords();
      return dispatch(
        fetchPopularKeywords(endpoint)
      );
    };
  },
  loadRelatedKeywords(text) {
    return (dispatch, getState) => {
      const {
        relatedKeywords
      } = getState().search;
      if (relatedKeywords[text]) {
        return null;
      }
      const endpoint = url.getRelatedKeywords(
        text
      );
      return dispatch(
        fetchRelatedKeywords(text, endpoint)
      );
    };
  },
  loadRelatedShops(text) {
    return (dispatch, getState) => {
      const {
        searchedShopsKeywords
      } = getState().search;
      if (searchedShopsKeywords[text]) {
        return null;
      }
      const endpoint = url.getRelatedShops(text);
      return dispatch(
        fetchRelatedShops(text, endpoint)
      );
    };
  },
  setInputText(text) {
    return {
      type: types.SET_INPUT_TEXT,
      text
    };
  },
  clearInputText() {
    return {
      type: types.CLEAR_INPUT_TEXT
    };
  },
  addHistoryKeyword(keywordId) {
    return {
      type: types.ADD_HISTORY_KEYWORDS,
      text: keywordId
    };
  },
  clearHistoryKeywords() {
    return {
      type: types.CLEAR_HISTORY_KEYWORDS
    };
  }
};

const fetchPopularKeywords = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILURE
    ],
    endpoint,
    schema: keywordsSchema
  }
});

const fetchRelatedKeywords = (
  text,
  endpoint
) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_KEYWORDS_REQUEST,
      types.FETCH_RELATED_KEYWORDS_SUCCESS,
      types.FETCH_RELATED_KEYWORDS_FAILURE
    ],
    endpoint,
    schema: keywordsSchema
  },
  text
});

const fetchRelatedShops = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOPS_REQUEST,
      types.FETCH_SHOPS_SUCCESS,
      types.FETCH_SHOPS_FAILURE
    ],
    endpoint,
    schema: shopsSchema
  },
  text
});

const popularKeywords = (
  state = initialState.popularKeywords,
  action
) => {
  switch (action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const relatedKeywords = (
  state = initialState.relatedKeywords,
  action
) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(
          state[action.text],
          action
        )
      };
    default:
      return state;
  }
};

const relatedKeywordsByText = (
  state = { isFetching: false, ids: [] },
  action
) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const searchedShopsKeywords = (
  state = initialState.searchedShopsKeywords,
  action
) => {
  switch (action.type) {
    case types.FETCH_SHOPS_REQUEST:
    case types.FETCH_SHOPS_SUCCESS:
    case types.FETCH_SHOPS_FAILURE:
      return {
        ...state,
        [action.text]: searchedShops(
          state[action.text],
          action
        )
      };
    default:
      return state;
  }
};

const searchedShops = (
  state = { isFetching: false, ids: [] },
  action
) => {
  switch (action.type) {
    case types.FETCH_SHOPS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_SHOPS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const inputText = (
  state = initialState.inputText,
  action
) => {
  switch (action.type) {
    case types.SET_INPUT_TEXT:
      return action.text;
    case types.CLEAR_INPUT_TEXT:
      return "";
    default:
      return state;
  }
};

const historyKeywords = (
  state = initialState.historyKeywords,
  action
) => {
  switch (action.type) {
    case types.ADD_HISTORY_KEYWORDS:
      const data = state.filter(
        item => item !== action.text
      );
      return [ action.text, ...data];
    case types.CLEAR_HISTORY_KEYWORDS:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords,
  searchedShopsKeywords
});

// selectors
export const getPopularKeywords = state => {
  return state.search.popularKeywords.ids.map(
    id => {
      return getKeywordById(state, id);
    }
  );
};

export const getRelatedKeywords = state => {
  const text = state.search.inputText;
  if (!text || text.trim().length === 0) {
    return [];
  }
  const relatedKeywords =
    state.search.relatedKeywords[text];
  if (!relatedKeywords) {
    return [];
  }
  return relatedKeywords.ids.map(id => {
    return getKeywordById(state, id);
  });
};

export const getInputText = state => {
  return state.search.inputText;
};

export const getHistoryKeywords = state => {
  return state.search.historyKeywords.map(id => {
    return getKeywordById(state, id);
  });
};

export const getSearchedShops = state => {
  const keywordId = state.search.historyKeywords[0]
  if (!keywordId) {
    return []
  }
  const shops = state.search.searchedShopsKeywords[keywordId].ids
  return shops.map(id => {
    return getShop(state, id)
  })
}

export const getCurrentKeyword = state => {
  const keywordId =  state.search.historyKeywords[0]
  if (!keywordId) {
    return ''
  }
  return getKeywordById(state, keywordId).keyword
}