import url from "../../utils/url";
import { FETCH_DATA } from "../middlewares/api";
import { schema } from "./entities/products";

const type = {
  //发送请求
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  //请求成功
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  //请求失败
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE"
};

export const actions = {
  loadLikes() {
    return (dispatch, getState) => {
      const endpoint = url.getProductList(0, 10);
      return dispatch(fetchLikes(endpoint));
    };
  }
};

const fetchLikes = endpoint => ({
  [FETCH_DATA]: {
    type: [
      type.FETCH_LIKES_REQUEST,
      type.FETCH_LIKES_SUCCESS,
      type.FETCH_LIKES_FAILURE
    ],
    endpoint,
    schema
  }
});

const reducer = (state = {}, action) => {
  switch (action.type) {
    case type.FETCH_LIKES_REQUEST:
      //
      break;
    case type.FETCH_LIKES_SUCCESS:
      //
      break;
    case type.FETCH_LIKES_FAILURE:
      //
      break;
    default:
      return state;
  }
};

export default reducer;
