import { combineReducers } from "redux";
import url from "../../utils/url";
import { FETCH_DATA } from "../middlewares/api";
import {
  schema,
  TO_PAY_TYPE,
  AVAILABLE_TYPE,
  REFUND_TYPE,
  getOrderById,
  types as orderTypes,
  actions as orderActions
} from "./entities/orders";

const initialState = {
  orders: {
    isFetching: false,
    ids: [], // 已完成订单
    toPayIds: [], // 待付款
    refundIds: [], // 退款订单
    availableIds: [] // 可使用的订单
  },
  currentTab: 0,
  // 当前删除弹框对应的订单信息
  currentOrder: {
    id: null,
    isDeleting: false
  }
};

// types
const types = {
  // 异步获取所需的actionTypes
  FETCH_ORDERS_REQUEST: "USER/FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS: "USER/FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE: "USER/FETCH_ORDERS_FAILURE",
  // 设置当前选中的type
  SET_CURRENT_TAB: "USER/SET_CURRENT_TAB",
  // 删除订单所需的actionTypes
  DELETE_ORDERS_REQUEST: "USER/DELETE_ORDERS_REQUEST",
  DELETE_ORDERS_SUCCESS: "USER/DELETE_ORDERS_SUCCESS",
  DELETE_ORDERS_FAILURE: "USER/DELETE_ORDERS_FAILURE",
  SHOW_DELETE_DIALOG: "USER/SHOW_DELETE_DIALOG",
  HIDE_DELETE_DIALOG: "USER/HIDE_DELETE_DIALOG"
};

// 对外暴露的action creators
export const actions = {
  // 获取订单
  loadOrders() {
    return (dispatch, getState) => {
      const { ids } = getState().user.orders;
      if (ids.length > 0) {
        return null;
      }
      const endpoint = url.getOrders();
      return dispatch(fetchOrders(endpoint));
    };
  },
  // 切换tab
  setCurrentTab(index) {
    return {
      type: types.SET_CURRENT_TAB,
      index
    };
  },
  // 删除订单
  deleteOrder() {
    return (dispatch, getState) => {
      const { id } = getState().user.currentOrder;
      if (id) {
        dispatch(deleteOrderRequest());
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 500);
        }).then(() => {
          dispatch(deleteOrderSuccess(id));
          dispatch(orderActions.deleteOrder(id));
        });
      }
    };
  },
  // 显示删除对话框
  showDeleteDialog(orderId) {
    return {
      type: types.SHOW_DELETE_DIALOG,
      orderId
    }
  },
  hideDeleteDialog() {
    return {
      type: types.HIDE_DELETE_DIALOG
    }
  }
};

const fetchOrders = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILURE
    ],
    endpoint,
    schema
  }
});

const deleteOrderRequest = () => ({
  type: types.DELETE_ORDERS_REQUEST
});

const deleteOrderSuccess = orderId => ({
  type: types.DELETE_ORDERS_SUCCESS,
  orderId
});

const orders = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_ORDERS_SUCCESS:
      const toPayIds = action.response.ids.filter(
        id => action.response.orders[id].type === TO_PAY_TYPE
      );
      const availableIds = action.response.ids.filter(
        id => action.response.orders[id].type === AVAILABLE_TYPE
      );
      const refundIds = action.response.ids.filter(
        id => action.response.orders[id].type === REFUND_TYPE
      );
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids,
        toPayIds: state.toPayIds.concat(toPayIds),
        availableIds: state.availableIds.concat(availableIds),
        refundIds: state.refundIds.concat(refundIds)
      };
    case types.FETCH_ORDERS_FAILURE:
      return { ...state, isFetching: false };
    
    case orderTypes.DELETE_ORDER:
    case types.DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        ids: removeOrderId(state, "ids", action.orderId),
        toPayIds: removeOrderId(state, "toPayIds", action.orderId),
        availableIds: removeOrderId(state, "availableIds", action.orderId),
        refundIds: removeOrderId(state, "refundIds", action.orderId)
      };
    default:
      return state;
  }
};

const removeOrderId = (state, key, orderId) => {
  return state[key].filter(id => {
    return id !== orderId;
  });
};

const currentTab = (state = initialState.currentTab, action) => {
  switch (action.type) {
    case types.SET_CURRENT_TAB:
      return action.index;
    default:
      return state;
  }
};

const currentOrder = (state = initialState.currentOrder, action) => {
  switch (action.type) {
    case types.SHOW_DELETE_DIALOG:
      return { ...state, id: action.orderId, isDeleting: true }
    case types.HIDE_DELETE_DIALOG:
    case types.DELETE_ORDERS_SUCCESS:
    case types.DELETE_ORDERS_FAILURE:
      return initialState.currentOrder
    default:
      return state;
  }
};

export default combineReducers({
  orders,
  currentTab,
  currentOrder
});

// selectors
export const getCurrentTab = state => {
  return state.user.currentTab;
};

export const getOrders = state => {
  const key = ["ids", "toPayIds", "availableIds", "refundIds"][
    state.user.currentTab
  ];
  return state.user.orders[key].map(id => {
    return getOrderById(state, id);
  });
};

export const getDeletStatus = state => {
  return state.user.currentOrder.isDeleting
} 
