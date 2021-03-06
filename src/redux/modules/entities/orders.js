import createReducer from "../../../utils/createReducer";

export const schema = {
  name: "orders",
  id: "id"
};

export const types = {
  DELETE_ORDER: "ORDERS/DELETE_ORDER",
  ADD_COMMENT: "OREDERS/ADD_COMMENT",
  ADD_ORDER: "ORDERS/ADD_ORDER"
}

let orderIdCounter = 10;

export const actions = {
  deleteOrder(orderId) {
    return {
      type: types.DELETE_ORDER,
      orderId
    }
  },
  addComment(orderId, commentId) {
    return {
      type: types.ADD_COMMENT,
      orderId,
      commentId
    }
  },
  addOrder(order) {
    const orderId = `o-${ ++orderIdCounter }`
    return {
      type: types.ADD_ORDER,
      orderId,
      order: { ...order, id: orderId }
    }
  }
}

export const USED_TYPE = 1; // 已消费
export const TO_PAY_TYPE = 2; //待付款
export const AVAILABLE_TYPE = 3; // 可使用
export const REFUND_TYPE = 4; // 退款

const normalReducer = createReducer(schema.name)

const reducer = (state={}, action) => {
  if (action.type === types.DELETE_ORDER) {
    const { [action.orderId]: deleteOrder, ...restOrders} = state
    return restOrders
  } else if (action.type === types.ADD_ORDER) {
    return {
      ...state,
      [action.orderId]: action.order
    }
  } else if (action.type === types.ADD_COMMENT) {
    return {
      ...state,
      [action.orderId]: {
        ...state[action.orderId],
        commentId: action.commentId
      }
    } 
  } else {
    return normalReducer(state, action)
  }
}

export default reducer

// selector
export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}