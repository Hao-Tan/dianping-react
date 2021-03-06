import { combineReducers } from "redux";
import url from "../../utils/url";
import { FETCH_DATA } from "../middlewares/api";
import { schema } from "./entities/products";

export const params = {
  PATH_LIKES: "likes",
  PATH_DISCOUNTS: "discounts",
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3
};

const types = {
  //发送请求
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  //请求成功
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  //请求失败
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE"
};

// 首页数据初始状态
const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
};

// home下的异步action
export const actions = {
  // 加载猜你喜欢
  loadLikes() {
    return (dispatch, getState) => {
      const { pageCount } = getState().home.likes;
      const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
      const endpoint = url.getProductList(
        params.PATH_LIKES,
        rowIndex,
        params.PAGE_SIZE_LIKES
      );
      return dispatch(fetchLikes(endpoint));
    };
  },
  
  // 加载折扣商品
  loadDiscounts() {
    return (dispatch, getState) => {
      const endpoint = url.getProductList(
        params.PATH_DISCOUNTS,
        0,
        params.PAGE_SIZE_DISCOUNTS
      ); 
      return dispatch(fetchDiscounts(endpoint));
    };
  }
};

// action creators
const fetchLikes = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE
    ],
    endpoint,
    schema
  }
});

const fetchDiscounts = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_DISCOUNTS_REQUEST,
      types.FETCH_DISCOUNTS_SUCCESS,
      types.FETCH_DISCOUNTS_FAILURE
    ],
    endpoint,
    schema
  }
});

const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_LIKES_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const discounts = (state = initialState.discounts, action) => {
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_DISCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  likes,
  discounts
});

export default reducer;

// selectors
export const getLikes = state => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getDiscounts = state => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getPageCountOfLikes = state => {
  return state.home.likes.pageCount;
};
